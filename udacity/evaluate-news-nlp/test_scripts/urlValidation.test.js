import { isValidUrl } from '../src/client/js/urlValidation'

// Test for a valid URL
describe('isValidUrl is a function that is used to validate the URL from the form', () => {
    test('This test is using a valid URL', () => {

        const user_url = "https://www.udacity.com/";
        
        expect(isValidUrl(user_url)).toBe(true);
        
    });

});

//Test for an invalid URL
describe('isValidUrl is a function that is used to validate the URL from the form', () => {
    test('This test is using an invalid URL', () => {


        const user_url = "https://jimswebsite/";
   
       
        expect(isValidUrl(user_url)).toBe(false);
    });

});


