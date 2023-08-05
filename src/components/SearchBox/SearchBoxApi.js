const apiUrl = process.env.REACT_APP_API_URL;

export const fetchUserData = async (username) => {
    const data = { username };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!response.ok) { throw new Error('Request failed'); } // TODO: handle error

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('An error occurred while processing your request.'); // TODO: handle error
    }
};
