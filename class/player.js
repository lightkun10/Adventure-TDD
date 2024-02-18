const {Character} = require('./character');
const {Enemy} = require('./enemy');
const {Food} = require('./food');
const {Secret} = require('./secret');

class Player extends Character {

  constructor(name, startingRoom) {
    super(name, "main character", startingRoom);
    this.strength = 10;

  }

  move(direction) {

    const nextRoom = this.currentRoom.getRoomInDirection(direction);

    // If the next room is valid, set the player to be in that room
    if (nextRoom) {
      this.currentRoom = nextRoom;

      nextRoom.printRoom(this);
    } else {
      console.log("You cannot move in that direction");
    }
  }

  printInventory() {
    if (this.items.length === 0) {
      console.log(`${this.name} is not carrying anything.`);
    } else {
      console.log(`${this.name} is carrying:`);
      for (let i = 0 ; i < this.items.length ; i++) {
        console.log(`  ${this.items[i].name}`);
      }
    }
  }

  getItemByName(name) {
    let inventory = this.items;
    return inventory.find((item) => item.name === name);
  }

  takeItem(itemName) {
    let itemFromInventory = this.currentRoom.getItemByName(itemName);

    if (itemFromInventory) {
      // If theres the item in room's inventory
      let playerInventory = this.items;
      playerInventory.push(itemFromInventory);
      this.currentRoom.removeItem(itemFromInventory);
      console.log(`You take ${itemFromInventory.name} from ${this.currentRoom.name}`);
    } else {
      // If NOT
    }
  }

  removeItemFromInventory(item) {
    this.items = this.items.filter((existingItem) => existingItem !== item);
  }

  dropItem(itemName) {

    let itemPlayerInventory = this.getItemByName(itemName);

    if (itemPlayerInventory) {
      // if theres the item in players inventory
      this.currentRoom.addItemToRoomInventory(itemPlayerInventory);
      this.removeItemFromInventory(itemPlayerInventory);
      console.log(`You drop ${itemPlayerInventory.name} from your inventory to ${this.currentRoom.name}`);
    } else {
      // else, print the error message
    }

  }

  useItem(itemName) {

    let item = this.getItemByName(itemName);
    // console.log(item);

    // FOR NOW, for teleport only
    if (item && item.name === 'teleport') {
      let teleport = new Secret(item.name, "A teleport");
      this.removeItemFromInventory(item);

      try {
      console.log(`You use an ${itemName}`);
      teleport.use(this);
      } catch(error) {
        console.log(error);
      }
    } else {
      console.log(`No item`);
    }
  }

  useSecretTeleport = (item) => {
    // console.log(`${item.constructor.name}`);


    console.log('OK');

    // try {
    //   console.log(`You use an ${itemName}`);
    //   teleport.use(this);
    // } catch(error) {
    //   console.alert(error);
    // }
  }


  // useItem(itemName) {
  //   let item = this.getItemByName(itemName);
  //   this.removeItemFromInventory(item);
  //   console.log(`You use an ${itemName}`);
  // }

  eatItem(itemName) {

    let item = this.getItemByName(itemName);

    if (item.isEatable()) {
      this.removeItemFromInventory(item);
      console.log(`You ate an ${itemName}`);
    }

  }

  feedPet() {
    if (this.pet === null) return;

    let treat = this.getItemByName("pet-treat");

    this.pet.eat(treat);
  }

  hit(name) {

    const searchEnemy = this.currentRoom.getEnemyByName(name);
    if (searchEnemy) {
      searchEnemy.applyDamage(this.strength);
    } else {
      console.log(`No enemy named ${name} found in this room.`);
    }
  }

  applyDamage(amount) {
    if (this.pet !== null) {
      let petProtectedPlayer = this.pet.protectPlayer(amount);

      if(!petProtectedPlayer) {
        if (this.health <= 0 || this.health - amount <= 0) {
          this.die();
        }

        this.health -= amount;
      }
    } else {
      if (this.health <= 0 || this.health - amount <= 0) {
        this.die();
      }

      this.health -= amount;
    }
    console.log(`You are being attacked. Remaining health: ${this.health}`);
  }

  die() {
    console.log("You are dead!");
    process.exit();
  }

}

module.exports = {
  Player,
};
