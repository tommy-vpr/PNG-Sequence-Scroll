const can = document.querySelector('#image-sequence')

let frameCount = 58,
    urls = new Array(frameCount).fill().map((o, i) => `Blankers/Blankers_${(i+0).toString().padStart(4, '0')}.png`);

imageSequence({
  urls, // Array of image URLs
  canvas: "#image-sequence", // <canvas> object to draw images to
  //clear: true, // only necessary if your images contain transparency
  clear: true,
  //onUpdate: (index, image) => console.log("drew image index", index, ", image:", image),
  scrollTrigger: {
    start: 0,   // start at the very top
    end: "max", // entire page
    scrub: true, // important!
  }
});


/*
Helper function that handles scrubbing through a sequence of images, drawing the appropriate one to the provided canvas. 
Config object properties: 
- urls [Array]: an Array of image URLs
- canvas [Canvas]: the <canvas> object to draw to
- scrollTrigger [Object]: an optional ScrollTrigger configuration object like {trigger: "#trigger", start: "top top", end: "+=1000", scrub: true, pin: true}
- clear [Boolean]: if true, it'll clear out the canvas before drawing each frame (useful if your images contain transparency)
- paused [Boolean]: true if you'd like the returned animation to be paused initially (this isn't necessary if you're passing in a ScrollTrigger that's scrubbed, but it is helpful if you just want a normal playback animation)
- fps [Number]: optional frames per second - this determines the duration of the returned animation. This doesn't matter if you're using a scrubbed ScrollTrigger. Defaults to 30fps.
- onUpdate [Function]: optional callback for when the Tween updates (probably not used very often). It'll pass two parameters: 1) the index of the image (zero-based), and 2) the Image that was drawn to the canvas

Returns a Tween instance
*/
function imageSequence(config) {
  let playhead = {frame: 0},
      canvas = gsap.utils.toArray(config.canvas)[0] || console.warn("canvas not defined"),
      ctx = canvas.getContext("2d"),
      curFrame = -1,
      onUpdate = config.onUpdate,
      images,
      updateImage = function() {
        let frame = Math.round(playhead.frame);
        if (frame !== curFrame) { // only draw if necessary
          config.clear && ctx.clearRect(0, 0, canvas.width, canvas.height);
          let image = images[Math.round(playhead.frame)].width = '100%'
          console.log(image)
          ctx.drawImage(images[Math.round(playhead.frame)], 0, 0);
          curFrame = frame;
          onUpdate && onUpdate.call(this, frame, images[frame]);
        }
      };
  
  images = config.urls.map((url, i) => {
    let img = new Image();
    img.src = url;
    i || (img.onload = updateImage);
    return img;
  });
  return gsap.to(playhead, {
    frame: images.length - 1,
    ease: "none",
    onUpdate: updateImage,
    duration: images.length / (config.fps || 30),
    paused: !!config.paused,
    scrollTrigger: config.scrollTrigger
  });
}

/* TEXT ANIMATION */
gsap.registerPlugin(ScrollTrigger)

const splitTypes = document.querySelectorAll('.reveal-type')
const splitTypesB = document.querySelectorAll('.g-reveal')

splitTypesB.forEach((char, i) => {
  const text = new SplitType(char, {
      types: 'chars'
  })

  gsap.from(text.chars, {
      scrollTrigger: {
          trigger: char,
          start: 'top 70%',
          end: 'top 40%',
          scrub: true,
          markers: true
      },
      opacity: 0,
      y: 200,
  })
})


splitTypes.forEach((char, i) => {
    const text = new SplitType(char, {
        types: 'chars'
    })

    gsap.from(text.chars, {
        scrollTrigger: {
            trigger: char,
            start: 'top 60%',
            end: 'top 30%',
            scrub: true,
            markers: true
        },
        opacity: 0,
        x: 100,
        stagger: .1
    })
})

/* Header animation */
window.addEventListener("scroll", function(){
  var header = document.querySelector("header");
  header.classList.toggle("active",window.scrollY > 0);
});

var tl = gsap.timeline();
tl.fromTo(".logo , .li",{
  opacity:0,
  y: "-100%"
},{
  opacity:1,
  duration: .2,
  y: "0%",
  stagger: 0.1
})

/* LENIS SMOOTH SCROLL */ 

// const lenis = new Lenis()

// function raf(time) {
// lenis.raf(time)
// requestAnimationFrame(raf)
// }

// requestAnimationFrame(raf)