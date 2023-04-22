let volume = document.querySelector('#volume')
let volumeValue = document.querySelector('.volume-value')
let volumeProgress = document.querySelector('.volume-progress')
let video = document.querySelector('.video')
let play = document.querySelector('#play')
let progressWrapper = document.querySelector('.progress-wrapper')
let progressBar = document.querySelector('.progress-bar')
let volumeIcon = document.querySelector('.volume-icon')
let playbackSpeed = document.querySelector('#speed')
let fullScreenBtn = document.querySelector('.full-screen')
let controls = document.querySelector('.controls')


// volume bar
volume.addEventListener('input', (e)=>{
    volumeValue.innerText = `${volume.value}`
    if(volume.value == 0){
        volumeIcon.classList.replace('fa-volume-low', 'fa-volume-xmark')
    }
    else{
        volumeIcon.classList.replace('fa-volume-xmark', 'fa-volume-low')
    }
    volumeProgress.value = volume.value
    video.volume = volume.value/100;
})

// play button functionality
function playPause() {
    if (video.paused){
        video.style.opacity = 1;
        video.play()
        play.classList.replace('fa-circle-play', 'fa-circle-pause')
    }
    else{
        video.style.opacity = .7;
        video.pause()
        play.classList.replace('fa-circle-pause', 'fa-circle-play')
    }
}
play.addEventListener('click', playPause)
document.addEventListener('keydown', (e)=>{
    if(e.code === 'Space' || e.code === 'Enter'){
        play.click()
    }
})
video.addEventListener('ended', ()=>{
    play.classList.replace('fa-circle-pause', 'fa-circle-play')
    video.style.opacity = .5;
})

// video progress bar
// video.addEventListener('timeupdate', (e)=>{
//     let duration = e.srcElement.duration
//     let currentTime = e.srcElement.currentTime
//     let width = (currentTime/duration)*100
//     progressBar.style.width = `${width}%`
// })

let progressInput = document.querySelector('#progress-bar')
let progressValue = document.querySelector('#video-progress')
progressInput.addEventListener('input', (e)=>{
    progressValue.value = progressInput.value
})
progressInput.addEventListener('input', (e)=>{
    let progValue = progressInput.value
    let timeMultiplier = progValue/100
    let duration = video.duration
    let time = duration * timeMultiplier
    time = time.toFixed(2)
    video.currentTime = time
    progressValue.value = progressInput.value
})
video.addEventListener('timeupdate', (e)=>{
    let duration = video.duration
    let currentTime = video.currentTime
    let percentage = Math.floor((currentTime/duration)*100)
    progressInput.value = percentage
    progressValue.value = percentage
})
video.addEventListener('dblclick', playPause)
video.addEventListener('click', ()=>{
  const timeoutId =  setTimeout(() => {
    controls.classList.add('hover')
  }, 20);
  setTimeout(()=>{
    clearTimeout(timeoutId)
    controls.classList.remove('hover')
  }, 3000)
})
playbackSpeed.addEventListener('change', (e)=>{
    video.playbackRate = playbackSpeed.value
})

// updating time bar
let videoDuration = document.querySelector('.duration')
let videoCurrentTime = document.querySelector('.current-time')

function updateTime(duration, currentTime) {
   let dminutes = Math.floor(duration / 60)
   let dseconds = (duration % 60).toFixed(0)
   if(dminutes <= 9){
    dminutes = `0${dminutes}`
   }
   if(dseconds <= 9){
    dseconds = `0${dseconds}`
   }
   videoDuration.innerText = ` ${dminutes}:${dseconds}`
   let cminutes = Math.floor(currentTime / 60)
   let cseconds = (currentTime % 60).toFixed(0)
   if(cminutes <= 9){
    cminutes = `0${cminutes}`
   }
   if(cseconds <= 9){
    cseconds = `0${cseconds}`
   }
   videoCurrentTime.innerText = `${cminutes}:${cseconds} / `
}
video.addEventListener('timeupdate', (e)=>{
   let currentTime = video.currentTime
   let duration = video.duration

   updateTime(duration, currentTime)
})

// full screen functionality

// function openFullscreen() {
//   if (video.requestFullscreen) {
//     video.requestFullscreen();
//   } else if (video.webkitRequestFullscreen) { /* Safari */
//     video.webkitRequestFullscreen();
//   } else if (video.msRequestFullscreen) { /* IE11 */
//     video.msRequestFullscreen();
//   }
//   full = true
//   console.log('click')
// }

// /* Close fullscreen */
// function closeFullscreen() {
//   if (document.exitFullscreen) {
//     document.exitFullscreen();
//   } else if (document.webkitExitFullscreen) { /* Safari */
//     document.webkitExitFullscreen();
//   } else if (document.msExitFullscreen) { /* IE11 */
//     document.msExitFullscreen();
//   }
//   full = false
//   console.log('clicked')
// }
function toggleFullScreen() {
  var videoElement = document.getElementById("video");

  if (!document.fullscreenElement) {
    videoElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen(); 
    }
  }
}
fullScreenBtn.addEventListener('click', ()=>{
    toggleFullScreen()
})

// update volume funciton 

function updateVolumeUp() {
  volume.value = parseInt(volume.value) + 3;
  volumeProgress.value = volume.value
  video.volume = volume.value/100;
  volumeValue.innerText = `${volume.value}`
}
function updateVolumeDown() {
  volume.value = parseInt(volume.value) - 3;
  volumeProgress.value = volume.value
  video.volume = volume.value/100;
  volumeValue.innerText = `${volume.value}`
}

// end of update volume function

// activate full screen on/of on f key
document.addEventListener('keydown', (e)=>{
  if(e.code === 'KeyF'){
    fullScreenBtn.click()
  }

  if(e.keyCode == '38'){
    updateVolumeUp()
  }
  if(e.keyCode == '40'){
    updateVolumeDown()
  }
})