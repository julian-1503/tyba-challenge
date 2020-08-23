"use strict";

module.exports = class {
  constructor(id = null, uri, method, userId, date = null) {
    this.id = id;
    this.uri = uri;
    this.method = method;
    this.date = date;
    this.userId = userId;
  }
};
