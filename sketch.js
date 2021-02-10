//Create variables here
var dog, happyDog, database, foodS, foodStock;
var dogImage, happyDogImage;

function preload() {
  //load images here
  dogImage = loadImage("dog.png")
  happyDogImage = loadImage("happydog.png")
}

function setup() {
  createCanvas(500, 500);

  // .ref(), .on(), .set() 
  database = firebase.database()
  dog = createSprite(100, 100, 10, 10)
  dog.addImage(dogImage)
  dog.scale = 0.1

  happyDog = createSprite(10, 10, 10, 10)
  //happyDog.addImage(happyDogImage)
  happyDog.scale = 0.1

  foodStock = database.ref('Food');
  foodStock.on("value", readStock)
}


function draw() {
  background(46, 139, 87)

  if (keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(happyDogImage)
  }
  drawSprites();
  //add styles here

  fill("red")
  textSize(20)
  text("Food Remaining: " + foodS, 10, 15)

}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {

  if (x <= 0) {
    x = 0;
  } else {
    x = x - 1
  }

  database.ref('/').update({
    Food: x
  })
}
