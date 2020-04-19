import { latLongApiCall, weatherbitApiCall, pixabayApiCall, updateUI } from './app.js'

test('Tests to see if latLongApiCall is a function', () => {
        expect(typeof latLongApiCall).toBe('function');
});

test('Tests to see if weatherbitApiCall is a function', () => {
        expect(typeof weatherbitApiCall).toBe('function');
});

test('Tests to see if pixabayApiCall is a function', () => {
        expect(typeof pixabayApiCall).toBe('function');
});

test('Tests if updateUI is a function', () => {
        expect(typeof updateUI).toBe('function');
});