import { icons } from './assets/icons.js'

export default class AudioPlayer {
  constructor(selector, options) {
    this.audioSelector = selector
    this.options = options
    this.audioElement = document.querySelector(selector)
    this.wrapperClasses = [...this.audioElement.classList]
    this.wrapperElement = null
    this.url = this.getAudioUrl()
    this.progress = 0

    // Check if the selector exists and is an audio element
    if (!this.audioElement || this.audioElement.tagName !== 'AUDIO') {
      throw new Error('Invalid audio element selector.')
    }

    // Create the audio player UI
    this.createAudioPlayerUI()
  }

  getAudioUrl() {
    // Check if the 'src' attribute is set
    let audioUrl = this.audioElement.src

    // If 'src' is not set, check for <source> elements
    if (!audioUrl) {
      const sourceElements = this.audioElement.querySelectorAll('source')

      // Use the first <source> element's 'src' attribute
      if (sourceElements.length > 0) {
        audioUrl = sourceElements[0].src
      }
    }

    // If no URL is found, return null or handle it as needed
    return audioUrl || null
  }

  getClassNames() {
    return this.wrapperClasses.join(' ')
  }

  getClassSelectors() {
    let classes = []
    this.wrapperClasses.forEach(className => {
      let selector = `.${className}`
      classes.push(selector)
    })
    return classes.join('')
  }

  formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  getIcon(name) {
    return icons.get(name)
  }

  createAudioPlayerUI() {
    const template = `
      <div class='audio-player ${this.getClassNames()}' style="background-image: url('../src/assets/placeholder.svg'); --progress: ${this.progress}%">
  <img src='../src/assets/placeholder.svg' class='audio-player__image'/>
  <div class='audio-player__label'>
    <span class='audio-player__title'>Title</span>
    <span class='audio-player__subtitle'>Subtitle</span>
  </div>
  <div class='audio-player__progress'>
    <div class='audio-player__line'>
      <span class='audio-player__bullet'></span>
    </div>
    <div class='audio-player__time-wrapper'>
      <span class='audio-player__time audio-player__time--elapsed'>00:00</span>
      <span class='audio-player__time audio-player__time--duration'>00:00</span>
    </div>
  </div>
  <div class='audio-player__controls'>
    <button class='audio-player__btn'>
      ${this.getIcon('fast-rewind-outline')}
    </button>
    <button class='audio-player__btn audio-player__btn--play'>
      ${this.getIcon('play-outline')}
    </button>
    <button class='audio-player__btn'>
      ${this.getIcon('fast-forward-outline')}
    </button>
  </div>
</div>
    `

    this.audioElement.insertAdjacentHTML('afterend', template)
    this.audioElement.remove()
    this.wrapperElement = document.querySelector(`.audio-player${this.getClassSelectors()}`)
    this.addEventListeners()
  }

  addEventListeners() {
    this.addPlaybackEventListeners()
    this.addProgressUpdateEventListeners()
    this.addSeekerGrabEventListeners()
    this.addProgressLineClickEventListeners()
  }

  addPlaybackEventListeners() {
    const playButton = this.wrapperElement.querySelector('.audio-player__btn--play')
    playButton.addEventListener('click', () => {
      if (this.audioElement.paused) this.play()
      else this.pause()
    })
  }

  addProgressUpdateEventListeners() {
    this.updateDurationTime()
    this.audioElement.addEventListener('timeupdate', () => {
      this.progress = (this.audioElement.currentTime / this.audioElement.duration) * 100
      this.updateProgress()
      this.updateElapsedTime()
    })
  }

  addSeekerGrabEventListeners() {
    let isDragging = false
    let isPlaying = false
    const seeker = this.wrapperElement.querySelector('.audio-player__bullet')
    const progressLine = this.wrapperElement.querySelector('.audio-player__line')

    seeker.addEventListener('mousedown', () => {
      isDragging = true;
      isPlaying = !this.audioElement.paused
      seeker.style.cursor = 'grabbing';
      this.pause()
    });

    document.addEventListener('mousemove', (event) => {
      if (isDragging) {
        const rect = progressLine.getBoundingClientRect();
        let newLeft = event.clientX - rect.left;
        newLeft = Math.max(0, Math.min(newLeft, rect.width));

        this.progress = (newLeft / rect.width) * 100;
        this.updateProgress()
        this.updateElapsedTime()
      }
    });

    document.addEventListener('mouseup', (event) => {
      if (isDragging) {
        const rect = progressLine.getBoundingClientRect();
        let newLeft = event.clientX - rect.left;
        newLeft = Math.max(0, Math.min(newLeft, rect.width));
        this.audioElement.currentTime =  (newLeft / rect.width) * this.audioElement.duration;

        isDragging = false;
        seeker.style.cursor = 'grab';
        if (isPlaying) this.play()
      }
    });
  }

  addProgressLineClickEventListeners() {
    const progressLine = this.wrapperElement.querySelector('.audio-player__line')
    progressLine.addEventListener('click', (event) => {
      const rect = progressLine.getBoundingClientRect();
      const clickPosition = event.clientX - rect.left;
      this.audioElement.currentTime = (clickPosition / rect.width) * this.audioElement.duration;
    });
  }

  updateProgress() {
    this.wrapperElement.style.setProperty('--progress', `${this.progress}%`)
  }

  updateElapsedTime() {
    const elapsedTime = this.wrapperElement.querySelector('.audio-player__time--elapsed')
    elapsedTime.textContent = this.formatTime(this.audioElement.currentTime);
  }

  updateDurationTime() {
    const durationTime = this.wrapperElement.querySelector('.audio-player__time--duration')
    durationTime.textContent = this.formatTime(this.audioElement.duration);
  }

  play() {
    this.audioElement.play()
    document.querySelector(`.audio-player${this.getClassSelectors()} .audio-player__btn--play`).innerHTML = this.getIcon('pause-outline')
  }

  pause() {
    this.audioElement.pause()
    document.querySelector(`.audio-player${this.getClassSelectors()} .audio-player__btn--play`).innerHTML = this.getIcon('play-outline')
  }
}
