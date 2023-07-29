const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');
const song =  document.getElementById('audio');
const cover =  document.getElementById('cover');
const play = document.getElementById('play');
const next = document.getElementById('next');
const previous = document.getElementById('previous');

const aThousandYears = {
  songName : 'a_thousand_years',
  artist : 'Christina Perri',
  file : 'a_thousand_years_christina_perri'
};
const boomBapFlick = {
  songName : 'Perect',
  artist : 'Ed Sheeran',
  file : 'ed_sheeran_perfect'
};
const cantHide = {
  songName : 'Photograph',
  artist : 'Ed Sheeran',
  file : 'photograph_ed_sheeran'
};
let isPlaying = false;
const playlist = [aThousandYears, boomBapFlick, cantHide];
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
  cover.src = `images/${playlist[index].file}.webp`;
  song.src = `songs/${playlist[index].file}.mp3`;
  songName.innerText = playlist[index].songName;
  bandName.innerText = playlist[index].artist;
}

function previousSong(){
  if(index === 0){
    index = playlist.length - 1;
  }else{
    index -= 1;
  }
  initializeSong();
  playSong();
}

function nextSong(){
  if(index === playlist.length - 1){
    index = 0;
  }else{
    index += 1;
  }
  initializeSong();
  playSong();
}

function updateProgressBar(){
  
}

initializeSong();

//capacidade de escutar eventos
play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
song.addEventListener('timeupdate', updateProgressBar);