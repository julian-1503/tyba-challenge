"use strict";

module.exports = class {
  constructor(id = null, name, city, lat, lang) {
    this.id = id;
    this.name = name;
    this.city = city;
    this.lat = lat;
    this.lang = lang;
  }
};
