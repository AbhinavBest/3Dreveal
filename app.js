// Initialize Lenis
const lenis = new Lenis();

// Listen for the scroll event and log the event data
lenis.on('scroll', (e) => {
  console.log(e);
});

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);



const canvas = document.querySelector(".canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext("2d");
const frameCount = 81;

const currentFrame = (index) => `./Curtains1/${(index + 1).toString()}.png`;


const images = [];
let ball = { frame: 0 };

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  console.log(currentFrame(i));
  images.push(img);
}

gsap.to(ball, {
  frame: frameCount - 1,
  snap: "frame",
  ease: "none",
  scrollTrigger: {
    scrub: 0.5,
    pin: "canvas",
    end: "500%",
  },
  onUpdate: render,
});
gsap.to(".landing", {
  opacity: 0,
  scrollTrigger: {
    scrub: 1,
    pin: ".landing",
    end: '200%',
  }
})

document.getElementById("btn").onclick = function () { open() };
function open() {
  gsap.to(window, { duration: 4, scrollTo: { y: "#mid", offsetY: 50 } });
}

gsap.to('.content',{
  opacity: 1,
  scrollTrigger:{
    trigger:'#mid',
    scrub:1,
    // markers:true,
    start:"50% 50%",
    end:"100% 50%",
  },
})

// gsap.fromTo(
//   ".ball-text",
//   {
//     opacity: 0,
//   },
//   {
//     opacity: 1,
//     scrollTrigger: {
//       scrub: 1,

//       start: "50%",
//       end: "60%",
//     },
//     onComplete: () => {
//       gsap.to(".ball-text", { opacity: 0 });
//     },
//   }
// );

images[0].onload = render;

function render() {
  context.canvas.width = images[0].width;
  context.canvas.height = images[0].height;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(images[ball.frame], 0, 0);
}