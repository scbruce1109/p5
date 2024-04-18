var img;

function preload()
{
  // load image
  img = loadImage("self_portrait_2_1500x2257.jpg");
}

function setup()
{
  // set canvas size
  createCanvas(1500, 2257);
  background(255);
}

function draw()
{
  // background(255);
  let x = random(1500);
   let y = random(2257);
   let w = random(20)
   let h = random(20)
   let c = img.get(int(x), int(y));
   // console.log(c[0])
   fill(c[0],c[1],c[2],20);
   noStroke();
   rect(x,y,h,h);

  // display image (img, x, y)
  // image(img, 0, 0);
}
