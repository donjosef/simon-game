const controller = {
  init: function() {
    view.cacheDOM();
    view.bindEvents();
  }
}

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
