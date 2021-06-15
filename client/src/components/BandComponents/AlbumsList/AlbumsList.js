import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import style from './AlbumsList.module.css'
import { getAlbumList, deleteAlbum } from '../../../actions/actionCreator'
import AddAlbumForm from '../AddAlbumForm/AddAlbumForm'
import deleteIcon from '../../../icons/delete.svg'
import close from '../../../icons/closeIcon.svg'
import add from '../../../icons/add.svg'
import trash from '../../../icons/trash.svg'
import CONSTANTS from '../../../constants'

function AlbumsList({ data, ...props}) {
    const [isDeleteEvent, setIsDeleteEvent] = useState(false)
    const [deleteValue, setDeleteValue] = useState(trash)
    const [hidden, setHidden] = useState(true)
    const [role, setRole] = useState(null)

    const deleteAlbumButton = () => {
        if(!isDeleteEvent){
            setIsDeleteEvent(true)
            setDeleteValue(close)
        }
        else{
             setIsDeleteEvent(false)
             setDeleteValue(trash)
        }
    }

    const deleteAlbum = (id) =>{
        const albumId = {_id: id}
        props.DeleteAlbum(albumId)
    }

    useEffect(() => {
        const id = {bandId: props._id}
        
        props.BandsAlbumsRequest({bandId: props._id})
        if (props.userStore.data !== undefined) {
            if (props.userStore.data) {
                setRole(props.userStore.data[0].role)
            }
        }
    }, [props.albumStore])
    return (
        <div className={style.albumsListCont}>
            <div className={style.buttons} >
                { role === CONSTANTS.MODER ? <div className={style.buttonAdd} onClick={() => { setHidden(false) }}><img className={style.icons} src={add} /></div> : '' }
                { !hidden ? <AddAlbumForm _id={props._id} close={() => { setHidden(true) }} /> : ''}
                { props.albumStore.data && role === CONSTANTS.MODER ? <button className={style.buttonDelete} onClick={deleteAlbumButton}><img className={style.icons} src={deleteValue} /></button> : '' }
            </div>
            <h2 align='center'>Albums</h2>
            { props.albumStore.data ?
                <ul className={style.albumsList}>
                    {props.albumStore.data.map((album) => (
                        <li key={album._id} className={style.albumInfo}>
                            { isDeleteEvent ? <img onClick={() => deleteAlbum(album._id)} className={style.deleteIcon} src={deleteIcon} alt='delete'/> : ''}
                           <img className={style.albumPic} src={album.albumPic} alt='album pic' />
                            <p className={style.albumName}>{album.albumName}</p>
                        </li>
                    ))}
                </ul>
            : <h2>Ops... Albums not found or happened server error</h2>}
        </div>
    )
}

const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = (dispatch) => (
    {
        BandsAlbumsRequest: (data) => dispatch(getAlbumList(data)),
        DeleteAlbum: (data) => dispatch(deleteAlbum(data))
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(AlbumsList)
