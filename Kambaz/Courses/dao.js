// import Database from "../Database/index.js";
import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export function createCourse(course) {
  const newCourse = { ...course, _id: uuidv4() };
  return model.create(newCourse);
}

export function findAllCourses() {
  return model.find();
}

export function findCourseById(courseId) {
  return model.findById(courseId);
}

export function updateCourse(courseId, courseUpdates) {
  return model.updateOne({ _id: courseId }, { $set: courseUpdates });

}

export function deleteCourse(courseId) {
  return model.deleteOne({ _id: courseId });
}

export async function findCoursesForEnrolledUser(userId) {
  const { default: EnrollmentModel } = await import("../Enrollments/model.js");
  const enrollments = await EnrollmentModel.find({ user: userId }).populate("course");
  return enrollments.map((enrollment) => enrollment.course);
}
