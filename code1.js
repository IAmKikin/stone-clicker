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

function verifyXP() {
  //It verifies the Xp so you level up when needed.
  if (xp >= requiredXP) {
    console.log("You level up! You are level " + level + " now");
    level = level + 1;
    requiredXP = (requiredXP * 3) / 1.2;
    requiredXP = Math.round(requiredXP);
    document.getElementById("levelNow").innerHTML = "Level: " + level;
    document.getElementById("reqLevel").innerHTML =
      "XP for next level: " + requiredXP;
    verifyXP();
    verifyLevel();
    refreshUIShop();
  }
}

function clicker() {
  // When you click, you get a value.
  click();
  showXP();
  verifyXP();
}
//Save and load ----------------------------------------------------------------------------------------
function save() {
  //When clicked, it saves.
  localStorage.setItem("XP", xp);
  localStorage.setItem("Item price", JSON.stringify(shopPrice)); //Makes arrays into a sting
  localStorage.setItem("Upgrade count", JSON.stringify(itemCounter)); //Makes arrays into a sting
}

function load() {
  //It loads the data.

  //XP Load
  xp = localStorage.getItem("XP");
  xp = parseInt(xp);

  //Item price load
  shopPrice = JSON.parse(localStorage.getItem("Item price"));

  //Upgrade count
  itemCounter = JSON.parse(localStorage.getItem("Upgrade count"));

  verifyXP();
  refreshUIShop();
  showXP();
  verifyLevel();
  document.getElementById("levelNow").innerHTML = "Level: " + level;
  document.getElementById("reqLevel").innerHTML =
    "XP for next level: " + requiredXP;
  changeColor();
}
//Useful functions ----------------------------------------------------------------------------------------------
//List of every unlocked item.
let unlockedYet = [(UY1 = false), (UY2 = false), (UY3 = false)];
function unlock(itemToUnlock, oldId, newId) {
  //It unlocks the item when requirements are completed.
  if ((itemToUnlock == 2, UY1 == false)) {
    document.getElementById(oldId).style = "display:block;";
    document.getElementById(oldId).style.backgroundColor = "#0dd116";
    document.getElementById(oldId).className = "Just unlocked";
    document.getElementById(oldId).id = newId;
    console.log("Unlocked Item 2");
    UY1 = true;
  }
}

const pickaxeColors = [
  (wood =
    "invert(0%) sepia(100%) saturate(947%) hue-rotate(350deg) brightness(50%) contrast(90%)"),
  (stone =
    "invert(0%) sepia(0%) saturate(0%) hue-rotate(155deg) brightness(108%) contrast(98%)"),
  (iron =
    "invert(0%) sepia(100%) saturate(31%) brightness(150%) contrast(100%) hue-rotate(3000deg)"),
  (gold =
    "invert(0%) sepia(100%) saturate(4200%) hue-rotate(348deg) brightness(280%) contrast(160%)"),
  (diamond =
    "invert(0%) sepia(100%) saturate(3140%) brightness(200%) contrast(100%) hue-rotate(890deg"),
];

function changeColor() {
  if (itemCounter[0] == 1) {
    document.getElementById("picohead").style.filter = pickaxeColors[1];
    console.log("tr");
  } else if (itemCounter[0] == 2) {
    document.getElementById("picohead").style.filter = pickaxeColors[2];
  } else if (itemCounter[0] == 3) {
    document.getElementById("picohead").style.filter = pickaxeColors[3];
  } else if (itemCounter[0] == 4) {
    document.getElementById("picohead").style.filter = pickaxeColors[4];
  }
}

function verifyLevel() {
  //Will verify if a change is needed based on level
  let changeBackground = (backgroundURL) => {
    document.getElementById("main2").style.backgroundImage = backgroundURL;
  };
  if ((level <= 9, level >= 2)) {
    // changeBackground("url('images/Caverns.png')");
    unlock(2, "toUnlock", "item3");
  } else if ((level <= 19, level >= 10)) {
    // changeBackground("url('images/Backgroun2.png')");
  }
}

//Shop ----------------------------------------------------------------------------------------------
function refreshUIShop() {
  document.getElementById("item1").innerHTML =
    "Upgrade Pickaxe (" + shopPrice[0] + " XP)";
  document.getElementById("item2").innerHTML =
    "Extra Click x1 (" + shopPrice[1] + " XP)";
  if (level >= 2) {
    document.getElementById("item3").innerHTML =
      "Autoclick x1 (" + shopPrice[2] + " XP)";
  }
}
function shopItem0() {
  //This is the first item shop: sharpness
  if (xp >= shopPrice[0]) {
    xp = xp - shopPrice[0];
    itemCounter[0] = itemCounter[0] + 1;
    shopPrice[0] = (shopPrice[0] + 250) * (itemCounter[0] + 1);
    document.getElementById("shop0").innerHTML = "You bought a multiplier";
    showXP();
    changeColor();
    refreshUIShop();
  } else {
    refreshUIShop();
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
    refreshUIShop();
  } else {
    document.getElementById("shop1").innerHTML =
      "Not enough XP!, you need " + shopPrice[1] + " XP to upgrade";
  }
}

function shopItem2() {
  //Third item shop. This one requieres to be unlocked first in order to be used.
  document.getElementById("item3").style.backgroundColor = "white";
  if (xp >= shopPrice[2]) {
    itemCounter[2] = itemCounter[2] + 1;
    xp = xp - shopPrice[2];
    shopPrice[2] = shopPrice[2] + 1000;
    showXP();
    fnctItem2();
    refreshUIShop();
    document.getElementById("shop2").innerHTML = "You bought Autoclicker";
  } else {
    document.getElementById("shop2").innerHTML =
      "Not enough XP!, you need " + shopPrice[2] + " XP to upgrade";
  }
}
async function fnctItem2(ms) {
  for (let i = 0; i < 1; i++) {
    await sleep(ms);
    xp = xp + 75;
    showXP();
  }
  fnctItem2(1000);
}

//More options ----------------------------------------------------------------------------------------------
function rebirth() {
  //Remove all progression to start over with rewards
  if (level >= 100) {
    console.log("wow, so you have finally achieved");
  } else {
    document.getElementById("rebirthP").innerHTML =
      "You must be level 100 to rebirth!";
  }
}

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

// function reset() {
//   (xp = 0),
//     (level = 0),
//     (requiredXP = 500),
//     (itemCounter[(0, 1, 2, 3)] = 0),
//     (shopPrice[(0, 1, 2, 3)] = 0);
//     showXP()
//     changeColor();
// }

async function start(ms) {
  await sleep(ms);
  showXP();
  verifyLevel();
  refreshUIShop();
  // load();
}
start(10);
