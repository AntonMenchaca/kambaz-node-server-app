import AssignmentModel from "./model.js";
import { v4 as uuidv4 } from "uuid";

export function createAssignment(assignment) {
  // Generate string ID if not provided
  if (!assignment._id) {
    assignment._id = uuidv4();
  }
  return AssignmentModel.create(assignment);
}

export function findAllAssignments() {
  return AssignmentModel.find();
}

export function findAssignmentById(assignmentId) {
  return AssignmentModel.findById(assignmentId);
}

export function findAssignmentsForCourse(courseId) {
  return AssignmentModel.find({ course: courseId });
}

export function updateAssignment(assignmentId, assignmentUpdates) {
  return AssignmentModel.updateOne({ _id: assignmentId }, assignmentUpdates);
}

export function deleteAssignment(assignmentId) {
  return AssignmentModel.deleteOne({ _id: assignmentId });
}
