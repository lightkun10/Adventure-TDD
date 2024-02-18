const { expect } = require('chai');

const {Player} = require("../class/player.js");
const {Room} = require("../class/room.js");
const {Item} = require("../class/item.js");
const {Secret} = require("../class/secret.js");
const {Enemy} = require("../class/enemy.js");

describe('Secret', () => {

    let player;
    let room;
    let enemy;
    let mysteryItem;
    let item;

    beforeEach(() => {
        mysteryItem = new Secret("teleport", "what does it do...");
        item = new Item("rock", "just a simple rock");
        room = new Room("Test Room", "A test room");
        player = new Player("test player", room);
    });

    it('should be an instance of Item and Teleport', () => {

        expect(mysteryItem instanceof Item).to.be.true;
        expect(mysteryItem instanceof Secret).to.be.true;

        expect(item instanceof Item).to.be.true;
        expect(item instanceof Secret).to.be.false;

    });

    it('can be used by a player', () => {

        player.items.push(mysteryItem);

        expect(player.items.length).to.equal(1);

        player.useItem(mysteryItem.name);

        expect(player.items.length).to.equal(0);

    });

    it('should teleport the player to the enemy', () => {
        let newRoom = new Room("Far away room", "Where goblins lie");
        let enemy = new Enemy("Goblin", "Bad goblin", newRoom);

        player.items.push(mysteryItem);

        player.useItem(mysteryItem.name);

        expect(player.currentRoom = newRoom);

    });

});
