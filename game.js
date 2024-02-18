const readline = require('readline');

const { Player } = require('./class/player');
const { Pet } = require('./class/pet');
const { World } = require('./class/world');

const worldData = require('./data/world-data');

let player;
let pet;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function printHelp() {
  console.log("Controls:")
  console.log("  Type 'h' for help");
  console.log("  Type 'q' to quit");
  console.log("  Type 'l' to look around");
  console.log("  Type 'i' to check your inventory");
  console.log("  Type 'take <item>' to take an item");
  console.log("  Type 'drop <item>' to drop an item");
  console.log("  Type 'eat <item>' to eat a food item");
  console.log("  Type 'n', 's', 'e', 'w' to move");
  console.log("  Type 'f' to feed pet");
  console.log("");
}

function startGame() {
  console.clear();
  console.log("Welcome to App Academy Adventure!\n");

  rl.question('Please enter your name: ', (name) => {
    console.clear();
    console.log(`Hello, ${name}!\n`);

    // Create the world and player
    World.loadWorld(worldData, player);
    player = new Player(name, World.rooms[1]);
    World.setPlayer(player);

    // Set pet here, hardcode it for now
    pet = new Pet('Luna', "Your trusted companion", player.currentRoom, player);
    // player.setPet(pet);
    console.log(`Your awesome pet, ${pet.name} is here with you...`);

    // Show commands
    printHelp();

    World.startGame();

    rl.question('\nHit RETURN to start your adventure\n', () => {

      console.clear();
      player.currentRoom.printRoom();

      processCommand();

      // Start enemies actions after the game world has been loaded
      startEnemiesAction();
    });
  });
}


function processCommand() {

  rl.question('> ', (cmd) => {
    cmd = cmd.toLowerCase();

    if (cmd === 'h') {
      printHelp();

    } else if (cmd === 'q') {
      rl.close();
      process.exit();

    } else if (cmd === 'l') {
      player.currentRoom.printRoom();

    } else if (cmd === 'i') {
      player.printInventory();

    } else if (['n', 's', 'e', 'w'].indexOf(cmd) >= 0) {
      let direction = cmd;
      player.move(direction);

    } else if (cmd.startsWith("take ")) {
      let itemName = cmd.split(" ")[1];

      player.takeItem(itemName);

    } else if (cmd.startsWith("drop ")) {
      let itemName = cmd.split(" ")[1];

      player.dropItem(itemName);

    } else if (cmd.startsWith("eat ")) {
      let itemName = cmd.split(" ")[1];

      player.eatItem(itemName);
    } else if (cmd.startsWith("f")) {
      player.feedPet();
    } else if (cmd.startsWith("use ")) {
      let itemName = cmd.split(" ")[1];

      player.useItem(itemName);
    } else if (cmd.startsWith("hit ")) {
      let enemyName = cmd.split(" ")[1];

      player.hit(enemyName);

    } else {
      console.log("Invalid command. Type 'h' for help.");
    }

    processCommand();
  });
}

function startEnemiesAction() {
  // Start enemy actions
  for (let i = 0; i < World.enemies.length; i++) {
    const enemy = World.enemies[i];

    // Uncomment in case want to try
    // if (enemy.name === 'goblin')

    enemy.act()
  }
}

startGame();
