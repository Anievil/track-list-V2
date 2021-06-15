import React from 'react'
import { Paper, TextareaAutosize, TextField, Typography } from '@material-ui/core'
import AddBoxIcon from '@material-ui/icons/AddBox';
import CancelIcon from '@material-ui/icons/Cancel'
import { Formik } from 'formik'
import { connect } from 'react-redux'
import style from './AddBand.module.css'
import notFoundImage from '../../../icons/notFoundImage.jpg'
import { sendBandData } from '../../../actions/actionCreator'
import { useHistory } from 'react-router-dom';


function AddBand(props) {
    const history = useHistory()

    let initialValues = {
        bandName: '',
        bandDescription: '',
        bandProfPic: '',
    }

    const closeForm = () =>{
        props.close();
    }

    const handleSubmit = (data) => {
        data.bandName = data.bandName.replace(/\s+$/, '');
        let words = data.bandName.split(' ');
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i].slice(0, 1).toUpperCase() + words[i].slice(1);
        }
        data.bandName = words.join(' ');
        props.BandData(data);
        props.close()
        history.push('/bands')
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
            setFieldValue("bandProfPic", reader.result);
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
                    <img className={style.posterImage} src={values.bandProfPic || notFoundImage} />
                    <input className={style.imageInput} type='file'
                        name='bandProfPic'
                        onChange={handleFileInputChange}
                        accept="image/*"
                        required
                    />
                </div>
                <div className={style.shortInfo}>
                    <div className={style.description}>
                        <Typography variant='h6'><b>Назва гурту: </b></Typography>
                        <TextField
                            className={style.inputForm}
                            name='bandName'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.bandName}
                            autoComplete="off"
                            required
                        />
                    </div>

                    <div className={style.bottomInfo}>
                        <Typography variant='body1'><b>Опис: </b></Typography>
                        <TextareaAutosize
                            className={style.inputBigForm}
                            name='bandDescription'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            autoComplete="off"
                            value={values.bandDescription}
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
        BandData: (data) => dispatch(sendBandData(data)),
    }
);

export default connect(null, mapDispatchToProps)(AddBand)