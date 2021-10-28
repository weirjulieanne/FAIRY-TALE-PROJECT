let ftland = require("./model/FTL.js");
let { clearing, woodPile, grandmasHouse } = require("./model/FTL.js");
let places = [clearing, woodPile, grandmasHouse];
ftland.startGame();
console.log(ftland.listPlaces());
move("wood pile");

ftland.listPlaces(places);
ftland.move(woodPile);
console.log(objectArray);
