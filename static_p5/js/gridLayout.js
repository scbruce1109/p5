function setup() {
  createCanvas(600, 600);
  background(190,0,0);

  var bordery = 10;
  var borderx = 100;
  //float starty = 30;
  var startx = 10;
  var endx = width -10;
  var endy = height -10;
  var x = borderx;
  var y = bordery;
  var spacing = 10;
  var xloc = startx;

  var numRows = 3;
  var numCol = 10;

  for (let i=0;i<numCol;i++){
  for (let r=0;r<numRows;r++){

   xloc = (width-borderx*2-spacing*(numCol-1))/numCol;////random(endx/numCol);
   //xloc = 100;
   var yloc = (height-bordery*2-spacing*(numRows-1))/numRows;/////random(endy/numCol);
    // var index = int(random(colors.length));
    fill(0);
   // rect(x, y, xloc,yloc); /// use xloc here
   // print(yloc);
   //x += xloc + spacing;
   y += yloc;
   y += spacing;
   //numCol+=1;
  }
  // numRows+=1;
  y = bordery;
  x += xloc;
  x += spacing;
}

  var newG = new GridLayout(0,0,width,height,50,50,10,1,2);
	// for (let i =0;i<newG.grids.length;i+=2){
		var ting = newG.grids[1];
		var g2 = new GridLayout(ting.x,ting.y,ting.width,ting.height,0,0,5,3,3);
		g2.display();
	// }
  // newG.display();
  newG.grids[0].display()

}

function draw() {
}
