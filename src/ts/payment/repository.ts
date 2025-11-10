import User from "../user/model";

const grantCourseAccess = async (userId: string, courseIds: string[]) => {
  return await User.findByIdAndUpdate(
    userId,
    {
      $pull: { cart: { courseId: { $in: courseIds } } },
      $push: {
        purchasedCourses: { $each: courseIds.map((id) => ({ courseId: id })) },
      },
    },
    { new: true }
  ).populate("courseId");
};

export default { grantCourseAccess };
