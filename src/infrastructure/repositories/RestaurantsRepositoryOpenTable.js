"use strict";

const RestaurantsRepository = require("../../domain/RestaurantsRepository");
const Restaurant = require("../../domain/Restaurant");

const fetch = require("node-fetch");

module.exports = class extends RestaurantsRepository {
  async findNear(city, pageSize = 25, page = 1) {
    const nearRestaurantsResponse = await fetch(
      `https://opentable.herokuapp.com/api/restaurants?city=${city}&page=${page}&per_page=${pageSize}`
    );

    const results = await nearRestaurantsResponse.json();

    const { restaurants = [] } = results;

    return {
      ...results,
      restaurants: restaurants.map(
        restaurant =>
          new Restaurant(
            restaurant.id,
            restaurant.name,
            restaurant.city,
            restaurant.lat,
            restaurant.lang
          )
      )
    };
  }
};
