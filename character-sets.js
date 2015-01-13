"use strict";

var L = require("library");

var characterSetsDictionary = require("./character-sets-dictionary");

var getRegex = L.prop(0);
var getValue = L.prop(1);

var characterSet = function (string) {
    var self = {},
        possibleCharacters = 0,
        containedInSets = [];

    if (!L.isString(string)) {
        throw Error("CharacterSet: Invalid type");
    }

    L.forEach(function (set, name) {
        if (string.match(getRegex(set))) {
            containedInSets.push(name);
            possibleCharacters += getValue(set);
        }
    }, characterSetsDictionary);

    self.getSets = function () {
        return containedInSets;
    };

    self.getPossibleCharacters = function () {
        return possibleCharacters;
    };

    return self;
};

module.exports = characterSet;
