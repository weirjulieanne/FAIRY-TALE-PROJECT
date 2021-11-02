const { move } = require("../routes/FTLRoutes2");

let places = [
  {
    name: "intro",
    item: [""],
    gold: 10,
    food: [""],
    start: "the clearing",
    north: "",
    east: "",
    south: "",
    west: "",
    text: `Once upon a time, there were a boy and a girl named Hansel and Gretel.  They lived in the woods in an old house with their father and nasty step-mother. The family was very poor.  The step-mother knew that they were very poor, so she devised a plan to keep more of their food and money to herself.  She was so cunning that she conviced the father to leave Hansel and Gretel in the woods, so that they wouldn't have to feed or take care of them any more.  The father loved his children very much, but still he went along with the stepmothers plan.  The next day the father and step-mother gave the kids a piece of old bread to eat.  They took the kids into the woods, and brought them to a clearing.  The father built a large fire and they all slept near the fire for warmth.  Once the children fell asleep, the parents went home. The next morning the children awoke to daylight and smoldering ashes from the fire.  They realized that they have been left there!  They now have to survive in the forest and find their way back home to their father.  Can you help them?  Press the START button to continue. `,
    useItem: "",
    useFood: "",
    useText: "",
    useReward: 0,
    climbUp: "",
    climbDown: "",
    trade: "",
    buy: "",
  },
  {
    name: "the clearing",
    item: [`sack`],
    gold: 10,
    food: [`berries`],
    north: "",
    east: "",
    south: "trading post",
    west: "the woodpile",
    text: "You are in the clearing.  The fire has almost burnt out.  You need to find food.  You look all around you.  There is a narrow dirt path leading south.  That might be a good idea.... But then you hear faint cries for help coming from the west!  Which way do you go?  Before you leave though, you should check for food and any items that may be of use (type /lookForItems then /pickUpItems if you would like to take them with you.  Then when you are ready to go somewhere else, so you cant type, move?direction=yourdirection)",
    useItem: "wood",
    useFood: "",
    useText:
      "You came back with some wood!  Now the fire can keep burning while you explore more places!  You also gained 20 pieces of gold!",
    useRewardGold: 20,
    useRewardItem: "",
    climbUp: "",
    climbDown: "",
    trade: "",
    buy: "",
  },
  {
    name: "the woodpile",
    gold: 10,
    food: [`apples`],
    item: ["axe"],
    text: "You have found yourself passing a big stump and a pile of wood!  Maybe you should look around.  You need to bring more wood back to the clearing to keep the fire going.  If you could find an axe, you could chop wood and bring some wood back to the clearing.",
    north: "",
    east: "the clearing",
    south: "",
    west: "grandmas house",
    useItem: "axe",
    useFood: "",
    useText:
      "You used the axe to chop wood!  You gained 20 pieces of gold as a reward.",
    useRewardGold: 20,
    useRewardItem: ["wood"],
    climbUp: "",
    climbDown: "",
    trade: "",
    buy: "",
  },
  {
    name: "grandmas house",
    item: ["basket"],
    food: ["loaf of bread", "jug of milk", "dried beans", "sandwiches"],
    gold: 10,
    text: "You have arrived at Grandmother's house.  Little Red Ridinghood just got here and found that a wolf dressed like her grandmother is lying in her bed.  Now the wolf wants to eat Red!  How can you help?  Do you have an object in your items that you could whack the wolf with? (type in /use?item=yourItem)",
    north: "three pigs houses",
    east: "the wood pile",
    south: "the three bears cottage",
    west: "",
    useItem: "axe",
    useFood: "",
    useText: `The wolf was knocked to the ground! Then, out from it's mouth crawled grandmother!  She was so grateful, that she wants you to give you a basket filled with some food for your journey, as well as 50 pieces of gold! (type in /pickUpItems, then /takeFood)`,
    useReward: 50,
    climbUp: "",
    climbDown: "",
    trade: "",
    buy: "",
  },
  {
    name: "the three bears cottage",
    item: [""],
    gold: 10,
    food: ["oats", `butter`],
    text: "You have reached the three bears house!  ",
    north: "",
    east: "",
    south: "grandmas house",
    west: "the farmers field",
    useItem: "",
    useFood: "",
    useText: "",
    useReward: 0,
    climbUp: "",
    climbDown: "",
    trade: "",
    buy: "",
  },
  {
    name: "the farmers field",
    gold: 20,
    item: [`no items here`],
    food: ["carrots", "cabbages"],
    north: "the gingerbread house",
    east: "",
    south: "the three bears cottage",
    west: "",
    text: "do you have anything that you could plant",
    useItem: "",
    useFood: "",
    useText: "",
    useReward: 0,
    climbUp: "",
    climbDown: "",
    trade: "",
    buy: "",
  },
  {
    name: "the cow clearing",
    item: ["cow", "rope"],
    gold: 0,
    food: [`no food here`],
    north: "",
    east: "the three pigs houses",
    south: "grandmas house",
    west: "",
    text: "You apprach a small clearing the the woods where you see a cow munching on grass.  This cow has clearly escaped from her farm, because it has a long rope tied around it's neck.  You will eventually try to return her to her owner, but in the mean time, you see that this cow and rope might be useful for your journey home.",
    useItem: "",
    useFood: "",
    useText: "",
    useReward: 0,
    climbUp: "",
    climbDown: "",
    trade: "",
    buy: "",
  },
  {
    name: "the gingerbread house",
    item: [],
    gold: 0,
    food: [`candies`, "chocolate", "black forest cake"],
    north: "",
    east: "the three pigs houses",
    south: "grandmas house",
    west: "",
    text: "You have found an entire house made out of candy, pastries, cakes and other confections.  The oven is on - it looks like someone lives here!  Quickly, gather what you can.... Oh wait!  You hear footsteps .. the front door opens!!!!   It's the witch!  (here will be a challenge of some sort which will end is prizes or food)",
    useItem: "",
    useFood: "",
    useText: "",
    useReward: 0,
    climbUp: "",
    climbDown: "",
    trade: "",
    buy: "",
  },
  {
    name: "the trading post",
    item: [""],
    gold: 0,
    food: [""],
    north: "",
    east: "the three pigs houses",
    south: "grandmas house",
    west: "",
    text: `You have found a little shack in the woods.  There's a big painted sign that says, "TRADING POST"!  You take a closer look and notice that there's a sign that lists all the current items and the value of each item... So you can trade an item that you currently have, for an item to bring with you back home!   You can also choose to purchase items using any gold that you collected.  You can come back to the trading post and buy or trade any time!`,
    useItem: "",
    useText: "",
    useFood: "",
    useReward: 0,
    climbUp: "",
    climbDown: "",
    trade: "",
    buy: "",
  },
  {
    name: "the trading post",
    itemsToTradeFor: [],
    itemsToBuy: "",
    food: [],
    north: "the clearing",
    east: "home",
    south: "",
    west: "",
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
