import { Db } from './types';

// --champagne-pink: #eddcd2ff;
// --linen: #fff1e6ff;
// --pale-pink: #fde2e4ff;
// --mimi-pink: #fad2e1ff;
// --powder-blue: #c5deddff;
// --mint-cream: #dbe7e4ff;
// --isabelline: #f0efebff;
// --alice-blue: #d6e2e9ff;
// --beau-blue: #bcd4e6ff;
// --pale-cerulean: #99c1deff;

const tags = [
    { id: 0, name: '', color: '' },
    { id: 1, name: '', color: '' },
    { id: 2, name: '', color: '' },
    { id: 3, name: '', color: '' },
    { id: 4, name: '', color: '' },
    { id: 5, name: '', color: '' },
];

export const generateTags = (db) => {
    return [...tags];
};
