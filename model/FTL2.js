let {
  createPlace,
  findPlaceById,
  findPlaceByName,
  listPlaces,
  findItems,
  findFood,
  findNewPlaceByDirection,
  findText,
} = require("./places2");
//
let itemsArray = [];
let foodArray = [];
let goldTotal = 0;
let userLocation;
//
// async function intro() {
//   userLocation = await findPlaceByName("intro");
//   console.log(`the user has been introduced to the game`);
//   let message = await findText(userLocation);
//   console.log(message);
// }
let tradingPostItems = {
  watch: 10,
  cup: 10,
  shovel: 20,
  pot: 20,
  pillow: 20,
  blanket: 20,
  chair: 50,
  saddle: 50,
  horse: 100,
  mattress: 75,
  couch: 100,
  stove: 150,
};
let gameItems = {
  axe: 20,
  basket: 20,
  wagon: 50,
  "dried beans": 10,
  rope: 10,
  saw: 10,
  sack: 10,
  cow: 100,
  "treasure box": 150,
  bowls: 10,
};

async function tradeItems(itemToTrade, itemToGet) {
  console.log(`*** ${itemToTrade}, ${itemToGet}`);
  let message;
  //find where in the game items array, the itemToTrade matches
  let findTradeItem = Object.keys(gameItems).find(
    (item) => itemToTrade === item
  );
  if (
    findTradeItem === itemToTrade &&
    gameItems[itemToTrade] === tradingPostItems[itemToGet]
  ) {
    //if the string of the findTradeItem matches the itemToTrade .... and the number value of each match....
    ///this finds the index of the itemToTrade in the items array, then remove it from the array, and adds in the itemToGet

    let indexItemToTrade = itemsArray.indexOf(itemToTrade);
    if (indexItemToTrade > -1) {
      itemsArray.splice(indexItemToTrade);
      // userLocation = "the trading post";e, 1);
      itemsArray.push(itemToGet);
      message = `You traded a ${itemToTrade} for a ${itemToGet}`;

      console.log(`This is what's in the itemsArray ${itemsArray}`);
      return message;
    }
  } else {
    message = `There was an error.  Try again`;
    console.log(`ERROR Item to give didn't match item to get in arrays`);
    throw new Error(message);
  }
}

async function intro() {
  userLocation = await findPlaceByName("intro");
  console.log(`(from function) introdiction in the  ${userLocation.name}`);
  return userLocation.text;
}

async function startGame() {
  userLocation = await findPlaceByName("the clearing");
  foodArray = [];
  itemsArray = [];
  goldTotal = 0;
  console.log(
    `(from function) user started the game in the ${userLocation.name}`
  );
  return userLocation.text;
}

async function getUserLocation() {
  return userLocation;
}

async function move(direction) {
  let newLocation = await findNewPlaceByDirection(direction, userLocation);
  console.log(`from move function', ${newLocation}`);
  userLocation = newLocation;
  return newLocation;
}
//
async function getText() {
  let text = await findText(userLocation.text);
  console.log(`${userLocation} text returned: ${userLocation.text}`);
  return text;
}
//
async function lookForItems() {
  console.log();
  //userLocation = await findPlaceByName(placeName);
  console.log(`********************`);
  console.log(JSON.stringify(userLocation));
  let items = await findItems(userLocation.name);
  console.log(`from function, user found: ${items}}`);
  return items;
}
//
async function lookForFood() {
  // userLocation = await findPlaceByName(placeName);
  let food = await findFood(userLocation.name);
  console.log(`from function, User found: ${food}`);
  return food;
}
//
async function pickUpItems() {
  let items = await findItems(userLocation.name);
  itemsArray.push(items.toString());
  console.log(items);
  console.log(`User picked up 
  ${items}`);
  return items;
}
//
async function takeFood() {
  let food = await findFood(userLocation.name);
  foodArray.push(food);
  console.log(food);
  console.log(`User picked up ${food}`);
  return food;
}
// function use(item) {
//   let message;
//   if (itemsArray.includes(item)) {
//     message = `You used your ${item}!`;
//   } else {
//     message = `You do not have a ${item}`;
//   }
//   console.log(message);
//   return message;
// }
// function trade(item) {
//   let message
//   if (userLocation.name === )
//   if (itemsArray.includes(item))
// }

//
async function listItems() {
  //await pickUpItems();
  console.log(itemsArray);
  return itemsArray;
}
//
async function listFoods() {
  // await takeFood();
  console.log(foodArray);
  return foodArray;
}
//

//tradeItems("axe", "shovel");
module.exports = {
  listPlaces,
  startGame,
  lookForFood,
  lookForItems,
  pickUpItems,
  takeFood,
  listItems,
  listFoods,
  getUserLocation,
  move,
  getText,
  intro,
  tradeItems,
  //use,
};
