import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {userid: '', password: '', showError: false, errorMsg: ''}

  getUserId = event => {
    this.setState({userid: event.target.value})
  }

  getPassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {userid, password} = this.state
    const userDetails = {user_id: userid, pin: password}
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {userid, password, showError, errorMsg} = this.state
    return (
      <div className="login-form-bg-container">
        <div className="form-content-container">
          <img
            className="login-image"
            alt="website login"
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
          />
          <form onSubmit={this.onSubmitForm} className="form-container">
            <h1>Welcome Back</h1>
            <label htmlFor="userId">User ID</label>
            <input
              className="input"
              onChange={this.getUserId}
              value={userid}
              placeholder="Enter User ID"
              id="userId"
              type="text"
            />
            <label htmlFor="pin">PIN</label>
            <input
              className="input"
              value={password}
              onChange={this.getPassword}
              placeholder="Enter PIN"
              id="pin"
              type="password"
            />
            <button className="submit-button" type="submit">
              Login
            </button>
            {showError && <p className="error-message">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default Login
