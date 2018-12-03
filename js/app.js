/* DATA MODEL */
const data = {
    currentRound: 1,
    randomActiveButtons: [],
    userAttempts: [],
    audios: [
      "../audios/red.wav",
      "../audios/yellow.wav",
      "../audios/green.wav",
      "../audios/blue.wav"
   ],
   failAudio: "../audios/fail.wav"
};

/* CONTROLLER */
const controller = {

  init: function() {
    view.cacheDOM();
    view.bindEvents();
    this.playCurrentRound();
  },

  getCurrentRound: function() {
    return data.currentRound;
  },

  playCurrentRound: function() {
    data.randomActiveButtons = [];
    data.userAttempts = [];
    const round = this.getCurrentRound();

    //i.e round 2 -> 2 elements must be guessed. round 4 -> 4 elements must be guessed ecc...
    for(let i = 1; i <= round; i++) {
       setTimeout(() => {
         const random = Math.floor(Math.random() * view.buttons.length);
         const randomButton = view.buttons[random];
         this.fillRandomArray(randomButton);
         randomButton.classList.add('active');
         randomButton.querySelector('audio').play();
       }, 800 * i);
    }
  },

  fillRandomArray: function(randBtn) {
    data.randomActiveButtons.push(randBtn);

    setTimeout(() => this.removeActive(randBtn), 300);
  },

  removeActive: function(randBtn) {
    randBtn.classList.remove('active');
  },

  getAudios: function() {
    return data.audios;
  },

  getFailAudio: function() {
    return data.failAudio;
  },
}

/* VIEW */
const view = {
  cacheDOM: function() {
    this.buttons = document.querySelectorAll(".innerContainer div");
    this.title = document.querySelector("h2");
    this.failed = document.getElementById("fail"); //fail sound
    this.failed.src = controller.getFailAudio();
    const audios = controller.getAudios();

    for(let i = 0; i < this.buttons.length; i++) {
        const audioEl = document.createElement("audio");
        audioEl.src = audios[i];
        this.buttons[i].appendChild(audioEl);
    }
  },

  bindEvents: function() {
    this.buttons.forEach(button => button.addEventListener("click", function() {
      console.log('button clicked')
    }));
  }
}




const button = document.querySelector('.container button');
button.addEventListener('click', () => {
    controller.init();
});
