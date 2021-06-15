import React from 'react'
import style from './ErrorMessage.module.css'

export default function ErrorMessage(props) {
    return (
        <div className={style.errorBox}>
            <h2>{props.error}</h2>
        </div>
    )
}
