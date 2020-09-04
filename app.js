'use strict';
var renderQue = [];
var imgArray = [];
var imgElOne = document.getElementById('image-one');
var imgElTwo = document.getElementById('image-two');
var imgElThree = document.getElementById('image-three');
var myContainer = document.getElementById('container');
var totalClix = 0;
var allowedClix = 25;

//var clixPerItem = document.getElementById('totals');



function Picture(name, src) {
  this.viewed = 0;
  this.clicked = 0;
  this.src = src;
  this.name = name;

  imgArray.push(this);
}
var retrievedImgs = localStorage.getItem('savedPics');
if (retrievedImgs) {
  imgArray = JSON.parse(retrievedImgs);
} else {
  //enter actual name and src for instance and how many instances you want.
  new Picture('R2D2', './img/bag.jpg');
  new Picture('banana slicer', './img/banana.jpg');
  new Picture('tp/ipad holder', './img/bathroom.jpg');
  new Picture('open toe rubber boots', './img/boots.jpg');
  new Picture('all in 1', './img/breakfast.jpg');
  new Picture('meatball bubblegum', './img/bubblegum.jpg');
  new Picture('broken chair', './img/chair.jpg');
  new Picture('alien villian', './img/cthulhu.jpg');
  new Picture('duck bill dog muzzle', './img/dog-duck.jpg');
  new Picture('dragon meat', './img/dragon.jpg');
  new Picture('utensil pen tops', './img/pen.jpg');
  new Picture('pet mop', './img/pet-sweep.jpg');
  new Picture('pizza scizzors', './img/scissors.jpg');
  new Picture('shark sleeping bag', './img/shark.jpg');
  new Picture('baby mop', './img/sweep.png');
  new Picture('tauntaun sleeping bag', './img/tauntaun.jpg');
  new Picture('unicorn meat', './img/unicorn.jpg');
  new Picture('tentacle usb drive', './img/usb.gif');
  new Picture('broken water can', './img/water-can.jpg');
  new Picture('modern wine glass', './img/wine-glass.jpg');
}

function createRenderQue() {
  while (renderQue.length > 3) {
    renderQue.pop();
  }
  while (renderQue.length < 6) {
    var picIndex = randomNumber(imgArray.length);
    while (renderQue.includes(picIndex)) {
      picIndex = randomNumber(imgArray.length);
    }
    renderQue.unshift(picIndex);
  }

  console.log(renderQue);
}
//render 3 images itterates 1 for viewed
function renderImages() {
  createRenderQue();
  var imgOne = imgArray[renderQue[0]];
  var imgTwo = imgArray[renderQue[1]];
  var imgThree = imgArray[renderQue[2]];

  /*var imgOne = imgArray[randomNumber(imgArray.length)];
  var imgTwo = imgArray[randomNumber(imgArray.length)];
  var imgThree = imgArray[randomNumber(imgArray.length)];*/


  /*while (imgOne === imgTwo || imgTwo === imgThree || imgOne === imgThree) {
    imgTwo = imgArray[randomNumber(imgArray.length)];
    imgThree = imgArray[randomNumber(imgArray.length)];
  }*/
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

//console.log(imgArray);

//random number function to get random picture
function randomNumber(max) {
  return Math.floor(Math.random() * max);
}
//change to one event listener



// for knowing which picture was chosen
function eventHandler(e) {
  if (e.target === myContainer) {
    alert('click on an image please');
  } else {
    totalClix++;
    if (totalClix === allowedClix) {
      myContainer.removeEventListener('click', eventHandler);
      renderChart();
      var stringArray = JSON.stringify(imgArray);
      localStorage.setItem('savedPics', stringArray);

    }
  }

  for (var i = 0; i < imgArray.length; i++) {
    if (imgArray[i].name === e.target.alt) {
      imgArray[i].clicked++;
    }
  }
  renderImages();
}



renderImages();

function renderChart() {
  var clicksArray = [];
  var viewedArray = [];
  var pictureNameArray = [];

  for (var i = 0; i < imgArray.length; i++) {
    clicksArray.push(imgArray[i].clicked);
    viewedArray.push(imgArray[i].viewed);
    pictureNameArray.push(imgArray[i].name);
  }

  var chartObject = {
    type: 'bar',
    data: {
      labels: pictureNameArray,
      datasets: [{
        label: '# of clicks',
        data: clicksArray,
        backgroundColor: 'red',
        borderColor: 'black',
        hoverBackgroundColor: 'teal',
        borderWidth: 1
      }, {
        label: '# of Views',
        data: viewedArray,
        backgroundColor: 'green',
        borderColor: 'black',
        hoverBackgroundColor: 'green',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      },
    }
  };

  var ctx = document.getElementById('myChart').getContext('2d');

  var myChart = new Chart(ctx, chartObject); //eslint-disable-line
}

myContainer.addEventListener('click', eventHandler);


