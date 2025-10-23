import { authResponse, IUser, TokenPayload } from "../interfaces";
import repository from "./repository";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt";

const get = async () => {
  return await repository.get();
};
const find = async (id: string) => {
  if (!id) throw new Error("id is required");
  return await repository.find(id);
};
const add = async (data: IUser) => {
  if (!data.name && !data.email && !data.password)
    throw new Error("Missing data");
  return await repository.add(data);
};
const update = async (id: string, data: IUser) => {
  if (!id) throw new Error("id is required");
  if (!data.name && !data.email && !data.password && !data.role)
    throw new Error("Missing data");
  return await repository.update(id, data);
};
const remove = async (id: string) => {
  if (!id) throw new Error("id is required");
  return await repository.remove(id);
};

const signIn = async (
  email: string,
  password: string
): Promise<authResponse> => {
  const foundedUser = await repository.findByEmail(email);
  if (!foundedUser)
    return { success: false, code: 400, message: "User NOT found!" };
  const isValidPassword: boolean = await foundedUser.comparePassword(
    `${password}`
  );
  if (!isValidPassword)
    return { success: false, code: 400, message: "Invalid credentials" };

  const payload = generatePayLoad(foundedUser);

  const { accessToken, refreshToken } = generateTokens(payload);

  await saveRefreshToken(foundedUser, refreshToken);

  return {
    success: true,
    message: "Login successful.",
    code: 200,
    data: {
      user: {
        ...payload,
        name: foundedUser.name,
      },
      accessToken,
      refreshToken,
    },
  };
};

const signUp = async ({
  email,
  name,
  password,
}: {
  email: string;
  name: string;
  password: string;
}): Promise<authResponse> => {
  const foundedUser = await repository.findByEmail(email);
  if (foundedUser)
    return { success: false, code: 400, message: "User exists already!" };
  const savedUser = await add({ email, name, password } as IUser);
  const payload = generatePayLoad(savedUser);

  const { accessToken, refreshToken } = generateTokens(payload);

  await saveRefreshToken(savedUser, refreshToken);

  return {
    success: true,
    message: "User registered successfully",
    code: 201,
    data: {
      user: {
        ...payload,
        name: savedUser.name,
      },
      accessToken,
      refreshToken,
    },
  };
};

const refreshToken = async (token: string): Promise<authResponse> => {
  const decoded = verifyRefreshToken(token);
  const user = await find(decoded.userId);
  if (!user || user.refreshToken !== token)
    return {
      success: false,
      code: 400,
      message:
        user?.refreshToken === ""
          ? "You have to login first."
          : "Invalid refresh token",
    };

  const payload = generatePayLoad(user);

  const { accessToken, refreshToken } = generateTokens(payload);

  await saveRefreshToken(user, refreshToken);

  return { success: true, code: 200, data: { accessToken, refreshToken } };
};

const logout = async (userId: string): Promise<authResponse> => {
  const user = await repository.update(userId, { refreshToken: "" } as IUser);
  if (!user)
    return {
      success: false,
      code: 400,
      message: "can not find the wanted user",
    };
  return { success: true, code: 200, message: "Logout successful" };
};

export default {
  get,
  find,
  add,
  update,
  remove,
  signIn,
  signUp,
  refreshToken,
  logout,
};
// =============== helper functions =============================

const generatePayLoad = (user: IUser): TokenPayload => {
  return {
    userId: `${user._id}`,
    email: user.email,
    role: user.role,
  };
};
const generateTokens = (
  payload: TokenPayload
): { accessToken: string; refreshToken: string } => {
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);
  return { accessToken, refreshToken };
};

const saveRefreshToken = async (
  user: IUser,
  refreshToken: string
): Promise<void> => {
  user.refreshToken = refreshToken;
  await user.save();
};
