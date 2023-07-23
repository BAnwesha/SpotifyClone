console.log("Welcome to Spotify");

let index = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("progressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItem = Array.from(document.getElementsByClassName("songItem"));

let songs = [
  {
    songname: "Ave Maria",
    filePath: "songs/1.mp3",
    coverPath: "./covers/1.jpg",
  },
  { songname: "Dead By Daylight", filePath: "songs/2.mp3", coverPath: "./covers/2.jpeg" },
  { songname: "Summer Rock", filePath: "songs/3.mp3", coverPath: "/covers/3.jpeg" },
  {
    songname: "The Winchesters",
    filePath: "songs/4.mp3",
    coverPath: "./covers/4.jpeg",
  },
  {
    songname: "Hark The Herald",
    filePath: "songs/5.mp3",
    coverPath: "./covers/5.jpeg",
  },
  {
    songname: "Leaving Earth",
    filePath: "songs/6.mp3",
    coverPath: "./covers/6.jpeg",
  },
  {
    songname: "Faithful Blossoms",
    filePath: "songs/7.mp3",
    coverPath: "./covers/7.jpeg",
  },
  { songname: "Grace", filePath: "songs/8.mp3", coverPath: "./covers/8.jpeg" },
];

songItem.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songname;
});

masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
    element = document.getElementById(`${index }`);
    element.classList.remove("fa-play");
    element.classList.add("fa-pause");
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    gif.style.opacity = 0;
    Array.from(document.getElementsByClassName("songItemPlay")).forEach(
      (element) => {
        element.classList.remove("fa-pause");
        element.classList.add("fa-play");
      }
    );
  }
});

audioElement.addEventListener("timeupdate", () => {
  progress = parseFloat(
    (audioElement.currentTime / audioElement.duration) * 100
  );
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-pause");
      element.classList.add("fa-play");
      audioElement.pause();
      masterPlay.classList.remove("fa-pause-circle");
      masterPlay.classList.add("fa-play-circle");
      gif.style.opacity = 0;
    }
  );
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      if (audioElement.paused || audioElement.currentTime <= 0) {
        index = parseInt(e.target.id);
        element.classList.remove("fa-play");
        element.classList.add("fa-pause");
        masterSongName.innerText = songs[index].songname;
        audioElement.src = `songs/${index + 1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        gif.style.opacity = 1;
      } else {
        makeAllPlays();
      }
    });
  }
);

document.getElementById("next").addEventListener("click", () => {
  if (index >= 7) {
    index = 0;
  } else {
    index += 1;
  }
  masterSongName.innerText = songs[index].songname;
  audioElement.src = `songs/${index + 1}.mp3`;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
  element = document.getElementById(`${index+1 }`);
  element.classList.remove("fa-play");
  element.classList.add("fa-pause");
  previousElement= document.getElementById(`${index }`);
  element.classList.remove("fa-pause");
  element.classList.add("fa-play");
});

document.getElementById("previous").addEventListener("click", () => {
  if (index <= 0) {
    index = 7;
  } else {
    index -= 1;
  }
  masterSongName.innerText = songs[index].songname;
  audioElement.src = `songs/${index + 1}.mp3`;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
  element = document.getElementById(`${index }`);
  element.classList.remove("fa-play");
  element.classList.add("fa-pause");
  previousElement= document.getElementById(`${index+1 }`);
  element.classList.remove("fa-pause");
  element.classList.add("fa-play");
});
