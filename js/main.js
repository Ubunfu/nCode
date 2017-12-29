/**
 * Base64 nCoder
 * Base64 encodes or decodes a string!
 *
 * @param {string} action The action to perform [encode/decode].
 * @param {string} input The string to transform.
 */
function nCoderBase64(action, input) {
    var output;

    switch (action) {
    case 'encode':
        output = btoa(input);
        break;
    case 'decode':
        output = atob(input);
        break;
    default:
        output = '[ERROR] Invalid action.';
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
  * @param {string} userSecret JWT secret.
  * @param {boolean} ignoreSig If decoding, ignore signature validation?
  */
function nCoderJWT(action, input, userSecret, ignoreSig) {
    var jwt = require('jwt-simple');
    var secret = 'secret';
    var output;

    // Override secret if necessary
    if (userSecret) {
        secret = userSecret;
    }

    if (!ignoreSig) {
        ignoreSig = false;
    }

    // console.log('Secret: ' + secret);

    switch (action) {
    case 'encode':
        // This gives us back a JWT
        console.log('Plaintext: ' + input);
        output = jwt.encode(input, secret);
        console.log('Encoded JWT: ' + output);
        break;
    case 'decode':
        // This gives us back a JSON payload
        console.log('Encoded JWT: ' + input);

        // If we have a validateSig flag, use it
        output = jwt.decode(input, secret, ignoreSig);
        console.log('Plaintext: ' + output);
        break;
    default:
        output = '[ERROR] Invalid action.';
        console.log('[ERROR] Invalid action.');
    }

    return output;
}

/**
  * displayOutput
  * Writes the output to the popup! So you can see it! :OO
  *
  * @param {string} output Output data to write
  * @param {string} domObj Object to write output data to
  */
function displayOutput(output, domObj) {
    var outBox = document.getElementById(domObj);
    outBox.value = output;
}

/**
  * setUiError
  * Styles the UI to reflect an error
  *
  * @param {boolean} error Should the error be set or not? 
  * @param {string} domObj Object to style for error
  */
function setUiError(error, domObj) {
    var box = document.getElementById(domObj);

    if (error == true) {
        box.classList.add('error');
    } else {
        box.classList.remove('error');
    }
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
    var output;

    switch (type) {
    case 'base64':

        // Run the base64 nCoder
        output = nCoderBase64(action, input);
        break;
    case 'jwt':
        // Grab extra data we need to work with JWTs
        var ignoreSig = document.getElementById('jwt-validate-sig').checked;
        var secret = document.getElementById('jwt-secret').value;
        console.log('ignoreSig?:' + ignoreSig);

        // Run the JWT nCoder
        output = nCoderJWT(action, input, secret, ignoreSig);
        break;
    case 'certificate':
        console.log(action + 'certificate!');
        // var output = nCoderCertificate(action, input);
        break;
    default:
        console.log('[ERROR] Invalid input type.');
    }

    return output;
}

/**
 * renderUI
 * Renders the UI depending on what the selected nCoder is
 *
 * @param {string} nCoder The given nCoder setting.
 * @param {function} callback Callback for when UI is rendered.
 */
function renderUI(nCoder, callback) {
    var sectInput = document.getElementById('section-input');
    var sectOutput = document.getElementById('section-output');

    switch (nCoder) {
    case 'base64':
        console.log('set base64');
        sectInput.innerHTML = '<textarea id="input-field" class="input-field" name="input" rows="8" cols="80" placeholder="Just paste your input here!"></textarea>';
        sectOutput.innerHTML = '<textarea id="output-field" class="output-field" name="output" rows="8" cols="80" placeholder="Output will appear here!"></textarea>';
        break;
    case 'jwt':
        console.log('set jwt');
        sectInput.innerHTML = '<textarea id="input-field" class="input-field" name="input" rows="8" cols="80" placeholder="Just paste your input here!"></textarea><div class="jwt-config-wrapper"><input type="text" class="jwt-config" id="jwt-secret" placeholder="secret"/><div class="jwt-validate-sig-wrapper"><input type="checkbox" name="jwt-validate-sig" class="jwt-config" id="jwt-validate-sig" checked/><label for="jwt-validate-sig">Ignore signature?</label></div></div>';
        // sectInput.innerHTML = '<textarea id="input-field" class="input-field" name="input" rows="8" cols="80" placeholder="Just paste your input here!"></textarea><input type="text" name="" class="jwt-config" id="jwt-secret" placeholder="Secret?"><select id="selector-jwt-config" class="jwt-config"><option value="hs256">HS256</option><option value="rs256">RS256</option></select>';
        // sectOutput.innerHTML = '<textarea id="output-field" class="output-field" name="output" rows="8" cols="80" placeholder="Output will appear here!"></textarea><div id="test"></div>';
        sectOutput.innerHTML = '<textarea id="output-field" class="output-field" name="output" rows="8" cols="80" placeholder="Output will appear here!"></textarea>';
        break;
    default:

    }

    // Ring Ring, UI is done :P
    callback();
}

document.addEventListener('DOMContentLoaded', () => {
    var btnEncode = document.getElementById('btn-encode');
    var btnDecode = document.getElementById('btn-decode');
    var selType = document.getElementById('selector-types');



    // Don't wait until I change the box, just run the
    // render function right away.  Don't have to hardcode an initial
    // value in popup HTML.
    renderUI(selType.value, () => {
    });

    selType.addEventListener('change', () => {
    // We changed the nCoder, re-render the UI!
        renderUI(selType.value, () => {
        });
    });

    btnEncode.addEventListener('click', () => {
        setUiError(false, 'output-field'); // Clear error class if set

        var type = document.getElementById('selector-types').value;
        var input = document.getElementById('input-field').value;
        
        try {
            var output = nCode('encode', type, input);
        } catch (error) {
            console.log(error);
            var output = error;
            setUiError(true, 'output-field');
        } finally {
            displayOutput(output, 'output-field');
            // document.getElementById('test').innerHTML = output;
        }
    });

    btnDecode.addEventListener('click', () => {
        setUiError(false, 'output-field'); // Clear error class if set

        var type = document.getElementById('selector-types').value;
        var input = document.getElementById('input-field').value;
        
        try {
            var output = nCode('decode', type, input);
        } catch (error) {
            console.log(error);
            var output = error;
            setUiError(true, 'output-field');
        } finally {
            displayOutput(output, 'output-field');
            // document.getElementById('test').innerHTML = output;
        }
    });

});
