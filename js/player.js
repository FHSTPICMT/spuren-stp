const musicContainer = document.querySelector('.music-container');
const playBtn= document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');

// Song titles
const songs=["00_Welcome","01_Die_Ortsansaessigen","02_Steinbruch_Ort","03_Verladestation","04_Das_Lager","05_Die_Ortschaften", "06_Die_Kirche", "07_Die_Einfahrt", "08_Die_Wirtschaft", "09_Die_Kollegen", "10_Das_Spalten"];

// Keep track of the songs
let songIndex = 0;

initApp();

function initApp()
{
    title.innerText = "Willkommen bei Spuren lesbar machen. Berühren Sie den Play Button um zu starten.";
    audio.src = `audio/${songs[0]}.mp3`;
    cover.src = `img/${songs[0]}.jpg`;
}

function loadSong(song)
{
    title.innerText = song;
    audio.src = `audio/${song}.mp3`;
    cover.src = `img/${song}.jpg`;
}

function loadPosition(song)
{
    tempTitle = song.replace(/_/g, " ");
    console.log(tempTitle);
    title.innerText = tempTitle.slice(3);
    audio.src = `audio/${song}.mp3`;
    cover.src = `img/${song}.jpg`;
    audio.play();
}

function playSong()
{
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}

function pauseSong()
{
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    audio.pause();
}

function prevSong()
{
    songIndex--;

    if(songIndex < 0)
    {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);
    playSong();
}

function nextSong()
{
    songIndex++;

    if(songIndex > songs.length - 1)
    {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);
    playSong();
}

function updateProgress(e)
{
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

function setProgress(e)
{
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

// Event Listeners
playBtn.addEventListener('click', () =>
{
    /*
    const isPlaying = musicContainer.classList.contains('play');

    if(isPlaying)
    {
        pauseSong();
    }
    else
    {
        playSong();
    } */
    playSong();
    title.innerText = "Bewegen Sie sich durch das Gelände und entdecken Sie dessen Geschichte.";
    document.getElementById("play").style.display = "none";
    acquireLock();
    audio.onended = function() {
        hasStarted = true;
    };
})

// Change Song Events
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click', setProgress);

//Automaticly continue when audio ended
//audio.addEventListener('ended', nextSong);
