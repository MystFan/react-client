const { REACT_APP_API_URL } = process.env;

const generateURL = (to: string) => {
    return REACT_APP_API_URL ? `${REACT_APP_API_URL}${to}` : to;
};

export { generateURL };