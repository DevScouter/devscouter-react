import langDict from '../LangDict';

const apiUrl = process.env.REACT_APP_API_URL;

export const fetchUserData = async (username, lang) => {
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
                alert(langDict[lang].userDoesNotExist);
                break;
            case '500':
                alert(langDict[lang].serverIsWrong);
                break;
            default:
                alert(langDict[lang].somethingIsWrong);
                break;
        }
    }
};
