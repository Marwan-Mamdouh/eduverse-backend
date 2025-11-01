import { CustomResponse, IUser, TokenPayload } from "../interfaces";
import repository from "./repository";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt";
import User from "./model";

const get = async (): Promise<CustomResponse> => {
  const users = await repository.get();
  if (!users) return { success: true, code: 204, message: "no users found" };
  return { success: true, code: 200, data: users };
};

const getWatchLater = async (userId: string): Promise<CustomResponse> => {
  const watchLater = await repository.getWatchLater(userId);
  if (!watchLater)
    return { success: false, code: 404, message: "user not found" };
  return { success: true, code: 200, data: "watchLater" };
};

const getUserCart = async (userId: string): Promise<CustomResponse> => {
  if (!userId)
    return { success: false, code: 400, message: "can't search with no id" };
  const response = await repository.getUserCart(userId);
  return { success: true, code: 200, data: response };
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

const purchase = async (courses: string[]): Promise<CustomResponse> => {
  if (!courses)
    return {
      success: false,
      code: 400,
      message: "can't buy with no courses in the body",
    };
  const response = await repository.purchase(courses);
  return { success: true, code: 200, data: response };
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

const handleCart = async (
  userId: string,
  courseId: string
): Promise<CustomResponse> => {
  if (!userId || !courseId)
    return { success: false, code: 400, message: "Missing data" };
  const cartList = await repository.getUserCart(userId);
  const alreadyExists = cartList!.cart?.includes(courseId);
  const query = alreadyExists
    ? { $pull: { cart: courseId } }
    : { $addToSet: { cart: courseId } };
  const response = await repository.updateCart(userId, query);
  return { success: true, code: 200, data: response };
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
  const alreadyExists = watchLaterList.watchLater?.includes(courseId);
  const query = alreadyExists
    ? { $pull: { watchLater: courseId } }
    : { $addToSet: { watchLater: courseId } };

  const updatedList = await repository.updateWatchLater(userId, query);
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
    return { success: false, code: 400, message: "Wrong email or password" };
  const isValidPassword: boolean = await foundedUser.comparePassword(
    `${password}`
  );
  if (!isValidPassword)
    return { success: false, code: 400, message: "Wrong email or password" };

  const payload = generatePayLoad(foundedUser);

  const { accessToken, refreshToken } = generateTokens(payload);

  await saveRefreshToken(foundedUser, refreshToken);

  return generateResponse(
    "Login successful.",
    200,
    payload,
    foundedUser,
    accessToken,
    refreshToken
  );
};

const signInWithGoogle = async (
  name: string,
  email: string
): Promise<CustomResponse> => {
  if (!name || !email)
    return { success: false, code: 400, message: "Missing google token" };
  const user = await repository.findByEmail(email);
  const response =
    user ?? (await User.create({ name, email, password: "12345678" }));
  return { success: true, code: 200, data: response };
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

  return generateResponse(
    "User registered successfully",
    201,
    payload,
    savedUser,
    accessToken,
    refreshToken
  );
};

const refreshToken = async (token: string): Promise<CustomResponse> => {
  const decoded = verifyRefreshToken(token);
  const response = await find(decoded.userId);
  const user = response.data;
  if (user?.refreshToken !== token)
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
  find,
  add,
  purchase,
  update,
  handleCart,
  handleWatchLater,
  remove,
  signIn,
  signInWithGoogle,
  signUp,
  refreshToken,
  logout,
};
// =============== helper functions =============================

const generateResponse = (
  message: string,
  code: number,
  payload: TokenPayload,
  user: IUser,
  accessToken: string,
  refreshToken: string
): CustomResponse => {
  return {
    success: true,
    message,
    code,
    data: {
      user: {
        ...payload,
        name: user.name,
      },
      accessToken,
      refreshToken,
    },
  };
};

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
