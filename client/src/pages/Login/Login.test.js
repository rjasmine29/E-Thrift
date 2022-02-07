import { default as Login } from '.'
import { screen, render, fireEvent } from '@testing-library/react';
import * as ReactRouterDom from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import * as helpers from '../../helpers/requests';

jest.mock("jwt-decode");

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn()
}));

const mockLoginResponse = {
    "accessToken": "gjreogjiperog",
    "refreshToken": "ewiogjwopiegj"
}

describe('Login', () => {
    test('it renders the page', () => {
        render(<Login />, { wrapper: ReactRouterDom.MemoryRouter });
        const heading = screen.getByRole("heading");
        expect(heading.textContent).toMatch("Sign-in");
    });

    test('it allows a user to make a log in request', () => {
        render(<Login />, { wrapper: ReactRouterDom.MemoryRouter });
        const submitBtn = screen.getByRole("button", { name: "Sign In" });
        const loginSpy = jest.spyOn(helpers, 'postLogin');
        const registerSpy = jest.spyOn(ReactRouterDom, 'useNavigate');
        
        loginSpy.mockReturnValue(mockLoginResponse);

        userEvent.click(submitBtn);
        expect(registerSpy).toHaveBeenCalled();
    });

    test('it navigates to the register page on button click', () => {
        render(<Login />, { wrapper: ReactRouterDom.MemoryRouter });
        const registerBtn = screen.getByRole("button", { name: "Register" });
        const spy = jest.spyOn(ReactRouterDom, 'useNavigate');

        userEvent.click(registerBtn);
        expect(spy).toHaveBeenCalled();
    });

    test('it allows users to input email', () => {
        render(<Login />, { wrapper: ReactRouterDom.MemoryRouter });
        const emailInput = screen.getByLabelText("email-input");
        fireEvent.change(emailInput, { target: { value: "test@email.com"} });
        expect(emailInput.value).toBe("test@email.com");
    });

    test('it allows users to input password', () => {
        render(<Login />, { wrapper: ReactRouterDom.MemoryRouter });
        const passwordInput = screen.getByLabelText("password-input");
        fireEvent.change(passwordInput, { target: { value: "test password"} });
        expect(passwordInput.value).toBe("test password");
    });
});