"use strict";

const RestaurantsRepository = require("../../domain/RestaurantsRepository");

const util = require("util");

const unirest = require("unirest");

module.exports = class extends RestaurantsRepository {
  async findNear({ lat, lang, cityId, pageSize, pageNumber }) {
    const req = unirest(
      "GET",
      "https://thefork.p.rapidapi.com/restaurants/list"
    );

    req.query({
      pageNumber: "1",
      queryPlaceValueCoordinatesLongitude: "9.189982",
      pageSize: "10",
      queryPlaceValueCoordinatesLatitude: "45.4642035",
      queryPlaceValueCityId: "348156"
    });

    req.headers({
      "x-rapidapi-host": "thefork.p.rapidapi.com",
      "x-rapidapi-key": "8f6f578edfmsh4daeaaab5ab7534p1d6eb1jsn88de4404d8f4",
      useQueryString: true
    });

    util.promisify(req.end);

    const result = await req.end();

    return result;
  }
};
