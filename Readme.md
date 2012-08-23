[![build status](https://secure.travis-ci.org/adrianolaru/gibberish.png)](http://travis-ci.org/adrianolaru/gibberish)
WORK IN PROGRESS

# gibberish

generate fake... hmm, random data for both node.js and the browser.

## Instalation

    npm install gibberish

## Usage

```
var g = require('gibberish');

// Generate ID's
g.id(); // => 1
g.id(); // => 2
g.id(); // => 3
g.id(0); // => 1

// Generate GUIDs; aliased to uuid
g.guid(); // => '23a52024-6f4b-4478-9b96-fd3df148df38'
// You can also use uuid() alias
g.uuid(); // => 'e0a6eaa7-e2c6-469c-51e5-28efe8938f81'

// Generate random int
g.int(); // => 3292835

// Generate random floats
g.float(); // => 509802.0192

// Generate random bools
g.bool(); // => true

// Generate random dates
g.date(); // => Thu, 06 Oct 1983 03:43:06 GMT

// Generate random timestamps
g.timestamp(); // => 1264503305282

// Generate random ago strings
g.ago(); // => 'about a month ago'

```

## TODO

```
.string(FORMAT) -- to generate emails, domains, and so forth
.word(min, max) -- chars from min to max
.words(min, max) -- words from min to max
.paragraph(min, max) - paragraph from min to max

.number(FORMART) --random number to generate phone-numbers or other number formatted shit

.email()
.domain()
.phone()
.url()
.html()
```
