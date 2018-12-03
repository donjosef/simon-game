/* DATA MODEL */
const data = {
    currentRound: 1,
    currentButton: null,
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

  setCurrentButton: function(button) {
      data.currentButton = button;
  },

  getCurrentButton: function() {
       return data.currentButton;
   },

  fillUserAttempts: function(button) {
      data.userAttempts.push(button); //fill the array at every click of the user
  },

  checkMatch: function() {
        if(data.randomActiveButtons.length === data.userAttempts.length) {
            const areEqual = data.randomActiveButtons.every((button, idx) => {
                return button === data.userAttempts[idx];
            });

            if(areEqual) { //if the choices of user are equal to random, go to next level, after 800ms
                data.currentRound++;

                setTimeout(() => {
                    view.levelUp();
                    this.playCurrentRound();
                }, 800);

            } else {
                data.currentRound = 1;
                view.failed.play();
                setTimeout(() => {
                    view.gameOver();
                    this.playCurrentRound();
                }, 800);

            } //otherwise, go back to level 1

        } else {
            for(let i = 0; i < data.userAttempts.length; i++) {
               if( data.userAttempts[i] !== data.randomActiveButtons[i]) {
                   data.currentRound = 1;
                   view.failed.play();
                   setTimeout(() => {
                       view.gameOver();
                       this.playCurrentRound();
                   }, 800);

                }
            }
        } //this else statement is for when the user array has not the same quantity of random arr yet. For example random arr 4 elements, user arr 2 elements. If the user get wrong the second element, immediately game over, not wait until the user arr is 4 element too
   }
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
      /* set the current button when user click on it */
       controller.setCurrentButton(button);
       controller.fillUserAttempts(controller.getCurrentButton()); //at every click push the button to userAttempts array to check for any matches
       controller.checkMatch();
       view.active();
    }));
  },

  active: function() {
      const currentButton = controller.getCurrentButton();
      currentButton.classList.add("active");
      setTimeout(() => {
         currentButton.classList.remove("active");
      }, 300);
      const audio = currentButton.querySelector("audio");
      audio.play();
  },

  levelUp: function() {
      this.title.textContent = "Level " + controller.getCurrentRound();
  },

  gameOver: function() {
      this.title.textContent = "Level " + controller.getCurrentRound();
   }
}

const button = document.querySelector('.container button');
button.addEventListener('click', () => {
    controller.init();
});
