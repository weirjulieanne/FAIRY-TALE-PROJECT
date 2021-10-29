const { move } = require("../routes/FTLRoutes2");

let places = [
  {
    name: "intro",
    item: [],
    gold: 0,
    food: [],
    start: "the clearing",
    text: `Once upon a time, there were a boy and a girl named Hansel and Gretel.  They lived in the woods in an old house with their father and nasty step-mother. The family was very poor.  The step-mother knew that they were very poor, so she devised a plan to keep more of their food and money to herself.  She was so cunning that she conviced the father to leave Hansel and Gretel in the woods, so that they wouldn't have to feed or take care of them any more.  The father loved his children very much, but still he went along with the stepmothers plan.  The next day the father and step-mother gave the kids a piece of old bread to eat.  They took the kids into the woods, and brought them to a clearing.  The father built a large fire and they all slept near the fire for warmth.  Once the children fell asleep, the parents went home. The next morning the children awoke to daylight and smoldering ashes from the fire.  They realized that they have been left there!  They now have to survive in the forest and find their way back home to their father.  Can you help them?  Press the START button to continue. `,
  },
  {
    name: "the clearing",
    item: [`sack`],
    gold: 0,
    food: [`berries`],
    north: 0,
    east: 0,
    south: "trading post",
    west: "the woodpile",
    text: "You are in the clearing.  The fire has now burnt out.  You need to find food.  You look all around you.  There is a narrow dirt path leading south.  That might be a good idea.... But then you hear faint cries for help coming from the west!  Which way do you go?  Before you leave though, you should check for food and any items that may be of use",
  },
  {
    name: "the woodpile",
    gold: 0,
    food: [`bread`],
    item: ["axe"],
    text: "You have found an axe",
    north: 0,
    east: "the clearing",
    south: 0,
    west: "grandmas house",
  },
  {
    name: "grandmas house",
    item: ["basket"],
    food: ["loaf of bread", "jug of milk", "dried beans", "sandwiches"],
    gold: 20,
    text: "grandmother was so grateful that she gave you a basket",
    north: "three pigs houses",
    east: "the wood pile",
    south: "the three bears cottage",
    west: 0,
  },
  {
    name: "the three bears cottage",
    item: ["saw"],
    gold: 50,
    food: ["oats", `butter`],
    text: "the pigs no longer need the saw becuase you helped them build their house with bricks",
    north: 0,
    east: 0,
    south: "grandmas house",
    west: "the farmers field",
  },
  {
    name: "the farmers field",
    gold: 20,
    item: [`no items here`],
    food: ["carrots", "cabbages"],
    north: "the gingerbread house",
    east: 0,
    south: "the three bears cottage",
    west: 0,
    text: "do you have anything that you could plant",
  },
  {
    name: "the cow clearing",
    item: ["cow", "rope"],
    gold: 0,
    food: [`no food here`],
    north: 0,
    east: "the three pigs houses",
    south: "grandmas house",
    west: 0,
    text: "You apprach a small clearing the the woods where you see a cow munching on grass.  This cow has clearly escaped from her farm, because it has a long rope tied around it's neck.  You will eventually try to return her to her owner, but in the mean time, you see that this cow and rope might be useful for your journey home.",
  },
  {
    name: "the gingerbread house",
    item: [],
    gold: 0,
    food: [`candies`, "chocolate", "black forest cake"],
    north: 0,
    east: "the three pigs houses",
    south: "grandmas house",
    west: 0,
    text: "You have found an entire house made out of candy, pastries, cakes and other confections.  The oven is on - it looks like someone lives here!  Quickly, gather what you can.... Oh wait!  You hear footsteps .. the front door opens!!!!   It's the witch!  (here will be a challenge of some sort which will end is prizes or food)",
  },
  {
    name: "the trading post",
    itemsToTradeFor: [
      "watch",
      "cup",
      "shovel",
      "chair",
      "blankets",
      "mattress",
      "saddle",
      "pot",
    ],
    itemsToBuy: 0,
    food: [],
    north: "the clearing",
    east: "home",
    south: 0,
    west: 0,
    text: "You have found a little wooden shack in the middle of nowhere.  There's a sign saying trading post!  This is your opportunity to trade or buy items for your travels, or to bring home! Lets take a look and see what there is!  ",
  },
];

async function createPlace(place) {
  //validate important fields here!
  let id = places.length + 1;
  place.id = id;
  places.push(place);
}
async function findPlaceById(id) {
  return places.find((place) => place.id === id);
}
async function findPlaceByName(placeName) {
  console.log();
  let foundPlace = places.find((place) => place.name === placeName); //found place formerly placeName
  if (foundPlace) {
    console.log("from find place by name function", foundPlace);
    return foundPlace;
  } else {
    console.log(`error`);
  }
}

async function findItems(placeName) {
  let place = await findPlaceByName(placeName);
  //console.log(`******`, place, placeName);
  console.log(place.item);
  return place.item;
}
async function findFood(placeName) {
  let place = await findPlaceByName(placeName);
  console.log(`*******`, place, placeName);
  console.log(place.food);
  return place.food;
}

async function listPlaces() {
  return places;
}

//////////////////////
//looking to choose new place using direction from old place
async function findNewPlaceByDirection(direction, startingLocation) {
  //need to access new place string from current userLocation
  console.log(`=============`, startingLocation);
  //let foundLocation = places.find((place) => place.name === startingLocation); //finds the place object whwere the name string matches an pbject
  console.log(`findwplacebydirection ${startingLocation[direction]}`);
  //
  let newPlaceName = startingLocation[direction];
  newPlaceObject = places.find((place) => place.name === newPlaceName);

  console.log(`newPlaceObject: ${JSON.stringify(newPlaceObject)}`);
  //
  // newPlace = startingLocation;
  //check to see if the variables are working
  // let placeName = newPlace[direction];
  //startingLocation = placeName;
  //return placeName; //returns the string of the new place
  console.log(`from findNewPlaceByDirection ${newPlaceName}`);
  return newPlaceObject;
}

//

//
// async function findText(placeName) {
//   let place = await findPlaceByName(placeName);
//   console.log(place.text);
//   return place.text;
// }
//findPlaceByName("the clearing");
// findItems("the clearing");
// findFood("the clearing");
module.exports = {
  createPlace,
  findPlaceById,
  findPlaceByName,
  findNewPlaceByDirection,
  listPlaces,
  findItems,
  findFood,
  //findText,
  //findGold
};
