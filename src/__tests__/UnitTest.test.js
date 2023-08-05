import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBox from '../components/SearchBox/SearchBox';

test('updates input value on change', () => {
    render(<SearchBox />);
    const inputElement = screen.getByTestId('username-input');
    fireEvent.change(inputElement, { target: { value: 'testuser' } });
    expect(inputElement.value).toBe('testuser');
});

// TODO: Add empty username test
