"use strict";

/**
 * Testing Libraries
 */
var buster = require("buster");
var assert = buster.referee.assert;

/**
 * Setup
 */
var characterSets = require("./character-sets");
characterSets.setCharacterSets(require("./character-sets.json"));

/**
 * Tests
 */
buster.testCase("named-number", {
    "Basic": {
        "ASCII Lowercase": function () {
            assert.equals(characterSets("fish").getSets(), ["ASCII Lowercase"]);
        },
        "ASCII Uppercase": function () {
            assert.equals(characterSets("FISH").getSets(), ["ASCII Uppercase"]);
        },
        "ASCII Numbers": function () {
            assert.equals(characterSets("103030").getSets(), ["ASCII Numbers"]);
        },
        "ASCII Top Row Symbols": function () {
            assert.equals(characterSets("&").getSets(), ["ASCII Top Row Symbols"]);
        },
        "ASCII Other Symbols": function () {
            assert.equals(characterSets("?").getSets(), ["ASCII Other Symbols"]);
        },
        "Unicode Latin 1 Supplement": function () {
            assert.equals(characterSets("é").getSets(), ["Unicode Latin 1 Supplement"]);
        },
        "Unicode Latin Extended A": function () {
            assert.equals(characterSets("Ā").getSets(), ["Unicode Latin Extended A"]);
        },
        "Unicode Latin Extended B": function () {
            assert.equals(characterSets("ƀ").getSets(), ["Unicode Latin Extended B"]);
        },
        "Unicode Latin Extended C": function () {
            assert.equals(characterSets("Ⱡ").getSets(), ["Unicode Latin Extended C"]);
        },
        "Unicode Latin Extended D": function () {
            assert.equals(characterSets("꜠").getSets(), ["Unicode Latin Extended D"]);
        },
        "Unicode Cyrillic Uppercase": function () {
            assert.equals(characterSets("Я").getSets(), ["Unicode Cyrillic Uppercase"]);
        },
        "Unicode Cyrillic Lowercase": function () {
            assert.equals(characterSets("я").getSets(), ["Unicode Cyrillic Lowercase"]);
        },
        "Unspecified Unicode": function () {
            assert.equals(characterSets("ࢦ").getSets(), ["Unspecified Unicode"]);
        },
    },

    "Possible Characters": {
        "ASCII Lowercase": function () {
            assert.equals(characterSets("fish").getPossibleCharacters(), 26);
        },
        "ASCII Uppercase": function () {
            assert.equals(characterSets("FISH").getPossibleCharacters(), 26);
        },
        "ASCII Numbers": function () {
            assert.equals(characterSets("103030").getPossibleCharacters(), 10);
        },
        "ASCII Top Row Symbols": function () {
            assert.equals(characterSets("&").getPossibleCharacters(), 15);
        },
        "ASCII Other Symbols": function () {
            assert.equals(characterSets("?").getPossibleCharacters(), 19);
        },
        "Unicode Latin 1 Supplement": function () {
            assert.equals(characterSets("é").getPossibleCharacters(), 93);
        },
        "Unicode Latin Extended A": function () {
            assert.equals(characterSets("Ā").getPossibleCharacters(), 128);
        },
        "Unicode Latin Extended B": function () {
            assert.equals(characterSets("ƀ").getPossibleCharacters(), 208);
        },
        "Unicode Latin Extended C": function () {
            assert.equals(characterSets("Ⱡ").getPossibleCharacters(), 32);
        },
        "Unicode Latin Extended D": function () {
            assert.equals(characterSets("꜠").getPossibleCharacters(), 29);
        },
        "Unicode Cyrillic Uppercase": function () {
            assert.equals(characterSets("Я").getPossibleCharacters(), 32);
        },
        "Unicode Cyrillic Lowercase": function () {
            assert.equals(characterSets("я").getPossibleCharacters(), 32);
        },
    },

    "Combinations": {
        "Character Sets": function () {
            assert.equals(characterSets("aBc!3ࢦ").getSets(), ["ASCII Lowercase", "ASCII Uppercase", "ASCII Numbers", "ASCII Top Row Symbols", "Unspecified Unicode"]);
        },
        "Possible Characters": function () {
            assert.equals(characterSets("aBc!3").getPossibleCharacters(), 77);
        },
        "Possible Characters with Unspecified": function () {
            assert.equals(characterSets("aBc!3ࢦ").getPossibleCharacters(), 1077);
        }
    },

    "Other Cases": {
        // "n", "0", "f", and space were causing issues
        "n": function () {
            assert.equals(characterSets("n").getSets(), ["ASCII Lowercase"]);
        },

        "0": function () {
            assert.equals(characterSets("0").getSets(), ["ASCII Numbers"]);
        },

        "f": function () {
            assert.equals(characterSets("f").getSets(), ["ASCII Lowercase"]);
        },

        "space": function () {
            assert.equals(characterSets(" ").getSets(), ["ASCII Other Symbols"]);
        },

        // The £ was included in Unicode Latin 1 Supplement previously, which gave it double character sets
        "pound": function () {
            assert.equals(characterSets("£").getSets(), ["ASCII Top Row Symbols"]);
        },

        // Check for that no character appears in multiple character sets
        "doubles": function () {
            var keepGoing = true,
                character,
                i = 1;

            while (keepGoing) {
                character = String.fromCharCode(i);

                assert.less(characterSets(character).getSets().length, 2, "Double character sets" + character + " " + i);

                if (character === "\uA7FF") {
                    keepGoing = false;
                } else {
                    i++;
                }
            }
        }
    }
});
