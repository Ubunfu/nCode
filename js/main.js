var nCoders = require('./nCoders.js');

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
async function nCode(action, type, input) {
    var output;

    switch (type) {
    case 'base64':

        // Run the base64 nCoder
        output = nCoders.nCoderBase64(action, input);
        break;
    case 'jwt':
        // Grab extra data we need to work with JWTs
        var ignoreSig = document.getElementById('jwt-validate-sig').checked;
        var secret = document.getElementById('jwt-secret').value;
        console.log('ignoreSig?:' + ignoreSig);

        // Run the JWT nCoder
        output = nCoders.nCoderJWT(action, input, secret, ignoreSig);
        break;
    case 'certificate':
        var output = await nCoders.nCoderCertificate(action, input);
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
        sectInput.innerHTML = '<textarea id="input-field" class="input-field" name="input" rows="8" cols="80" placeholder="Input"></textarea>';
        sectOutput.innerHTML = '<textarea id="output-field" class="output-field" name="output" rows="8" cols="80" placeholder="Output"></textarea>';
        break;
    case 'jwt':
        console.log('set jwt');
        sectInput.innerHTML = '<textarea id="input-field" class="input-field" name="input" rows="8" cols="80" placeholder="Input"></textarea><div class="jwt-config-wrapper"><input type="text" class="jwt-config" id="jwt-secret" placeholder="secret"/><div class="jwt-validate-sig-wrapper"><input type="checkbox" name="jwt-validate-sig" class="jwt-config" id="jwt-validate-sig" checked/><label for="jwt-validate-sig">Ignore signature?</label></div></div>';
        // sectOutput.innerHTML = '<textarea id="output-field" class="output-field" name="output" rows="8" cols="80" placeholder="Output"></textarea><div id="test"></div>';
        sectOutput.innerHTML = '<textarea id="output-field" class="output-field" name="output" rows="8" cols="80" placeholder="Output"></textarea>';
        break;
    case 'certificate':
        console.log('set certificate');
        sectInput.innerHTML = '<textarea id="input-field" class="input-field" name="input" rows="8" cols="80" placeholder="Input (PEM)"></textarea>';
        sectOutput.innerHTML = '<textarea id="output-field" class="output-field" name="output" rows="8" cols="80" placeholder="Output"></textarea>';
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

    btnEncode.addEventListener('click', async () => {
        setUiError(false, 'output-field'); // Clear error class if set

        var type = document.getElementById('selector-types').value;
        var input = document.getElementById('input-field').value;
        
        try {
            var output = await nCode('encode', type, input);
        } catch (error) {
            console.log(error);
            var output = error;
            setUiError(true, 'output-field');
        } finally {
            displayOutput(output, 'output-field');
            // document.getElementById('test').innerHTML = output;
        }
    });

    btnDecode.addEventListener('click', async () => {
        setUiError(false, 'output-field'); // Clear error class if set

        var type = document.getElementById('selector-types').value;
        var input = document.getElementById('input-field').value;

        try {
            var output = await nCode('decode', type, input);
            console.log('rootOutput: ' + output);
            // if (JSON.parse(output).errorStatus) {
            //     setUiError(true, 'output-field');
            // }
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
