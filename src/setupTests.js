import '@testing-library/jest-dom/extend-expect';
import { jest } from '@jest/globals';

window.alert = jest.fn();
global.waitFor = jest.fn();
