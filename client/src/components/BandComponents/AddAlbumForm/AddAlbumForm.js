import React from 'react'
import { Paper, TextField, Typography } from '@material-ui/core'
import AddBoxIcon from '@material-ui/icons/AddBox';
import CancelIcon from '@material-ui/icons/Cancel'
import { Formik } from 'formik'
import { connect } from 'react-redux'
import style from './AddAlbumForm.module.css'
import notFoundImage from '../../../icons/notFoundImage.jpg'
import { sendAlbumData } from '../../../actions/actionCreator'
import { useHistory } from 'react-router-dom';


function AddAlbumForm(props) {
    const history = useHistory()

    let initialValues = {
        albumName: '',
        bandId: props._id,
        albumPic: '',
    }

    const closeForm = () =>{
        props.close();
    }

    const handleSubmit = (data) => {
        props.AlbumData(data);
        props.close()
        history.push(`/band/${props._id}`)
    }

    return (
        <div className={style.style}>
            <Paper variant="outlined" className={style.mainInfoBlock}>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    children={(props) => <FormikForm {...props} closeForm={closeForm}/>}
                    className={style.Info}
                />
            </Paper>
        </div>
    )
}


function FormikForm({
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    closeForm
}) {
    const handleFileInputChange = (event) => {
        let reader = new FileReader();
        reader.onloadend = () => {
            setFieldValue("albumPic", reader.result);
        }
        reader.readAsDataURL(event.currentTarget.files[0]);
    }
    return (
        <form
            onSubmit={handleSubmit}
            className={style.editMode}
            encType='multipart/form-data'
        >
            <div className={style.topInfo}>
                <div className={style.imageWrapper}>
                    <img className={style.posterImage} src={values.albumPic || notFoundImage} />
                    <input className={style.imageInput} type='file'
                        name='albumPic'
                        onChange={handleFileInputChange}
                        accept="image/*"
                        required
                    />
                </div>
                <div className={style.shortInfo}>
                    <div className={style.description}>
                        <Typography variant='h6'><b>Назва альбому: </b></Typography>
                        <TextField
                            className={style.inputForm}
                            name='albumName'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.bandName}
                            autoComplete="off"
                            required
                        />
                    </div>
                </div>

            </div>
            <div className={style.optionsButtonGroup}>
                <div onClick={closeForm} className={style.closeButton}><CancelIcon /></div>
                <button type='submit'  className={style.saveButton}><AddBoxIcon /></button>
            </div>
        </form>
    )
}


const mapDispatchToProps = (dispatch) => (
    {
        AlbumData: (data) => dispatch(sendAlbumData(data)),
    }
);

export default connect(null, mapDispatchToProps)(AddAlbumForm)
