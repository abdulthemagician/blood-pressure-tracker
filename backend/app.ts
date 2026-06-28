import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './src/routes/bloodPressure.routes.js';
import 'dotenv/config';
import { globalErrorHandler } from './src/middleware/errorHandler.middleware.js';
const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use('/api/bloodpressure', routes);

app.use(globalErrorHandler);

export default app;