import { CustomResponse, IUser, TokenPayload } from "../interfaces";
import repository from "./repository";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt";

const get = async (): Promise<CustomResponse> => {
  const users = await repository.get();
  if (!users) return { success: true, code: 204, message: "no users found" };
  return { success: true, code: 200, data: users };
};

const getWatchLater = async (userId: string): Promise<CustomResponse> => {
  const watchLater = await repository.getWatchLater(userId);
  if (!watchLater)
    return { success: false, code: 404, message: "user not found" };
  return { success: true, code: 200, data: watchLater };
};

const find = async (id: string): Promise<CustomResponse> => {
  if (!id) return { success: false, code: 400, message: "id is required" };
  const user = await repository.find(id);
  if (!user) return { success: false, code: 400, message: "Invalid id" };
  return { success: true, code: 200, data: user };
};

const add = async (data: IUser): Promise<CustomResponse> => {
  if (!data.name && !data.email && !data.password)
    return { success: false, code: 400, message: "Missing data" };
  const addUser = await repository.add(data);
  if (!addUser)
    return {
      success: false,
      code: 400,
      message: "something went wrong and user not saved",
    };
  return {
    success: true,
    code: 201,
    message: "user created successfully",
    data: addUser,
  };
};

const update = async (id: string, data: IUser): Promise<CustomResponse> => {
  if (!id) return { success: false, code: 400, message: "id is required" };
  if (!data.name && !data.email && !data.password && !data.role)
    return { success: false, code: 400, message: "Missing data" };
  const updatedUser = await repository.update(id, data);
  if (!updatedUser)
    return {
      success: false,
      code: 404,
      message: `no user match for id: ${id}`,
    };
  return {
    success: true,
    code: 200,
    message: "user updated successfully",
    data: updatedUser,
  };
};

const handleWatchLater = async (
  userId: string,
  courseId: string
): Promise<CustomResponse> => {
  if (!courseId || !userId)
    return {
      success: false,
      code: 400,
      message: "Missing Data, add to watch later failed",
    };
  const watchLaterList = await repository.getWatchLater(userId);
  if (!watchLaterList)
    return { success: false, code: 404, message: "user not found" };
  const alreadyExists = watchLaterList?.watchLater.includes(courseId);
  const query = alreadyExists
    ? { $pull: { watchLater: courseId } }
    : { $addToSet: { watchLater: courseId } };

  const updatedList = await repository.updateWatchLater(userId, query);
  console.log(updatedList);
  return { success: true, code: 200, data: updatedList };
};

const remove = async (id: string): Promise<CustomResponse> => {
  if (!id) return { success: false, code: 400, message: "id is required" };
  const removedUser = await repository.remove(id);
  if (!removedUser)
    return {
      success: false,
      code: 404,
      message: `no user match for the id: ${id}`,
    };
  return { success: true, code: 204, message: "user deleted successfully" };
};

const signIn = async (
  email: string,
  password: string
): Promise<CustomResponse> => {
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
}): Promise<CustomResponse> => {
  const foundedUser = await repository.findByEmail(email);
  if (foundedUser)
    return { success: false, code: 400, message: "User exists already!" };
  const response = await add({ email, name, password } as IUser);
  const savedUser: IUser = response.data;
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

const refreshToken = async (token: string): Promise<CustomResponse> => {
  const decoded = verifyRefreshToken(token);
  const response = await find(decoded.userId);
  const user = response.data;
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

const logout = async (userId: string): Promise<CustomResponse> => {
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
  getWatchLater,
  find,
  add,
  update,
  handleWatchLater,
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
