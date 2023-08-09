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

const simulateApiError = async (errorType, usernameInput) => {
    const error = new Error(errorType);
    render(<SearchBox />);
    jest.spyOn(global, 'fetch').mockRejectedValue(error);

    const inputElement = screen.getByTestId('username-input');
    fireEvent.change(inputElement, { target: { value: usernameInput } });
    const buttonElement = screen.getByTestId('submit-username-button');
    fireEvent.click(buttonElement);

    await waitFor(() => expect(window.alert).toBeCalled());

    global.fetch.mockRestore();
};

const simulateDateInputError = (startDate, endDate) => {
    render(<DateBox />);
    const startDateElement = screen.getByTestId('start-date-input');
    const endDateElement = screen.getByTestId('end-date-input');
    fireEvent.change(startDateElement, { target: { value: startDate } });
    fireEvent.change(endDateElement, { target: { value: endDate } });
    const buttonElement = screen.getByTestId('submit-date-button');
    fireEvent.click(buttonElement);
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
    simulateDateInputError('', '2021-01');
    expect(window.alert).toHaveBeenCalledWith('Please fill out all date inputs.');
});

test('displays alert when start date is bigger than end date', () => {
    simulateDateInputError('2021-01', '2020-01');
    expect(window.alert).toHaveBeenCalledWith('Start date must be before end date.');
});

test('displays alert when date input is less than 6 in length', () => {
    simulateDateInputError('2021-01', '2021-1');
    expect(window.alert).toHaveBeenCalledWith('Please enter a valid date. (YYYYMM)');
});

test('displays alert when years are less than 1900', () => {
    simulateDateInputError('1899-01', '1900-01');
    expect(window.alert).toHaveBeenCalledWith('Please check your years. (YYYYMM)');
});

test('displays alert when months are less than 1', () => {
    simulateDateInputError('1900-00', '1900-02');
    expect(window.alert).toHaveBeenCalledWith('Please check your months. (YYYYMM)');
});

test('displays alert when months are more than 12', () => {
    simulateDateInputError('2012-02', '2013-13');
    expect(window.alert).toHaveBeenCalledWith('Please check your months. (YYYYMM)');
});

test('displays total experience', () => {
    render(<DateBox />);
    const startDateElement = screen.getByTestId('start-date-input');
    const endDateElement = screen.getByTestId('end-date-input');
    fireEvent.change(startDateElement, { target: { value: '2021-01' } });
    fireEvent.change(endDateElement, { target: { value: '2021-02' } });
    const buttonElement = screen.getByTestId('submit-date-button');
    fireEvent.click(buttonElement);
    expect(screen.getByTestId('total-experience')).toHaveTextContent('0 year(s) and 1 month(s)');
});

test('displays total experience with multiple date pairs', () => {
    render(<DateBox />);
    const addButtonElement = screen.getByTestId('add-pair-button');
    fireEvent.click(addButtonElement);

    const datePairs = screen.getAllByTestId('date-pair');
    const startDateElement1 = datePairs[0].querySelector('[data-testid="start-date-input"]');
    const endDateElement1 = datePairs[0].querySelector('[data-testid="end-date-input"]');

    const startDateElement2 = datePairs[1].querySelector('[data-testid="start-date-input"]');
    const endDateElement2 = datePairs[1].querySelector('[data-testid="end-date-input"]');

    fireEvent.change(startDateElement1, { target: { value: '2021-01' } });
    fireEvent.change(endDateElement1, { target: { value: '2021-02' } });

    fireEvent.change(startDateElement2, { target: { value: '2021-03' } });
    fireEvent.change(endDateElement2, { target: { value: '2023-04' } });

    const buttonElement = screen.getByTestId('submit-date-button');
    fireEvent.click(buttonElement);
    expect(screen.getByTestId('total-experience')).toHaveTextContent('2 year(s) and 2 month(s)');
});
