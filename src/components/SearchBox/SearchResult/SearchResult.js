import React, { useState, useEffect, useCallback } from 'react';
import './SearchResult.css';

const defaultResponseText = {
  techStack: 'No stack found',
  expertLanguages: 'No languages found',
  githubActivity: 'No GitHub activity found',
  expertise: 'No expertise found',
  yearsActive: 'No years active found',
  profileLink: 'No profile link found',
};

function SearchResult({ responseMessage, username }) {
  const [responseText, setResponseText] = useState(defaultResponseText);
  const makeProfileLink = useCallback(() => `https://github.com/${username}`, [username]);

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
        profileLink: makeProfileLink(),
      });
    }
  }, [responseMessage, makeProfileLink]);

  return (
    <div className="search-result">
      <p className="result-text"> Tech Stack: {responseText.techStack}</p>
      <p className="result-text"> Expert Languages: {responseText.expertLanguages}</p>
      <p className="result-text"> GitHub Activity: {responseText.githubActivity}</p>
      <p className="result-text"> Expertise: {responseText.expertise}</p>
      <p className="result-text"> Years Active: {responseText.yearsActive}</p>
      <p className="result-link"> GitHub Profile Link:
        <a href={responseText.profileLink}> {responseText.profileLink} </a>
      </p>
    </div>
  );
}

export default SearchResult;
