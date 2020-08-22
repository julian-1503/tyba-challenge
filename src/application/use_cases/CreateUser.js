"use strict";

const User = require("../../domain/User");

module.exports = async (
  firstName,
  lastName,
  email,
  password,
  { userRepository }
) => {
  const user = new User(null, firstName, lastName, email, password);
  const result = await userRepository.persist(user);

  return result;
};
