import express from 'express'
import { createServer, Server } from 'http'
import socketio from 'socket.io'
import bodyParser from 'body-parser'
import { Routes } from './routes'
import { Sockets } from './sockets'
import passport from "./passport"
import session from "express-session"
import dbConnection from "./mongo"
import connectMongo from "connect-mongo"

const MongoStore = connectMongo(session)
class App {
  public app: express.Application
  public server: Server
  public io: SocketIO.Server
  public routePrv: Routes = new Routes()
  public socketPrv: Sockets = new Sockets()
  constructor() {
    this.app = express()
    this.server = createServer(this.app)
    this.io = socketio(this.server)

    this.config()
    this.routePrv.routes(this.app)
    this.socketPrv.sockets(this.io)
  }

  private config(): void {
    // support application/json type post data
    this.app.use(bodyParser.json())
    // support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }))

    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*")
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
      next()
    })

    this.app.use(
      session({
        secret: 'fraggle-rock', // pick a random string to make the hash that is generated secure
        store: new MongoStore({ mongooseConnection: dbConnection.connection }),
        resave: false, // required
        saveUninitialized: false // required
      })
    )

    // Passport
    this.app.use(passport.initialize())
    this.app.use(passport.session()) // calls the deserializeUser
  }
}

export default new App().server
