const apiUrl = process.env.REACT_APP_API_URL;

export const fetchUserData = async (username) => {
    const data = { username };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(response.status);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error(error);
        switch (error.message) {
            case '400':
                alert('User does not exist. Check the spelling and try again.');
                break;
            case '500':
                alert('Something went wrong with the server. Please try again later.');
                break;
            default:
                alert('An error occurred. Please try again later.');
                break;
        }
    }
};
