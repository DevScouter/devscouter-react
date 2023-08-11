import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../components/App';
import DateBox from '../components/DateBox/DateBox';
import DatePair from '../components/DateBox/DatePair/DatePair';
import DateResult from '../components/DateBox/DateResult/DateResult';
import LangChange from '../components/LangChange/LangChange';
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
    const inputElements = screen.queryAllByPlaceholderText(placeholder);
    expect(inputElements.length).toBeGreaterThan(0);
};

test('renders App', () => {
    checkTextAfterRender(<App lang="en" />, 'DevScouter');
});

test('renders SearchBox', () => {
    checkTextAfterRender(<SearchBox lang="en" />, 'Username');
});

test('renders SearchResult', () => {
    checkTextAfterRender(<SearchResult lang="en" />, 'Tech Stack');
});

test('renders DateBox', () => {
    checkTextAfterRender(<DateBox lang="en" />, 'Years of Experience');
});

test('renders LangChange', () =>
    checkTextAfterRender(<LangChange lang="en" />, 'English')
);

test('renders LoadingModal', () => {
    checkImageAfterRender(<LoadingModal lang="en" />, 'loading');
});

test('renders DatePair', () => {
    checkPlaceholderAfterRender(<DatePair lang="en" />, 'YYYY-MM');
});

describe('DateResult component', () => {
    it('renders DateResult', () => {
        const experiences = [[1, 2], [3, 4]];
        const totalExperience = [4, 6];
        const { getByText } = render(<DateResult lang="en" experiences={experiences} totalExperience={totalExperience} />);

        expect(getByText('Experiences')).toBeInTheDocument();
        expect(getByText('1 year(s) 2 month(s)')).toBeInTheDocument();
        expect(getByText('3 year(s) 4 month(s)')).toBeInTheDocument();
        expect(getByText('Total Experience')).toBeInTheDocument();
    });
});
