import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Home from '../app/page';
import NavBarComponent from '../app/components/NavBarComponent';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  http.get('/users.json', () => {
    return HttpResponse.json([
      {
        id: 3,
        name: 'Jane Fisher',
        age: '22',
        email: 'jane@example.com',
        phone: '0801123312'
      }
    ]);
  })
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('NavBarComponent', () => {
  it('renders without crashing', () => {
    render(<NavBarComponent />);
  });

  it('contains correct text', () => {
    render(<NavBarComponent />);
    const linkElement = screen.getByText(/Users List/i);
    expect(linkElement).toBeInTheDocument();
  });

  it('has correct alt text for logo', () => {
    render(<NavBarComponent />);
    const logo = screen.getByAltText(/logo/i);
    expect(logo).toBeInTheDocument();
  });
});

describe('Home', () => {
  it('renders without crashing', () => {
    render(<Home />);
  });

  it('opens the modal and sets isAdd to true when AddUserButton is clicked', () => {
    render(<Home />);
    const button = screen.getByText(/Add User/i);
    fireEvent.click(button);
    const modal = screen.getAllByRole('dialog');
    expect(modal[0]).toBeInTheDocument();
    // const modalHead = screen.getByRole('heading', { name: /specific text/i });
  });
});
