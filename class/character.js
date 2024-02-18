class Character {

  constructor(name, description, currentRoom) {
    this.name = name;
    this.description = description;
    this.currentRoom = currentRoom;  // Must be an instance of Room class
    this.items = [];  // Must be consist of an instance of Item class
    this.health = 100;
    this.strength = 10;
  }

  applyDamage(amount) {
    if (this.health <= 0 || this.health - amount <= 0) {
      this.die();
    }

    this.health -= amount;
  }

  die() {
    console.log(`${this.name} is dead`);
    // Drop all items here to the currentRoom
    this.items.forEach((item) => this.currentRoom.items.push(item));
    this.items = [];

    // Current Room set to null
    this.currentRoom = null;
  }

}

module.exports = {
  Character,
};
