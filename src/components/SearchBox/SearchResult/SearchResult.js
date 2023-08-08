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

        setResponseText(prevState => ({
          ...prevState,
          techStack: stack || prevState.techStack,
          expertLanguages: languages ? Object.values(languages).join(', ') : prevState.expertLanguages,
          githubActivity: contributions || prevState.githubActivity,
          expertise: expertise || prevState.expertise,
          yearsActive: years_active || prevState.yearsActive,
          profileLink: makeProfileLink(),
        }));
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
