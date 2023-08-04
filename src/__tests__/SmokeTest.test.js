import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../components/App';
import SearchBox from '../components/SearchBox/SearchBox';
import ResultBox from '../components/ResultBox/ResultBox';

test('renders App', () => {
    render(<App />);
    const linkElement = screen.getByText(/DevScouter - GitHub User Search/i);
    expect(linkElement).toBeInTheDocument();
});

test('renders SearchBox', () => {
    render(<SearchBox />);
    const linkElement = screen.getByText(/Username:/i);
    expect(linkElement).toBeInTheDocument();
});

test('renders ResultBox', () => {
    render(<ResultBox />);
    const linkElement = screen.getByText(/Tech Stack/i);
    expect(linkElement).toBeInTheDocument();
});