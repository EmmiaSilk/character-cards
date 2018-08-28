"use strict";

const Data = {};

class DataSet {
  constructor(obj) {
    this.definition = {
      stats: []
    };
    this.characters = {};

    if(obj) {
      // Map object to dataset
      Object.assign(this, obj);
      // Make all character objects valid characters
      for (let id in this.characters) {
        let realCharacter = Object.assign(new Character, this.getCharacter(id));
        this.setCharacter(id, realCharacter);
      }
    }
  }
  getCharacter(id) {
    return this.characters[id];
  }
  /**
   * Adds the character to the dataset with the given id. If one already
   * exists with the given ID, it overwrites that character.
   * Returns true if successful, returns false if the the given character is
   * not a valid instance of Character.
   */
  setCharacter(id, character) {
    if(character instanceof Character) {
      this.characters[id] = character;
      return true;
    }
    return false;
  }
  /**
   * Changes the ID of a pre-existing character to the given id.
   * Returns true if successful, returns false if no character with the given
   * old ID exists or if a character already exists with the new id.
   */
  renameCharacter(oldId, newId) {
    if(this.characters[oldId] && !this.characters[newId]) {
      this.characters[newId] = this.characters[oldId];
      return this.removeCharacter(oldId);
    }
    return false;
  }
  /**
   * Removes the character with the given ID.
   * Returns true if successful, returns false if no character with the given
   * ID exists.
   */
  removeCharacter(id) {
    if(this.characters[id]) {
      delete this.characters[id];
      return true;
    }
    return false;
  }
  /**
   * Returns a dataset containing a default defined stat block and an example
   * character.
   */
  static getDefaultDataset() {
    let dataset = new DataSet();
    dataset.definition.stats.push(
      { str: 'STR', con: 'CON', dex: 'DEX' },
      { int: 'INT', wis: 'WIS', cha: 'CHA' },
    );

    let character = new Character();
    character.setName('Example');
    character.setShorten(0);
    character.setTitle('Example Title');
    character.setRaceClass('Race Class');
    character.setIcon('images/deaglan.png');
    character.setStats(
      { // Stats
        str: 10, con: 10, dex: 20,
        int: 10, wis: 10, cha: 10
      }
    );

    dataset.setCharacter('example', character);
    return dataset;
  }
}
class Character {
  constructor(obj) {
    this.name = '';
    this.shorten_name = 0;
    this.title = '';
    this.raceclass = '';
    this.icon = '';
    this.stats = {};

    if(obj) {
      Object.assign(this, obj);
    }
  }

  setName(name) {
    this.name = name;
  }
  setShorten(shorten) {
    this.shorten_name = shorten;
  }
  setTitle(title) {
    this.title = title;
  }
  setRaceClass(raceclass) {
    this.raceclass = raceclass;
  }
  setIcon(path) {
    this.icon = path;
  }
  setStats(statblock) {
    this.stats = statblock;
  }
}
