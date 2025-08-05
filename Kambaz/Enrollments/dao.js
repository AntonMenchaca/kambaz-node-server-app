import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export function findEnrollmentsForUser(userId) {
  const { enrollments } = Database;
  return enrollments.filter((enrollment) => enrollment.user === userId);
}

export function findEnrollmentsForCourse(courseId) {
  const { enrollments } = Database;
  return enrollments.filter((enrollment) => enrollment.course === courseId);
}

export function enrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;
  // Check if enrollment already exists
  const existingEnrollment = enrollments.find(
    (enrollment) => enrollment.user === userId && enrollment.course === courseId
  );
  if (existingEnrollment) {
    return existingEnrollment;
  }

  const newEnrollment = { _id: uuidv4(), user: userId, course: courseId };
  Database.enrollments = [...Database.enrollments, newEnrollment];
  return newEnrollment;
}

export function unenrollUserFromCourse(userId, courseId) {
  const { enrollments } = Database;
  Database.enrollments = enrollments.filter(
    (enrollment) => !(enrollment.user === userId && enrollment.course === courseId)
  );
}
