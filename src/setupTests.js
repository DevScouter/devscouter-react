import '@testing-library/jest-dom/extend-expect';
import { jest } from '@jest/globals';

beforeEach(() => {
    jest.spyOn(window, 'alert').mockImplementation(() => { });
    jest.spyOn(console, 'error').mockImplementation(() => { });
});

afterEach(() => {
    window.alert.mockRestore();
    console.error.mockRestore();
});
