import React from 'react'
import style from './Home.module.css'
import { NavLink } from 'react-router-dom'

export default function Home() {

    return (
        <>
            <div className={style.main}>
                <h1 className={style.title} >Це веб застосунок для перегляду інформації<br /> про пісні та гурти</h1>
                <div className={style.buttons}>
                    <NavLink className={style.button} to='/search'>Шукати інформацію про пісні</NavLink>
                    <NavLink className={style.button} to='/bands'>Шукати інформацію про гурти</NavLink>
                </div>
            </div>
        </>
    )
}
