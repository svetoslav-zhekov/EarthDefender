//Creating a Songs class
export default class Songs {
    constructor(songs){
        this.songs = songs
    }

    PlayRandSong() {
        // Get A Random Number From 0 To 2 And Play Song Acordingly
        var song = Math.floor(Math.random() * 3);
        this.songs[song].play();
    }
}