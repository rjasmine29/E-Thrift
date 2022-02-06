import { default as Register } from '.'
import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import * as helpers from '../../helpers/requests';

jest.mock("jwt-decode", () => jest.fn());

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

describe('Register', () => {
    test('it renders a form', () => {
        render(<Register />, { wrapper: MemoryRouter });
        const form = screen.getByRole("form");
        expect(form).toBeInTheDocument();
    });

    test('it opens the file explorer when profile image is clicked', () => {
        render(<Register />, { wrapper: MemoryRouter });
        const profileImg = screen.getByRole('img', { name: "Profile" });
        userEvent.click(profileImg);
    });

    test('it updates the preview image when the user inputs an image', async () => {
        render(<Register />, { wrapper: MemoryRouter });
        const profileImg = screen.getByRole('img', { name: "Profile" });
        const profileInput = screen.getByLabelText("profile-input", { hidden: true });
        const testFile = new File(['test'], 'test.png', { type: 'image/png' });
        const defaultImageSrc = profileImg.src;
        userEvent.upload(profileInput, testFile);

        await waitFor(() => {
            expect(defaultImageSrc).not.toBe(profileImg.src);
        });
    });

    test('it updates the preview image with the default profile when no image is selected', async () => {
        render(<Register />, { wrapper: MemoryRouter });
        const profileImg = screen.getByRole('img', { name: "Profile" });
        const profileInput = screen.getByLabelText("profile-input", { hidden: true }); 
        const defaultImageSrc = profileImg.src;
        userEvent.upload(profileInput);

        await waitFor(() => {
            expect(profileImg.src).toBe(defaultImageSrc);
        });
    });

    test('it removes the selected image', async () => {
        render(<Register />, { wrapper: MemoryRouter });
        const profileImg = screen.getByRole('img', { name: "Profile" });
        const profileInput = screen.getByLabelText("profile-input", { hidden: true });
        const removeImageBtn = screen.getByLabelText("remove-image", { hidden: true });
        const testFile = new File(['test'], 'test.png', { type: 'image/png' });

        const defaultImageSrc = profileImg.src;
        userEvent.upload(profileInput, testFile);
        userEvent.click(removeImageBtn);

        await waitFor(() => {
            expect(profileImg.src).toBe(defaultImageSrc);
        });
    });

    test('it registers and logs the user in', async () => {
        render(<Register />, { wrapper: MemoryRouter });
        const submitBtn = screen.getByRole("button", { name: "Submit" });
        const registerSpy = jest.spyOn(helpers, 'postRegister');
        const loginSpy = jest.spyOn(helpers, 'postLogin');
        registerSpy.mockReturnValue(mockUser);
        loginSpy.mockReturnValue(mockLoginResponse);

        userEvent.click(submitBtn);
        expect(registerSpy).toHaveBeenCalled();
        
        await waitFor(() => {
            expect(loginSpy).toHaveBeenCalled();
        });
       
    });

    test('it allows users to input first name', () => {
        render(<Register />, { wrapper: MemoryRouter });
        const firstNameInput = screen.getByLabelText("first-name-input");
        fireEvent.change(firstNameInput, { target: { value: "test"} });
    });

    test('it allows users to input last name', () => {
        render(<Register />, { wrapper: MemoryRouter });
        const lastNameInput = screen.getByLabelText("last-name-input");
        fireEvent.change(lastNameInput, { target: { value: "test"} });
    });

    test('it allows users to input username', () => {
        render(<Register />, { wrapper: MemoryRouter });
        const usernameInput = screen.getByLabelText("username-input");
        fireEvent.change(usernameInput, { target: { value: "test"} });
    });

    test('it allows users to input email', () => {
        render(<Register />, { wrapper: MemoryRouter });
        const emailInput = screen.getByLabelText("email-input");
        fireEvent.change(emailInput, { target: { value: "test@email.com"} });
    });

    test('it allows users to input password', () => {
        render(<Register />, { wrapper: MemoryRouter });
        const passwordInput = screen.getByLabelText("password-input");
        fireEvent.change(passwordInput, { target: { value: "test password"} });
    });

    test('it allows users to input password-confirm', () => {
        render(<Register />, { wrapper: MemoryRouter });
        const passwordConfirmInput = screen.getByLabelText("password-confirm-input");
        fireEvent.change(passwordConfirmInput, { target: { value: "test password"} });
    });

    test('it allows users to input phone-number', () => {
        render(<Register />, { wrapper: MemoryRouter });
        const phoneNumberInput = screen.getByLabelText("phone-number-input");
        fireEvent.change(phoneNumberInput, { target: { value: "0800001066"} });
    });
});