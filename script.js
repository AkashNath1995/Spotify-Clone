console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItemContainer = document.getElementById('songItemContainer');

// Define songs for each singer
const singerSongsMap = {
    1: [
        { songName: "Bad Blood", filePath: "./songs/1.mp3", coverPath: "./covers/1.jpg" },
        { songName: "Song 2", filePath: "./songs/2.mp3", coverPath: "covers/2.jpg" },
        // Add more songs for Singer 1 as needed
    ],
    2: [
        { songName: "Song 1", filePath: "songs/singer2/1.mp3", coverPath: "covers/3.jpg" },
        { songName: "Song 2", filePath: "songs/singer2/2.mp3", coverPath: "covers/4.jpg" },
        // Add more songs for Singer 2 as needed
    ],
    // Add more singers as needed
};

let songs = [];

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    // Update Seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

// Function to load songs for a specific singer
function loadSongsForSinger(singerIndex) {
    // Clear the existing song items
    songItemContainer.innerHTML = '';

    // Update the songs array based on the selected singer
    songs = singerSongsMap[singerIndex] || [];

    // Dynamically create song items in the HTML
    songs.forEach((song, i) => {
        let songItem = document.createElement('div');
        songItem.className = 'songItem';

        let img = document.createElement('img');
        img.alt = i + 1;
        img.src = song.coverPath;

        let songName = document.createElement('span');
        songName.className = 'songName';
        songName.innerText = song.songName;

        let timestamp = document.createElement('span');
        timestamp.className = 'timestamp';
        timestamp.innerText = '05:34'; // You may set the actual timestamp

        let playIcon = document.createElement('i');
        playIcon.className = 'far songItemPlay fa-play-circle';
        playIcon.id = i;
        playIcon.onclick = function () {
            // Handle play icon click
            makeAllPlays();
            songIndex = parseInt(this.id);
            this.classList.remove('fa-play-circle');
            this.classList.add('fa-pause-circle');
            audioElement.src = song.filePath; // Set the actual file path
            masterSongName.innerText = song.songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        };

        timestamp.appendChild(playIcon);

        songItem.appendChild(img);
        songItem.appendChild(songName);
        songItem.appendChild(timestamp);

        // Append the dynamically created song item to the container
        songItemContainer.appendChild(songItem);
    });
}

// Your existing event listeners and code goes here

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})