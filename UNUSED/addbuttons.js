const { startGame, listRooms, move, search } = require("../model/hideAndSeek");

const express = require("express");
const router = express.Router();

router.get("/startGame", async (request, response) => {
  startGame();
  response.send(
    `The hider has found a new spot to hide!
      <br/>
      Good Luck!
      <br/>
      Click
      <a href=/listRooms>
      <button>here</button></a>
      to see a list of rooms`
  );
});

router.get("/listRooms", function (request, response) {
  response.send(
    `Here are the rooms, click one to enter the room:<br />` +
      listRooms()
        .map(
          (room) => `<a href="/move?room=${room}">
          <button>${room}</button>
          </a>`
        )
        .join("<br/>")
  );
});

router.get("/move", (request, response) => {
  console.log("move is called with ", request.query);
  let room = request.query.room;
  move(room);
  createMovePage(room);
  response.send(
    `You have moved to the ${room}
    <br />
    Search the room by clicking
    <a href="/search">
    <button>here</button>
    </a>`
  );
});

router.get("/search", (request, response) => {
  let message;
  let found = search();
  if (found) {
    message = `You just found the hider!
    <br /><a href=/startGame>
    <button>Play Again?</button>
    </a>`;
  } else {
    message = `You search and find no-one!
    <br/><a href=/listRooms>
    <button>Choose another room</button>
    </a>`;
  }
  response.send(message);
});

router.get("/", (request, response) => {
  let instructions = `Welcome to Hide and Seek!
  <br/>You are the seeker,
  <a href="/startGame">
  <button>Start the game</button>
  </a>`;
  response.send(instructions);
});

module.exports = router;
