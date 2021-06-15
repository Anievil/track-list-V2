import React, { useState, useEffect } from 'react'
import style from './BandList.module.css'
import { NavLink } from 'react-router-dom'

export default function BandList(props) {
    const [bandData, setBandData] = useState([])

    useEffect(() => {
        setBandData(props.bandData)
    }, [props.bandData])

    return (
        <ul className={style.bandList}>
            { bandData ? bandData.map((band) => (
                <NavLink key={band.bandName} to={`/band/${band._id}`}>
                    <li className={style.bandCard} >
                        <img className={style.bandPic} src={band.bandProfPic} alt='alt' />
                        <h2 className={style.bandNam}>{band.bandName}</h2>
                    </li>
                </NavLink>
            )) : ''}
        </ul>
    )
}
