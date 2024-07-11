import * as express from "express"
import { Application } from "express"
import * as cors from "cors"
import type { CorsOptions } from "cors"
import * as swaggerUi from 'swagger-ui-express'
import { rateLimit } from 'express-rate-limit'
import env from '@/config/db.config'
const swaggerDocument = require('./swagger.json')

import Routes from './routes'

export default class Server {
  constructor(app: Application) {
    this.config(app)
    new Routes(app)
  }

  private limiter = rateLimit({
    windowMs: env.WINDOWMS,
    limit: env.LIMIT_RATE,
    standardHeaders: 'draft-7',
    legacyHeaders: false
  })

  private config(app: Application): void {
    const corsOptions: CorsOptions = {
      origin: "http://localhost:3000"
    }
    app.use('/api-docs', swaggerUi.serve);
    app.get('/api-docs', swaggerUi.setup(swaggerDocument));
    app.use(cors(corsOptions))
    app.use(this.limiter)
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
  }
}
