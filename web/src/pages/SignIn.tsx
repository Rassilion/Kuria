import React from 'react'
import { action, observable } from 'mobx'
import { observer } from 'mobx-react'
import axios from 'axios'



@observer
class SignIn extends React.Component {
    @observable username: string = ""
    @observable password: string = ""

    constructor(props: any) {
        super(props)

    }

    handleSubmit = (event) => {
        event.preventDefault()
        console.log('handleSubmit')

        axios
            .post('http://localhost:2020/api/user/login', {
                username: this.username,
                password: this.password
            })
            .then(response => {
                console.log('login response: ')
                console.log(response)
                if (response.status === 200) {
                    // update App.js state

                }
            }).catch(error => {
                console.log('login error: ')
                console.log(error)
            })
    }


    @action handleChange = (event) => {
        this[event.target.name] = event.target.value
    }

    render() {
        return (
            <div>
                <h4>Login</h4>
                <form className="form-horizontal">
                    <div className="form-group">
                        <div className="col-1 col-ml-auto">
                            <label className="form-label" htmlFor="username">Username</label>
                        </div>
                        <div className="col-3 col-mr-auto">
                            <input className="form-input"
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Username"
                                value={this.username}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-1 col-ml-auto">
                            <label className="form-label" htmlFor="password">Password: </label>
                        </div>
                        <div className="col-3 col-mr-auto">
                            <input className="form-input"
                                placeholder="password"
                                type="password"
                                name="password"
                                value={this.password}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-group ">
                        <div className="col-7"></div>
                        <button
                            className="btn btn-primary col-1 col-mr-auto"

                            onClick={this.handleSubmit}
                            type="submit">Login</button>
                    </div>
                </form>
            </div>
        )

    }
}

export default SignIn
