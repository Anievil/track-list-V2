import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import style from './ArtistPage.module.css'
import load from '../../../icons/loading.gif';
import query from '../../../api(Old)/index'
import Header from '../../../components/Header/Header'
import close from '../../../icons/close.svg'
import open from '../../../icons/open.svg'

export default function ArtistPage() {
    const x = useParams()
    const [data, setData] = useState(null)
    const [isLoading, setIsFetching] = useState(true)
    const [album, setAlbums] = useState(null)
    const [rand, setRandom] = useState(null)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [icon, setIcon] = useState(open)

    const getInfo = async (id) => {
        const res = await query.getArtistInfo(id)

        if (res !== undefined && res.data.results !== undefined) {
            setData(res.data.results[0])
            res.data.results.shift()
            setAlbums(res.data.results)
            setRandom(Math.floor(Math.random() * (res.data.results.length - 0)) + 0)
            setIsFetching(false)
        }
    }

    const menuAction = () => {
        if(isMenuOpen){
            setIsMenuOpen(false)
            setIcon(open)
        }
        else{
            setIsMenuOpen(true)
            setIcon(close)
        }
    }

    useEffect(() => {
        getInfo(x.id)
    }, [x.id])


    return (
        <>
            { isLoading ? <div className='load'><img src={load} alt='loading spinner' /></div> :
                <>
                    <div onClick={menuAction} className={style.menuButton}><img className={style.iconMenu} src={icon} /></div>
                    { isMenuOpen ? <div className={style.closeMenu}><Header backLink='/search' /></div> : ''}
                    <header style={{ backgroundImage: `url(${album[rand].artworkUrl100})` }}>
                        <div className={style.headerTitle}>
                            <img className={style.profileImg} src={album[rand].artworkUrl100} alt='Ops...' />
                            <h1>{data.artistName}</h1>
                        </div>
                    </header>
                    <main>
                        <h2>Альбоми</h2>
                        <div className={style.albumList}>
                            {album.map((item) => (
                                <div key={item.collectionId} className={style.albumCard}>
                                    <img src={item.artworkUrl60} alt='AlbumPic' />
                                    <p>Collection name: <em><strong>{item.collectionName}</strong></em></p>
                                    <p>Collection price: <em><strong>{item.collectionPrice}</strong></em></p>
                                    <p>Track count: <em><strong>{item.trackCount}</strong></em></p>
                                </div>
                            ))}
                        </div>
                    </main>
                </>
            }
        </>
    )
}
