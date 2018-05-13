import test from 'ava';

/**
 * Test the JWT nCoder defined in nCoders.js
 */

const nCoders = require('../js/nCoders.js');

test.skip('plainText_happy', t => {
    const input = 'The lazy fox jumped over the sleepy dog';
    const expected = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.VGhlIGxhenkgZm94IGp1bXBlZCBvdmVyIHRoZSBzbGVlcHkgZG9n.oufx11clUO4rfHUBmBLulaDg-PrJVPKd_YktJm9ImoY';
    const nCoded = nCoders.nCoderJWT('encode', input);

    t.is(nCoded, expected);
});