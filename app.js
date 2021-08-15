'use strict';
let attemptsE = document.getElementById('attempts');
let ImgContanerE = document.getElementById('ImgContaner');
let leftImg = document.getElementById('leftImg');
let middleImg = document.getElementById('middleImg');
let rightImg = document.getElementById('rightImg');
let results = document.getElementById('results');
let busImg = ['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','water-can.jpg','wine-glass.jpg'];
let maxAttempts = 25; // its shold be 25
let attempt = 1;
let busMall = [];

function BusMall(productName){
    this.prodName = productName.split('.')[0];
    this.imgPath = `img/${productName}`;
    this.views = 0;
    this.votes = 0;
    busMall.push(this);
}

 console.log(BusMall);

for(let i =0 ; i < busImg.length; i++ ){
    new BusMall(busImg[i]);
}
 console.log(busMall);
function randomImg(){
    return Math.floor(Math.random()*busMall.length);

}

let leftIndex;
let meddleIndex;
let rightIndex;
function renderImg(){

leftIndex = randomImg();
meddleIndex = randomImg();
rightIndex = randomImg();

while(leftIndex === rightIndex || rightIndex === meddleIndex || meddleIndex === leftIndex){
    leftIndex = randomImg();
    meddleIndex = randomImg();
}

leftImg.setAttribute('src',busMall[leftIndex].imgPath);
middleImg.setAttribute('src',busMall[meddleIndex].imgPath);
rightImg.setAttribute('src',busMall[rightIndex].imgPath);

busMall[leftIndex].views++;
busMall[meddleIndex].views++;
busMall[rightIndex].views++;
}

renderImg();
console.log(renderImg);

leftImg.addEventListener('click', clickHandler);
middleImg.addEventListener('click', clickHandler);
rightImg.addEventListener('click', clickHandler);

function clickHandler(event){
 if(attempt <= maxAttempts){
     let clickedImg = event.target.id;
    //  console.log(event.target.id);
     if(clickedImg === 'leftImg'){

        busMall[leftIndex].votes++;
        // console.log("hi");
     }
     else if (clickedImg === 'middleImg'){

        busMall[meddleIndex].votes++;
     }
     else if (clickedImg === 'rightImg'){
        busMall[rightIndex].votes++;
     }
     renderImg();
    //  console.log(busMall);
     attempt++;
 }
 //result shold add to a button
    // else{
    //     for (let i = 0 ; i < busMall.length ;i++){
    //         let liE = document.createElement('li');
    //         results.appendChild(liE);
    //         liE.textContent = `product Name ${busMall[i].prodName} has ${busMall[i].votes} votes and ${busMall[i].views} views`;

    //     }
    //     leftImg.removeEventListener('click',clickHandler);
    //     middleImg.removeEventListener('click',clickHandler);
    //     rightImg.removeEventListener('click',clickHandler);
    // }
}
let buttonE = document.getElementById('buttonresults');
buttonE.addEventListener('click',showresult);
function showresult(){
    for (let i = 0 ; i < busMall.length ;i++){
        let liE = document.createElement('li');
        results.appendChild(liE);
        liE.textContent = `product Name:  ${busMall[i].prodName} has   ,  ${busMall[i].votes} : votes    , ${busMall[i].views}: views`;

    }
    leftImg.removeEventListener('click',clickHandler);
    middleImg.removeEventListener('click',clickHandler);
    rightImg.removeEventListener('click',clickHandler);
    buttonE.removeEventListener('click',showresult)

}

