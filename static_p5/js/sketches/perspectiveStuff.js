let palettes, img, movers, grids, scale,tog;

var wting, mpl, mpr,horizon;

function preload() {

  palettes = loadTable(docsUrl + '\\Art\\colorPalettes.csv', 'csv', 'header');

  // img = loadImage(picsUrl + "galaxy.jpg");
}


function setup(){
  scale = 1;
  createCanvas(600 * scale,600 * scale);
  background(255);


  var num1 = randomGaussian();
  var num2 = randomGaussian();
   var sd = 60;
   var mean = 300;

   horizon = sd * num1 + mean;
   var vp = sd * num2 + mean;

   var lp = new p5.Vector(0,horizon);

   var tp = new p5.Vector(lp.x+cos(radians(60))*100,lp.y+sin(radians(60))*100);

   ellipse(tp.x,tp.y,10,10)


   var rp = new p5.Vector(width,horizon);
   var sp = new p5.Vector(width/2, horizon + tan(radians(60))*(width/2))

   var zpp = new p5.Vector(width/2,height);

   var boop = (height - horizon) / cos(radians(30));

   var zing = zpp.x + cos(radians(30-90)) * boop;
   var yig = zpp.y + sin(radians(30-90)) * boop;
   ellipse(zpp.x,zpp.y,10,10)
   line(zpp.x,zpp.y,zing,yig)

   var mp = (sp.y -horizon)/(cos(radians(45)))

   var x = sp.x + cos(radians(45-90)) * mp;
   var y = sp.y + sin(radians(45-90))* mp;

   mpr = new p5.Vector(x,y)

   mpl = new p5.Vector(sp.x+cos(radians(45-180))*mp,sp.y+sin(radians(45-180))*mp);

   fill(255,0,0);
   ellipse(mpl.x,mpl.y,10,10);

   line(sp.x,sp.y,x,y);


   ellipse(sp.x,sp.y,5,5)

   // var zoop =

   line(width/2,0,width/2,height)

   line(lp.x,lp.y,width/2,sp.y)

   ellipse(lp.x,lp.y,20,20)

   line(0, horizon, width, horizon);
   ellipse(vp, horizon, 5,5);


  // image(img,0,0,width,height)

  // var pix = img.get(10,10);
  // var c = color(pix[0],pix[1],pix[2])
  // var c2 = color(255,255,255)
  // console.log(pix)
  // console.log(brightness(c2));



}

function draw(){

  background(255);
  noFill();
  ellipse(width/2,horizon,width,height)
  line(0, horizon, width, horizon);
  line(mpl.x,mpl.y,mouseX,mouseY);

  line(mpr.x,mpr.y,mouseX,mouseY)

  // for (let i=0; i<movers.length; i++) {
  //   movers[i].update(wting);
  //   // movers[i].display();
  //   // movers[i].checkEdges();
  // }

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


//PVector rectLoc;





//void draw() {


//}
