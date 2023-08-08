import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../components/App';
import DateBox from '../components/DateBox/DateBox';
import DatePair from '../components/DateBox/DatePair/DatePair';
import DateResult from '../components/DateBox/DateResult/DateResult';
import LoadingModal from '../components/SearchBox/LoadingModal/LoadingModal';
import SearchBox from '../components/SearchBox/SearchBox';
import SearchResult from '../components/SearchBox/SearchResult/SearchResult';

const checkTextAfterRender = (component, text) => {
    render(component);
    const textElement = screen.getByText(new RegExp(text, 'i'));
    expect(textElement).toBeInTheDocument();
};

const checkImageAfterRender = (component, src) => {
    render(component);
    const imageElement = screen.getByAltText(src);
    expect(imageElement).toBeInTheDocument();
};

const checkPlaceholderAfterRender = (component, placeholder) => {
    render(component);
    const inputElement = screen.getByPlaceholderText(placeholder);
    expect(inputElement).toBeInTheDocument();
};

test('renders App', () => {
    checkTextAfterRender(<App />, 'DevScouter');
});

test('renders SearchBox', () => {
    checkTextAfterRender(<SearchBox />, 'Username:');
});

test('renders SearchResult', () => {
    checkTextAfterRender(<SearchResult />, 'Tech Stack');
});

test('renders DateBox', () => {
    checkTextAfterRender(<DateBox />, 'Years of Experience');
});

test('renders LoadingModal', () => {
    checkImageAfterRender(<LoadingModal />, 'loading');
});

test('renders DatePair', () => {
    checkPlaceholderAfterRender(<DatePair />, 'Start Date');
});

describe('DateResult component', () => {
    it('renders DateResult', () => {
        const experiences = ['1 years and 2 months', '3 years and 4 months'];
        const { getByText } = render(<DateResult experiences={experiences} />);

        expect(getByText('Experiences')).toBeInTheDocument();
        expect(getByText('1 years and 2 months')).toBeInTheDocument();
        expect(getByText('3 years and 4 months')).toBeInTheDocument();
    });
});
