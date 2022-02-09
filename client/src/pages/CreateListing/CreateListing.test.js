/**
 * @jest-environment jsdom
 */
 import axios from 'axios';
 jest.mock('axios');
 
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import {CreateListing} from '../index';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('CreateListring', ()=>{

    test('render', async ()=>{
        
        // jest.spyOn(window.localStorage.__proto__, 'setItem');
        // window.localStorage.__proto__.setItem = jest.fn();

        // jest.spyOn(FormData, 'append').mockReturnValue('hello')

        render(<CreateListing />)

        const name = screen.getByLabelText('name')
        const desc = screen.getByLabelText('desc')
        const loc = screen.getByLabelText('loc')
        const sub = screen.getByLabelText('sub')

        await waitFor(() => userEvent.type(name, 'hello'))
        await waitFor(() => userEvent.type(desc, 'diss'))
        await waitFor(() => userEvent.type(loc, 'loc'))
        
        await waitFor(()=>userEvent.click(sub))
        
        // expect(desc.textContent).toBe('diss')
        //expect(name.textContent).toBe('hello')
        
    })
})