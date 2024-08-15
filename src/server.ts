import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import StatusCodes from 'http-status-codes';
import express, {Request, Response, NextFunction} from 'express';
import corn from "node-cron";
import 'express-async-errors';
import BaseRouter from './routes/api';
import logger from 'jet-logger';
import {CustomError} from '@shared/errors';
import envVars from '@shared/env-vars';
import dotenv from 'dotenv';
import cors from "cors";

// **** Init express **** //

const app = express();


// **** Set basic express settings **** //
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(envVars.cookieProps.secret));

app.use(cors());
// app.use(function (req, res, next) {
//   //Enabling CORS
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");

//     next();
//   });

// Show routes called in console during development
if (envVars.nodeEnv === 'development') {
  app.use(morgan('dev'));
}

// Security
if (envVars.nodeEnv === 'production') {
  app.use(helmet());
}
// **** Add API routes **** //
// Add APIs
app.use('/api/v1', BaseRouter);

// Error handling
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error | CustomError, req: Request, res: Response, _: NextFunction) => {
  logger.err(err, true);
  const status = (err instanceof CustomError ? err.HttpStatus : StatusCodes.BAD_REQUEST);
  return res.status(status).json({
    error: err.message,
  });
});


// Set static directory (files).
const staticDir = path.join(__dirname, envVars.folder);
app.use(express.static(staticDir));

// Run corn job twice a day
corn.schedule("0 0,12 * * *", async () => {
  //
});

// **** Export default **** //

export default app;
