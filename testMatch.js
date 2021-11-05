let Match = require("./model/matchFTL2.js");
//
//
//

async function main() {
  let match = await Match.createMatch();
  // let intro = await match.intro();
  // console.log(intro);
  //console.log(`user started match ${match}`);
  let location = await match.getUserLocation();
  console.log(`getUserLocation test`, location);
  //let lookingForItems = await match.lookForItems();
  console.log(`****************${location}`);
  let items = await match.lookForItems();
  let stuffArray = await match.pickUpItems();
  console.log(`from test items array is `, stuffArray.itemsArray);
  let foodsArray = await match.takeFood();
  console.log(`from test food array is now`, foodsArray.foodArray);
  console.log(`test for items`, items);
  let newPlace = await match.move("west");
  console.log(`FROM MAIN`, newPlace.name); /////////////////I am not getting any values here. It's undefined
  let food = await match.lookForFood();
  console.log(`test for food`, food);
  let anotherPlace = await match.move("west");
  console.log(`from main`, anotherPlace.name);
  let stuffArray2 = await match.pickUpItems();
  console.log(`from test items array is `, stuffArray2.itemsArray);
  let foodsArray2 = await match.takeFood();
  console.log(`from test food array is now`, foodsArray2.foodArray);
  let realFoodsArray = await match.listFoods();
  console.log(`REAL FOODS ARRAY ${realFoodsArray}`);
  let realItemsArray = await match.listItems();
  console.log(`REAL ITEMS ARRAY ${realItemsArray}`);
}
main();
