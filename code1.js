// Every variable needed for the program
let level = 1;
let xp = 0;
const baseClickValue = 1;
let requiredXP = 500;
let shopPrice = [(shop0 = 50), (shop1 = 25), (shop2 = 1000)];
let itemCounter = [(item0 = 0), (item1 = 0), (item2 = 0)];

function sleep(ms) {
  //Sleep translated for Javascript
  return new Promise((resolver) => setTimeout(resolver, ms));
}

function click() {
  //The good and ol' click
  xp = xp + (baseClickValue + itemCounter[1]) * (itemCounter[0] + 1);
}

function showXP() {
  //Useful to show xp
  return (document.getElementById("xpNow").innerHTML = "Total XP: " + xp);
}

function clicker() {
  // When you click, you get a value. This functions verifies the lvl as well
  click();
  showXP();
  if (xp >= requiredXP) {
    console.log("You level up! You are level " + level + " now");
    level = level + 1;
    requiredXP = requiredXP + 200;
    document.getElementById("levelNow").innerHTML = "Level: " + level;
    document.getElementById("reqLevel").innerHTML =
      "XP for next level: " + requiredXP;
    clicker();
    verifyLevel();
  }
}

function save() {
  //When clicked, it saves.
  localStorage.setItem("XP", xp);
  localStorage.setItem("Level", level);
  localStorage.setItem("Item price", JSON.stringify(shopPrice)); //Makes arrays into a sting
  localStorage.setItem("Upgrade count", JSON.stringify(itemCounter)); //Makes arrays into a sting
  localStorage.setItem("Requiered xp to level", requiredXP);
}

function load() {
  //It loads the data.

  //XP Load
  xp = localStorage.getItem("XP");
  xp = parseInt(xp);
  showXP();

  //Level load
  level = localStorage.getItem("Level");
  level = parseInt(level);
  verifyLevel();
  document.getElementById("levelNow").innerHTML = "Level: " + level;

  //Item price load
  shopPrice = JSON.parse(localStorage.getItem("Item price"));

  //Upgrade count
  itemCounter = JSON.parse(localStorage.getItem("Upgrade count"));

  //Required XP count
  requiredXP = localStorage.getItem("Requiered xp to level");
  document.getElementById("reqLevel").innerHTML =
    "XP for next level: " + requiredXP;
}

//List of every unlocked item.
let unlockedYet = [(UY1 = false), (UY2 = false), (UY3 = false)];

function unlock(itemToUnlock, oldId, newId) {
  //It unlocks the item when requirements are completed.
  if ((itemToUnlock == 2, UY1 == false)) {
    document.getElementById(oldId).style = "display:block;";
    document.getElementById(oldId).style.backgroundColor = "#0dd116";
    document.getElementById(oldId).className = newId;
    document.getElementById(oldId).id = newId;
    console.log("Unlocked Item 2");
    UY1 = true;
  }
}

function shopItem0() {
  //This is the first item shop
  if (xp >= shopPrice[0]) {
    xp = xp - shopPrice[0];
    itemCounter[0] = itemCounter[0] + 1;
    shopPrice[0] = (shopPrice[0] + 250) * (itemCounter[0] + 1);
    document.getElementById("shop0").innerHTML = "You bought a multiplier";
    showXP();
  } else {
    document.getElementById("shop0").innerHTML =
      "Not enough XP!, you need " + shopPrice[0] + " XP to upgrade";
  }
}

function shopItem1() {
  //Second item shop: extra click
  if (xp >= shopPrice[1]) {
    itemCounter[1] = itemCounter[1] + 1;
    xp = xp - shopPrice[1];
    shopPrice[1] = shopPrice[1] + 10;
    document.getElementById("shop1").innerHTML = "You bought an extra click";
    showXP();
  } else {
    document.getElementById("shop1").innerHTML =
      "Not enough XP!, you need " + shopPrice[1] + " XP to upgrade";
  }
}

function shopItem2() {
  //Third item shop. This one requieres to be unlocked first in order to be used.
  document.getElementById("justUnlocked").style.backgroundColor = "white";
  if (xp >= shopPrice[2]) {
    itemCounter[2] = itemCounter[2] + 1;
    xp = xp - shopPrice[2];
    shopPrice[2] = shopPrice[2] + 1000;
    showXP();
    fnctItem2();
    document.getElementById("shop2").innerHTML = "You bought Autoclicker";
  } else {
    document.getElementById("shop2").innerHTML =
      "Not enough XP!, you need " + shopPrice[2] + " XP to upgrade";
  }
}
async function fnctItem2(ms) {
  for (let i = 0; i < 1; i++) {
    await sleep(ms);
    xp = xp + 5;
    showXP();
  }
  fnctItem2(1000);
}

function verifyLevel() {
  //Will verify if a change is needed based on level
  let changeBackground = (backgroundURL) => {
    document.getElementById("main2").style.backgroundImage = backgroundURL;
  };
  if (level <= 9) {
    changeBackground("url('images/Caverns.png')");
    unlock(2, "toUnlock", "justUnlocked");
  } else if ((level <= 19, level >= 10)) {
    changeBackground("url('images/Backgroun2.png')");
  }
}

function rebirth() {
  //Remove all progression to start over with rewards
  if (level >= 100) {
    console.log("wow, so you have finally achieved");
  } else {
    document.getElementById("rebirthP").innerHTML =
      "You must be level 100 to rebirth!";
  }
}
