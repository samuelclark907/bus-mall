'use strict';

var imgArray = [];
var imgElOne = document.getElementById('image-one');
var imgElTwo = document.getElementById('image-two');
var imgElThree = document.getElementById('image-three');


function Picture(name, src) {
  this.viewed = 0;
  this.clicked = 0;
  this.src = src;
  this.name = name;

  imgArray.push(this);
}
//enter actual name and src for instance and how many instances you want.
//new Picture(name,src);

//render 3 images itterates 1 for viewed
function renderImages() {
  var imgOne = imgArray[randomNumber(imgArray.length)];
  var imgTwo = imgArray[randomNumber(imgArray.length)];
  var imgThree = imgArray[randomNumber(imgArray.length)];


  while (imgOne === imgTwo) {
    imgTwo = imgArray[randomNumber(imgArray.length)];
  }
  imgElOne.src = imgOne.src;
  imgElTwo.src = imgTwo.src;
  imgElThree.src = imgThree.src;

  imgElOne.alt = imgOne.name;
  imgElTwo.alt = imgTwo.name;
  imgElThree.alt = imgThree.name;

  imgOne.viewed++;
  imgTwo.viewed++;
  imgThree.viewed++;

}

//random number function to get random picture
function randomNumber(max) {
  return Math.floor(Math.random() * max);
}

imgElOne.addEventListener('click', eventHandler);
imgElTwo.addEventListener('click', eventHandler);
imgElThree.addEventListener('click', eventHandler);


// for knowing which picture was chosen
function eventHandler(e) {
  //console.log(e.target.alt);
  for (var i = 0; i < imgArray.length; i++) {
    if (imgArray[i].name === e.target.alt) {
      imgArray[i].clicked++;
      //resets images
      renderImages();
    }
  }
}
