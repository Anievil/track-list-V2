import axios from 'axios'

const query = {
    getArtistInfo:  async (id) => {
        return await axios.get(`https://itunes.apple.com/lookup?id=${id}&entity=album`)
    },
    getMusicList: async (term) => {
        return await axios.get(`https://itunes.apple.com/search?term=${term}&limit=10&media=music`)
    }
}

export default query