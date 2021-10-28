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
//
async function intro() {
  let message = await findText("intro");
  //console.log(` ${message}`);
  return message;
}

async function startGame() {
  userLocation = await findPlaceByName("the clearing");
  foodArray = [];
  items = [];
  goldTotal = 0;
  console.log(
    `(from function) user started the game in the ${userLocation.name}`
  );
}
//
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
  itemsArray.push(items);
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
function use(item) {
  let message;
  if (itemsArray.includes(item)) {
    message = `You used your ${item}!`;
  } else {
    message = `You do not have a ${item}`;
  }
  console.log(message);
  return message;
}

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
///////////////////////////
//move (by direction) works DO NOT ALTER
// async function move(placeName) {
//   console.log(`User moved to the ${placeName}`);
//   let place = await findPlaceByName(placeName);
//   if (place) {
//     userLocation = place;
//   }
//   console.log(userLocation);
//   return userLocation;
//}
//////////////////////////////
//
//

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
  use,
};
