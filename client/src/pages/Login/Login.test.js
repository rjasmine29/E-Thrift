import { default as Login } from '.'
import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import * as helpers from '../../helpers/requests';

jest.mock("jwt-decode");

const mockUser = { 
    "firstName": "John",
    "lastName": "Smith",
    "username": "JohnSmithTest",
    "email": "johnsmith@gmail.com",
    "phoneNumber": "0800001066"
}

const mockLoginResponse = {
    "accessToken": "gjreogjiperog",
    "refreshToken": "ewiogjwopiegj"
}

describe('Login', () => {
    test('it renders the page', () => {
        render(<Login />, { wrapper: MemoryRouter });
        const heading = screen.getByRole("heading");
        expect(heading.textContent).toMatch("Sign-in");
    });

    test('it allows a user to make a log in request', () => {
        render(<Login />, { wrapper: MemoryRouter });
        const submitBtn = screen.getByRole("button", { name: "Submit" });
        const loginSpy = jest.spyOn(helpers, 'postLogin');
        loginSpy.mockReturnValue(mockLoginResponse);

        userEvent.click(submitBtn);
    });

    test('it allows users to input email', () => {
        render(<Login />, { wrapper: MemoryRouter });
        const emailInput = screen.getByLabelText("email-input");
        fireEvent.change(emailInput, { target: { value: "test@email.com"} });
        expect(emailInput.value).toBe("test@email.com");
    });

    test('it allows users to input password', () => {
        render(<Login />, { wrapper: MemoryRouter });
        const passwordInput = screen.getByLabelText("password-input");
        fireEvent.change(passwordInput, { target: { value: "test password"} });
        expect(passwordInput.value).toBe("test password");
    });
});