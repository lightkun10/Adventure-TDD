const { expect } = require('chai');
const { Enemy } = require("../class/enemy.js");
const { Player } = require("../class/player.js");
const { Room } = require("../class/room.js");
const { Item } = require("../class/item.js");
const { Food } = require("../class/food.js");
const { Character } = require("../class/character.js");
const { Pet } = require("../class/pet.js");

describe('Pet', () => {

    let player;
    let pet;
    let room;
    let treat;
    let enemy;

    beforeEach(() => {
        room = new Room("Test Room", "A test room");
        player = new Player("test player", room);
        pet = new Pet("Luna", "Moon-shaped cute yet burly animal", room, player);
        treat = new Food("Pet Treat", "Feed to your pet");
    });

    it('should inherit from Character', () => {
        expect(Pet.prototype instanceof Character);
    });

    it('should have a name, strength, fed status, and its owner properties', () => {


        expect(pet.name).to.equal("Luna");
        expect(pet.health).to.equal(25);
        expect(pet.isFed).to.equal(false);
        expect(pet.owner).to.equal(player);

    });

    it('should follow the player around', () => {

        let room2 = new Room("Test Room2", "Secret Test Room 2");
        room.connectRooms('w', room2);

        expect(pet.currentRoom).to.equal(room);
        player.move('w');
        pet.followPlayer();

        expect(pet.currentRoom).to.equal(room2);

    });

    context('about defending the owner', () => {

        it('should defend you while fed', () => {

            enemy = new Enemy("Goblin", "bad guy", room);

            expect(pet.health).to.equal(25);

            enemy.setPlayer(player);
            enemy.setAttackTarget(player);
            enemy.attack();

            expect(pet.health).to.equal(25);
            expect(player.health).to.equal(90);

            pet.isFed = true;

            enemy.setPlayer(pet);
            enemy.setAttackTarget(pet);
            enemy.attack();
            expect(pet.health).to.equal(15);
            expect(player.health).to.equal(90);

        });

        it('should not defend you when dead', () => {

            enemy = new Enemy("Goblin", "bad guy", room);

            expect(pet.health).to.equal(25);
            pet.isFed = true;

            enemy.setPlayer(player);
            enemy.setAttackTarget(player);

            enemy.attack();
            enemy.attack();
            enemy.attack();

            expect(pet.health).to.equal(-5);
            expect(player.health).to.equal(100);
            expect(pet.isDead).to.equal(true);

            enemy.attack();
            expect(player.health).to.equal(90);

        });
    });

    context('about being fed by a treat', () => {

        it('should be fed after given a treat', () => {

            expect(pet.isFed).to.equal(false);
            player.items.push(treat);
            player.feedPet();

            expect(pet.isFed).to.equal(true);

        });

        it('should revive after being fed a treat', () => {

            pet.die();

            expect(pet.isDead).to.equal(true);

            player.items.push(treat);
            player.feedPet();

            expect(pet.isDead).to.equal(false);
            expect(pet.health).to.equal(25);
            expect(pet.isFed).to.equal(false);

        });

        it('should not be fed after being revived', () => {
            pet.die();
            player.items.push(treat);
            player.feedPet();

            expect(pet.isFed).to.equal(false);
        });
    });



});
