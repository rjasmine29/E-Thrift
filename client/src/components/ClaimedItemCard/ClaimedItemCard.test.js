
/**
 * @jest-environment jsdom
 */

 import { render, screen } from '@testing-library/react';
 import userEvent from '@testing-library/user-event'
 import ActiveListings from '.';
 import React, {useState} from 'react';

 import { CatBar } from '.';
 
 const mockedUsedNavigate = jest.fn();
 
 jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
   useNavigate: () => mockedUsedNavigate,
 }));


 describe('claimed item card', ()=>{
     test('renders card', ()=>{
         const mockData = {
             
         }
     })
 })