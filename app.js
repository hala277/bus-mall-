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
let prodName = [];
let votes = [];
let views = [];



function BusMall(productName){
    this.prodName = productName.split('.')[0];
    this.imgPath = `img/${productName}`;
    this.views = 0;
    this.votes = 0;
    busMall.push(this);
    prodName.push(this.prodName);
}



 console.log(BusMall);

for(let i =0 ; i < busImg.length; i++ ){
    new BusMall(busImg[i]);
}
 console.log(busMall);

 let index = 0;
 let array =[];
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



// if(leftIndex === rightIndex || rightIndex === meddleIndex || meddleIndex === leftIndex || array.includes(leftIndex) || array.includes(meddleIndex)|| array.includes(rightIndex)){
//     leftIndex = randomImg();
//     meddleIndex = randomImg();
//     rightIndex = randomImg();
// }

while(leftIndex === rightIndex || rightIndex === meddleIndex || meddleIndex === leftIndex || array.includes(leftIndex) || array.includes(meddleIndex)|| array.includes(rightIndex)){
    leftIndex = randomImg();
    meddleIndex = randomImg();
    rightIndex = randomImg();
   //|| array.includes(leftIndex) || array.includes(meddleIndex)|| array.includes(rightIndex)
}

array[0] = leftIndex;
array[1] = meddleIndex;
array[2] = rightIndex;

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
   
}
let buttonE = document.getElementById('buttonresults');
buttonE.addEventListener('click',showresult);
function showresult(){
    for (let i = 0 ; i < busMall.length ;i++){
        let liE = document.createElement('li');
        results.appendChild(liE);
        liE.textContent = `product Name:  ${busMall[i].prodName} has   ,  ${busMall[i].votes} : votes    , ${busMall[i].views}: views`;
        
        votes.push(busMall[i].votes);
        views.push(busMall[i].views);

    }
    leftImg.removeEventListener('click',clickHandler);
    middleImg.removeEventListener('click',clickHandler);
    rightImg.removeEventListener('click',clickHandler);
    buttonE.removeEventListener('click',showresult)
    chartRender();

}

function chartRender() {
     let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: prodName,
            datasets: [{
                label: '# of Votes',
                data: votes,
                backgroundColor: [
                    'rgba(255, 99, 135, 3)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }, {
                label: '# of views',
                data: views,
                backgroundColor: [
                    'rgba(54, 162, 235, 3)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}