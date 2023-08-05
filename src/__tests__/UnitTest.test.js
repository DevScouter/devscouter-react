import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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
    expect(window.alert).toHaveBeenCalledWith('Please enter a username.');
});

