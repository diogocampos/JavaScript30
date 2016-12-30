const player = document.querySelector('.player')

const video = player.querySelector('video')
const playButton = player.querySelector('.toggle')

const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')

const sliders = player.querySelectorAll('input[type="range"]')
const skipButtons = player.querySelectorAll('[data-skip]')


// Toggle playback when clicking the video or the Play/Pause button

video.addEventListener('click', togglePlay)
playButton.addEventListener('click', togglePlay)

function togglePlay() {
  video[video.paused ? 'play' : 'pause']()
}


// Keep the Play/Pause button in sync with the playback state

video.addEventListener('play', onTogglePlay)
video.addEventListener('pause', onTogglePlay)

function onTogglePlay() {
  playButton.textContent = (video.paused) ? '►' : '❚ ❚'
}


// Keep the progress bar updated

video.addEventListener('durationchange', updateProgress)
video.addEventListener('timeupdate', updateProgress)

function updateProgress() {
  const percentage = 100 * (video.currentTime / video.duration)
  progressBar.style.setProperty('flex-basis', `${percentage}%`)
}


// When the progress bar is clicked or scrubbed, seek to that position

progress.addEventListener('mousedown', seek)
progress.addEventListener('mousemove', scrub)

function seek(e) {
  const ratio = e.offsetX / progress.clientWidth
  video.currentTime = ratio * video.duration
}

function scrub(e) {
  if (e.buttons === 1) seek(e)
}


// Sliders for volume and playback rate

sliders.forEach(slider => slider.addEventListener('input', onSlider))

function onSlider() {
  const propertyName = this.name    // 'volume' or 'playbackRate'
  video[propertyName] = this.value
}


// Skip back/forward buttons

skipButtons.forEach(skipButton => skipButton.addEventListener('click', skip))

function skip() {
  const seconds = +this.dataset.skip
  video.currentTime += seconds
}


// Bonus: Full Screen button

const fullscreenButton = document.createElement('button')

// append button to player controls
fullscreenButton.classList.add('player__button')
fullscreenButton.title = 'Toggle Full Screen'
fullscreenButton.textContent = '⤢'
player.querySelector('.player__controls').append(fullscreenButton)

// add style rule for full screen player
document.styleSheets[0].insertRule(`
  .player:-webkit-full-screen {
    border: none;
    max-width: none;
    width: 100%;
  }
`, 0)

fullscreenButton.addEventListener('click', toggleFullscreen)

function toggleFullscreen() {
  if (document.webkitFullscreenElement) {
    document.webkitExitFullscreen()
  } else {
    player.webkitRequestFullscreen()
  }
}
