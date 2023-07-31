const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');
const song =  document.getElementById('audio');
const cover =  document.getElementById('cover');
const play = document.getElementById('play');
const next = document.getElementById('next');
const previous = document.getElementById('previous');
const currentProgress = document.getElementById('current-progress');
const progressContainer = document.getElementById('progress-container');
const shuffleButton = document.getElementById('shuffle');
const repeatButton = document.getElementById('repeat');

//array de musica
const aThousandYears = {
  songName : 'a_thousand_years',
  artist : 'Christina Perri',
  file : 'a_thousand_years_christina_perri'
};
const boomBapFlick = {
  songName : 'Perfect',
  artist : 'Ed Sheeran',
  file : 'ed_sheeran_perfect'
};
const cantHide = {
  songName : 'Photograph',
  artist : 'Ed Sheeran',
  file : 'photograph_ed_sheeran'
};
const happyBirthday = {
  songName : 'happy_birthday',
  artist : 'THE KIBOOMERS',
  file : 'happy_birthday'
};


let isPlaying = false;
let isShuffled = false;
let repeatOn = false;
const originalPlaylist = [aThousandYears, boomBapFlick, cantHide, happyBirthday];
let sortedPlaylist = [...originalPlaylist];
let index = 0;

function playSong(){
  play.querySelector('.bi').classList.remove('bi-play-circle-fill');
  play.querySelector('.bi').classList.add('bi-pause-circle-fill');
  song.play();
  isPlaying = true;
}

function pauseSong(){
  play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
  play.querySelector('.bi').classList.add('bi-play-circle-fill');
  song.pause();
  isPlaying = false;
}

function playPauseDecider(){
  if(isPlaying === true){
    pauseSong();
  }
  else{
    playSong();
  }
}

function initializeSong(){
  cover.src = `images/${sortedPlaylist[index].file}.webp`;
  song.src = `songs/${sortedPlaylist[index].file}.mp3`;
  songName.innerText = sortedPlaylist[index].songName;
  bandName.innerText = sortedPlaylist[index].artist;
}

function previousSong(){
  if(index === 0){
    index = sortedPlaylist.length - 1;
  }else{
    index -= 1;
  }
  initializeSong();
  playSong();
}

function nextSong(){
  if(index === sortedPlaylist.length - 1){
    index = 0;
  }else{
    index += 1;
  }
  initializeSong();
  playSong();
}

function updateProgressBar(){
  const barWidth = (song.currentTime/song.duration)*100;
  currentProgress.style.setProperty('--progress', `${barWidth}%`)
}

function jumpTo(event){
  const width = progressContainer.clientWidth;
  const clickPosition = event.offsetX;//saber onde cliquei na barra de progresso
  const jumpToTime = (clickPosition/width)*song.duration;
  song.currentTime = jumpToTime;
}

function shuffleArray(preShuffleArray){
  const size = preShuffleArray.length;
  let currentIndex = size - 1;
  while(currentIndex > 0){
    let randonIndex = Math.floor(Math.random()* size);
    let aux = preShuffleArray[currentIndex];
    preShuffleArray[currentIndex] = preShuffleArray[randonIndex];
    preShuffleArray[randonIndex] = aux;
    currentIndex -= 1;
  }
}

function shuffleButtonClicked(){
  if(isShuffled === false){
    isShuffled = true;
    shuffleArray(sortedPlaylist);
    shuffleButton.classList.add('button-active');
  }
  else{
    isShuffled = false;
    sortedPlaylist = [...originalPlaylist];
    shuffleButton.classList.romove('button-active');
  }
}

function repeatButtonClicked(){
  if(repeatOn === false){
    repeatOn = true;
    repeatButton.classList.add('button-active');
  }else{
    repeatOn = false;
    repeatButton.classList.remove('button-active');
  }
}

function nextOrRepeat(){
  if(repeatOn === false){
    nextSong();
  }else{
    playSong();
  }
}

initializeSong();

//capacidade de escutar eventos
play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
song.addEventListener('timeupdate', updateProgressBar);
song.addEventListener('ended', nextOrRepeat)
progressContainer.addEventListener('click', jumpTo);
shuffleButton.addEventListener('click', shuffleButtonClicked);
repeatButton.addEventListener('click', repeatButtonClicked);