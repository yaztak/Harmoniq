import { icons } from './assets/icons.js'

export default class AudioPlayer {
  constructor(selector, options) {
    this.audioSelector = selector;
    this.options = options;
    this.audioElement = document.querySelector(selector);
    this.wrapperClasses = [...this.audioElement.classList];
    this.url = this.getAudioUrl()

    // Check if the selector exists and is an audio element
    if (!this.audioElement || this.audioElement.tagName !== 'AUDIO') {
      throw new Error('Invalid audio element selector.');
    }

    // Create the audio player UI
    this.createAudioPlayerUI();
  }

  getAudioUrl() {
    // Check if the 'src' attribute is set
    let audioUrl = this.audioElement.src;

    // If 'src' is not set, check for <source> elements
    if (!audioUrl) {
      const sourceElements = this.audioElement.querySelectorAll('source');

      // Use the first <source> element's 'src' attribute
      if (sourceElements.length > 0) {
        audioUrl = sourceElements[0].src;
      }
    }

    // If no URL is found, return null or handle it as needed
    return audioUrl || null;
  }

  getClassNames() {
    // Needs to be converted to array
    console.log(this.wrapperClasses)
    return this.wrapperClasses.join(' ')
  }

  getClassSelectors() {
    let classes = [];
    this.wrapperClasses.forEach(className => {
      let selector = `.${className}`;
      classes.push(selector);
    })
    return classes.join('');
  }

  getIcon(name) {
    return icons.get(name)
  }

  createAudioPlayerUI() {
    const template = `
      <div class="audio-player__wrapper ${this.getClassNames()}" style="background-image: url('../src/assets/placeholder.svg')">
  <img src="../src/assets/placeholder.svg" class="audio-player__image"/>
  <div class="audio-player__label">
    <span class="audio-player__title">Title</span>
    <span class="audio-player__subtitle">Subtitle</span>
  </div>
  <div class="audio-player__progress">
    <div class="audio-player__line">
      <span class="audio-player__bullet"></span>
    </div>
    <div class="audio-player__time-wrapper">
      <span class="audio-player__time">00:00</span>
      <span class="audio-player__time">00:00</span>
    </div>
  </div>
  <div class="audio-player__controls">
    <button class="audio-player__btn">
      ${this.getIcon('fast-rewind-outline')}
    </button>
    <button class="audio-player__btn audio-player__btn--play">
      ${this.getIcon('play-outline')}
    </button>
    <button class="audio-player__btn">
      ${this.getIcon('fast-forward-outline')}
    </button>
  </div>
</div>
    `;

    this.audioElement.insertAdjacentHTML('afterend', template);
    this.audioElement.remove()
    this.addEventListeners();
  }

  addEventListeners() {
    // Add event listeners to your custom UI elements
    const playButton = document.querySelector(`.audio-player${this.getClassSelectors()} .audio-player__btn--play`);

    playButton.addEventListener('click', () => {
      if (this.audioElement.paused) this.pause()
      else this.play()
    });
  }

  play() {
    this.audioElement.play();
  }

  pause() {
    this.audioElement.pause();
  }
}
