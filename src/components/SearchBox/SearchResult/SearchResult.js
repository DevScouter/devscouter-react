import React from 'react';
import './SearchResult.css';
import langDict from '../../LangDict';

function SearchResult({ responseMessage, profileLink, lang }) {
  const parseResponse = (responseMessage, lang) => {
    try {
      let { stack, languages, contributions, expertise, years_active } = JSON.parse(responseMessage);
      stack = langDict[lang].stackDict[stack];
      contributions = langDict[lang].contribDict[contributions];
      expertise = langDict[lang].expertDict[expertise];

      return {
        techStack: stack || langDict[lang].defaultResponseText['techStack'],
        expertLanguages: languages ? Object.values(languages).join(', ') : langDict[lang].defaultResponseText['expertLanguages'],
        githubActivity: contributions || langDict[lang].defaultResponseText['githubActivity'],
        expertise: expertise || langDict[lang].defaultResponseText['expertise'],
        yearsActive: years_active || langDict[lang].defaultResponseText['yearsActive'],
      };
    } catch (error) {
      console.error('Error parsing response message:', error);
      return langDict[lang].defaultResponseText;
    }
  };

  const parsedResponse = parseResponse(responseMessage, lang);

  return (
    <div
      className="search-result"
      data-testid="search-result"
    >
      <p className="result-text"> {langDict[lang].techStack}: {parsedResponse.techStack}</p>
      <p className="result-text"> {langDict[lang].expertLanguages}: {parsedResponse.expertLanguages}</p>
      <p className="result-text"> {langDict[lang].githubActivity}: {parsedResponse.githubActivity}</p>
      <p className="result-text"> {langDict[lang].expertiseText}: {parsedResponse.expertise}</p>
      <p className="result-text"> {langDict[lang].yearsActive}: {parsedResponse.yearsActive}</p>
      <p className="result-link"> {langDict[lang].githubProfileLink}:
        <a href={profileLink}> {profileLink} </a>
      </p>
    </div>
  );
}

export default SearchResult;
