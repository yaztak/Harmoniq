export default class AudioPlayer {
    constructor(selector, options) {
        this.audioElement = document.querySelector(selector);
        this.audioSelector = selector;
        this.wrapperClasses = [...this.audioElement.classList];
        this.options = options;
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

    createAudioPlayerUI() {
        const template = `
      <div class="audio-player ${this.getClassNames()}">
        <button class="play-button">Play</button>
        <button class="pause-button">Pause</button>
        <input type="range" class="volume-control" />
        <!-- Add other UI elements as needed -->
      </div>
    `;

        this.audioElement.insertAdjacentHTML('afterend', template);
        this.audioElement.remove()
        this.addEventListeners();
    }

    addEventListeners() {
        // Add event listeners to your custom UI elements
        const playButton = document.querySelector(`.audio-player${this.getClassSelectors()} .play-button`);
        const pauseButton = document.querySelector(`.audio-player${this.getClassSelectors()}  .pause-button`);
        console.log(`.audio-player${this.getClassSelectors()} .play-button`)
        console.log(playButton)

        playButton.addEventListener('click', () => this.play());
        pauseButton.addEventListener('click', () => this.pause());
    }

    play() {
        this.audioElement.play();
    }

    pause() {
        this.audioElement.pause();
    }
}