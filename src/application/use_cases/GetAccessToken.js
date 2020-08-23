"use strict";

module.exports = async (
  email,
  password,
  { userRepository, accessTokenManager, passwordEncryptor }
) => {
  const user = await userRepository.getByEmail(email);

  if (!user) {
    throw new Error("Not found");
  }

  const isValidPassword = await passwordEncryptor.compare(
    password,
    user.password
  );

  if (!isValidPassword) {
    throw new Error("Bad credentials");
  }

  return {
    accessToken: accessTokenManager.generate({ uid: user.id }),
    userId: user.id
  };
};
