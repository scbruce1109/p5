function dateTimeToJulian(date){

  var d = date.getTime();
  var jd = (d / 86400000) + 2440587.5;
  console.log(jd)
  return jd;
}
function daysSinceJ(jd){
  return jd - 2451545
}

function JDToGMST(jd){
  var d = daysSinceJ(jd)
  var t = d / 36525
  return 280.46061837 + 360.98564736629 * d + 0.000387933 * t^2 - t^3 / 38710000
}

function JDToGMST2(jd){
  var d = daysSinceJ(jd)
  var t = d / 36525
  // var gmst = 24110.54841 + 8640184.812866 * t + 0.093104 * t^2 - 0.0000062 * t^3
  // return (gmst / (60*60))%24
   return (18.697375 + 24.065709824279 * d) % 24
}


function meanLongOfSun(ndays){
  var l = 280.461 + 0.9856474 * ndays
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
  console.log('meanlong')
  console.log(l+720)
  var g = meanAnomolyOfSun(ndays)
  console.log('anomoly')
  console.log(g+720)
  var eclipticLong = eclipticLongOfSun(l,g)
  var dist = distToSun(g);
  var epsilon = obliquityOfEcliptic(ndays);

  return [eclipticLong,0,dist,epsilon]
}

function degreesToHour(d){
  var h = d/15
  // var h = Math.floor(decimal)
  var m = h % 1 * 60
  var s = m%1*60
  return([Math.floor(h),Math.floor(m),s])
}

function getRightAscension(epsilon, lambda){
  var alpha = atan2(cos(radians(epsilon))*sin(radians(lambda)),cos(sin(radians(lambda))))
  return alpha
}

function getRightAscension2(lambda,epsilon){
  console.log('eps')
  console.log(epsilon)
  console.log('lambda')
  console.log(lambda)
  var y = cos(radians(epsilon)) * sin(radians(lambda));
  var x = cos(radians(lambda))
  console.log(y)
  console.log(x)
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

function getlocalSidereal(gmst,longitude){
  localSidereal = gmst * 15 + longitude
  if (localSidereal <0){
    return 360 + localSidereal
  } else {
  return localSidereal
}

}

function getDeclination(lambda, epsilon){
  var delta = asin(sin(radians(epsilon))*sin(radians(lambda)))
  return degrees(delta)
}

function getHourAngle(rightAscension, localSidereal){
  return localSidereal - rightAscension
}

function hoursToDegrees(hmsArray){
  return hmsArray[0]*15+(hmsArray[1]/60+hmsArray[2]/3600)*15
}

function getSiderealHourAngle(ra){
  return 360 - ra
}

function hourToHorizontal(hourAngle,declination,latitude){
  sinAltitude = sin(radians(latitude))*sin(radians(declination)) + cos(radians(latitude))*cos(radians(declination))*cos(radians(hourAngle))
  altitude = degrees(asin(sinAltitude))
  console.log(altitude)

  sinAzymuth = cos(radians(declination))*sin(radians(hourAngle)) / cos(radians(altitude))
  azymuth = degrees(asin(sinAzymuth))
  console.log(azymuth+180)
  return ([altitude,azymuth+180])

}
