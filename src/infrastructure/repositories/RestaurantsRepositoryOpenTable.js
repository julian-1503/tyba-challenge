"use strict";

const RestaurantsRepository = require("../../domain/RestaurantsRepository");

const fetch = require("node-fetch");

module.exports = class extends RestaurantsRepository {
  async findNear(city, pageSize = 25, page = 1) {
    const nearRestaurantsResponse = await fetch(
      `https://opentable.herokuapp.com/api/restaurants?city=${city}&page=${page}&per_page=${pageSize}`
    );

    const results = await nearRestaurantsResponse.json();

    return results;
  }
};
