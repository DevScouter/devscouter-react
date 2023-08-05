import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBox from '../components/SearchBox/SearchBox';

test('updates input value on change', () => {
    render(<SearchBox />);
    const inputElement = screen.getByTestId('username-input');
    fireEvent.change(inputElement, { target: { value: 'testuser' } });
    expect(inputElement.value).toBe('testuser');
});

test('displays alert when username is empty', () => {
    render(<SearchBox />);
    const buttonElement = screen.getByTestId('submit-button');
    fireEvent.click(buttonElement);
    expect(window.alert).toBeCalledWith('Please enter a username.');
});

test('displays alert when user does not exist', async () => {
    render(<SearchBox />);
    const inputElement = screen.getByTestId('username-input');
    fireEvent.change(inputElement, { target: { value: 'non-exist-username' } });
    const buttonElement = screen.getByTestId('submit-button');
    fireEvent.click(buttonElement);
    await waitFor(() => expect(window.alert).toBeCalledWith('User does not exist. Check the spelling and try again.'));
});
