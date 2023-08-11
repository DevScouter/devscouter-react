import React, { useState, useEffect } from 'react';
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

function SearchResult({ responseMessage, profileLink, language }) {
  const [responseText, setResponseText] = useState(defaultResponseText);

  function parseResponse(responseMessage) {
    try {
      const { stack, languages, contributions, expertise, years_active } = JSON.parse(responseMessage);
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
  }

  useEffect(() => {
    if (responseMessage) {
      const parsedResponse = parseResponse(responseMessage);
      setResponseText({
        ...parsedResponse,
      });
    }
  }, [responseMessage]);

  return (
    <div className="search-result">
      <p className="result-text"> {langDict[language].techStack}: {responseText.techStack}</p>
      <p className="result-text"> {langDict[language].expertLanguages}: {responseText.expertLanguages}</p>
      <p className="result-text"> {langDict[language].githubActivity}: {responseText.githubActivity}</p>
      <p className="result-text"> {langDict[language].expertise}: {responseText.expertise}</p>
      <p className="result-text"> {langDict[language].yearsActive}: {responseText.yearsActive}</p>
      <p className="result-link"> {langDict[language].githubProfileLink}:
        <a href={profileLink}> {profileLink} </a>
      </p>
    </div>
  );
}

export default SearchResult;
