function locoScroll(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}


function page1Animation() {
  var tl = gsap.timeline();

  tl.from(".logo", {
    x: -100,
    rotate:-90,
    opacity: 0,
    duration: 0.5,
    stagger: 0.5,
  });

  tl.from(".new_navbar .nav-link", {
    y: -50,
    opacity: 0,
    deley: 0.4,
    duration: 0.8,
    stagger: 0.3,
  });

  tl.from(".faded-text, .hero-section-heading, .hero-section-description, .btn-floating, .btn-div ", {
    x: -500,
    opacity: 0,
    duration: 0.8,
    stagger: 0.4,
  });

  tl.from(".hero-section-right .icons", {
    x: -100,
    // rotate:-180,
    opacity: 0,
    duration: 0.5,
    stagger: 0.5,
  });
}


function DeveloperAnimation() {
  var typeData = new Typed(".role", {
    strings: [
      "Full Stack Developer",
      "Web Developer",
      ".Net Developer",
      "Backend Developer",
      "Coder",
    ],
    loop: true,
    typeSpeed: 100,
    backSpeed: 80,
    backDelay: 1000,
  });
}


function textSplitting(){
    var allh1 = document.querySelectorAll(".about-text h4")
    allh1.forEach(function(elem){
        var clutter = ""
        var h1Text = elem.textContent
        var splittedText = h1Text.split("")
        splittedText.forEach(function (e){
            clutter += `<span>${e}</span>`
        })
        elem.innerHTML = clutter
    })
}

function gsapAnimation(){
    gsap.to(".about-text h4 span", {
        color:"#6e7191",
        stagger:0.1,
        scrollTrigger:{
            trigger:".about-text h4",
            scroller:"#main",
            start:"top 40%",
            end:"top -10%",
            scrub:2
        }
    })
} 

// let sections = document.querySelectorAll('.container');
// let navLinks = document.querySelectorAll('header nav a');
// window.onscroll = () => {
//     sections.forEach(sec => {
//         let top = window.scrollY;
//         let offset = sec.offsetTop - 150;
//         let height = sec.offsetHeight;
//         let id = sec.getAttribute('id');
//         if(top >= offset && top < offset + height) {
//             navLinks.forEach(links => {
//                 links.classList.remove('active');
//                 document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
//             });
//         };
//     });
// };

locoScroll()
textSplitting()
gsapAnimation()

page1Animation();
DeveloperAnimation();
