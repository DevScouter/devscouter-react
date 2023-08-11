import React, { useState } from 'react';
import langDict from '../LangDict';
import LoadingModal from './LoadingModal/LoadingModal';
import SearchResult from './SearchResult/SearchResult';
import { fetchUserData } from './SearchBoxApi';

function makeProfileLink(username) {
  return `https://github.com/${username}`;
}

const SearchBox = ({ language }) => {
  const [username, setUsername] = useState('');
  const [profileLink, setProfileLink] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSearchResult, setShowSearchResult] = useState(false);

  const handleUsernameSubmit = async (event) => {
    event.preventDefault();

    if (!username) {
      alert(langDict[language].enterUsername);
      return;
    }

    setIsLoading(true);

    try {
      const formattedUsername = username.trim().toLowerCase();
      const formattedProfileLink = makeProfileLink(formattedUsername);
      const responseData = await fetchUserData(formattedUsername, language);
      if (responseData) {
        setResponseMessage(JSON.stringify(responseData, null, 2));
        setProfileLink(formattedProfileLink);
        setShowSearchResult(true);
      } else {
        setShowSearchResult(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }

  };

  return (
    <div>
      <form
        id="search-form"
        data-testid="search-form"
        className="search-form"
        onSubmit={handleUsernameSubmit}>
        <label
          className="form-label"
          htmlFor="username">
          {langDict[language].username}
        </label>
        <input
          id="username-input"
          data-testid="username-input"
          className="form-input"
          type="text"
          name="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <button
          id="submit-username-button"
          data-testid="submit-username-button"
          className="form-button"
          type="submit">
          {langDict[language].submit}
        </button>
      </form>
      {isLoading && <LoadingModal />}
      {showSearchResult && (
        <SearchResult
          username={username}
          responseMessage={responseMessage}
          profileLink={profileLink}
          language={language}
        />
      )}
    </div>
  );
};

export default SearchBox;
