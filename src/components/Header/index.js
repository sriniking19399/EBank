import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogOut = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="nav-contaienr">
      <img
        alt="website login"
        src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
      />
      <button onClick={onClickLogOut} className="logout-button">
        Logout
      </button>
    </nav>
  )
}
export default withRouter(Header)
