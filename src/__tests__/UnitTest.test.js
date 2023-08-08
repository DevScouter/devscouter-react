import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchBox from '../components/SearchBox/SearchBox';
import DateBox from '../components/DateBox/DateBox';
import DatePair from '../components/DateBox/DatePair/DatePair';

test('updates input value on change for SearchBox', () => {
    render(<SearchBox />);
    const inputElement = screen.getByTestId('username-input');
    fireEvent.change(inputElement, { target: { value: 'testuser' } });
    expect(inputElement.value).toBe('testuser');
});

test('updates input value on change for DatePair', () => {
    render(<DatePair />);
    const inputElement = screen.getByTestId('start-date-input');
    fireEvent.change(inputElement, { target: { value: '202101' } });
    expect(inputElement.value).toBe('2021-01');
});

test('displays alert when username is empty', () => {
    render(<SearchBox />);
    const buttonElement = screen.getByTestId('submit-username-button');
    fireEvent.click(buttonElement);
    expect(window.alert).toHaveBeenCalledWith('Please enter a username.');
});

const simulateApiError = async (errorType, inputValue) => {
    const error = new Error(errorType);
    render(<SearchBox />);
    jest.spyOn(global, 'fetch').mockRejectedValue(error);

    const inputElement = screen.getByTestId('username-input');
    fireEvent.change(inputElement, { target: { value: inputValue } });
    const buttonElement = screen.getByTestId('submit-username-button');
    fireEvent.click(buttonElement);

    await waitFor(() => expect(window.alert).toBeCalled());

    global.fetch.mockRestore();
};

test('displays alert when user does not exist with 400', async () => {
    await simulateApiError('400', 'non-exist-username');
    expect(window.alert).toHaveBeenCalledWith('User does not exist. Check the spelling and try again.');
});

test('displays alert when server is down with 500', async () => {
    await simulateApiError('500', 'MontyCoder0701');
    expect(window.alert).toHaveBeenCalledWith('Something went wrong with the server. Please try again later.');
});

test('displays alert when default error occurs', async () => {
    await simulateApiError('404', 'MontyCoder0701');
    expect(window.alert).toHaveBeenCalledWith('An error occurred. Please try again later.');
});

test('displays alert when start date input is empty', () => {
    render(<DateBox />);
    const buttonElement = screen.getByTestId('submit-date-button');
    fireEvent.click(buttonElement);
    expect(window.alert).toHaveBeenCalledWith('Please fill out all date inputs.');
});

test('displays alert when start date is bigger than end date', () => {
    render(<DateBox />);
    const startDateElement = screen.getByTestId('start-date-input');
    const endDateElement = screen.getByTestId('end-date-input');
    fireEvent.change(startDateElement, { target: { value: '2021-01' } });
    fireEvent.change(endDateElement, { target: { value: '2020-01' } });
    const buttonElement = screen.getByTestId('submit-date-button');
    fireEvent.click(buttonElement);
    expect(window.alert).toHaveBeenCalledWith('Start date must be before end date.');
});

test('displays alert when date input is too short', () => {
    render(<DateBox />);
    const startDateElement = screen.getByTestId('start-date-input');
    const endDateElement = screen.getByTestId('end-date-input');
    fireEvent.change(startDateElement, { target: { value: '2020' } });
    fireEvent.change(endDateElement, { target: { value: '2021-01' } });
    const buttonElement = screen.getByTestId('submit-date-button');
    fireEvent.click(buttonElement);
    expect(window.alert).toHaveBeenCalledWith('Please enter a valid date. (YYYYMM)');
});

test('displays alert when only one date pair is left and delete is pressed', () => {
    render(<DatePair />);
    const buttonElement = screen.getByTestId('delete-pair-button');
    fireEvent.click(buttonElement);
    expect(window.alert).toHaveBeenCalledWith('You must have at least one date pair.');
});
