import { default as Register } from '.'
import { screen, render, cleanup } from '@testing-library/react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Register', () => {

    test('it renders the register form', () => {
        const registerPage = shallow(<Register />)
        const tree = toJson(registerPage);
        expect(tree).toMatchSnapshot();        
    });

    test('it changes preview image when a new image is selected or removed', () => {

    });


    test('it allows a successful log in with eligible credentials', () => {

    });
});