let palettes, img, movers, grids, scale,tog;

var wting

function preload() {

  palettes = loadTable(docsUrl + '\\Art\\colorPalettes.csv', 'csv', 'header');

  img = loadImage(picsUrl + "CoolHermitCrabCard.jpg");
}


function setup(){
  scale = 1;
  createCanvas(600 * scale,600 * scale);
  background(0);


  // image(img,0,0,width,height)

  var pix = img.get(10,10);
  var c = color(pix[0],pix[1],pix[2])
  var c2 = color(255,255,255)
  console.log(pix)
  console.log(brightness(c2));

  wting = new Grid2(0,0,width,height,10,noise,0.2);

  for (let i=0;i<wting.grid.length;i++){
    for (let j = 0;j<wting.grid[i].length;j++){
      var gval = wting.grid[i][j];
      var newx = map(gval.x,0,width,0,img.width);
      var newy = map(gval.y,0,height,0,img.height);

      var p = img.get(Math.floor(newx),Math.floor(newy))
      var newc = color(p[0],p[1],p[2])
      var nv = map(brightness(newc),0,100,0,1)
      gval.setVal(nv);

    }

  }
  // wting.display();

  movers = []

  for (let i = 0;i<10000;i++){
    var x = random(0,width);
    var y = random(0,height);

    var newx = map(x,0,width,0,img.width);
    var newy = map(y,0,height,0,img.height);

    var p = img.get(Math.floor(newx),Math.floor(newy))
    var cc = color(p[0],p[1],p[2])
    // var cc = zoop.getColor(ting.getValue(x,y),3);
    // var foo = map(y,0,height,0,1);
    // var cc = zoop.mapColor(foo,"HSB",null,null,null,null,20); //ting.getValue(x,y)
    // cc = color(0,random(255),200);
    // cc.setBrightness(100);
    cc.setAlpha(10)
    var m = new Mover2(x,y,1,cc,random(5));
    movers.push(m);
    // noStroke();
    // cc.setAlpha(0.1);
    // fill(cc);
    // rect(x,y,random(100),random(100))
  }

}

function draw(){

  for (let i=0; i<movers.length; i++) {
    movers[i].update(wting);
    // movers[i].display();
    // movers[i].checkEdges();
  }

}

function mouseClicked(){
  // if (tog > 3){
  //   tog = 0;
  // } else if (tog == 1){
  //   // tog = 0;
  // }
  // // gridList[tog].displayRect();
  // theGrid = gridList[tog]
  // tog ++;

}
