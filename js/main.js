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

       Hand.addEventListener("enterframe",function(){
         Hand.rotation += 10;
         for (var o = 0; o < Images.length; o++) {
           Images[o].frame += 500 *280;
         }
         for (var o = 0; o < Images.length; o++) {
           if(Images[o].intersect(Hand)){
             if(Images[o].type==2||Images[o].type==4) scene.removeChild(Images[o]);
           }
         }
         return;
       });

       var kaka = 0;

       function Image(x,y,z,o){
         kaka = Images.length
         Images[kaka] = new Sprite(10,10);
         Images[kaka].image = core.assets["../画像/"+z+".png"];
         Images[kaka].x = x*10;
         Images[kaka].y = y*10;
         Images[kaka].type = z;
         Images[kaka].frame = o;
         scene.addChild(Images[kaka]);
         return;
       }

        for (var k = 1; k < 5; k++) {
          Kazu = 0;
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
          return;
        })

       return scene;
    };
    core.replaceScene(StartScene());
  }
  core.start()
}
