enchant()

function Load(width,height){
  var game = new Core(width, height);

  game.preload("../画像/1.png","../画像/2.png","../画像/3.png","../画像/4.png","../画像/5.png");
  game.fps = 10;
  game.onload = function(){
    var StartScene = function(){
       var scene = new Scene();                                // 新しいシーンを作る

       var Images = [];
       var Kazu = 0;

       var Hand = new Sprite(20,20);
       Hand.vx = 5;
       Hand.vy = 5;
       Hand.image = game.assets["../画像/"+5+".png"];

       Hand.addEventListener("enterframe",function(){
         if(Hand.x <= 0 && Hand.vx < 0) Hand.vx *= -1;
         if(Hand.x >= 490 && Hand.vx > 0) Hand.vx *= -1;
         if(Hand.y <= 0 && Hand.vy < 0) Hand.vy *= -1;
         if(Hand.y >= 270 && Hand.vy > 0) Hand.vy *= -1;
         Hand.x += Hand.vx;
         Hand.y += Hand.vy;
         Hand.rotation += 10;
         for (var o = 0; o < Images.length; o++) {
           Images[o].frame += 250 * 140;
         }
         for (var o = 0; o < Images.length; o++) {
           if(Images[o].intersect(Hand)){
             if(Images[o].type==2&&Hand.frame==0&&Images[o].in){
               scene.removeChild(Images[o]);
               Hand.vx *= -1;
               Hand.vy *= -1;
               Images[o].in = false;
             }
             if(Images[o].type==4&&Hand.frame==1&&Images[o].in){
               scene.removeChild(Images[o]);
               Hand.vx *= -1;
               Hand.vy *= -1;
               Images[o].in = false;
             }
           }
         }
         return;
       });

       var kaka = 0;

       function Image(x,y,z,o){
         kaka = Images.length
         Images[kaka] = new Sprite(20,20);
         Images[kaka].image = game.assets["../画像/"+z+".png"];
         Images[kaka].x = x*20;
         Images[kaka].y = y*20;
         Images[kaka].type = z;
         Images[kaka].frame = o;
         Images[kaka].in = true;
         scene.addChild(Images[kaka]);
         return;
       }

        for (var k = 1; k < 5; k++) {
          Kazu = 0;
          for (var j = 0; j < 14; j++) {
            for (var i = 0; i < 25; i++) {
              Image(i,j,k,Kazu);
              Kazu++;
            }
          }
        }

        scene.addChild(Hand);

        scene.on("touchmove",function(e){
          Hand.x = e.x;
          Hand.y = e.y;
          return;
        })

        var Button = [];

        function Buttons(x,y,v,i){
          Button[i] = new Entity();
          Button[i].moveTo(x,y);
          Button[i].width = 40;
          Button[i].height = 40;
          Button[i]._element = document.createElement("input");
          Button[i]._element.type = "submit";
          Button[i]._element.value = v;
          Button[i].backgroundColor = "buttonface";
          Button[i]._element.onclick = function(e){
            switch(i){
              case 0:
                if(Hand.frame==1){
                  Hand.frame = 0;
                  Button[i]._element.value = "水着";
                }
                else{
                  Hand.frame = 1;
                  Button[i]._element.value = "肌";
                }
                break;
              case 1:
                scene.removeChild(Hand);
                for (var o = 0; o < Images.length; o++) {
                    Images[o].in = true;
                    scene.removeChild(Images[o]);
                    scene.addChild(Images[o]);
                }
                scene.addChild(Hand);
                break;
            }
            return;
          };
          scene.addChild(Button[i]);
        }

        Buttons(460,240,"水着",0);
        Buttons(420,240,"戻す",1);

       return scene;
    };
    game.replaceScene(StartScene());
  }
  game.start()
}
