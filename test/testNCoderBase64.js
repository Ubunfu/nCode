import test from 'ava';

/**
 * Test the base64 nCoder defined in nCoders.js
 */

const nCoders = require('../js/nCoders.js');


test('encode_happy_plainText', t => {
    t.plan(1);
    const input = 'The lazy fox jumped over the sleepy dog';
    const expected = 'VGhlIGxhenkgZm94IGp1bXBlZCBvdmVyIHRoZSBzbGVlcHkgZG9n';
    const nCoded = nCoders.nCoderBase64('encode', input);
    
    t.is(nCoded, expected);
});

test('decode_happy_plainText', t => {
    t.plan(1);
    const input = 'VGhlIGxhenkgZm94IGp1bXBlZCBvdmVyIHRoZSBzbGVlcHkgZG9n';
    const expected = 'The lazy fox jumped over the sleepy dog';
    const nCoded = nCoders.nCoderBase64('decode', input);
    
    t.is(nCoded, expected);
});

test('encode_happy_specials', t => {
    t.plan(1);
    const input = '[@})"!\\>#))&:&`.((\'~\'(`~';
    const expected = 'W0B9KSIhXD4jKSkmOiZgLigoJ34nKGB+';
    const nCoded = nCoders.nCoderBase64('encode', input);
    
    t.is(nCoded, expected);
});

test('decode_happy_specials', t => {
    t.plan(1);
    const input = 'W0B9KSIhXD4jKSkmOiZgLigoJ34nKGB+';
    const expected = '[@})"!\\>#))&:&`.((\'~\'(`~';
    const nCoded = nCoders.nCoderBase64('decode', input);
    
    t.is(nCoded, expected);
});

test('encode_happy_symbols', t => {
    t.plan(1);
    const input = '◑ ◒ ◓ ☼ ☀★ ☆♥ ☎ ☏✆ ♫ ♬ ♪ ♩♭♪   ◐   ↻ ▽ ⁞⁞⁞ ⁞⁞⁞ ☷';
    const expected = '4peRIOKXkiDil5Mg4pi8IOKYgOKYhSDimIbimaUg4piOIOKYj+KchiDimasg4pmsIOKZqiDimanima3imaogICDil5AgICDihrsg4pa9IOKBnuKBnuKBniDigZ7igZ7igZ4g4pi3';
    const nCoded = nCoders.nCoderBase64('encode', input);
    
    t.is(nCoded, expected);
});

test('decode_happy_symbols', t => {
    t.plan(1);
    const input = '4peRIOKXkiDil5Mg4pi8IOKYgOKYhSDimIbimaUg4piOIOKYj+KchiDimasg4pmsIOKZqiDimanima3imaogICDil5AgICDihrsg4pa9IOKBnuKBnuKBniDigZ7igZ7igZ4g4pi3';
    const expected = '◑ ◒ ◓ ☼ ☀★ ☆♥ ☎ ☏✆ ♫ ♬ ♪ ♩♭♪   ◐   ↻ ▽ ⁞⁞⁞ ⁞⁞⁞ ☷';
    const nCoded = nCoders.nCoderBase64('decode', input);
    
    t.is(nCoded, expected);
});