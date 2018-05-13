/**
  * String to JSON
  * Passively attempts to convert a string to a JSON object.
  * If it fails, nothing is changed, and no error is thrown.
  *
  * @param {string} input Input to convert.
  */
module.exports.stringToJSON = function stringToJSON(input) {

    // console.log('Attempting to convert input from string to JSON object...');
    var output;

    try {
        output = JSON.parse(input);
        // console.log('Result:' + output);
    } catch (error) {
        // Swallow the error
        // console.log('It didnt take, but whatever.');
        output = input;
    }

    return output;
    
};

/**
  * JSON to String
  * Passively attempts to convert a JSON object into a string.
  * If it fails, nothing is changed, and no error is thrown.
  *
  * @param {string} input Input to convert.
  */
module.exports.jsonToString = function jsonToString(input) {

    // console.log('Attempting to convert input from JSON object to string...');
    var output;

    try {
        output = JSON.stringify(input, null, 4);
        // console.log('Result:' + output);
    } catch (error) {
        // Swallow the error
        // console.log('It didnt take, but whatever.');
        output = input;
    }

    return output;
    
};