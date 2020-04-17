import { handleSubmit } from '../src/client/js/formHandler'


describe('Test if the handleSubmit() function exists', () => {

    test('This test should return true if it exists', () => {

        expect(handleSubmit).toBeDefined();
    });
    
});

