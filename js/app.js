/* DATA MODEL */
const data = {
    currentRound: 1,
    randomActiveButtons: [],
    userAttempts: []
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
         console.log(i)
       }, 800 * i);
    }
  }
}

/* VIEW */
const view = {
  cacheDOM: function() {
    this.buttons = document.querySelectorAll(".innerContainer div");
    this.title = document.querySelector("h2");
    this.failed = document.getElementById("fail"); //fail sound

    for(let i = 0; i < this.buttons.length; i++) {
        const audioEl = document.createElement("audio");
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
