function dateTimeToJulian(date){

  var d = date.getTime();
  var jd = Math.floor((d / 86400000) + 2440587.5);
  console.log(jd)
  return jd;
}

function meanLongOfSun(ndays){
  var l = 280.460 + 0.9856474 * ndays
  return l
}

function meanAnomolyOfSun(ndays){
  var g = 357.528 + 0.9856003 * ndays
  return g
}

function eclipticLongOfSun(l, g){
  var long = l + 1.915* sin(radians(g)) + 0.020 *sin(2*radians(g))
  return long
}

function distToSun(g){ /// in AU
  var r = 1.00014 - 0.1671 * cos(g) - 0.00014 * cos(2*g)
  return r;
}

function obliquityOfEcliptic(ndays){
  var epsilon = 23.439 - 0.0000004 * ndays;
  return epsilon
}

function getEclipticCoordinates(date){
  var ndays = dateTimeToJulian(date) - 2451545.0
  var l = meanLongOfSun(ndays)
  var g = meanAnomolyOfSun(ndays)
  var eclipticLong = eclipticLongOfSun(l,g)
  var dist = distToSun(g);
  var epsilon = obliquityOfEcliptic(ndays);

  return [eclipticLong,0,dist,obl]
}

function getRightAscension(epsilon, lambda){
  var alpha = atan2(cos(radians(epsilon))*sin(radians(lambda)),cos(sin(radians(lambda))))
  return alpha
}

function getRightAscension2(epsilon,lambda){
  var y = cos(radians(epsilon)) * sin(radians(lambda));
  var x = cos(radians(lambda))
  console.log(x)
  console.log(y)
  var a = atan(y/x);

  a = degrees(a)
  console.log(a)

  if (x < 0){
    return a +180;
  } else if (y<0 && x >0){
    return a + 360;
  } else {
    return a
  }
}

function getDeclination(epsilon, lambda){
  var delta = asin(sin(radians(epsilon))*sin(radians(lambda)))
  return delta
}
