import express from 'express'
import { createServer, Server } from 'http'
import socketio from 'socket.io'
import bodyParser from 'body-parser'
import { Routes } from './routes'
import { Sockets } from './sockets'

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
  }
}

export default new App().server
