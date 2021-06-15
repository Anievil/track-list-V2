import React from 'react'
import style from './Header.module.css'
import { NavLink } from 'react-router-dom'

export default function Header(props) {
    
    return (
        <div className={style.header} >
            <NavLink to='/'><h2 className={style.link}>Головна</h2></NavLink>
            <NavLink to={props.backLink} ><h2 className={style.link}>Назад</h2></NavLink> 
        </div>
    )
}
