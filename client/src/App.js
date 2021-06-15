import React, { useState, useEffect } from 'react';
import TrackList from './pages/Music/trackList/trackList'
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';
import ArtistPage from './pages/Music/ArtistPage/ArtistPage';
import Home from './pages/Home/Home'
import BandListPage from './pages/Band/BandListPage/BandListPage'
import BandInfo from './pages/Band/BandInfo/BandInfo'
import Canvas from './components/Canvas/Canvas'
import Login from './pages/Login/Login'
import Registration from './pages/Regestration/Registration'
import './index.css'
import CONSTANTS from './constants'
import {userData} from './actions/actionCreator'
import { connect } from 'react-redux'

function App(props) {
  const [token, setToken] = useState(window.localStorage.getItem(CONSTANTS.ACCESS_TOKEN));
  const logoutButton = () => {
    const userData = JSON.parse(window.localStorage.getItem('userData'))
    props.setUserData(userData)
    return <div className='menuButton'>
      <div className='openButton' onClick={openMenu}>
        <p>Hi, {userData[0].name}</p>
        <div className='openButtonImg' />
      </div>
      
      <div className='link' onClick={logOut}>LogOut</div>
      <div className='link'><a href='/registrationnewuser'> Новий <br />користувач </a></div>
    </div>
  }

  const openMenu = (e) =>{
    e.preventDefault()
    const button = e.target.querySelector('.openButtonImg')
    if(button){
      button.classList.toggle('openButtonImgActive')
      const block = e.target.parentNode
      block.classList.toggle('menuHeight')
    }
    else{
      const block = e.target.parentNode
      const mainBlock = e.target.parentNode.parentNode
      const button = block.querySelector('.openButtonImg')
      button.classList.toggle('openButtonImgActive')
      mainBlock.classList.toggle('menuHeight')
    }
    
  }

  const logOut = () => {
    localStorage.clear();
    props.setUserData(null)
    setToken(undefined)
    window.location.reload();
  }
  
  return (
    <>
      <Canvas />
      {token == undefined ? '' : logoutButton()}
      <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/registrationnewuser' component={Registration} />
            <Route exact path='/admin' component={Login} />
            <Route exact path='/search' component={TrackList} />
            <Route exact path='/albums/:id' component={ArtistPage} />
            <Route exact path='/band/:_id' component={BandInfo} />
            <Route exact path='/bands' component={BandListPage} />
          </Switch>
      </BrowserRouter>
    </>
  );
}

const mapDispatchToProps = (dispatch) => (
  {
    setUserData: (data) => dispatch(userData(data)),
  }
);

export default connect(null, mapDispatchToProps)(App);
