//Creating a Sounds class
export default class Sounds {
    constructor(sounds){
        this.sounds = sounds
    }

    PlayRandSound() {
        // Get A Random Number From 0 To 1 And Play Sound Acordingly
        var sound = Math.floor(Math.random() * 2);
        this.sounds[sound].play();
    }
}