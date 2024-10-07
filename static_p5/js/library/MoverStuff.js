class Curve{
  constructor(startX, startY, numSteps, xoff, yoff, stepLength){
    this.x = startX;
    this.y = startY;
    this.xOff = xoff;
    this.yOff = yoff;
    this.numSteps = numSteps;
    this.stepLength = stepLength;
  }

  drawCurve(grid, hue){
    beginShape();
    noFill();
    stroke(hue,80,50,0.1);
    strokeWeight(2);

    for (let i = 0;i<numSteps;i++){
      // if (x>width || x<0)

      vertex(x,y);
      var gridAngle = grid.getAngle(x,y);
      var xStep = stepLength * cos(gridAngle);
      var yStep = stepLength * sin(gridAngle);
      x += xStep;
      y += yStep;
    }
    endShape();
  }
}

class NewMover_old {
  constructor(x,y, topSpeed,fillC){
    this.location = new p5.Vector(x,y);
    this.velocity = new p5.Vector(0,0);
    this.topSpeed = topSpeed;
    this.mNoise = random(0,100000);
    this.nsize = 2;
    this.alive = true;
    this.lifeForce = 30;
    this.fillC = fillC;
  }

  applyForce(force){

    this.checkEdges();
    // this.checkAlive()
    if (this.alive){
    // var acceleration = sin(this.location.x * 0.01) + cos(this.location.y * 0.001) * PI *2;
    // var acceleration = grid.getAngle(this.location.x,this.location.y);
    this.velocity.x += cos(force);
    this.velocity.y += sin(force);
    this.velocity.limit(this.topSpeed);
    this.location.add(this.velocity);

    // this.display();
    }
    // this.mnoise += 0.01;
    // this.msize = map(noise(this.mnoise),0, 1, 1, 50);
    // this.msize -=10;
  }

  checkAlive(){
    if (this.alive){
      if (this.lifeForce <= 0){
        this.alive = false;
      } else {
        this.lifeForce -= 1;
      }
    }
  }

  checkEdges(){
    if (this.location.x > width){
      this.alive = false;
    } else if (this.location.x < 0){
      this.alive = false;
    } else if (this.location.y > height){
      this.alive = false;
    } else if (this.location.y <0){
      this.alive = false;
    }
  }

  display(){
    if (1 == 2){
    // stroke(random(255),random(255),random(255),20);
    // fill(random(255),random(255),random(255),10);
  } else {
    noStroke();
    fill(this.fillC,20);
  }
    ellipse(this.location.x, this.location.y, 2,2);
  }

}


class Mover {
  constructor(x,y, topSpeed,fillC){
    this.location = new p5.Vector(x,y);
    this.velocity = new p5.Vector(0,0);
    this.topSpeed = topSpeed;
    this.mNoise = random(0,100000);
    this.nsize = 2;
    this.alive = true;
    this.lifeForce = 30;
    this.fillC = fillC;
  }

  update(grid){

    this.checkEdges();
    // this.checkAlive()
    if (this.alive){
    // var acceleration = sin(this.location.x * 0.01) + cos(this.location.y * 0.001) * PI *2;
    var acceleration = grid.getAngle(this.location.x,this.location.y);
    this.velocity.x += cos(acceleration);
    this.velocity.y += sin(acceleration);
    this.velocity.limit(this.topSpeed);
    this.location.add(this.velocity);

    // this.display();
    }
    // this.mnoise += 0.01;
    // this.msize = map(noise(this.mnoise),0, 1, 1, 50);
    // this.msize -=10;
  }

  checkAlive(){
    if (this.alive){
      if (this.lifeForce <= 0){
        this.alive = false;
      } else {
        this.lifeForce -= 1;
      }
    }
  }

  checkEdges(){
    if (this.location.x > width){
      this.alive = false;
    } else if (this.location.x < 0){
      this.alive = false;
    } else if (this.location.y > height){
      this.alive = false;
    } else if (this.location.y <0){
      this.alive = false;
    }
  }

  display(){
    if (1 == 2){
    // stroke(random(255),random(255),random(255),20);
    // fill(random(255),random(255),random(255),10);
  } else {
    noStroke();
    fill(this.fillC,20);
  }
    ellipse(this.location.x, this.location.y, 1,1);
  }

}
