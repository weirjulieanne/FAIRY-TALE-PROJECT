//let places = ["clearing", "wood pile", "grandmothers house"];

let objectArray = [];

const clearing = {
  name: "the clearing",
  id: 1,
  object: "",
  text: "this is the beginning",
  north: 0,
  east: 0,
  south: "tradingPost",
  west: "woodPile",
};
const woodPile = {
  name: "the wood pile",
  id: 2,
  object: "axe",
  text: "You have found an axe",
  north: 0,
  east: "clearing",
  south: 0,
  west: "grandmasHouse",
};
const grandmasHouse = {
  name: "Grandmothers House",
  id: 3,
  object: "basket",
  text: "grandmother was so grateful that she gave you a basket",
  north: "threePigs",
  east: "woodPile",
  south: "threeBears",
  west: 0,
};

const placesLookup = {
  clearing: 1,
  woodPile: 2,
  grandmasHouse: 3,
  tradingPost: 4,
  threeBears: 5,
  threePigs: 6,
};
const tradingPost = {};
const threeBears = {};
const threePigs = {};
let places = [
  clearing,
  woodPile,
  grandmasHouse,
  tradingPost,
  threeBears,
  threePigs,
];
let introText =
  "this is where the story starts and stuff is said about the background";

async function listPlaces(array) {
  array.forEach((element) => console.log(element["name"]));
}

async function createPlace(place) {
  //validate important fields herepl
  // let id = places.length +1
  places.push(place);
  //place.id = id
}

// async function loadInitialData() {
// createPlace(name: "...", id: ..., object: "...", text:"..." )
// await createPlace(name: "...", id: ..., object: "...", text:"..." )
// await createPlace(name: "...", id: ..., object: "...", text:"..." )
// await createPlace(name: "...", id: ..., object: "...", text:"..." )
// await createPlace(name: "...", id: ..., object: "...", text:"..." )
// }///
//fill in with original place objects => to set up the database eventually
module.exports = {
  placesLookup,
  places,
  listPlaces,
  objectArray,
  introText,
};
