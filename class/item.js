class Item {

  constructor(name, description) {
    this.name = name;
    this.description = description;
    this.isFood = false;
    this.isUsable = false;
  }


  isEatable() {
    return this.isFood;
  }

  canUse() {
    return this.isUsable;
  }

}

module.exports = {
  Item,
};
