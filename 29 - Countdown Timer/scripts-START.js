const timer = document.querySelector('.timer')

const timerButtons = timer.querySelectorAll('.timer__button')
const customTimerForm = timer.querySelector('form')

const timeLeftLabel = timer.querySelector('.display__time-left')
const endTimeLabel = timer.querySelector('.display__end-time')

timerButtons.forEach(btn => btn.addEventListener('click', startPresetTimer))
customTimerForm.addEventListener('submit', startCustomTimer)

//

function startPresetTimer() {
  const seconds = +this.dataset.time
  startTimer(seconds)
}

function startCustomTimer(e) {
  e.preventDefault()
  const minutes = +this.minutes.value
  this.reset()
  if (! isNaN(minutes)) startTimer(minutes * 60)
}

//

let activeTimer = null

function startTimer(seconds) {
  const endTime = new Date(Date.now() + seconds * 1000)
  endTimeLabel.textContent = 'Be back at ' + formatTime(endTime)

  clearInterval(activeTimer)
  activeTimer = setInterval(() => updateTimer(endTime), 1000)
  updateTimer(endTime)
}

function updateTimer(endTime) {
  const remaining = endTime - Date.now()
  timeLeftLabel.textContent = formatSeconds(remaining > 0 ? remaining : 0)
  if (remaining < 0) clearInterval(activeTimer)
}

function formatSeconds(millis) {
  const totalSeconds = Math.round(millis / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${twoDigits(seconds)}`
}

function formatTime(date) {
  const hours = date.getHours()
  const minutes = date.getMinutes()
  return `${hours}:${twoDigits(minutes)}`
}

function twoDigits(number) {
  return (number < 10) ? `0${number}` : `${number}`
}
