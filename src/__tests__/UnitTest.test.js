import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../components/App';
import SearchBox from '../components/SearchBox/SearchBox';
import DateBox from '../components/DateBox/DateBox';
import DatePair from '../components/DateBox/DatePair/DatePair';

const simulateDateInputError = (startDate, endDate) => {
    render(<DateBox lang="en" />);
    const startDateElement = screen.getByTestId('start-date-input');
    const endDateElement = screen.getByTestId('end-date-input');
    fireEvent.change(startDateElement, { target: { value: startDate } });
    fireEvent.change(endDateElement, { target: { value: endDate } });
    const buttonElement = screen.getByTestId('submit-date-button');
    fireEvent.click(buttonElement);
};

const simulateDatePairInputs = (datePairsData) => {
    render(<DateBox lang="en" />);

    const addButtonElement = screen.getByTestId('add-pair-button');
    fireEvent.click(addButtonElement);

    const datePairs = screen.getAllByTestId('date-pair');
    datePairsData.forEach((data, index) => {
        const startDateElement = datePairs[index].querySelector('[data-testid="start-date-input"]');
        const endDateElement = datePairs[index].querySelector('[data-testid="end-date-input"]');

        fireEvent.change(startDateElement, { target: { value: data.startDate } });
        fireEvent.change(endDateElement, { target: { value: data.endDate } });
    });

    const buttonElement = screen.getByTestId('submit-date-button');
    fireEvent.click(buttonElement);
};

test('updates input value on change for SearchBox', () => {
    render(<SearchBox lang="en" />);
    const inputElement = screen.getByTestId('username-input');
    fireEvent.change(inputElement, { target: { value: 'testuser' } });
    expect(inputElement.value).toBe('testuser');
});

test('updates input value on change for DatePair', () => {
    render(<DatePair lang="en" />);
    const inputElement = screen.getByTestId('start-date-input');
    fireEvent.change(inputElement, { target: { value: '202101' } });
    expect(inputElement.value).toBe('2021-01');
});

test('displays alert when username is empty', () => {
    render(<SearchBox lang="en" />);
    const buttonElement = screen.getByTestId('submit-username-button');
    fireEvent.click(buttonElement);
    expect(window.alert).toHaveBeenCalledWith('Please enter a username.');
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

test('displays total experience when years are 0', () => {
    render(<DateBox lang="en" />);
    const startDateElement = screen.getByTestId('start-date-input');
    const endDateElement = screen.getByTestId('end-date-input');
    fireEvent.change(startDateElement, { target: { value: '2021-01' } });
    fireEvent.change(endDateElement, { target: { value: '2021-02' } });
    const buttonElement = screen.getByTestId('submit-date-button');
    fireEvent.click(buttonElement);
    expect(screen.getByTestId('total-experience')).toHaveTextContent('1 month(s)');
});

test('displays total experience when months are 0', () => {
    render(<DateBox lang="en" />);
    const startDateElement = screen.getByTestId('start-date-input');
    const endDateElement = screen.getByTestId('end-date-input');
    fireEvent.change(startDateElement, { target: { value: '2021-01' } });
    fireEvent.change(endDateElement, { target: { value: '2022-01' } });
    const buttonElement = screen.getByTestId('submit-date-button');
    fireEvent.click(buttonElement);
    expect(screen.getByTestId('total-experience')).toHaveTextContent('1 year(s)');
});

test('displays error when only one date pair exists and delete is pressed', () => {
    render(<DateBox lang="en" />);
    const datePairs = screen.getAllByTestId('date-pair');
    const startDateElement = screen.getByTestId('start-date-input');
    const endDateElement = screen.getByTestId('end-date-input');
    fireEvent.change(startDateElement, { target: { value: '2021-01' } });
    fireEvent.change(endDateElement, { target: { value: '2021-02' } });

    const deleteButtonElement = datePairs[0].querySelector('[data-testid="delete-pair-button"]');
    fireEvent.click(deleteButtonElement);
    expect(window.alert).toHaveBeenCalledWith('You must have at least one date pair.');
});

test('deletes date pair when more than one exist', () => {
    render(<DateBox lang="en" />);
    const datePairs = screen.getAllByTestId('date-pair');
    const startDateElement = screen.getByTestId('start-date-input');
    const endDateElement = screen.getByTestId('end-date-input');
    fireEvent.change(startDateElement, { target: { value: '2021-01' } });
    fireEvent.change(endDateElement, { target: { value: '2021-02' } });

    const addButtonElement = screen.getByTestId('add-pair-button');
    fireEvent.click(addButtonElement);

    const deleteButtonElement = datePairs[0].querySelector('[data-testid="delete-pair-button"]');
    fireEvent.click(deleteButtonElement);
});

test('displays total experience with multiple date pairs', () => {
    const datePairsData = [
        { startDate: '2021-01', endDate: '2021-02' },
        { startDate: '2021-03', endDate: '2023-04' }
    ];
    simulateDatePairInputs(datePairsData);
    expect(screen.getByTestId('total-experience')).toHaveTextContent('2 year(s) 2 month(s)');
});

test('lang is set to Korean when kr-button is pressed', () => {
    render(<App lang="en" />);
    const buttonElement = screen.getByTestId('kr-button');
    fireEvent.click(buttonElement);
    expect(screen.getByTestId('App-header')).toHaveTextContent('데브스카우터');
});

test('lang is set to English when kr-button is pressed', () => {
    render(<App lang="en" />);
    const krButtonElement = screen.getByTestId('kr-button');
    fireEvent.click(krButtonElement);
    const enButtonElement = screen.getByTestId('en-button');
    fireEvent.click(enButtonElement);
    expect(screen.getByTestId('App-header')).toHaveTextContent('DevScouter');
});
