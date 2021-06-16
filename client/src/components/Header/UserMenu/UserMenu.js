import React, {useState} from 'react'
import style from './UserMenu.module.css'
import { connect } from 'react-redux'
import { userData } from '../../../actions/actionCreator'

function UserMenu(props) {
    const [open, setOpen] = useState(false)

    const openMenu = () => {
        setOpen(!open)
    }

    const userData = JSON.parse(window.localStorage.getItem('userData'))
    props.setUserData(userData)
    return (
        <div className={style.menuButton + (open ? ' ' + style.open : '')}>
            <div className={style.openButton} onClick={openMenu}>
                <p>Hi, {userData[0].name}</p>
            </div>
            <div className={style.linkList}>
                <div className={style.link}  onClick={props.logOut}>LogOut</div>
                <div className={style.link} ><a href='/registrationnewuser'> Новий <br />користувач </a></div>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => (
    {
      setUserData: (data) => dispatch(userData(data)),
    }
  );
  
  export default connect(null, mapDispatchToProps)(UserMenu);
  