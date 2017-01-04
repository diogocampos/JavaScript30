const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

navigator.mediaDevices
  .getUserMedia({video: true, audio: false})
  .then(initVideo)

function initVideo(mediaStream) {
  video.srcObject = mediaStream
  video.addEventListener('canplay', initCanvas, {once: true})
  video.play()
}

function initCanvas() {
  ;[canvas.width, canvas.height] = [video.videoWidth, video.videoHeight]
  onAnimationFrame(() => {
    ctx.drawImage(video, 0, 0/*, canvas.width, canvas.height*/)
  })
}

function takePhoto() {
  snap.currentTime = 0
  snap.play()

  const dataURL = canvas.toDataURL('image/jpeg')
  strip.prepend(
    h('a', {href: dataURL, download: `Photo_${Date.now()}`},
      h('img', {src: dataURL})
    )
  )
}

function onAnimationFrame(callback) {
  function onFrame() {
    requestAnimationFrame(onFrame)
    callback()
  }
  requestAnimationFrame(onFrame)
}

function h(tagName, attributes, ...children) {
  const element = document.createElement(tagName)
  for (const [key, value] of Object.entries(attributes)) {
    if (value != null) element.setAttribute(key, value)
  }
  element.append(...children)
  return element
}
