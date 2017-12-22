import {TimelineMax} from 'gsap';
import $ from 'jquery';
import Splitter from 'split-html-to-chars';

let els = document.querySelectorAll('.js-splitme');
els.forEach(function(el) {
  el.outerHTML = Splitter(el.outerHTML, '<span class="letter">$</span>');
});

var t1 = new TimelineMax();

// /* loader */
t1.fromTo('.loader__inside', 2, {scale: 0.01}, {scale: 1, onComplete: function() {
  $('.loader').remove();
}});

// /* animation logo */
t1.from( $('.logo__d'), 1, {
  x: '-1000%'
});

t1.from( $('.logo__j'), 1, {
  x: '-1000%'
}, '-=0.6');

t1.from( $('.logo__a'), 1, {
  x: '-1000%'
}, '-=0.6');

t1.from( $('.logo__n'), 1, {
  x: '-1000%'
}, '-=0.6');

t1.from( $('.logo__g'), 1, {
  x: '-1000%'
}, '-=0.6');

t1.from( $('.logo__o'), 1, {
  x: '-1000%'
}, '-=0.6');

// /* title header */
t1.from('.header__nav', 1, {y: 200}, {y:0}, '-=2');
t1.staggerFromTo('.nav a', 0.5,
  {opacity: 0, y: 30},
  {opacity: 1, y: 0},
  0.25);


// // t1.staggerFromTo('.js-splitme span', 1, {opacity: 0 , y: -50}, {opacity: 1, y: 0}, 0.12);

t1.staggerFromTo('.js-splitme span', 1,
  {rotationY:'-270deg', rotationX:'360deg', y: -50, opacity: 0},
  {rotationY:'0deg', rotationX:'0deg' , y: 0, opacity: 1}, 0.15);

var MAX = 60;
var checkScrollSpeed = (function(settings) {
  settings = settings || {};

  var lastPos, newPos, timer, delta,
    delay = settings.delay || 50; // in "ms" (higher means lower fidelity )

  function clear() {
    lastPos = null;
    delta = 0;
  }

  clear();

  return function() {
    newPos = window.scrollY;
    if ( lastPos != null ) { // && newPos < maxScroll
      delta = newPos - lastPos;
    }
    lastPos = newPos;
    clearTimeout(timer);
    timer = setTimeout(clear, delay);
    return delta;
  };
})();

function setSkew(skew) {
  console.log(skew);
  $('p').css('transform', 'skewY('+ skew +'deg)');
};

$(window).on('scroll', function() {
  var speed = checkScrollSpeed();
  if(speed > MAX) speed = MAX;
  if(speed < -MAX) speed = -MAX;
  setSkew(speed/10);
});


