import React, {useState} from 'react'
import style from './UserMenu.module.css'

export default function UserMenu(props) {
    const [open, setOpen] = useState(false)

    const openMenu = () => {
        setOpen(!open)
    }

    const userData = JSON.parse(window.localStorage.getItem('userData'))

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