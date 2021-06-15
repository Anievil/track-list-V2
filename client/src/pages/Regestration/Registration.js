import React from 'react'
import style from './Registration.module.css'
import Header from '../../components/Header/Header'
import { authActionRegistration, clearAuth } from '../../actions/actionCreator'
import { connect } from 'react-redux'
import ErrorBox from '../../components/ErrorMessage/ErrorMessage'
import { useHistory } from 'react-router-dom'
import CONSTANTS from '../../constants'

function Registration(props) {
  const history = useHistory()
  const authorization = (e) => {
    e.preventDefault()
    const val = { name: e.target.elements.login.value, password: e.target.elements.pass.value, role: 'moderator' }
    props.regRequest(val, history)
  }
  return (
    <>
      <Header backLink='/' />
      {window.localStorage.getItem(CONSTANTS.ACCESS_TOKEN) != null ?
        <>
          {  props.userStore.error != null ? <ErrorBox error={props.userStore.error.data} /> : ''}
          <form className={style.loginForm} onSubmit={authorization}>
            <h2 align='center'>Реєстрація</h2>
            <input className={style.loginInput} type='text' name='login' />
            <input className={style.loginInput} type='password' name='pass' />
            <input className={style.submit} type='submit' value='Відправити' />
          </form>
        </>
        : <>
          <p></p>
          <ErrorBox error='У вас недостатньо прав для цього' />
        </>
      }
    </>
  )
}
const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => (
  {
    regRequest: (data, history) => dispatch(authActionRegistration(data, history)),
    authClear: () => dispatch(clearAuth()),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
