
/**
 * @jest-environment jsdom
 */

 import { render, screen } from '@testing-library/react';
 import userEvent from '@testing-library/user-event'
 import React, {useState} from 'react';

 import { App } from './App';
 
 const mockedUsedNavigate = jest.fn();
 
 jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
   useNavigate: () => mockedUsedNavigate,
 }));

 import axios from 'axios';
 jest.mock('axios');

 describe('App', ()=>{

    test('render', ()=>{
        render(<App />)
    })
 })