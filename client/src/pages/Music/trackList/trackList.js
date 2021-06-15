import React from 'react'
import './trackListStyle.css';
import Input from '../../../components/SearchForm/form'
import music from '../../../icons/music.svg';
import load from '../../../icons/loading.gif';
import { NavLink } from 'react-router-dom'
import query from '../../../api(Old)/index';
import Header from '../../../components/Header/Header'

class TrackList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info: null,
            term: 'term',
            isLoading: true
        }
        this.json = this.json.bind(this)
    }

    async json(e) {
        if (e) {
            e.preventDefault();
            this.setState({
                term: e.target.elements.search.value
            })
        }
        const res = await query.getMusicList(this.state.term)
        this.setState({
            info: res.data.results,
        })
        this.setState({
            isLoading: false,
        })
    }

    async componentDidMount() {
        this.json()
    }

    openAccordeon(e) {
        e.preventDefault();

        const cont = e.target.parentNode;
        const list = cont.parentNode;

        const contArr = list.querySelectorAll('.trackListLi')

        for (let i = 1; i < contArr.length; i++) {
            const hidden = contArr[i].querySelector('.trackInfo'),
                button = contArr[i].querySelector('.trackListButton');                                        //открытие и закрытие аккордеона              
            if (!hidden.classList.contains('visibilityHidden') || e.target.parentNode !== contArr[i]) {
                hidden.classList.add('visibilityHidden')
                button.classList.remove('closeIcon')
            }
            else if (e.target.parentNode === contArr[i]) {
                hidden.classList.remove('visibilityHidden')
                e.target.classList.add('closeIcon');
            }
        }
    }

    render() {
        const {info, isLoading} = this.state;
        return (
            <>
                { isLoading ? <div className='load'><img src={load} alt='loading spinner' /></div> :
                    <>
                        <Header backLink='/' />
                        <Input onSubmit={this.json} />
                        <ul className='treckList'>
                            <li className='trackListLi'>
                                <p className='trackListP'>Гурт</p>
                                <p className='trackListP'>Пісня</p>
                                <p className='trackListP'>Альбом</p>
                                <p className='trackListP'>Жанр</p>
                            </li>
                            {
                                info.map(item => (
                                    <li key={item.trackId} className='trackListLi'>
                                        <img className='trackListImg' src={item.artworkUrl100} alt='Album preview' />

                                        <NavLink to={`/albums/${item.artistId}`}><p className='trackListP'>{item.artistName}</p></NavLink>

                                        <p className='trackListP'>{item.trackName}</p>
                                        <p className='trackListP'>{item.collectionName}</p>
                                        <p className='trackListP'>{item.primaryGenreName}</p>
                                        <div className='trackListButton' onClick={this.openAccordeon}></div>
                                        <div className='trackInfo visibilityHidden'>
                                            <div className='trackInfoName'>
                                                <h2 className='trackInfoNameH2'>{item.artistName} - {item.trackName}</h2>
                                                <img className='trackInfoNameImg' src={music} alt='Music icon' />
                                            </div>
                                            <div className='trackInfoBlock'>
                                                <div className='trackInfoAlbum'>
                                                    <p><strong>Альбом: </strong>{item.collectionName}</p>
                                                    <p><strong>Кількість пісень: </strong>{item.trackCount}</p>
                                                    <p><strong>Ціна: </strong>{item.collectionPrice} USD</p>
                                                </div>
                                                <div className='trackInfoTrack'>
                                                    <p><strong>Тривалість пісні: </strong>{Math.floor(item.trackTimeMillis / 1000 / 60)}:{Math.floor(item.trackTimeMillis / 1000 % 60) < 10 ? '0' + Math.floor(item.trackTimeMillis / 1000 % 60) : Math.floor(item.trackTimeMillis / 1000 % 60)} min</p>
                                                    <p><strong>Ціна пісні: </strong>{item.trackPrice} USD</p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </>
                }
            </>
        );
    }
}

export default TrackList