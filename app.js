import "dotenv/config";
import express from 'express';
import HelloRoutes from './hello.js';
import Lab5 from './lab5.js';
import CourseRoutes from './courses/routes.js';
import cors from 'cors';
import ModuleRoutes from './modules/routes.js';
import AssignmentRoutes from './assignments/routes.js';

const app = express();
app.use(cors());
app.use(express.json());

AssignmentRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
HelloRoutes(app);
Lab5(app);

app.listen(process.env.PORT || 4000);