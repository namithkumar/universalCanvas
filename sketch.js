var canavs;
var database;
var gameState = 0;
var playerCount;
var form, player, game;
var allPlayers;

var drawing = []

function setup() {
    canvas = createCanvas(400, 400);
    
    database = firebase.database()
    background("white");

    var adaRef = database.ref('drawing');
    adaRef.remove();
    
    game = new Game();
    game.getState();
    game.start();

}

var dbpoints = []

function mouseDragged() {

    var point = {
        x: mouseX,
        y: mouseY
    }
    drawing.push(point);
    var drawingRef = database.ref('drawing')
    drawingRef.set({
        "d": drawing
    })

}

function draw() {
    readData()
    beginShape();
    stroke("green");
    strokeWeight(2);
    noFill();
    for (var i = 0; i < dbpoints.length; i++) {
        vertex(dbpoints[i].x, dbpoints[i].y);
        endShape();
    }
    endShape();

    if(playerCount == 4){
        game.update(1);
      }
    
      if(gameState ==1){
        //clear();
        game.play();
      }
}


function readData() {
    database.ref('drawing/').on('value', (data) => {
        dbpoints = data.val().d
    });
}

