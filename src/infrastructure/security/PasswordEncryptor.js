"use strict";

const bcrypt = require("bcrypt");

const EncryptUtil = require("../../application/security/EncryptUtil");

module.exports = class extends EncryptUtil {
  async encrypt(password) {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    return hash;
  }

  async compare(password, hash) {
    const result = await bcrypt.compare(password, hash);

    return result;
  }
};
