const express = require("express");
const router = express.Router();
const ftl = require("../model/FTL");

router.get("/", async (req, res) => {
  let instructions = `Welcome to Fairy tale land! to move places use....\r to list places use.... \r to list possessions use... \r to trade use...`;
  res.send(instructions);
});
router.get("/startGame", async (req, res) => {
  await ftl.startGame();
  res.send(`the game has now started`);
});
// router.get("/begin", async (req, res) => {
//   //let start = req.query.start;
//   // console.log(`the user is starting in the ${start}`);
//   //   ftl.begin(start);
//   ftl.begin();
//   //res.send(`You are now in the ${start}.... To move enter the direction`);
//   res.sendFile(`you are now in the ${mylocation.name} `);
// });

router.get("/move", async (req, res) => {
  let place = req.query.place;
  console.log(`move is called with ${req.query}`);
  ftl.move(place);
  res.send(`We are now in the ${place}\n`);
});
// router.get("/move", (req, res) => {
//   let direction = req.query.direction;
//   console.log(`User decided to go ${req.query}`);
//   ftl.move(direction);
//   res.send(`We are now in the ${myLocation}\n`);
// });
/////////////////////// router.get("/move", async (req, res) => {
//   let direction = req.query.direction;
//   console.log(`User decided to go ${req.query} to ${newLocation}`);
//   ftl.move(direction);
//   res.send(`We are now in the ${newLocation}\n`);
// });
/////////////////////////////////////
//1:34 on video
router.get("/investigate", async (req, res) => {
  let answer = req.query.answer;
  console.log(`investigate is called with ${answer}`);
  res.send(`You have chosen to take a closer look at the ${place}`);
});
router.get("/pickUp", async (req, res) => {
  res.send(`not implemented\n`);
});
module.exports = router;
