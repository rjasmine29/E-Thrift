
/**
 * @jest-environment jsdom
 */

 import { render, screen } from '@testing-library/react';
 import userEvent from '@testing-library/user-event'
 import React, {useState} from 'react';

 import { EditProfile } from '../index';
 
 const mockedUsedNavigate = jest.fn();
 
 jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
   useNavigate: () => mockedUsedNavigate,
 }));

 import axios from 'axios';
 jest.mock('axios');

 describe('edit profile', ()=>{

    // test('renders', ()=>{
        
        //     render(<EditProfile />)
        // })
        
        test('fill form', ()=>{
            
        const setActiveFragment = jest.fn()
        const setUsername = jest.fn()
        const setPhoneNumber = jest.fn()
        const setAvatarUrl = jest.fn()
        // const email = 'test'
        // const firstname = 'test'
        // const firstname = 'test'


        render(<EditProfile />)
        const testFile = new File(['test'], 'test.png', { type: 'image/png' });
        const profileInput = screen.getByLabelText("profile-input");
        const name = screen.getAllByLabelText('first-name-input')
        const last = screen.getAllByLabelText('last-name-input')
        const user = screen.getAllByLabelText('username-input')
        const email = screen.getAllByLabelText('email-input')
        const phone = screen.getAllByLabelText('phone-number-input')
        userEvent.type(name, 'Hello')
        userEvent.type(last, 'Hello')
        userEvent.type(user, 'Hello')
        userEvent.type(email, 'Hello')
        userEvent.type(phone, 25120)
        userEvent.upload(profileInput, testFile);
    })
 })