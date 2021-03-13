enchant()

function Load(width,height){
  var core = new Core(width, height);

  core.preload("../画像/1.png","../画像/2.png","../画像/3.png","../画像/4.png","../画像/5.png");
  core.fps = 30;
  core.onload = function(){
    var StartScene = function(){
       var scene = new Scene();                                // 新しいシーンを作る

       var Images = [];
       var Kazu = 0;

       var Hand = new Sprite(10,10);
       Hand.image = core.assets["../画像/"+5+".png"];

       function Image(x,y,z,o){
         Images[o] = new Sprite(10,10);
         Images[o].image = core.assets["../画像/"+z+".png"];
         Images[o].x = x*10;
         Images[o].y = y*10;
         Images[o].type = z;
         Images[o].frame = o;
         scene.addChild(Images[o]);
         return;
       }

        for (var k = 1; k < 5; k++) {
          for (var j = 0; j < 28; j++) {
            for (var i = 0; i < 50; i++) {
              Image(i,j,k,Kazu);
              Kazu++;
            }
          }
        }

        scene.addChild(Hand);

        scene.on("touchstart",function(e){
          Hand.x = e.x-5;
          Hand.y = e.y-5;
          for (var o = 0; o < Kazu; o++) {
            if(Images[o].intersect(Hand)){
              if(Images[o].type==2||Images[o].type==4) scene.removeChild(Images[o]);
            }
          }
          return;
        })

       return scene;
    };
    core.replaceScene(StartScene());
  }
  core.start()
}
