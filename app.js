


document.addEventListener("DOMContentLoaded", () => {
    const audio = new Audio();
    let isPlaying = false;
    let songIndex = 0;

    const songs = [
        {
            title: "Water",
            artist: "Diljit Dosanjh, MixSingh, Raj Ranjodh",
            src: "songs/water.mp3",
            img: "img1.jpg"
        },
        {
            title: "Sahiba",
            artist: "Jasleen Royal, Stebin Ben, Vijay Deverakonda",
            src: "songs/sahiba.mp3",
            img: "img2.jpg"
        },
        {
            title: "Morni",
            artist: "Badshah, Sharvi Yadav, Hiten",
            src: "songs/morni.mp3",
            img: "img3.jpg"
        },
        {
            title: "Tell Me",
            artist: "Karan Aujla, OneRepublic, Ikky",
            src: "songs/tellme.mp3",
            img: "img4.jpg"
        },
        {
            title: "Payal",
            artist: "Yo Yo Honey Singh, Paradox",
            src: "songs/payal.mp3",
            img: "img5.jpg"
        }
    ];

    const playPauseBtn = document.querySelector(".play-pause i");
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");
    const songTitle = document.querySelector(".song-details .name");
    const songPoster = document.getElementById("poster_master-play");
    const progressBar = document.getElementById("music-bar");
    const currentTimeDisplay = document.getElementById("current-time");
    const totalDurationDisplay = document.getElementById("total-duration");

    function loadSong(index) {
        audio.src = songs[index].src;
        songTitle.innerHTML = `${songs[index].title}<br><br>${songs[index].artist}`;
        songPoster.src = songs[index].img;
        progressBar.value = 0;
    }
  // Handle row click to play song
 
    function playSong() {
        isPlaying = true;
        playPauseBtn.innerText = "pause";
        audio.play();
    }

    function pauseSong() {
        isPlaying = false;
        playPauseBtn.innerText = "play_arrow";
        audio.pause();
    }

    playPauseBtn.addEventListener("click", () => {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    });
    document.querySelectorAll("tbody tr").forEach((row, index) => {
        row.addEventListener("click", function () {
          currentSongIndex = index;
          loadSong(currentSongIndex);
          playSong()
        });
      });
    nextBtn.addEventListener("click", () => {
        songIndex = (songIndex + 1) % songs.length;
        loadSong(songIndex);
        playSong();
    });

    prevBtn.addEventListener("click", () => {
        songIndex = (songIndex - 1 + songs.length) % songs.length;
        loadSong(songIndex);
        playSong();
    });

    audio.addEventListener("timeupdate", () => {
        let progress = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progress;

        let currentMinutes = Math.floor(audio.currentTime / 60);
        let currentSeconds = Math.floor(audio.currentTime % 60);
        if (currentSeconds < 10) currentSeconds = "0" + currentSeconds;

        let totalMinutes = Math.floor(audio.duration / 60);
        let totalSeconds = Math.floor(audio.duration % 60);
        if (totalSeconds < 10) totalSeconds = "0" + totalSeconds;

        currentTimeDisplay.textContent = `${currentMinutes}:${currentSeconds}`;
        totalDurationDisplay.textContent = `${totalMinutes}:${totalSeconds}`;
    });

    progressBar.addEventListener("input", () => {
        audio.currentTime = (progressBar.value / 100) * audio.duration;
    });

    audio.addEventListener("ended", () => {
        nextBtn.click();
    });

    loadSong(songIndex);
});

let isShuffling = false;
let originalPlaylist = [];
let shuffledPlaylist = [];

const shuffleButton = document.getElementById("shuffle");

const playlist = [
  { title: "Song 1", artist: "Artist A" },
  { title: "Song 2", artist: "Artist B" },
  { title: "Song 3", artist: "Artist C" },
  { title: "Song 4", artist: "Artist D" },
];

originalPlaylist = [...playlist]; // Store original order

// Shuffle function
function shuffleArray(array) {
  let newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Toggle shuffle
shuffleButton.addEventListener("click", () => {
  isShuffling = !isShuffling;
  
  if (isShuffling) {
    shuffledPlaylist = shuffleArray(originalPlaylist);
    console.log("Shuffled Playlist:", shuffledPlaylist);
  } else {
    console.log("Original Playlist:", originalPlaylist);
  }
  
  shuffleButton.classList.toggle("active", isShuffling);
});

