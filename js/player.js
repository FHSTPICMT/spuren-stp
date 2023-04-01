const musicContainer = document.querySelector('.img-container-gallery');
const playBtn= document.querySelector('#play');
const fullGps= document.querySelector('#full-gps');
const fullGallery= document.querySelector('#full-gallery');
const playGalleryBtn= document.querySelector('#play-gallery');
const nextGalleryBtn= document.querySelector('#next-gallery');
const prevGalleryBtn= document.querySelector('#prev-gallery');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
//const title = document.querySelector('#title');
const cover = document.querySelector('#cover');
/* Get the documentElement (<html>) to display the page in fullscreen */
var elem = document.documentElement;

// Song titles
const songs=["00_Welcome", '01_Die_Ortsansaessigen', '07_Die_Einfahrt','03_Verladestation','04_Die_Verladerampe', '08_Die_Wirtschaft','05_Die_Ortschaften', '11_Der_Baron','28_Die_Schotterwerbung', '13_Das_Ziegelwerk','27_Denunziert_und_deportiert', '33_Der_Landschaftsgarten','34_Die_Passionsspiele', '30_Der_Badeteich_und_das_Steinbrecherhaus', '15_Das_Steinbrecherhaus_Betrieb','16_Das_Steinbrecherhaus_Stilllegung', '23_Der_Aufseher','14_Das_Waechterhaus', '20_Der_Betriebsfuehrer','18_Der_Gefolgschaftsraum', '12_Die_Betriebsbaracke','21_Der_Nahrungsmangel', '26_Tag_der_Befreiung', '35_Die_Wehrsportuebungen','36_Rechtsradikale_Umtriebe', '29_Der_Badeteich','31_Der_Badeunfall','32_Die_Austrocknung_des_Teichs','09_Die_Kollegen','10_Das_Spalten', '22_Der_Kellerausbau','19_Die_Zwangsarbeit', '17_Das_NS-Arbeitsbuch_des_Steinbrucharbeiters','24_Das_Lager_im_Westen'];

// Keep track of the songs
let songIndex = 0;

if(audio != null)
{
    initApp();
}


function initApp()
{
    //title.innerText = "Willkommen bei Spuren lesbar machen. Berühren Sie den Play Button um zu starten.";
    audio.src = `audio/${songs[0]}.mp3`;
    cover.src = `img/${songs[0]}.jpg`;
}

function loadPosition(song)
{
    tempTitle = song.replace(/_/g, " ");
    console.log(tempTitle);
    //title.innerText = tempTitle.slice(3);
    audio.src = `audio/${song}.mp3`;
    cover.src = `img/${song}.jpg`;
    audio.play();
}

function playSong()
{
    //musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}

function playGallerySong()
{
    musicContainer.classList.add('play');
    playGalleryBtn.querySelector('i.fas').classList.remove('fa-play');
    playGalleryBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}

function pauseSong()
{
    musicContainer.classList.remove('play');
    playGalleryBtn.querySelector('i.fas').classList.add('fa-play');
    playGalleryBtn.querySelector('i.fas').classList.remove('fa-pause');
    audio.pause();
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
if(playBtn != null)
{
    playBtn.addEventListener('click', () =>
{
    playSong();
    openFullscreen();
    document.getElementById("play").style.display = "none";
    acquireLock();
    audio.onended = function() {
        hasStarted = true;
        SearchTriggerPos();
    };
})
}

if(playGalleryBtn != null)
{
    playGalleryBtn.addEventListener('click', () =>
    {
        const isPlaying = musicContainer.classList.contains('play');
        openFullscreen();
        if(isPlaying)
        {
            pauseSong();
        }
        else
        {
            playGallerySong();
        }

        //document.getElementById("play").style.display = "none";
        //acquireLock();
    })

    // Change Song Events
    prevGalleryBtn.addEventListener('click', prevSong);
    nextGalleryBtn.addEventListener('click', nextSong);
}


if(fullGallery != null)
{
    fullGallery.addEventListener('click', () =>
    {
        window.open("gallery.html", "_self");
    })

    fullGps.addEventListener('click', () =>
    {
        window.open("gps.html", "_self");
    })
}
if(audio != null)
{
    audio.addEventListener('timeupdate', updateProgress);
    progressContainer.addEventListener('click', setProgress);
}




//Automaticly continue when audio ended
//audio.addEventListener('ended', nextSong);


function loadSong(song)
{
    //title.innerText = song;
    audio.src = `audio/${song}.mp3`;
    cover.src = `img/${song}.jpg`;
}

function prevSong()
{
    songIndex--;

    if(songIndex < 0)
    {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);
    playGallerySong();
}

function nextSong()
{
    songIndex++;

    if(songIndex > songs.length - 1)
    {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);
    playGallerySong();
}

//Fullscreen
/* View in fullscreen */
function openFullscreen() {
    console.log("Fuuuullll");
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
  }
  
  /* Close fullscreen */
  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
  }