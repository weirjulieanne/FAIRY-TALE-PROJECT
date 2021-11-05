let {
  createPlace,
  findPlaceById,
  findPlaceByName,
  listPlaces,
  findItems,
  findUseItem,
  findFood,
  findNewPlaceByDirection,
  findText,
  findUseText,
  findUseRewardGold,
  findUseRewardItem,
  findGold,
  rewardMessage,
  foodRewardMessage,
  directionIsPossible,
} = require("./places2Mongoose");
//
let mongoose = require("./mongooseDb");
//********************CREATING MATCH INFO******************************************************
//Global variables in game
let matchSchema = new mongoose.Schema({
  userLocationName: String,
  itemsArray: [String],
  foodArray: [String],
  goldTotal: Number,
});
//********************CREATING MODELS FOR TRADING/GAME ITEMS************************************
//Items available to purchase or trade for
const TradingPostItem = mongoose.model("TradingPostItem", {
  name: String,
  value: Number,
});
// //Items to collect while playing the game.  Can be looked for, picked up, used, traded
const GameItem = mongoose.model("GameItem", { name: String, value: Number });
//
//
//
//*******************************GAME MATCH FUNCTITONS*********************************************
//tradeItems works! determines if value of both objects are the same, the removes traded item from itemsArray, adds new one in
matchSchema.methods.tradeItems = async function (itemToTrade, itemToGet) {
  console.log(`*** User wants to trade a  ${itemToTrade} for a ${itemToGet}`);
  let message;
  let tradeItemValue = await GameItem.findOne({ name: itemToTrade });
  let tradeForItemValue = await TradingPostItem.findOne({ name: itemToGet });
  let item = itemToGet;
  if (tradeItemValue === tradeForItemValue) {
    if (this.itemsArray.includes(itemToTrade)) {
      this.itemsArray.push(item.toString());
      let indexItemToTrade = this.itemsArray.indexOf(itemToTrade);
      if (indexItemToTrade > -1) {
        this.itemsArray.splice(indexItemToTrade);
        this.itemsArray.push(itemToGet);
        message = `You traded a ${itemToTrade} for a ${itemToGet} and you now have these items to bring with you: ${this.itemsArray}`;
        console.log(`ITEM: ${item}`);
        console.log(this.itemsArray);
      }
    }
    return this.save();
  }
};
// haveEnoughGold return boolean about if there's enough gold in goldTotal
matchSchema.methods.haveEnoughGold = async function (buyItem) {
  let buyPrice = await TradingPostItem.findOne({ name: buyItem });
  if (this.goldTotal >= buyPrice) {
    return true;
  } else {
    return false;
  }
};
//buy item works.  DEcreases gold count by value of item, adds it to itemsArray
matchSchema.methods.buyItem = async function (buyItem) {
  console.log(`user want to buy a ${buyItem}`);
  let buyPrice = await TradingPostItem.findOne({ name: buyItem });
  // let yesBuy = await theMatch.haveEnoughGold(buyItem)
  this.itemsArray.push(buyItem.toString());
  this.goldTotal -= buyPrice;
  return this.save();
};
//
//lookForItems works: retrieves items info in current location
matchSchema.methods.lookForItems = async function () {
  let currentPlace = await findPlaceByName(this.userLocationName);
  this.userLocationName = currentPlace.name;
  let items = await findItems(this.userLocationName);
  return items;
};
//pickUpItems works: adds item to itemsArray
matchSchema.methods.pickUpItems = async function () {
  let currentPlace = await findPlaceByName(this.userLocationName);
  let items = await findItems(currentPlace.name);
  this.itemsArray.push(items.toString());
  return this.save();
};
//lookForFood works: retrieves food info in current location
matchSchema.methods.lookForFood = async function () {
  let currentPlace = await findPlaceByName(this.userLocationName);
  this.userLocationName = currentPlace.name;
  let food = await findFood(this.userLocationName);
  return food;
};
//take foods works: pushes new food to food array
matchSchema.methods.takeFood = async function () {
  let currentPlace = await findPlaceByName(this.userLocationName);
  let foods = await findFood(currentPlace.name);
  this.foodArray.push(foods.toString());
  return this.save();
};
//getUserlocaiton works retrieves current location from match
matchSchema.methods.getUserLocation = async function () {
  let currentPlace = await findPlaceByName(this.userLocationName);
  return currentPlace.name;
};
//move works.  acutally moves player and increases gold by 10 each time move is called
matchSchema.methods.move = async function (direction) {
  let currentPlace = await findPlaceByName(this.userLocationName); //return current place object
  let newLocation = await findNewPlaceByDirection(direction, currentPlace.name); //return new place object
  this.userLocationName = newLocation.name; //sets clobal userlocationName to newLocation name
  this.goldTotal += 10;
  return this.save();
};
///
matchSchema.methods.moveDirectionIsPossible = async function (direction) {
  // let currentPlace = await findPlaceByName(this.userLocationName);
  let possible = await directionIsPossible(direction, this.userLocationName);
  if (possible === "n") {
    return false;
  } else return true;
};
//getTextworks! retrieves initial info about each place when user moves there
matchSchema.methods.getText = async function () {
  //let currentPlace = await findPlaceByName(this.userLocationName);
  let text = await findText(this.userLocationName);
  //console.log(`TEXT: ${text}`);
  return text;
};
matchSchema.methods.getUseText = async function () {
  let text = await findUseText(this.userLocationName);
  return text;
};
//sorts out minusing consumable item from itemsArray, others stay in array, also increases gold and item rewards in items array
matchSchema.methods.useItem = async function (itemToUse) {
  let consumableItems = ["wood"];
  let rewardGold = await findUseRewardGold(this.userLocationName);
  let rewardItem = await findUseRewardItem(this.userLocationName);

  if (
    this.itemsArray.includes(itemToUse) &&
    consumableItems.includes(itemToUse)
  ) {
    let indexItemToUse = this.itemsArray.indexOf(itemToUse);
    if (indexItemToUse > -1) {
      this.itemsArray.splice(indexItemToUse);
    }
  }
  this.itemsArray.push(rewardItem);
  this.goldTotal += rewardGold;
  return this.save();
};
//sorts out minusing used food from foodArray, also increases gold and item rewards to itemsArray
matchSchema.methods.useFood = async function (foodToUse) {
  let rewardGold = await findUseRewardGold(this.userLocationName);
  let rewardItem = await findUseRewardItem(this.userLocationName);
  if (this.foodArray.includes(foodToUse)) {
    let indexFoodToUse = this.foodArray.indexOf(foodToUse);
    if (indexFoodToUse > -1) {
      this.foodArray.splice(indexFoodToUse);
    }
  }
  this.itemsArray.push(rewardItem);
  this.goldTotal += rewardGold;
  return this.save();
};
///return message for using item
matchSchema.methods.getRewardMessage = async function () {
  let message = await rewardMessage(this.userLocationName);
  return message;
};
//return message or using food
matchSchema.methods.getFoodRewardMessage = async function () {
  let message = await foodRewardMessage(this.userLocationName);
  return message;
};
//raises the gold count by 10 pieces each time the user moves
matchSchema.methods.increaseGoldByMoving = async function (placeName) {
  let currentPlace = await findPlaceByName(placeName);
  let goldReward = await findGold(currentPlace);
  this.goldTotal += goldReward;
};
//raises the gold count when an object is used.  particular counts determined in places object
matchSchema.methods.increaseGoldByUsing = async function (placeName) {
  let currentPlace = await findPlaceByName(placeName);
  let goldReward = await findUseRewardGold(placeName);
  this.goldTotal += goldReward;
};
//adds an item to the itemsArray when an object is used.  particular count determined in places object
matchSchema.methods.addRewardItemByUsing = async function (placeName) {
  let currentPlace = await findPlaceByName(placeName);
  let itemReward = await findUseRewardItem(placeName);
  this.itemsArray.push(itemReward);
};
//retrieves items from this match's items array
matchSchema.methods.listItems = function () {
  let array = this.itemsArray;
  return array;
};
//retrieves foods from this match's food array
matchSchema.methods.listFoods = function () {
  // console.log(`from function `, this.foodArray);
  let array = this.foodArray;
  return array;
};
//retrieves gold pieces from goldTotal
matchSchema.methods.listGold = function () {
  console.log(`gold total from function ${this.goldTotal}`);
  let total = this.goldTotal;
  return total;
};
const Match = mongoose.model("Match", matchSchema);
//
//
//retrieves text from the introduction place.object
let intro = async function () {
  let introPlace = await findPlaceByName("intro");
  return introPlace.text;
};
//starts a new match.  It's called from startGame endpoint
let createMatch = async function () {
  let location = await findPlaceByName("the clearing");
  let userLocationName = location.name;
  let foodArray = [];
  let itemsArray = [];
  let goldTotal = 0;
  console.log(`userLocation ${userLocationName}`);
  //let startPlace = await findPlaceByName(userLocationName);
  let newMatch = new Match({
    userLocationName,
    foodArray,
    itemsArray,
    goldTotal,
  });
  let createdMatch = await newMatch.save();
  console.log(
    `(from function) user started the game in the ${userLocationName} and the match id is ${createdMatch.id}*******`
  );
  //return startPlace.text;
  return createdMatch;
};
//retrieves the current match using id
async function findMatchById(id) {
  return Match.findById(id);
}
//matchSchema.methods.tradeItems("axe", "shovel");
//matchSchema.methods.pickUpItems();
//matchSchema.methods.getText();
//createMatch();
// matchSchema.methods.getText();
//matchSchema.methods.startGame();
// userLocation = "the woodpile";
//matchSchema.methods.lookForItems();
//matchSchema.methods.move("west");
//matchSchema.methods.startGame();
//tradeItems("axe", "shovel");
module.exports = {
  createMatch,
  findMatchById,
  intro,
};
