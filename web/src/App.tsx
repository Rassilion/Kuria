import { action, observable } from 'mobx'
import { observer } from 'mobx-react'
import React from 'react'
import './App.css'
import logo from './logo.svg'
import io from 'socket.io-client'
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"

const socket = io('http://localhost:2020')

function subscribeToTimer(cb: any) {
  socket.on('timer', (message: string) => cb(null, message))
  socket.emit('subscribeToTimer', 1000)
}

@observer
class App extends React.Component {
  @observable count: string = ""

  constructor(props: any) {
    super(props)
    subscribeToTimer((err: any, message: string) => { action(this.count = message) })
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          {this.count} message

          <SignIn />
          <SignUp />
        </p>

      </div>
    )
  }
}

export default App
