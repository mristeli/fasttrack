var DIT = 'dit', DAH = 'dah', PAUSE = 'pause';

var MORSE_CODE = {
        "A": [DIT, DAH],
        "B": [DAH, DIT, DIT, DIT],
        "C": [DAH, DIT, DAH, DIT],
        "D": [DAH, DIT, DIT],
        "E": [DIT],
        "F": [DIT, DIT, DAH, DIT],
        "G": [DAH, DAH, DIT],
        "H": [DIT, DIT, DIT, DIT],
        "I": [DIT, DIT],
        "J": [DIT, DAH, DAH, DAH],
        "K": [DAH, DIT, DAH],
        "L": [DIT, DAH, DIT, DIT],
        "M": [DAH, DAH],
        "N": [DAH, DIT],
        "O": [DAH, DAH, DAH],
        "P": [DIT, DAH, DAH, DIT],
        "Q": [DAH, DAH, DIT, DAH],
        "R": [DIT, DAH, DIT],
        "S": [DIT, DIT, DIT],
        "T": [DAH],
        "U": [DIT, DIT, DAH],
        "V": [DIT, DIT, DIT, DAH],
        "X": [DAH, DIT, DIT, DIT],
        "Y": [DAH, DIT, DAH, DAH],
        "Z": [DAH, DAH, DIT, DIT],
        "Å": [DIT, DAH, DAH, DIT, DAH],
        "Ä": [DIT, DAH, DIT, DAH],
        "Ö": [DAH, DAH, DAH, DIT]
        };
        
var morse = (function (coding, returnSignal) {
    function compileStateMachine(code) {
        var startNode = {};

        function updateStates(node, letterEncoding) {
            var letter = letterEncoding[0];
            var remainingCode = letterEncoding[1];
            node[returnSignal] = startNode;
            if (_.isEmpty(remainingCode)) {
                node["value"] = letter;
            } else {
                node[_.first(remainingCode)] = updateStates(_.extend({}, node[_.first(remainingCode)]), [letter, _.rest(remainingCode)]);
            }
            return node;
        }
        return _.pairs(code).reduce(updateStates, startNode);
    }
    return (function (state) {
        return function (signal) {
            var value = state["value"]
            state = state[signal];
            if (signal === PAUSE) return value;
        }
    })(compileStateMachine(coding))
})(MORSE_CODE, PAUSE);
