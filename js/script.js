// js/script.js
// text-scramble

class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = "!<>-_\\/[]{}—=+*^?#________";
    this.update = this.update.bind(this);
  }
  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => (this.resolve = resolve));
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  update() {
    let output = "";
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

// ——————————————————————————————————————————————————
// Example
// ——————————————————————————————————————————————————

const phrases = ["Bonjour ", "Hola ", "Ohio", "oi Mate"];

const el = document.querySelector(".loader-heading");
const fx = new TextScramble(el);

let counter = 0;
const next = () => {
  fx.setText(phrases[counter]).then(() => {
    setTimeout(next, 500);
  });
  counter = (counter + 1) % phrases.length;
};

next();

// canvas

// gsap section starts here

var mt = gsap.timeline();

// mt.from(".loader-wrapper", {
//   opacity: 1,
//   display: "flex",
// });
// mt.to(".section-two", {
//   x: "200%",
// });
// mt.from(".loader-bar", {
//   width: "0%",
//   duration: 6,
// });
// mt.to(".loader-bar", {
//   width: "100%",
// });
// mt.to(".loader-heading", {
//   opacity: 0,
// });

// mt.to(".loader-inner", {
//     opacity: 0
// });

// mt.to(".loader-wrapper", {
//   x: "-100%",
//   duration: 1,
// });



// mt.from(".section-one", {
//   x: "100%",
//   ease: "power1.inOut",
//   duration: 1,
// });


var mywork = document.getElementById("my_work");
mywork.addEventListener("click", function (e) {
 
  mt.to(".section-two", {
    x: "0%",
      display: "flex",
      zIndex:'60'
    
  });
});

var back_btn = document.getElementById("back_btn");
back_btn.addEventListener("click", function (e) {
    e.preventDefault();
     
     mt.to(".section-two", {
       x: "100%",
       display: "flex",
     });
})