const { Item } = require('./item');
const { World } = require('./world');

class Secret extends Item {

    constructor(name, description) {
        super(name, description);
        this.isUsable = true;
    }

    findNearestEnemy() {
        /**
         * The implementation here is that assuming
         * that there is only ONE enemy in the entire WORLD.
         * Change the logic of this code
         * if want to insert multiple enemies.
         */
        for (let i = 0; i < World.enemies.length; i++) {
            return World.enemies[i];
        }

        return null;
    }

    use(owner) {
        let nearEnemy = this.findNearestEnemy();
        if (nearEnemy !== null) {
            owner.currentRoom = nearEnemy.currentRoom;
            console.log(`${owner.name} is in the same as ${nearEnemy.name} now`);
            nearEnemy.cooldown = 5000;
        }
    }

}



module.exports = {
    Secret,
};
