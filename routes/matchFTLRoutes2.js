const match = require("../model/matchFTL2.js");
let {
  listPlaces,
  findPlaceByName,
  findPlaceById,
  findText,
  intro,
} = require("../model/places2Mongoose");
const express = require("express");
const router = express.Router();
//
const path = require("path");
//intro works: introduces the story
router.get("/intro", async (req, res) => {
  userLocation = "intro";
  let message = await match.intro();
  res.send(message);
});
router.get("/:matchId/help", async (req, res) => {
  let matchId = req.params.matchId;
  let message = `To move: curl http://localhost:3000/${matchId}move?direction=yourdirection
  to look for items: curl http://localhost:3000/${matchId}/lookForItems
  to pick up items: curl http://localhost:3000/${matchId}/pickUpItems
  to look for food: curl http://localhost:3000/${matchId}/lookForFood
  to pick up food: curl http://localhost:3000/${matchId}/takeFood
  to use an item: curl http://localhost:3000/${matchId}/useItem?item=youritem
  to use a food: curl http://localhost:3000/${matchId}/useFood?food=yourfood
  to list your collected items:curl http://localhost:3000/${matchId}/listItems
  to list your collected food: jcurl http://localhost:3000/${matchId}/listFoods
  to trade and item at the trading post: curl http://localhost:3000/${matchId}/trade?give=youritem\&get=newItem
  to buy an item at trading post: curl http://localhost:3000/${matchId}/buy?item=youritem
  `;
  res.send(message);
});

//start game works: creates a new match and resets all global variables
router.get("/startGame", async (req, res) => {
  let newMatch = await match.createMatch();
  console.log("starting match", newMatch.id);
  // currentMatchId = newMatch.id;
  let message = await newMatch.getText();
  console.log(
    `(from route) User started the game in the ${newMatch.userLocationName}`
  );
  console.log(`use ${newMatch.id}/lookForItems`);
  res.send(message);
});
// move using directions works: allows user to change directio using direction eg /move?direction=chosendirction
router.get("/:matchId/move", async (req, res) => {
  let message;
  let direction = req.query.direction; //gets the direction from URL
  let matchId = req.params.matchId; //gets the id for the game from the URL
  let theMatch = await match.findMatchById(matchId);
  let possible = await theMatch.moveDirectionIsPossible(direction);
  if (possible === true) {
    await theMatch.move(direction); //return new place object
    let userLocation = theMatch.userLocationName;
    message = await findText(userLocation);
    console.log(`User moved to the ${userLocation}`);
  } else {
    message = `You can't move that way`;
  }
  res.send(`${message}`);
});
//list places works but not currently uses as an option.  next location should be a mystery
router.get("/:matchId/listPlaces", async (req, res) => {
  let somethingmessage = await listPlaces();
  console.log(somethingmessage);
  res.send(somethingmessage);
});
// gold tota; works.  shows how much gold user has
router.get("/:matchId/goldTotal", async (req, res) => {
  let goldPieces = theMatch.goldTotal;
  console.log(`You have ${goldPieces} of gold `);
  res.send(`You have ${goldPieces} of gold `);
});
//getStats works: new feature to replace showing the fields separately
router.get("/:matchId/getStats", async (req, res) => {
  let matchId = req.params.matchId; //gets the id for the game from the URL
  let theMatch = await match.findMatchById(matchId);
  let location = theMatch.userLocationName;
  let goldTotal = theMatch.goldTotal;
  let items = theMatch.itemsArray;
  let foods = theMatch.foodArray;
  res.send(`You are at ${location}
  You have ${goldTotal} pieces of gold 
  You have these items: ${items}
  You have these foods: ${foods} `);
});
//whereAmI works: shows current location
router.get("/:matchId/whereAmI", async (req, res) => {
  let matchId = req.params.matchId; //gets the id for the game from the URL
  let theMatch = await match.findMatchById(matchId);
  let userLocation = theMatch.userLocationName;
  res.send(`Your location is ${userLocation}`);
});
//
//lookForFood works: shows what food is in area
router.get("/:matchId/lookForFood", async (req, res) => {
  let matchId = req.params.matchId;
  let theMatch = await match.findMatchById(matchId);
  let food = await theMatch.lookForFood();
  console.log(`User found ${food}`);
  res.send(`You found the ${food}`);
});
//lookForItems works: shows what items are available
router.get("/:matchId/lookForItems", async (req, res) => {
  let matchId = req.params.matchId;
  let theMatch = await match.findMatchById(matchId);
  let items = await theMatch.lookForItems();
  console.log(`User found ${items}`);
  res.send(`You found the ${items}`);
});
//pickUpItems works: picks up all items in area
router.get("/:matchId/pickUpItems", async (req, res) => {
  let matchId = req.params.matchId;
  let theMatch = await match.findMatchById(matchId);
  let items = await theMatch.lookForItems();
  await theMatch.pickUpItems();
  console.log(`user picked up: ${items}`);
  res.send(
    `You Picked up: ${items}. You now have these items to use: ${theMatch.itemsArray}`
  );
});
//takeFood works: picks up the food in an area
router.get("/:matchId/takeFood", async (req, res) => {
  let matchId = req.params.matchId;
  let theMatch = await match.findMatchById(matchId);
  let food = await theMatch.lookForFood();
  await theMatch.takeFood();
  console.log(`userArray ${theMatch.foodArray}`);
  res.send(
    `You Picked up: ${food}. You now have these foods to take with you on your journey ${theMatch.foodArray}`
  );
});
// useItem works: to "use" an item:  /useItem?item=chosenitem
router.get("/:matchId/useItem", async (req, res) => {
  let item = req.query.item;
  let matchId = req.params.matchId;
  let theMatch = await match.findMatchById(matchId);
  let userLocation = theMatch.userLocationName;
  let rewardMessage = await theMatch.getRewardMessage();
  if (theMatch.itemsArray.includes(item)) {
    await theMatch.useItem(item);
    res.send(`${rewardMessage}`);
  } else {
    res.send(
      `You don't have a ${item} to use.  Come back once you have found it!`
    );
  }
});
//useFood works: used to 'use' a food item: /useFoodItem?food=chosenfood
router.get("/:matchId/useFood", async (req, res) => {
  let food = req.query.food;
  let matchId = req.params.matchId;
  let theMatch = await match.findMatchById(matchId);
  let userLocation = theMatch.userLocationName;
  let rewardMessage = await theMatch.getFoodRewardMessage();
  if (theMatch.foodArray.includes(food)) {
    await theMatch.useFood(food);
    res.send(`${rewardMessage}`);
  } else {
    res.send(
      `You don't have a ${food} to use.  Come back once you have found it!`
    );
  }
});
// listItems works: lists all items user has
router.get("/:matchId/listItems", async (req, res) => {
  let matchId = req.params.matchId;
  let theMatch = await match.findMatchById(matchId);
  let items = theMatch.itemsArray;
  res.send(`You currently have these items to use: ${items}`);
});
//list foods works: lists all foods user has
router.get("/:matchId/listFoods", async (req, res) => {
  let matchId = req.params.matchId;
  let theMatch = await match.findMatchById(matchId);
  let foods = theMatch.foodArray;
  console.log(`current food array has ${foods}`);
  res.send(`You currently have these foods: ${foods}`);
});
//trade works: used to trade an item from users items for one from trading post: /trade?give=chosenitem\&get=chosenitem
//must be used from trading post
router.get("/:matchId/trade", async (req, res) => {
  let give = req.query.give;
  let get = req.query.get;
  let matchId = req.params.matchId;
  let theMatch = await match.findMatchById(matchId);
  let userLocation = theMatch.userLocationName;
  let message;
  if (userLocation === "the trading post") {
    await theMatch.tradeItems(give, get);
    message = `You traded a ${give} for a ${get}`;
  } else {
    message = `Sorry, you must be at the trading post to trade.`;
  }
  res.send(message);
});
//buy works: used to buy an item from trading post using gold
router.get("/:matchId/buy", async (req, res) => {
  let message;
  let item = req.query.item;
  let matchId = req.params.matchId;
  let theMatch = await match.findMatchById(matchId);
  let userLocation = theMatch.userLocationName;
  let enoughGold = await theMatch.haveEnoughGold(item);
  if (userLocation === "the trading post") {
    if (enoughGold === true) {
      await theMatch.buyItem(item);
      message = `You bought a ${item}`;
    } else {
      message = `You don't have enough gold!  Please come back later or trade an item.`;
    }
  } else message = `You must be at the trading post to buy.`;
  res.send(message);
});
//
//
//
module.exports = router;
