import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { findBand, editBandInfo } from '../../../actions/actionCreator'
import style from './BandInfo.module.css'
import AlbumsList from '../../../components/BandComponents/AlbumsList/AlbumsList'
import Header from '../../../components/Header/Header'
import editIcon from '../../../icons/pencil.svg'
import close from '../../../icons/closeIcon.svg'
import save from '../../../icons/diskette.svg'
import EditBandInfoForm from '../../../components/BandComponents/EditBandInfoForm/EditBandInfoForm'
import CONSTANTS from '../../../constants'

function BandInfo(props) {
    const [isChanging, setIsChanging] = useState(false)
    const [editButtonValue, setEditButtonValue] = useState(editIcon)
    const [role, setRole] = useState(null)
    const [changePic, setChangePic] = useState(null)

    const x = useParams()

    const edit = () => {
        if (!isChanging) {
            setIsChanging(true)
            setEditButtonValue(close)
        }
        else {
            setChangePic(null)
            setIsChanging(false)
            setEditButtonValue(editIcon)
        }
    }
    
    const closeBut = () => {
        setChangePic(null)
        setIsChanging(false)
        setEditButtonValue(editIcon)
    }

    useEffect(() => {
        props.FindBandRequest(x)
        if (props.userStore.data != undefined) {
            if (props.userStore.data) {
                setRole(props.userStore.data[0].role)
            }
        }
    }, [props.Store])

    const updatePic = (value) => {
        setChangePic(value)
    }

    return (
        <>
            <Header backLink='/bands' />
            { props.Store.data ?
                <div className={style.bandPage}>
                    <div className={style.infoCont}>
                        { role === CONSTANTS.MODER ?<button onClick={edit} className={style.editButton}><img className={style.iconEdit} src={editButtonValue} /></button> : '' }
                        
                        <img className={style.bandPic} src={changePic || props.Store.data[0].bandProfPic} alt='bandPic' />
                        {!isChanging ?
                            <>
                                <h2 className={style.name}>{props.Store.data[0].bandName}</h2>
                                <p className={style.desc}>{props.Store.data[0].bandDescription}</p>
                            </> :
                            <EditBandInfoForm x={props.Store.data[0]} updatePic={updatePic} closeBut={closeBut}/>
                            }
                    </div>
                    <AlbumsList _id={x._id} />
                </div>
                : ''}
        </>
    )
}

const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = (dispatch) => (
    {
        FindBandRequest: (data) => dispatch(findBand(data)),
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(BandInfo)
