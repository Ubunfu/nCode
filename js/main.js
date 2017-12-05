/**
 * Base64 nCoder
 * Base64 encodes or decodes a string!
 *
 * @param {string} action The action to perform [encode/decode].
 * @param {string} input The string to transform.
 */
function nCoderBase64(action, input) {
  switch (action) {
    case 'encode':
      var output = btoa(input);
      break;
    case 'decode':
      var output = atob(input);
      break;
    default:
      var output = '[ERROR] Invalid action.';
      console.log('[ERROR] Invalid action.');
  }

  console.log(output);
  return output;
 }

 /**
  * JWT nCoder
  * Encodes or decodes a JWT!
  *
  * @param {string} action The action to perform [encode/decode].
  * @param {string} input The string to transform.
  */
function nCoderJWT(action, input) {
  var jwt = require('jwt-simple');
  var secret = 'secret';

  console.log("Secret: " + secret);

  switch (action) {
    case 'encode':
      // This gives us back a JWT
      console.log("Plaintext: " + input);
      var output = jwt.encode(input, secret);
      console.log("Encoded JWT: " + output);
      break;
    case 'decode':
      // This gives us back a JSON payload
      console.log("Encoded JWT: " + input);
      var output = jwt.decode(input, secret);
      console.log("Plaintext: " + output);
      break;
    default:
      var output = '[ERROR] Invalid action.';
      console.log('[ERROR] Invalid action.');
  }

  return output;
}

 /**
  * displayOutput
  * Writes the output to the popup! So you can see it! :OO
  *
  * @param {string} output Text to write to the popup
  */
function displayOutput(output) {
  var outBox = document.getElementById('output-field');
  outBox.value = output;
}

 /**
  * nCode
  * Dispatches a request to the proper nCoder.
  *
  * @param {string} action The action to perform [encode/decode].
  * @param {string} type The type of object we're dealing with.
  * @param {string} input Input to transform.
  */
function nCode(action, type, input) {
  switch (type) {
    case 'base64':
      var output = nCoderBase64(action, input);
      break;
    case 'jwt':
      console.log(action + "JWT!");
      var output = nCoderJWT(action, input);
      break;
    case 'certificate':
      console.log(action + "certificate!");
      // var output = nCoderCertificate(action, input);
      break;
    default:
      console.log('[ERROR] Invalid input type.');
  }

  return output;
}

document.addEventListener('DOMContentLoaded', () => {

  var btnEncode = document.getElementById('btn-encode');
  var btnDecode = document.getElementById('btn-decode');

  btnEncode.addEventListener('click', () => {
    var type = document.getElementById('selector-types').value;
    var input = document.getElementById('input-field').value;
    var output = nCode('encode', type, input);
    displayOutput(output);
  });

  btnDecode.addEventListener('click', () => {
    var type = document.getElementById('selector-types').value;
    var input = document.getElementById('input-field').value;
    var output = nCode('decode', type, input);
    displayOutput(output);
  });



});