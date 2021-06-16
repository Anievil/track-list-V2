import React, { useState, useEffect } from 'react'
import Form from '../../../components/SearchForm/form'
import { connect } from 'react-redux'
import { getBandList, findBand, clear } from '../../../actions/actionCreator'
import AddBand from '../../../components/BandComponents/AddBand/AddBand'
import BandList from '../../../components/BandComponents/BandList/BandList'
import style from './BandListPage.module.css'
import addIcon from '../../../icons/add.svg'
import Header from '../../../components/Header/Header'
import CONSTANTS from '../../../constants'

function BandListPage(props) {
    const [hidden, setHidden] = useState(true)
    const [role, setRole] = useState(null)

    const send = (e) => {
        if (e) {
            e.preventDefault()
            e.target.elements.search.value = e.target.elements.search.value.replace(/\s+$/, '');
            let words = e.target.elements.search.value.split(' ');
            for (let i = 0; i < words.length; i++) {
                words[i] = words[i].slice(0, 1).toUpperCase() + words[i].slice(1);
            }
            e.target.elements.search.value = words.join(' ');
            if (e.target.elements.search.value !== '') {
                const el = { value: e.target.elements.search.value }
                props.FindBandRequest(el)
            }
            else {
                props.BandListRequest()
            }
        }
    }
    console.log(props)
    useEffect(() => {
        props.BandListRequest()
        if (props.userStore.data !== undefined) {
            if (props.userStore.data) {
                setRole(props.userStore.data[0].role)
            }
        }
        return () => {props.clearData()}

    }, [props.Store.status])

    return (
        <div>
            <Header backLink='/' />
            <Form onSubmit={send} />
            { role === CONSTANTS.MODER ? <div className={style.buttonAdd} onClick={() => { setHidden(false) }}> <img className={style.icon} src={addIcon} alt='icon' /></div> : '' }
            { !hidden ? <AddBand close={() => { setHidden(true) }} /> : ''}
            { props.Store.data ? <BandList bandData={props.Store.data} /> : ''}
        </div>
    )
}

const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = (dispatch) => (
    {
        BandListRequest: () => dispatch(getBandList()),
        FindBandRequest: (data) => dispatch(findBand(data)),
        clearData: () => dispatch(clear())
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(BandListPage)
