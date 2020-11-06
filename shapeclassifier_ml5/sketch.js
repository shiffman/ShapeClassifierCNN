// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Image classification using Convolutional Neural Network
This example uses a callback pattern to create the classifier
=== */

const circles = [];
const squares = [];
const triangles = [];

let resultsP;
let shapeClassifier;
let video;

// function preload() {
//   for (let i = 0; i < 100; i++) {
//     circles[i] = loadImage(`data/circle${nf(i+1,4,0)}.png`)
//     squares[i] = loadImage(`data/square${nf(i+1,4,0)}.png`)
//     triangles[i] = loadImage(`data/triangle${nf(i+1,4,0)}.png`)
//     console.log(`data/circle${nf(i+1,4,0)}.png`);
//   }

// }

let canvas;
let graphics;

function setup() {
  canvas = createCanvas(128, 128);
  video = createCapture(VIDEO);
  video.size(128, 128);
  video.hide();
  //graphics = createGraphics(128, 128);
  //pixelDensity(1);
  const options = {
    inputs: [128, 128, 4],
    task: 'imageClassification',
    debug: true,
  };
  resultsP = createP('');

  // construct the neural network
  shapeClassifier = ml5.neuralNetwork(options);
  shapeClassifier.load({
    model: 'model/model.json',
    metadata: 'model/model_meta.json',
    weights: 'model/model.weights.bin'
  }, modelLoaded);

  // add data
  // for (let i = 0; i < circles.length; i += 1) {
  //   shapeClassifier.addData({ image: circles[i]  }, { label: "circle"});
  //   shapeClassifier.addData({ image: squares[i]  }, { label: "square"});
  //   shapeClassifier.addData({ image: triangles[i]  }, { label: "triangle"});
  // }

  // normalize data
  // shapeClassifier.normalizeData();

  // shapeClassifier.train({ epochs: 50 }, finishedTraining);
}

function draw() {
  image(video, 0,0,width,height);
}

function modelLoaded() {
  shapeClassifier.classify({ image: video }, gotResults);

  // graphics.translate(width/2,height/2);
  // noLoop();
  // graphics.background(255);
  // graphics.noFill();
  // graphics.strokeWeight(8);
  // const c = color(random(128), random(128), random(128));
  // graphics.stroke(c);  
  // const x = random(-16, 16);
  // const y = random(-16, 16);
  // const r = random(12, 48);
  // graphics.rectMode(CENTER);
  // graphics.square(x, y, r*2);

  // graphics.loadPixels();
  // shapeClassifier.classify({ image: video }, gotResults);

  // image(graphics, 0, 0);
}



// function finishedTraining() {
//   console.log('finished training');
//   // method 1: you can pass in an object with a matching key and the p5 image
// }

function gotResults(err, results) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(results);
  const percent = 100 * results[0].confidence;
  resultsP.html(`${results[0].label} ${nf(percent, 2, 1)}%`);
  shapeClassifier.classify({ image: video }, gotResults);

}
