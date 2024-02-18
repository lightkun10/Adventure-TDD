const {Character} = require('./character');


class Enemy extends Character {
  constructor(name, description, currentRoom) {
    super(name, description, currentRoom);
    this.cooldown = 3000;   // 5 seconds
    this.attackTarget = null;
    this.strength = 10;
    this.pet = null;
  }

  _random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min) + min);
  }

  setPlayer(player) {
    this.player = player;
  }

  randomMove() {
    let rooms = this.currentRoom.getRooms();
    let randomRoom = rooms[this._random(0, rooms.length)];
    this.alert(`Goblin is moving to, ${randomRoom.name}`);
    this.currentRoom = randomRoom;
    this.cooldown = 10000;
  }

  takeSandwich() {
    // Fill this in
  }

  eatItem(item) {

    if (item.isEatable()) {
      console.log(`${this.name} ate an ${item.name}`);
      this.currentRoom.removeItem(item);
    }

  }

  takeFood() {
    let foundFood = this.currentRoom.items.find((item) => item.isFood);

    if (foundFood) {
      console.log(`${this.name} interested in eating ${foundFood.name}...`);
      // Make enemy eat
      this.eatItem(foundFood);
    }
    // console.log(this.currentRoom.items)
  }

  enemyTakeItem(itemName) {
    let itemFromInventory = this.currentRoom.getItemByName(itemName);

    if (itemFromInventory) {
      // If theres the item in room's inventory
      let enemyInventory = this.items;
      enemyInventory.push(itemFromInventory);
      this.currentRoom.removeItem(itemFromInventory);
      console.log(`${this.name} take ${itemFromInventory.name}`);
    } else {
      // If NOT
    }
  }

  // Print the alert only if player is standing in the same room
  alert(message) {
    if (this.player && this.player.currentRoom === this.currentRoom) {
      console.log(message);
    }
  }

  rest() {
    // Wait until cooldown expires, then act
    const resetCooldown = function() {
      this.cooldown = 0;
      this.act();
    };

    setTimeout(resetCooldown.bind(this), this.cooldown);
  }

  setAttackTarget(player) {
    this.attackTarget = player;
  }

  attack() {
    /**
    * this implementation is tested for "Flee from battle" feature
    * */
    // if (this.currentRoom === this.attackTarget.currentRoom) {
    //   this.player.applyDamage(this.strength);
    //   console.log(`${this.name} is attacking you. Remaining health: ${this.attackTarget.health}`);
    //   this.cooldown = 3000;
    // } else {
    //   console.log(`${this.attackTarget.name} is fleeing the battle`);
    //   this.attackTarget = null;
    //   this.cooldown = 3000;
    // }
    this.player.applyDamage(this.strength);
    this.cooldown = 3000;
  }

  applyDamage(amount) {
    if (amount === undefined) {
      return;
    };

    if (this.health <= 0 || this.health - amount <= 0) {
      this.die();
    }

    this.health -= amount;
    console.log(`${this.name} takes ${amount} damage`);
    console.log(`${this.name} remaining health: ${this.health}`);
    this.attackTarget = this.player;
  }

  act() {
    if (this.attackTarget && this.health > 0) {
        this.attack();
    }

    if (this.health <= 0) {
      // Dead, do nothing
    } else if (this.cooldown > 0) {
      this.rest();
    } else {

      // If theres an item in their room, make enemy took it
      if (this.currentRoom.items.length > 0) {
        // Do something here...
        this.takeFood();

        this.countdown = 5000;
      }

      let choice = this.randomChoice();
      choice();

      this.rest();
    }
  }

  scratchNose() {
    this.cooldown = 3000;
    this.alert(`${this.name} scratches its nose`);
  }

  die() {
    console.log(`${this.name} has died.`);
    this.currentRoom = null;
  }

  randomChoice() {
    let choices = [this.scratchNose.bind(this), this.randomMove.bind(this)];

    let randomNum = this._random(0, choices.length);
    return choices[randomNum];
  }

}

module.exports = {
  Enemy,
};
