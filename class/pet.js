const { Character } = require('./character');

class Pet extends Character {
    constructor(name, description, currentRoom, player) {
        super(name, description, currentRoom);
        this.health = 25;
        this.isFed = false;
        this.isDead = false;
        this.owner = player; // instanceof Player
        this.owner.pet = this;
    }

    followPlayer() {
        this.currentRoom = this.owner.currentRoom;
    }

    eat() {
        if (this.isDead) {
            this.isDead = false;
            this.isFed = false;
            this.health = 25;
            console.log('You revive your trusty pet');
        }
        console.log(`You treat your pet. Something is motivating it...`);
        this.isFed = true;
        // this.health = this.health + this.item.upHealth;
        this.health = 25;
    }

    // eat(itemName) {
    //     if (itemName === "Pet Treat") {
    //         if (this.isDead) {
    //             this.isDead = false;
    //             this.isFed = false;
    //             this.health = 25;
    //         } else {
    //             this.isFed = true;
    //             // this.health = this.health + this.item.upHealth;
    //             this.health = 25;
    //         }
    //     } else {
    //         console.log("You don't have the item to treat your pet...")
    //     }
    // }

    setOwner(player) {
        this.owner = player;
    }

    die() {
        console.log(`Pet: ${this.name} has died...`);
        console.log("You can feed them a treat to revive them.")
        this.isDead = true;
        this.isFed = false;
    }

    protectPlayer(amount) {
        if (this.isFed && !this.isDead) {
            console.log(`${this.name} is protecting you, ${this.owner.name}`)
            this.applyDamage(amount);
            console.log(`${this.owner.name} pet's current health: ${this.health}`);
            return true;
        }

        return false;
    }
}



module.exports = {
    Pet,
};
