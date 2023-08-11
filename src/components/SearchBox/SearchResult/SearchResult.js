import React, { useState, useEffect, useCallback } from 'react';
import './SearchResult.css';
import langDict from '../../LangDict';

const defaultResponseText = {
  techStack: 'No stack found',
  expertLanguages: 'No languages found',
  githubActivity: 'No GitHub activity found',
  expertise: 'No expertise found',
  yearsActive: 'No years active found',
  profileLink: 'No profile link found',
};

function SearchResult({ responseMessage, profileLink, lang }) {
  const [responseText, setResponseText] = useState(defaultResponseText);

  const parseResponse = useCallback(
    (responseMessage, lang) => {
      try {
        let { stack, languages, contributions, expertise, years_active } = JSON.parse(responseMessage);
        stack = langDict[lang].stack[stack];
        contributions = langDict[lang].contributions[contributions];
        expertise = langDict[lang].expertise[expertise];

        return {
          techStack: stack || defaultResponseText.techStack,
          expertLanguages: languages ? Object.values(languages).join(', ') : defaultResponseText.expertLanguages,
          githubActivity: contributions || defaultResponseText.githubActivity,
          expertise: expertise || defaultResponseText.expertise,
          yearsActive: years_active || defaultResponseText.yearsActive,
        };
      } catch (error) {
        console.error('Error parsing response message:', error);
        return defaultResponseText;
      }
    },
    []
  );

  useEffect(() => {
    if (responseMessage) {
      const parsedResponse = parseResponse(responseMessage, lang);
      setResponseText({
        ...parsedResponse,
      });
    }
  }, [responseMessage, lang, parseResponse]);

  return (
    <div className="search-result">
      <p className="result-text"> {langDict[lang].techStack}: {responseText.techStack}</p>
      <p className="result-text"> {langDict[lang].expertLanguages}: {responseText.expertLanguages}</p>
      <p className="result-text"> {langDict[lang].githubActivity}: {responseText.githubActivity}</p>
      <p className="result-text"> {langDict[lang].expertiseText}: {responseText.expertise}</p>
      <p className="result-text"> {langDict[lang].yearsActive}: {responseText.yearsActive}</p>
      <p className="result-link"> {langDict[lang].githubProfileLink}:
        <a href={profileLink}> {profileLink} </a>
      </p>
    </div>
  );
}

export default SearchResult;
