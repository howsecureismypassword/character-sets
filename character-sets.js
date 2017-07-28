"use strict";

var unspecifiedDefault = 1e3;

var L = require("hsimp-library");

var characterSetsDictionary = {};

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
        var length = string.length;
        string = string.replace(RegExp(getRegex(set), "g"), "");

        if (length !== string.length) {
            containedInSets.push(name);
            possibleCharacters += getValue(set);
        }
    }, characterSetsDictionary);

    if (string.length) {
        containedInSets.push("Unspecified Unicode");
        possibleCharacters += unspecifiedDefault;
    }

    self.getSets = function () {
        return containedInSets;
    };

    self.getPossibleCharacters = function () {
        return possibleCharacters;
    };

    return self;
};

characterSet.setCharacterSets = function (dic) {
    characterSetsDictionary = dic;
};

module.exports = characterSet;
