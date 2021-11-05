const mongoose = require("./mongooseDb");
//determines the schema model for Place items
const Place = mongoose.model("Place", {
  name: String,
  item: [String],
  gold: Number,
  food: [String],
  north: String,
  east: String,
  south: String,
  west: String,
  text: String,
  useItem: String,
  useFood: String,
  useText: String,
  useRewardGold: Number,
  useRewardItem: String,
  climbUp: String,
  climbDown: String,
  trade: String,
  buy: String,
});
//not used
async function createPlace(placeData) {
  let newPlace = new Place(placeData);
  let createdPlace = await newPlace.save();
  return createdPlace.id;
}

///All the code below is used to retrieve information and values from the places object in the data base
async function findPlaceById(id) {
  let place = await Place.findById(id);
  return place;
}
async function findPlaceByName(placeName) {
  //console.log(`looking up ${placeName}`);
  let thePlace = await Place.findOne({ name: placeName });
  return thePlace;
}
async function findItems(placeName) {
  let thePlace = await findPlaceByName(placeName);
  console.log(thePlace.item);
  return thePlace.item;
}
async function findFood(placeName) {
  let thePlace = await findPlaceByName(placeName);
  return thePlace.food;
}
async function listPlaces() {
  let places = await Place.find({});
  let placeNames = places.map((place) => {
    return place.name;
  });
  return placeNames;
}
async function findNewPlaceByDirection(direction, startingLocation) {
  let newPlace = await Place.findOne({
    name: startingLocation,
    direction: direction,
  });
  let newLocationObject = await findPlaceByName(newPlace[direction]);
  return newLocationObject;
}
async function directionIsPossible(direction, startingLocation) {
  let currentLocation = await Place.findOne({ name: startingLocation });
  let directionValue = currentLocation[direction];
  return directionValue;
}
async function findText(placeName) {
  let thePlace = await findPlaceByName(placeName);
  console.log(thePlace.text);
  return thePlace.text;
}
async function findUseText(placeName) {
  let thePlace = await findPlaceByName(placeName);
  console.log(thePlace.useText);
  return thePlace.text;
}
async function findUseRewardGold(placeName) {
  let thePlace = await findPlaceByName(placeName);
  console.log(thePlace.useRewardGold);
  return thePlace.useRewardGold;
}
async function findUseRewardItem(placeName) {
  let thePlace = await findPlaceByName(placeName);
  console.log(thePlace.useRewardItem);
  return thePlace.useRewardItem;
}
async function findGold(placeName) {
  let thePlace = await findPlaceByName(placeName);
  console.log(thePlace.gold);
  return thePlace.gold;
}
async function findUseItem(placeName) {
  let thePlace = await findPlaceByName(placeName);
  console.log(thePlace.useItem);
  return thePlace.useItem;
}

async function findUseFood(placeName) {
  let thePlace = await findPlaceByName(placeName);
  console.log(thePlace.useFood);
  return thePlace.useFood;
}
async function rewardMessage(placeName) {
  let message;
  await findPlaceByName(placeName);
  let gold = await findUseRewardGold(placeName);
  let item = await findUseRewardItem(placeName);
  let usedItem = await findUseItem(placeName);
  message = `You successfully used: ${usedItem}!  You have received ${gold} pieces of gold and ${item} to use!!`;
  // console.log(gold);
  // console.log(item);
  // console.log(message);
  return message;
}
async function foodRewardMessage(placeName) {
  let message;
  await findPlaceByName(placeName);
  let gold = await findUseRewardGold(placeName);
  let item = await findUseRewardItem(placeName);
  let usedFood = await findUseFood(placeName);
  message = `You successfully used: ${usedFood}!  You have received ${gold} pieces of gold and ${item} to use!!`;
  // console.log(gold);
  // console.log(item);
  // console.log(message);
  return message;
}
directionIsPossible("east", "the woodpile");
directionIsPossible("north", "the woodpile");
directionIsPossible("south", "the woodpile");
directionIsPossible("west", "the woodpile");

/////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = {
  createPlace,
  findPlaceById,
  findPlaceByName,
  findNewPlaceByDirection,
  directionIsPossible,
  listPlaces,
  findItems,
  findFood,
  findText,
  findUseText,
  findUseRewardGold,
  findUseRewardItem,
  foodRewardMessage,
  findGold,
  findUseItem,
  rewardMessage,
};
