const btnPlay = document.querySelector(".btn-play");
const btnPlayI = document.querySelector(".btn-play i");
const btnPause = document.querySelector(".btn-pause");
const btnNext = document.querySelector(".btn-next");
const btnPrev = document.querySelector(".btn-prev");
const musicName = document.querySelector(".music-name");
const musicAuthor = document.querySelector(".music-author");
const playCurrentTime = document.querySelector("#player-current-time");
const playDuration = document.querySelector("#player-duration");
const playProgress = document.querySelector("#player-progress");
const audioPlayer = document.querySelector("#audio-player");

let currentMusic = 0;

const musics = [
  {
    name: "laal bindi",
    author: "akull",
    path: "/songs/Akull_-_Laal_Bindi.mp3",
  },
  {
    name: "jo tu na mila",
    author: "asim azhar",
    path: "/songs/Asim Azhar - Jo Tu Na Mila.mp3",
  },
  {
    name: "awara awara",
    author: "karn",
    path: "/songs/Awaara Video Song  Alone  Bipasha Basu  Karan Singh Grover.mp3",
  },
  {
    name: "Halka Halka Suroor",
    author: "Farhan Saeed",
    path: "/songs/Farhan Saeed - Halka Halka Suroor.mp3",
  },
  {
    name: "Tose_Naina_Lage",
    author: "Kshitij & Shilpa_Rao",
    path: "/songs/Tose_Naina_Lage__7C_Anwar__7C_Bollywood_Film_Song__7C_Kshitij_2C_Shilpa_Rao.m4a",
  },
];

btnPlay.addEventListener("click", togglePlayMusic);
btnPrev.addEventListener("click", () => changeMusic(false));
btnNext.addEventListener("click", () => changeMusic());
audioPlayer.addEventListener("timeupdate", timeUpdate);

function togglePlayMusic() {
  if (audioPlayer.paused) {
    audioPlayer.play();
    btnPlayI.classList.remove("fa-play-circle")
    btnPlayI.classList.add("fa-pause-circle");
  
  } else {
    audioPlayer.pause(); // changed paused() to pause()
    btnPlayI.classList.remove("fa-pause-circle");
    btnPlayI.classList.add("fa-play-circle");
   
  }
}

function changeMusic(next = true) { // changed arrow function to regular function
  if (next && currentMusic < musics.length - 1) {
    currentMusic++; // changed changeMusic++ to currentMusic++
  } else if (!next && currentMusic > 0) {
    currentMusic--; // changed currentMusic__ to currentMusic--
  } else {
    return;
  }
  updatePlayer();
  togglePlayMusic();
}

function updatePlayer() {
  const music = musics[currentMusic];
  musicName.innerHTML = music.name;
  musicAuthor.innerHTML = music.author; // changed MusicAuthor to musicAuthor
  audioPlayer.src = music.path;
}

function timeUpdate() {
  const { currentTime, duration } = audioPlayer;
  if (isNaN(duration)) return;
console.log(formatTime(duration))
  playDuration.innerHTML = formatTime(duration);
  console.log(formatTime(currentTime))
  playCurrentTime.innerHTML = formatTime(currentTime);
  console.log(duration)
  playProgress.max = duration;
  console.log(currentTime)
  playProgress.value = currentTime;
}

//using ternary operator
function formatTime(time) {
    // console.log(time)
    const minutes = Math.floor(time / 60);
    // console.log(minutes)
    const seconds = Math.floor(time % 60);
    // console.log(seconds)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  // using simple if else
/*  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    if (seconds < 10) {
      return `${minutes}:0${seconds}`;
    } else {
      return `${minutes}:${seconds}`;
    }
  }*/

  
window.onload = updatePlayer; // removed the arrow function
