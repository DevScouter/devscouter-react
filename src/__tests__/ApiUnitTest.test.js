import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchBox from '../components/SearchBox/SearchBox';
import SearchResult from '../components/SearchBox/SearchResult/SearchResult';
import { fetchUserData } from '../components/SearchBox/SearchBoxApi';

const apiUrl = process.env.REACT_APP_API_URL;

const simulateAPIFetch = async (promise, username) => {
    global.fetch = jest.fn(() => promise);

    const lang = 'en';
    await fetchUserData(username, lang);

    expect(fetch).toHaveBeenCalledWith(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
    });
};

const simulateApiError = async (errorType, usernameInput) => {
    const error = new Error(errorType);
    render(<SearchBox lang="en" />);
    jest.spyOn(global, 'fetch').mockRejectedValue(error);

    const inputElement = screen.getByTestId('username-input');
    fireEvent.change(inputElement, { target: { value: usernameInput } });
    const buttonElement = screen.getByTestId('submit-username-button');
    fireEvent.click(buttonElement);

    await waitFor(() => expect(window.alert).toBeCalled());

    global.fetch.mockRestore();
};

test('handles bad request', async () => {
    simulateAPIFetch
        (Promise.resolve({
            ok: false,
            status: 400,
            json: () => Promise.resolve({}),
        }),
            'bad-request-username'
        );

    const username = 'bad-request-username';
    expect(fetch).toHaveBeenCalledWith(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
    });
});

test('receives response', async () => {
    simulateAPIFetch
        (Promise.resolve({
            ok: true,
            status: 200,
            json: () => Promise.resolve({}),
        }),
            'MontyCoder0701'
        );

    const username = 'MontyCoder0701';
    expect(fetch).toHaveBeenCalledWith(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
    });
});

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

describe('SearchResult component', () => {
    const responseMessage = 'Error';
    const profileLink = 'https://github.com/example';
    const lang = 'en';

    it('renders default response when parsing error occurs', () => {
        const { getByText } = render(
            <SearchResult responseMessage={responseMessage} profileLink={profileLink} lang={lang} />
        );

        expect(getByText('Tech Stack: No stack found')).toBeInTheDocument();
        expect(getByText('Expert Languages: No languages found')).toBeInTheDocument();
        expect(getByText('GitHub Activity: No GitHub activity found')).toBeInTheDocument();
        expect(getByText('Expertise: No expertise found')).toBeInTheDocument();
        expect(getByText('Years Active: No years active found')).toBeInTheDocument();
        expect(getByText('GitHub Profile Link:')).toBeInTheDocument();
        expect(getByText('https://github.com/example')).toBeInTheDocument();
    });
});

describe('SearchResult component', () => {
    const responseMessage = '{"stack": null , "languages": null, "contributions": null, "expertise": null, "years_active": null}';
    const profileLink = 'https://github.com/example';
    const lang = 'en';

    it('renders default response when no value found', () => {
        const { getByText } = render(
            <SearchResult responseMessage={responseMessage} profileLink={profileLink} lang={lang} />
        );

        expect(getByText('Tech Stack: No stack found')).toBeInTheDocument();
        expect(getByText('Expert Languages: No languages found')).toBeInTheDocument();
        expect(getByText('GitHub Activity: No GitHub activity found')).toBeInTheDocument();
        expect(getByText('Expertise: No expertise found')).toBeInTheDocument();
        expect(getByText('Years Active: No years active found')).toBeInTheDocument();
        expect(getByText('GitHub Profile Link:')).toBeInTheDocument();
        expect(getByText('https://github.com/example')).toBeInTheDocument();
    });
});

