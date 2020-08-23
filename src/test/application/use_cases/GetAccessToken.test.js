const UserRepository = require("../../../../src/domain/UserRepository");
const mockUserRepository = new UserRepository();

const AccessTokenManager = require("../../../../src/application/security/AccessTokenManager");
const PasswordEncryptor = require("../../../../src/application/security/EncryptUtil");
const MockAccessTokenManager = class extends AccessTokenManager {};
const mockAccessTokenManager = new MockAccessTokenManager();
const MockPasswordEncryptor = class extends AccessTokenManager {};
const mockPasswordEncryptor = new MockPasswordEncryptor();

const GetAccessToken = require("../../../../src/application/use_cases/GetAccessToken");

test("should resolve with a generated JWT access token when credentials are ok", async () => {
  // given
  mockUserRepository.getByEmail = () => {
    return { password: "abcd-1234" };
  };
  mockAccessTokenManager.generate = () => "generated-jwt-access-token";

  mockPasswordEncryptor.compare = () => true;

  // when
  const accessToken = await GetAccessToken("john@mail.com", "abcd-1234", {
    userRepository: mockUserRepository,
    accessTokenManager: mockAccessTokenManager,
    passwordEncryptor: mockPasswordEncryptor
  });

  // then
  expect(accessToken.accessToken).toBe("generated-jwt-access-token");
});

test("should reject when user was not found", () => {
  // given
  mockUserRepository.getByEmail = () => null;

  mockPasswordEncryptor.compare = () => true;

  // when
  const promise = GetAccessToken("john@mail.com", "abcd-1234", {
    userRepository: mockUserRepository,
    accessTokenManager: mockAccessTokenManager,
    passwordEncryptor: mockPasswordEncryptor
  });

  // then
  return expect(promise).rejects.toThrow("Not found");
});

test("should reject when password did not match", () => {
  // given
  mockUserRepository.getByEmail = () => {
    return { password: "abcd-1234" };
  };

  mockPasswordEncryptor.compare = () => false;

  // when
  const promise = GetAccessToken("john@mail.com", "wrong-password", {
    userRepository: mockUserRepository,
    accessTokenManager: mockAccessTokenManager,
    passwordEncryptor: mockPasswordEncryptor
  });

  // then
  return expect(promise).rejects.toThrow("Bad credentials");
});
