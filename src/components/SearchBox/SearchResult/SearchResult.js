import React, { useState, useEffect, useCallback } from 'react';
import './SearchResult.css';

function SearchResult(props) {
  const [responseText, setResponseText] = useState({
    techStack: 'No stack found',
    expertLanguages: 'No languages found',
    githubActivity: 'No GitHub activity found',
    expertise: 'No expertise found',
    yearsActive: 'No years active found',
    profileLink: 'No profile link found',
  });

  const makeProfileLink = useCallback(() => `https://github.com/${props.username}`, [props.username]);

  const parseResponseMessage = useCallback(() => {
    const responseMessage = props.responseMessage;

    if (responseMessage) {
      try {
        const { stack, languages, contributions, expertise, years_active } = JSON.parse(responseMessage);

        setResponseText({
          techStack: stack || 'No stack found',
          expertLanguages: languages ? Object.values(languages).join(', ') : 'No languages found',
          githubActivity: contributions || 'No GitHub activity found',
          expertise: expertise || 'No expertise found',
          yearsActive: years_active || 'No years active found',
          profileLink: makeProfileLink(),
        });
      } catch (error) {
        console.error('Error parsing response message:', error);
      }
    }
  }, [props, makeProfileLink]);

  useEffect(() => {
    parseResponseMessage();
  }, [parseResponseMessage]);

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
