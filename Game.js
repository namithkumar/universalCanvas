class Game {
    constructor(){}
    
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
     
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    start(){
      if(gameState === 0){
        player = new Player();
        player.getCount();
        form = new Form()
        form.display();
      }
    }
  
    play(){
      form.hide();
      text("drawing start", 120, 100);
      Player.getPlayerInfo();
      if(allPlayers!== undefined){
        var displayPosition = 130;
        for(var plr in allPlayers){
          if(plr == "player" + player.index){
            fill("red");
          }
        
          else{
            fill("black");
          }
          displayPosition = displayPosition+20;
          text(allPlayers[plr].name+":"/*+allPlayers[plr].drawing*/ ,120, displayPosition);
        }
        
      }
      if(keyIsDown(UP_ARROW) && player.index!==null ){
        //player.drawing;
        player.update();
      }
    }
  }