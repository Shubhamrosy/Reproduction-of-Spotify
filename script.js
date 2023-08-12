console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "ILzaam-Song", filePath: "songs/1.mp3", coverPath: "covers/1.jpeg"},
    {songName: "Khamoshiyan Arijit Singh (Slowed Reverb Lofi) Mp3 Song", filePath: "songs/2.mp3", coverPath: "covers/2.jpeg"},
    {songName: "Ek Raat Mp3 Song ", filePath: "songs/3.mp3", coverPath: "covers/3.jpeg"},
    {songName: "128-Phero Na Najariya - Qala 128 Kbps", filePath: "songs/4.mp3", coverPath: "covers/4.jpeg"},
    {songName: "128-Ghodey Pe Sawaar - Qala 128 Kbps", filePath: "songs/5.mp3", coverPath: "covers/5.jpeg"},
    {songName: "128-Saanson Ko - Zid 128 Kbps", filePath: "songs/2.mp3", coverPath: "covers/6.jpeg"},
    {songName: "Pee Loon Once Upon A Time In Mumbaai 320 Kbps", filePath: "songs/2.mp3", coverPath: "covers/7.jpeg"},
    {songName: "Raat Bhar Heropanti 128 Kbps", filePath: "songs/2.mp3", coverPath: "covers/8.jpeg"},
    {songName: "Deewana Kar Raha Hai - Raaz 3 128 Kbps", filePath: "songs/2.mp3", coverPath: "covers/9.jpeg"},
    {songName: "Tu Hi Haqeeqat Mp3 Song Download(StarSong.In)", filePath: "songs/4.mp3", coverPath: "covers/10.jpeg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

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