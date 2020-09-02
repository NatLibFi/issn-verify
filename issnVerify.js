/**
*
* @licstart  The following is the entire license notice for the JavaScript code in this file.
*
* Copyright 2014 Adam Malantonio
* Copyright 2020 University Of Helsinki (The National Library Of Finland)
*
* Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*
* @licend  The above is the entire license notice
* for the JavaScript code in this file.
*
*/

if ( module && typeof module.exports !== 'undefined' ) {
    module.exports = issnVerify;
}

function issnVerify(input) {
    var reg = /^\d{4}\-?\d{3}[\dX]$/
      , check
      , num
        ;

    if ( input.length < 8 ) {
        input = pad(input);
    }

    if ( !input.match(reg) ) {
        return false;
    }

    num = input.substr(0, (input.length - 1))
               .replace(/\-/, '')
               .split('')
               .reverse()
               .reduce(function(prv, cur, idx) {
                    var i = idx + 2;
                    return prv + (cur * i);
                }, 0)
          % 11;

    check = num == 0 ? 0 : 11 - num;

    if ( check == 10 ) {
        check = "X";
    }

    return check == input.substr(-1);
}

function pad(inp) {
    while ( inp.length < 8 ) {
        inp = "0" + inp;
    }
    return inp;
}
