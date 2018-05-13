var jsonUtils = require('./jsonUtils.js');

/**
 * Base64 nCoder
 * Base64 encodes or decodes a string!
 *
 * @param {string} action The action to perform [encode/decode].
 * @param {string} input The string to transform.
 */
module.exports.nCoderBase64 = function nCoderBase64(action, input) {
    const utf8 = require('utf8');
    const base64 = require('base-64');
    var output;

    switch (action) {
    case 'encode':
        output = base64.encode(utf8.encode(input));
        break;
    case 'decode':
        output = utf8.decode(base64.decode(input));
        break;
    default:
        output = '[ERROR] Invalid action.';
        // console.log('[ERROR] Invalid action.');
        break;
    }

    // console.log(output);
    return output;
};

/**
  * JWT nCoder
  * Encodes or decodes a JWT!
  *
  * @param {string} action The action to perform [encode/decode].
  * @param {string} input The string to transform.
  * @param {string} userSecret JWT secret.
  * @param {boolean} ignoreSig If decoding, ignore signature validation?
  */
module.exports.nCoderJWT = function nCoderJWT(action, input, userSecret, ignoreSig) {
    var jwt = require('jwt-simple');
    var secret = 'secret';
    var output;

    // Override secret if necessary
    if (userSecret) {
        secret = userSecret;
    }

    // Ignore the signature if desired
    if (!ignoreSig) {
        ignoreSig = false;
    }

    switch (action) {
    case 'encode':
        // This gives us back a JWT
        // console.log('Plaintext: ' + input);

        // Try to convert the input into a JSON object
        input = jsonUtils.stringToJSON(input);

        output = jwt.encode(input, secret);
        // console.log('Encoded JWT: ' + output);
        break;
    case 'decode':
        // This gives us back a JSON payload
        // console.log('Encoded JWT: ' + input);

        // If we have a validateSig flag, use it
        output = jwt.decode(input, secret, ignoreSig);

        // Try to convert the decoded JWT into a string
        output = jsonUtils.jsonToString(output);

        // console.log('Plaintext: ' + output);
        break;
    default:
        output = '[ERROR] Invalid action.';
        // console.log('[ERROR] Invalid action.');
        break;
    }

    return output;
};

/**
  * Certificate nCoder
  * Encodes or decodes a certificate!
  *
  * @param {string} action The action to perform [encode/decode].
  * @param {string} input The string to transform.
  */
module.exports.nCoderCertificate = function nCoderCertificate(action, input) {
    var output;
    
    switch (action) {
    case 'encode':
        output = 'encode ' + input;
        break;
    case 'decode':
        output = 'decode ' + input;
        break;
    default:
        output = '[ERROR] Invalid action.';
        console.log('[ERROR] Invalid action.');
        break;
    }

    return output;
};