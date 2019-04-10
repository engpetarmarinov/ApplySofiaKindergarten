# ApplySofiaKindergarten
Calculate chances when applying for a kindergarten in Sofia by fetching data from Sofia Kindertens site (https://kg.sofia.bg/)

## Requirements 
* Nodejs
* Npm

## Usage 
* Install dependencies
```
npm install
```
* Configure Kid in App.js
```
let myKid = new Kid('ППМ', 2017, 12, 'Възраждане');
```
* Ensure you have the needed Kindergartens in the KindergartensRepository.js
* Run with node
```
node App.js
```
![Example Result](https://github.com/wildalmighty/ApplySofiaKindergarten/blob/master/ExampleResult.png)
## TODO
* Populate the DB with kindergartens dynamically
