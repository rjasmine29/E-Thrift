import { default as Register } from '.'
import { screen, render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

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
        // assert 'openFiles' toHaveBeenCalled() 
    });

    test('it updates the preview image when the user inputs an image', () => {
        render(<Register />, { wrapper: MemoryRouter });
        const profileImg = screen.getByRole('img', { name: "Profile" });
        const profileInput = screen.getAllByRole('profile-input', { hidden: true }); // ERROR: Cannot find the profile input
        const testFile = new File(['test'], 'test.png', { type: 'image/png' });
        const defaultImageSrc = profileImg.src;
        userEvent.upload(profileInput, testFile);
        expect(defaultImageSrc).not.toBe(profileImg.src);
    });


    test('it allows a successful log in with eligible credentials', () => {
        render(<Register />, { wrapper: MemoryRouter });
    });
});