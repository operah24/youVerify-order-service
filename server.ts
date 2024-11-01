import cors from "cors";
import dotenv from "dotenv"
import logger from "morgan";
import ApiError from "./ApiError"
import AppRouter from "./src/config/AppRouter";
import express, { Request, Response, NextFunction, Application} from "express";
import mongoose from "mongoose";

dotenv.config()
import "./src/api/models/db";
import "./src/api/controllers";
import utilities from "./src/api/helpers/utilities";
import { connectRabbitMQ } from "./rabbitMq";

const server = {
  start() {
    const app = initializeApp();
    addErrorResponse(app);
    runApp(app);
  }
}


function initializeApp(): Application {
  const app = express();

  app.disable('x-powered-by'); //turn off header

  app.use(express.json());
  app.use(logger('dev'));
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  app.use('/order/healthCheck', async (req, res) => {
    let response = {} as any;

    const dbState = {
        0: 'Disconnected',
        1: 'connected',
        2: 'Connecting',
        3: 'Disconnecting'
      } as any;

      const cpuStats = {
        mem: process.memoryUsage(),
        uptime: process.uptime(),
        cpu: process.cpuUsage(),
        message: 'Service is up and running'
    };

    response['cpuStats'] = cpuStats;

    if (mongoose) {
        const mongoDBState = Number(mongoose.connection.readyState);
        response['mongoDBState'] = dbState[mongoDBState];
        if (mongoDBState !== 1) {
          return utilities.sendResponse(res, "Healthcheck", 500, response)
        }
    }

    return utilities.sendResponse(res, "Healthcheck", 200, response)
  })

  /**
   * Api routing section
   */
  app.use(AppRouter.getInstance());

  return app;
}

function addErrorResponse(app: express.Application) {
  app.use((err: ApiError, _req: Request, res: Response, _next: NextFunction) => {
    res.status(err.status || 400).json({
      success: false,
      message: err.message,
      data: err.data
    })
  });
}

async function runApp(app: Application) {
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => console.log("Server listening on port " + PORT));
  await connectRabbitMQ()
}

server.start()
