# DevScouter React

This is the React frontend for the DevScouter project.

[![codecov](https://codecov.io/gh/DevScouter/devscouter-react/branch/main/graph/badge.svg?token=NII6RUWUPY)](https://codecov.io/gh/DevScouter/devscouter-react)

## Local Development

- Latest LTS (or stable) version of [Node.js](https://nodejs.org/en/) is required. (v18.17.0 at the time of writing)

- `.env` file is required in the root directory. This file should contain the API URL for the backend server.

- Install dependencies

    ``` bash
    npm install
    ```

- Run the server

     ``` bash
    npm start
    ```

    This will start the server on port 3000.

## Smoke Tests

- Run the smoke tests

    ``` bash
    npm test SmokeTest
    ```

    This will run the smoke tests to see if the components render.

## Unit Tests

- Run the unit tests

    ``` bash
    npm test UnitTest
    ```

    This will run the unit tests for API calls and other functions.
