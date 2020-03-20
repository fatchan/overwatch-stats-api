const { writeFileSync } = require('fs');
const { join: path } = require('path');

/** 
 * Creates a string that corresponds to the declaration of a union type with the supplied elements
 * @param {(string|number)[]} elements The elements to create the string with
 * @param {boolean} noQuotes Whether to avoid putting quotes to create string union types (false by default)
 */
const createUnionType = (elements, noQuotes = false) =>
  noQuotes ? elements.join(' | ') : `'${elements.join('\' | \'')}'`;

const heroIDs = require(path(__dirname, '../src/heroids.json'));
if (typeof heroIDs != 'object') throw new Error('Corrupted hero file.');

const hero = createUnionType(Object.values(heroIDs).sort().filter(str => str != 'overall'));

const file = `// This file is generated automatically by scripts/types.js, any edit to this file will be erased automatically
export type hero = ${hero}
`;

writeFileSync(path(__dirname, '../typings/autogen.ts'), file);
console.log('Type definitions have been updated.');
