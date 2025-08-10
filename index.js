import "dotenv/config";
import express from 'express'
import mongoose from "mongoose";
import Hello from "./hello.js"
import Lab5 from "./Lab5/index.js";
import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import AssignmentRoutes from "./Kambaz/Assignments/routes.js";
import EnrollmentRoutes from "./Kambaz/Enrollments/routes.js";
import cors from "cors";
import session from "express-session";

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;
mongoose.connect(CONNECTION_STRING);
// Connect to MongoDB using the connection string from environment variables

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.NETLIFY_URL || "http://localhost:5173",
  })
);

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
};

if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}

app.use(session(sessionOptions));
app.use(express.json());

Hello(app);
Lab5(app);
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentRoutes(app);

app.listen(process.env.PORT || 4000);
