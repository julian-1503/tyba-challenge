"use strict";

module.exports = async (
  email,
  password,
  { userRepository, accessTokenManager, passwordEncryptor }
) => {
  const user = await userRepository.getByEmail(email);

  const isValidPassword = await passwordEncryptor.compare(
    password,
    user.password
  );

  if (!user || !isValidPassword) {
    throw new Error("Bad credentials");
  }

  return {
    accessToken: accessTokenManager.generate({ uid: user.id }),
    userId: user.id
  };
};
