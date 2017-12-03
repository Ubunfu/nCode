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
  * displayOutput
  * Writes the output to the popup! So you can see it! :OO
  *
  * @param {string} output Text to write to the popup
  */
function displayOutput(output) {
  var outBox = document.getElementById('output-field');
  outBox.innerHTML = output;
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
      // var output = nCoderJWT(action, input);
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
