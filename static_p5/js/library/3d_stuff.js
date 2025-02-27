function threeDRandomWalk(startLoc, numSteps){

}


class Mover3D{

  constructor(startLoc,topSpeed,startVelocity){
    this.location = startLoc;
    this.topSpeed = topSpeed;
    if (startVelocity){
      this.velocity = startVelocity;
    } else {
      this.velocity = createVector(0,0,0)
    }
    this.acceleration = createVector(0,0,0)
  }

  addForce(force){
    this.acceleration.add(force);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topSpeed);
    this.location.add(this.velocity);
  }

  display(camera){
    var pp = camera.project([this.location])[0];

    ellipse(pp.x,pp.y,5,5)
  }
}

class MySphere{
  constructor(loc,radius,rotation){

  }

  displayPoints(){

  }
}

placePointOnPlane(place){

}

placePointInFov(camera){
  
}
