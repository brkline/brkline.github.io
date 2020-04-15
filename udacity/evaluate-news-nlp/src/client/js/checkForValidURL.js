function checkForValidURL(url = '') {
    try {
        decodeURI(url);
    } catch (error) {
        return false;
    }
    return true;
}

export {
    checkForValidURL
}