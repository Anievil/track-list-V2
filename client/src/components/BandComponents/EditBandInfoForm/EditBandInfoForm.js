import React, { useState } from 'react'
import { connect } from 'react-redux'
import { editBandInfo, findBand } from '../../../actions/actionCreator'
import style from './EditBandInfoForm.module.css'
import save from '../../../icons/diskette.svg'
import { Formik } from 'formik'

function EditBandInfoForm(props) {
    const [name, setName] = useState(props.x.bandName)
    const [desc, setDesc] = useState(props.x.bandDescription)
    const [pic, setPic] = useState(null)

    const handelChange = (e) => {
        e.preventDefault()
        if (e.target.name === 'bandName') {
            setName(e.target.value)
        }
        else {
            setDesc(e.target.value)
        }
    }

    const send = (e) => {
        e.preventDefault()
        let bandData
        e.target.elements.bandName.value = e.target.elements.bandName.value.replace(/\s+$/, '');
        let words = e.target.elements.bandName.value.split(' ');
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i].slice(0, 1).toUpperCase() + words[i].slice(1);
        }
        const result = words.join(' ');
        bandData = { _id: props.x._id, bandName: result, bandProfPic: pic || props.x.bandProfPic, bandDescription: e.target.elements.bandDesc.value }
        console.log(bandData)
        props.EditBandInfo(bandData)
        props.closeBut()
    }

    const handleFileInputChange = (event) => {
        let reader = new FileReader();
        reader.onloadend = () => {
            setPic(reader.result)
            props.updatePic(reader.result);
        }
        reader.readAsDataURL(event.currentTarget.files[0]);
    }

    return (
        <form onSubmit={send} encType='multipart/form-data'>
            <input className={style.inputPic} type='file' accept="image/*" onChange={handleFileInputChange} name='bandPic' autoComplete='off' />
            <input className={style.inputName} type='text' placeholder='Введіть назву гурту' value={name} name='bandName' autoComplete='off' onChange={handelChange} />
            <textarea className={style.inputDesc} type='text' placeholder='Введіть описання гурту' value={desc} name='bandDesc' onChange={handelChange} />
            <button className={style.send}><img className={style.iconEdit} type='submit' src={save} /></button>
        </form>
    )
}

const mapDispatchToProps = (dispatch) => (
    {
        EditBandInfo: (data) => dispatch(editBandInfo(data)),
    }
);

export default connect(null, mapDispatchToProps)(EditBandInfoForm)
