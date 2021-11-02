const ftl2 = require("../model/FTL2.js");
const express = require("express");
const router = express.Router();
//
//
const path = require("path");
// router.get("/", function (req, res) {
//   res.sendFile(path.join(__dirname, "/public/index.html"));
// });

router.get("/intro", async (req, res) => {
  userLocation = "intro";
  let message = await ftl2.intro();
  //console.log(`(from route) introduction started in the ${userLocation.name}`);
  console.log(`(from route) introduction started in the ${userLocation}`);
  res.send(message);
});

//start game works
router.get("/startGame", async (req, res) => {
  userLocation = "the clearing";
  let message = await ftl2.startGame();
  //console.log(`(from route) User started the game in the ${userLocation.name}`);
  console.log(`(from route) User started the game in the ${userLocation}`);
  res.send(message);
});

//listPlaces works
router.get("/listPlaces", async (req, res) => {
  res.json(ftl2.listPlaces());
});
//
// move using directions works
router.get("/move", async (req, res) => {
  let direction = req.query.direction;
  let newPlace = await ftl2.move(direction);
  userLocation = newPlace;
  console.log(`User moved to the `, userLocation.name);
  if (newPlace) {
    res.send(`You have moved to the ${userLocation.name}`);
  } else {
    res.send(`this place doesn't exist`);
  }
});

router.get("/whereAmI", async (req, res) => {
  let currentLocation = await ftl2.getUserLocation();
  console.log(currentLocation);
  res.send(`you are at ${currentLocation.name}`);
});
//
//lookForFood works
router.get("/lookForFood", async (req, res) => {
  //await ftl2.move(direction);
  let food = await ftl2.lookForFood();
  console.log(`User found ${food}`);
  res.json(food);
  // res.send(`You have found ${things}`);
});
//
//lookForItems works
router.get("/lookForItems", async (req, res) => {
  //await ftl2.move(direction);
  let items = await ftl2.lookForItems();
  console.log(`User found ${items}`);
  res.json(`You found the ${items}`);
});
//
//pickUpItems works
router.get("/pickUpItems", async (req, res) => {
  let things = await ftl2.lookForItems();
  await ftl2.pickUpItems();
  console.log(`User picked up the ${things}`);
  res.send(`You picked up ${things}`);
});
//
router.get("/use", async (req, res) => {
  let item = req.query.item;
  let message = await ftl2.use(item);
  console.log(`from route: ${message}`);
  res.send(`from route: ${message}`);
});
//
router.get("/takeFood", async (req, res) => {
  // let foods = await ftl2.lookForFood();
  let foods = await ftl2.takeFood();
  console.log(`user received these food items ${foods}`);
  res.send(`You received these food items ${foods}`);
});
//
// listItems works
router.get("/listItems", async (req, res) => {
  currentItems = await ftl2.listItems();
  console.log(`current items array has ${currentItems}`);
  res.send(`You currently have these items to use: ${currentItems}`);
});
//
// router.get("/trade", async (req, res) => {
//   let give = req.query.give;
//   let get = req.query.get;
//   if (!itemsArray.includes(give)) {
//     res.status(400).send(`You do not have a ${give} to trade`);
//     return;
//   }
//   try {
//     let message = await ftl2.tradeItems(give, get);
//     console.log(`itemToGet `, get);
//     console.log(`itemToTrade `, give);
//     res.send(message);
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// });
//
router.get("/trade", async (req, res) => {
  let give = req.query.give;
  let get = req.query.get;
  // if (!itemsArray.includes(give)) {
  let message = await ftl2.tradeItems(give, get);
  console.log(`itemToGet `, get);
  console.log(`itemToTrade `, give);
  res.send(message);
  //}
});

// listFoods works
router.get("/listFoods", async (req, res) => {
  currentFoods = await ftl2.listFoods();
  console.log(`current food array has ${currentFoods}`);
  res.send(`You currently have these foods: ${currentFoods}`);
});

//move using a place name works
// router.get("/move", async (req, res) => {
//   let place = req.query.place;
//   let newPlace = await ftl2.move(place);
//   console.log(newPlace);
//   if (newPlace) {
//     res.send(`You have moved to the ${place}`);
//   } else {
//     res.send(`this place doesn't exist`);
//   }
// });

module.exports = router;
