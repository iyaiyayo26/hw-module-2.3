const express = require('express');
const app = express();
app.use(express.json());


let playlist = [
    
]

const getPlaylist = () => {
    return playlist;
}

const addSong = (title, artists) => {
    let song = {
        songId: generateSongId(),
        title,
        artists,
        playCount: 0
    }
    playlist.push(song);
    return song;
}

const generateSongId = () => {
    const randomId = Math.random().toString(10).substring(2, 6);
    return `song${randomId}`;
}

const getSong = (songId) => {
    const song = playlist.find(s => s.songId === songId);
    return song;
}

const sortedPlaylist = () => {
    const sorted = [...playlist].sort((a, b) => b.playCount - a.playCount);
    return sorted;
}


app.get('/playlist', (req, res) => {
    const playlist = getPlaylist();
    res.status(200).json({playlist});
})

app.post('/playlist', (req, res) => {
    const {title, artists} = req.body;
    const song = addSong({title, artists});
    res.status(201).json({message: "lagu berhasil ditambah"});
})

app.put('/playlist/:songId', (req, res) => {
    const songId = req.params.songId;
    
    const song = getSong(songId);
    if(song){
        song.playCount++;
        res.status(200).json({song});
    }else{
        res.status(404).json({message: "lagu tidak ditemukan"});   
    }
})

app.get('/playlist/sorted', (req, res) => {
    const sortedPlaylist = sortedPlaylist();
    res.status(200).json({sortedPlaylist});
})

app.listen(3000, () => {
    console.log('app: http://localhost:3000');
})