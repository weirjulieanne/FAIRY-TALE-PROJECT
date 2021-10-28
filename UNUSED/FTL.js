let {
  placesLookup,
  places,
  listPlaces,
  objectArray,
  introText,
} = require("./places");
//////////////////////////////////
let myLocation;
async function startGame() {
  console.log(
    `user has started the game and the startGame function is working`
  );
}
// console.log(introText);
// console.log("To start the game go to begin");
//return introText;
//
////////////attempt at being able to choose direction
// function begin() {
//   // myLocation = places.find((place) => {
//   //   return place.id === placesLookup[start];
//   // });
//   myLocation = clearing;
//   //console.log(`You are starting at the ${start}`);
//   console.log(`you have started in the ${myLocation.name}`);
// }
//////////////////////////////////////////////////////
async function move(choice) {
  let myLocation = places.find((place) => {
    return place.id === placesLookup[choice];
  });
  await function investigate(answer) {
    if (answer === yes) {
      console.log(`user decided to investigate the ${place}`);
    }
  };
  investigate(answer);
}
/////////////////////////////////////////////////////;
//attempt at using directions
// let Location = function () {
//   let choice = "clearing";
//   return (myLocation = places.find((place) => {
//     return place.id === placesLookup[choice];
//   }));
// };
// let move = function (direction) {
//   // input west
//   Location();
//   let choice = myLocation[direction];
//   let myLocation = places.find((place) => {
//     return place.id === placesLookup[choice];
//   });
//   console.log(`you have moved to ${myLocation}`);
// };

////////////2nd video about promises.  @30 minutes talks about parameters and argument for search
// async function investigate(answer) {
//   if (answer === yes) {
//     console.log(`user decided to investigate the ${place}`);
//   }
// }
function pickUp() {
  if (place.object) {
    objectArray.push(place.object);
  }
  console.log();
  pm;
}

function takeMoney() {
  console.log();
}
module.exports = {
  listPlaces,
  startGame,
  move,
  //investigate,
  pickUp,
  takeMoney,
  //begin,
};
