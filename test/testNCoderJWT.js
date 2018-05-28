import test from 'ava';

/**
 * Test the JWT nCoder defined in nCoders.js
 */

const nCoders = require('../js/nCoders.js');

test('encode_happy_plainText', t => {
    t.plan(1);
    const input = 'The lazy fox jumped over the sleepy dog';
    const expected = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IlRoZSBsYXp5IGZveCBqdW1wZWQgb3ZlciB0aGUgc2xlZXB5IGRvZyI.cZIwHfHvUUm7PpDRJH3k4DfQHaHidl2PabGiIWYI10U';
    const nCoded = nCoders.nCoderJWT('encode', input);

    t.is(nCoded, expected);
});

test('decode_happy_plainText', t => {
    t.plan(1);
    const input = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IlRoZSBsYXp5IGZveCBqdW1wZWQgb3ZlciB0aGUgc2xlZXB5IGRvZyI.cZIwHfHvUUm7PpDRJH3k4DfQHaHidl2PabGiIWYI10U';
    const expected = '"The lazy fox jumped over the sleepy dog"';
    const nCoded = nCoders.nCoderJWT('decode', input);
    
    t.is(nCoded, expected);
});

test('encode_happy_specials', t => {
    t.plan(1);
    const input = '[@})"!\\>#))&:&`.((\'~\'(`~';
    const expected = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IltAfSlcIiFcXD4jKSkmOiZgLigoJ34nKGB-Ig.YHRPXweSb6xnAo24S94LRKN4BJxWJDW4PNc16PL40bo';
    const nCoded = nCoders.nCoderJWT('encode', input);
    
    t.is(nCoded, expected);
});

test('decode_happy_specials', t => {
    t.plan(1);
    const input = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IltAfSlcIiFcXD4jKSkmOiZgLigoJ34nKGB-Ig.YHRPXweSb6xnAo24S94LRKN4BJxWJDW4PNc16PL40bo';
    const expected = '"[@})\\"!\\\\>#))&:&`.((\'~\'(`~"';
    const nCoded = nCoders.nCoderJWT('decode', input);
    
    t.is(nCoded, expected);
});

test('encode_happy_symbols', t => {
    t.plan(1);
    const input = '◑ ◒ ◓ ☼ ☀★ ☆♥ ☎ ☏✆ ♫ ♬ ♪ ♩♭♪   ◐   ↻ ▽ ⁞⁞⁞ ⁞⁞⁞ ☷';
    const expected = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IuKXkSDil5Ig4peTIOKYvCDimIDimIUg4piG4pmlIOKYjiDimI_inIYg4pmrIOKZrCDimaog4pmp4pmt4pmqICAg4peQICAg4oa7IOKWvSDigZ7igZ7igZ4g4oGe4oGe4oGeIOKYtyI.kgWuEy4iOvUuvu9f6Tl71jcnL_T4G3gSxKbxJGK5HR8';
    const nCoded = nCoders.nCoderJWT('encode', input);
    
    t.is(nCoded, expected);
});

test('decode_happy_symbols', t => {
    t.plan(1);
    const input = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IuKXkSDil5Ig4peTIOKYvCDimIDimIUg4piG4pmlIOKYjiDimI_inIYg4pmrIOKZrCDimaog4pmp4pmt4pmqICAg4peQICAg4oa7IOKWvSDigZ7igZ7igZ4g4oGe4oGe4oGeIOKYtyI.kgWuEy4iOvUuvu9f6Tl71jcnL_T4G3gSxKbxJGK5HR8';
    const expected = '"◑ ◒ ◓ ☼ ☀★ ☆♥ ☎ ☏✆ ♫ ♬ ♪ ♩♭♪   ◐   ↻ ▽ ⁞⁞⁞ ⁞⁞⁞ ☷"';
    const nCoded = nCoders.nCoderJWT('decode', input);
    
    t.is(nCoded, expected);
});

test('encode_happy_JSON', t => {
    t.plan(1);
    const input = '{"key":"value"}';
    const expected = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJrZXkiOiJ2YWx1ZSJ9.JPIDicqvQ6GAh14yE2yZ3wnZQ0LiLNTTRDtJgLZcn98';
    const nCoded = nCoders.nCoderJWT('encode', input);
    
    t.is(nCoded, expected);
});

test('decode_happy_JSON', t => {
    t.plan(1);
    const input = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJrZXkiOiJ2YWx1ZSJ9.JPIDicqvQ6GAh14yE2yZ3wnZQ0LiLNTTRDtJgLZcn98';
    const expected = '{\n    "key": "value"\n}';
    const nCoded = nCoders.nCoderJWT('decode', input);
    
    t.is(nCoded, expected);
});

