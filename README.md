# How Secure Is My Password
## Character Sets

```javascript
var characterSets = require("character-sets");

console.log(characterSets("abc").getSets()); // ["ASCII Lowercase"]
console.log(characterSets("abc").getPossibleCharacters()); // 26
console.log(characterSets("aB1").getSets()); // ["ASCII Lowercase", "ASCII Uppercase", "ASCII Numbers"]
console.log(characterSets("aB1").getPossibleCharacters()); // 62
```