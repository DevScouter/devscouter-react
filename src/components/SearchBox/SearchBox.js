import React, { useState } from 'react';
import ResultBox from './ResultBox/ResultBox';
import LoadingModal from './LoadingModal/LoadingModal';
import { fetchUserData } from './SearchBoxApi';

const SearchBox = () => {
  const [username, setUsername] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showResultBox, setShowResultBox] = useState(false);

  const handleUsernameSubmit = async (event) => {
    event.preventDefault();

    if (!username) {
      alert('Please enter a username.');
      return;
    }

    setIsLoading(true); // TODO: add loading spinner

    try {
      const formattedUsername = username.trim().toLowerCase();
      const responseData = await fetchUserData(formattedUsername);
      if (responseData) {
        setResponseMessage(JSON.stringify(responseData, null, 2));
        setShowResultBox(true);
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
          Username:
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
          id="submit-button"
          data-testid="submit-button"
          className="form-button"
          type="submit">
          Submit
        </button>
      </form>

      {isLoading &&
        <LoadingModal />
      }
      {showResultBox && (
        <ResultBox
          username={username}
          responseMessage={responseMessage}
        />
      )}
    </div>
  );
};

export default SearchBox;
