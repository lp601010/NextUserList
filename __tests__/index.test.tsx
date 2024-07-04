import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Home from '../app/page';
import NavBarComponent from '../app/components/NavBarComponent';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';
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
  it('Add user test', () => {
    render(<Home />);
    const button = screen.getByText(/Add User/i);
    fireEvent.click(button);
    const modal = screen.getAllByRole('dialog');
    expect(modal[0]).toBeInTheDocument();
    const elements = screen.getAllByText('Add User');
    const headerElement = elements.find((element) =>
      element.closest('header.py-4.px-6.flex-initial.text-large.font-semibold.flex.flex-col.gap-1')
    );
    expect(headerElement).toHaveTextContent('Add User');
  });
  it('opens the modal by edit button, and save new user infomation.', async () => {
    render(<Home />);
    const button = screen.getByTestId(/editButton/i);
    fireEvent.click(button);
    const modal = screen.getAllByRole('dialog');
    expect(modal[0]).toBeInTheDocument();
    const elements = screen.getAllByText('Edit User');
    const headerElement = elements.find((element) =>
      element.closest('header.py-4.px-6.flex-initial.text-large.font-semibold.flex.flex-col.gap-1')
    );
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveTextContent('Edit User');
    const emailElement = screen.getByLabelText('Email');
    expect(emailElement).toBeInTheDocument();
    fireEvent.change(emailElement, { target: { value: 'test@test.com' } });
    const submitButton = screen.getByRole('button', { name: /submit/i });
    await userEvent.click(submitButton);
    const nowEmail = screen.getByText('test@test.com');
    expect(nowEmail).toBeInTheDocument();
  });
});
