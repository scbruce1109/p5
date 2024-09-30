let table, movers, ting;

function preload() {
  // console.log('url')
  // console.log(url)
  //my table is comma separated value "csv"
  //and has a header specifying the columns labels
  table = loadTable(docsUrl + '\\Art\\colorPalettes.csv', 'csv', 'header');
  //the file can be remote
  //table = loadTable("http://p5js.org/reference/assets/mammals.csv",
  //                  "csv", "header");
}


function setup(){
  createCanvas(1000,1000)
  background(0)
 //  console.log(table.getRowCount() + ' total rows in table');
 // console.log(table.getColumnCount() + ' total columns in table');

 // console.log(table.getColumn('name'));
 //["Goat", "Leopard", "Zebra"]
 var zing = colorListFromCSV(table, 6)

 var zoop = new colorPalette(zing);
 ting = new Grid2(-100,-100,width/2+100,height+100,20,noise,0.002);
 // ting.displayRect();


 for (let i = 0;i<10000;i++){
   var x = random(-100,width+100);
   var y = random(-100,height+100);
   // var cc = zoop.getColor(ting.getValue(x,y),3);
   var cc = zoop.mapColor(ting.getValue(x,y),"HSB",null,null,null,null,2);
   noStroke();
   cc.setAlpha(0.1);
   fill(cc);
   // rect(x,y,random(100),random(100))
 }

 movers = []

 for (let i = 0;i<5000;i++){
   var x = random(ting.xLoc,ting.width);
   var y = random(ting.yLoc,ting.height);
   // var cc = zoop.getColor(ting.getValue(x,y),3);
   var foo = map(y,0,height,0,1);
   var cc = zoop.mapColor(foo,"HSB",null,null,null,null,20); //ting.getValue(x,y)
   cc.setAlpha(0.05)
   var m = new Mover2(x,y,random(1,10),cc,random(5));
   movers.push(m);
   // noStroke();
   // cc.setAlpha(0.1);
   // fill(cc);
   // rect(x,y,random(100),random(100))
 }

 console.log('zing')
 console.log(zing)

 //cycle through the table
 for (let r = 0; r < table.getRowCount(); r++)
   for (let c = 0; c < table.getColumnCount(); c++) {
     // console.log(table.getString(r, c));
   }
 // describe(`randomly generated text from a file,
 //   for example "i smell like butter"`);
}


function draw(){
  for (let i = 0;i<movers.length;i++){
    movers[i].update(ting);
    // movers[i].display();
  }
}

function colorListFromCSV(csvFile, rowNum){
  var cList = [];
  var row = csvFile.getRow(rowNum)
  console.log('rowo')
  var nn = csvFile.getRow(0).getString(0)
  console.log(row['arr'])
  for (let i=2;i<row['arr'].length;i++){
    if (row.getString(i) != ""){
      console.log(row.getString(i))
      var c = row.getString(i);
      if (c[0] != "#"){
        c = "#" + c;
      }
      cList.push(c);
    }
  }
  return cList;
}
