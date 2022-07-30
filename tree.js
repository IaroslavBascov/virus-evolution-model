var startz=25;
var startz2=25;
var vzr=false;
var vzrx=0;
var vzry=0;
var startgen=[0.4,0.4,2,[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],0,0.04,0];
var environment=[3,3,10];
var startpeople=500;
var zombi=[];
var zombi2=[];
var people=[];
var sc1=0;
var sc2=0;
var width = window.innerWidth - 20;
var height = window.innerHeight - 20;
var canvas = document.getElementById("myCanvas");
canvas.width = width;
canvas.height = height;
var ctx = canvas.getContext("2d");
for(var i=0;i<startz;i++){
  var x=Math.random()*width;
  var y=Math.random()*height;
  var child=0;
  var gen=change(startgen);
  var voz=Math.random()*1000;
  var energy=3000+Math.random()*4000;
  var imago=new zom(x,y,child,gen,voz,energy);
  zombi.push(imago);
}
for(var i=0;i<startz2;i++){
  var x=Math.random()*width;
  var y=Math.random()*height;
  var child=0;
  var gen=change(startgen);
  var voz=Math.random()*1000;
  var energy=3000+Math.random()*4000;
  var imago=new zom(x,y,child,gen,voz,energy);
  zombi2.push(imago);
}
for(var i=0;i<startpeople;i++){
  people.push(new homo(Math.random()*width,Math.random()*width,[Math.random(),Math.random(),Math.random()],Math.random()*2000+2000));
}
function zombiStep(vzrx,vzry){
  for(var i=0;i<zombi.length;i++){
    var isee=[];
    ctx.beginPath(); 
    ctx.arc(zombi[i].x,zombi[i].y,1,0,360);
    ctx.fillStyle="rgb("+zombi[i].gen[4]*5000+","+zombi[i].gen[5]*10000+","+zombi[i].gen[6]*5000+")";
    ctx.lineWidth = 4;
    ctx.strokeStyle="green";
    ctx.stroke();
    ctx.fill();
    var dvzr=distance(zombi[i].x-vzrx,zombi[i].y-vzry);
    for(var u=0;u<people.length;u++){
      var d=distance(zombi[i].x-people[u].x,zombi[i].y-people[u].y);
      if(d<250){
        isee.push([people[u],d]);
        people[u].x-=(people[u].x-zombi[i].x)*people[u].gen[0]*-0.001;
        people[u].y-=(people[u].y-zombi[i].y)*people[u].gen[0]*-0.001;
      }
      if(d<10){
        people[u].energy-=zombi[i].gen[1]*5000;
        zombi[i].energy-=zombi[i].gen[1]*100;
        zombi[i].energy-=people[u].gen[1]*1000;
        if(people[u].energy<=0){
          if(Math.random()*zombi[i].gen[2]>0.5){
            var imago=new zom(people[u].x,people[u].y,0,change(zombi[i].gen),1,2000);
            zombi[i].child++;
            people.splice(u,1);
            zombi.push(imago);
          }
          else{
            zombi[i].energy+=2000;
          }
        }
      }
    }
    for(var u=0;u<zombi.length;u++){
      if(u!=i){
        var d=distance(zombi[i].x-zombi[u].x,zombi[i].y-zombi[u].y);
        if(d<200){
          isee.push([zombi[u],d]);
        }
        if(d<10){
          if(zombi[i].energy*zombi[i].child**2/zombi[i].voz>zombi[u].energy*zombi[u].child**2/zombi[u].voz){
            zombi[u].gen=change(zombi[i].gen);
          }
        }
      }
    }
    var maxobject=[[x=zombi[i].x,x=zombi[i].y],0.01,0];
    for(var uu=0 ; uu<isee.length; uu++ ){
      if(isee[uu][0].constructor.name==="zom"){
        if(((isee[uu][1]**zombi[i].gen[3][0])*(energy**zombi[i].gen[3][1])*(voz**zombi[i].gen[3][2])*zombi[i].gen[3][3])+((isee[uu][1]**zombi[i].gen[3][4])*(energy**zombi[i].gen[3][5])*(voz**zombi[i].gen[3][6])*zombi[i].gen[3][7])>maxobject[2]){
          maxobject=isee[uu];
          maxobject.push(((isee[uu][1]**zombi[i].gen[3][0])*(energy**zombi[i].gen[3][1])*(voz**zombi[i].gen[3][2])*zombi[i].gen[3][3])+((isee[uu][1]**zombi[i].gen[3][4])*(energy**zombi[i].gen[3][5])*(voz**zombi[i].gen[3][6])*zombi[i].gen[3][7]));
        }
      }
      if(isee[uu][0].constructor.name=="homo"){
        if(((isee[uu][1]**zombi[i].gen[3][zombi[i].gen[3].length/2+0])*(energy**zombi[i].gen[3][zombi[i].gen[3].length/2+1])*(voz**zombi[i].gen[3][zombi[i].gen[3].length/2+2])*zombi[i].gen[3][zombi[i].gen[3].length/2+3])+((isee[uu][1]**zombi[i].gen[3][zombi[i].gen[3].length/2+4])*(energy**zombi[i].gen[3][zombi[i].gen[3].length/2+5])*(voz**zombi[i].gen[3][zombi[i].gen[3].length/2+6])*zombi[i].gen[3][zombi[i].gen[3].length/2+7])>maxobject[2]){
          maxobject=isee[uu];
          maxobject.push(((isee[uu][1]**zombi[i].gen[3][zombi[i].gen[3].length/2+0])*(energy**zombi[i].gen[3][zombi[i].gen[3].length/2+1])*(voz**zombi[i].gen[3][zombi[i].gen[3].length/2+2])*zombi[i].gen[3][zombi[i].gen[3].length/2+3])+((isee[uu][1]**zombi[i].gen[3][zombi[i].gen[3].length/2+4])*(energy**zombi[i].gen[3][zombi[i].gen[3].length/2+5])*(voz**zombi[i].gen[3][zombi[i].gen[3].length/2+6])*zombi[i].gen[3][zombi[i].gen[3].length/2+7]));
        }
      }
    }
    var speed=0;
    if(maxobject[0].constructor.name=="zom"){
      speed=(maxobject[1]**zombi[i].gen[3][7]*zombi[i].gen[3][8])+(energy**zombi[i].gen[3][9]*zombi[i].gen[3][10]+(voz*zombi[i].gen[3][11]))*0.01;
    }
    if(maxobject[0].constructor.name=="homo"){
      speed=(maxobject[1]**zombi[i].gen[3][zombi[i].gen[3].length/2+7]*zombi[i].gen[3][zombi[i].gen[3].length/2+8])+(energy**zombi[i].gen[3][zombi[i].gen[3].length/2+9]*zombi[i].gen[3][zombi[i].gen[3].length/2+10]+(voz*zombi[i].gen[3][zombi[i].gen[3].length/2+11]))*0.01;
    }
    zombi[i].energy-=(zombi[i].gen[1]*0.07+zombi[i].gen[0]*Math.abs(speed)*0.1)/environment[0]*5;
    zombi[i].voz++;
    if(maxobject[0].constructor.name=="homo" || maxobject[0].constructor.name== "zom")
    {
      zombi[i].napravx=((maxobject[0].x-zombi[i].x)/maxobject[1]);
      zombi[i].napravy=((maxobject[0].y-zombi[i].y)/maxobject[1]);
    }
    else{
      zombi[i].napravx=(Math.random()-0.5)*0.1;
      zombi[i].napravy=(Math.random()-0.5)*0.1;
    }
    if(zombi[i].x<0 || zombi[i].x>width){
      zombi[i].napravx=(zombi[i].x-width/2)/-100000;
    }
    if(zombi[i].y<0 || zombi[i].y>height){
      zombi[i].napravy=(zombi[i].y-height/2)/-100000;
    }
    if(isNaN(zombi[i].napravy) || isNaN(zombi[i].napravx)){
      
    }
    else{
      zombi[i].x+=zombi[i].napravx*zombi[i].gen[0]*speed*5;
      zombi[i].y+=zombi[i].napravy*zombi[i].gen[0]*speed*5;
    }
    if(zombi[i].energy<=0 || zombi[i].voz>=100000 || (dvzr<200 & vzr==true)){
      zombi.splice(i,1)
    }
  }
}
function zombi2Step(vzrx,vzry){
  for(var i=0;i<zombi2.length;i++){
    var isee=[];
    ctx.beginPath(); 
    ctx.arc(zombi2[i].x,zombi2[i].y,1,0,360);
    ctx.fillStyle="rgb("+zombi2[i].gen[4]*5000+","+zombi2[i].gen[5]*10000+","+zombi2[i].gen[6]*5000+")";
    ctx.lineWidth = 4;
    ctx.strokeStyle="red";
    ctx.stroke();
    ctx.fill();
    var dvzr=distance(zombi2[i].x-vzrx,zombi2[i].y-vzry);
    for(var u=0;u<people.length;u++){
      var d=distance(zombi2[i].x-people[u].x,zombi2[i].y-people[u].y);
      if(d<250){
        isee.push([people[u],d]);
        people[u].x-=(people[u].x-zombi2[i].x)*people[u].gen[0]*-0.001;
        people[u].y-=(people[u].y-zombi2[i].y)*people[u].gen[0]*-0.001;
      }
      if(d<10){
        people[u].energy-=zombi2[i].gen[1]*5000;
        zombi2[i].energy-=zombi2[i].gen[1]*100;
        zombi2[i].energy-=people[u].gen[1]*1000;
        if(people[u].energy<=0){
          if(Math.random()*zombi2[i].gen[2]>0.5){
            var imago=new zom(people[u].x,people[u].y,0,change(zombi2[i].gen),1,2000);
            zombi2[i].child++;
            people.splice(u,1);
            zombi2.push(imago);
          }
          else{
            zombi2[i].energy+=2000;
          }
        }
      }
    }
    for(var u=0;u<zombi2.length;u++){
      if(u!=i){
        var d=distance(zombi2[i].x-zombi2[u].x,zombi2[i].y-zombi2[u].y);
        if(d<200){
          isee.push([zombi2[u],d]);
        }
      }
    }
    var maxobject=[[x=zombi2[i].x,x=zombi2[i].y],0.01,0];
    for(var uu=0 ; uu<isee.length; uu++ ){
      if(isee[uu][0].constructor.name==="zom"){
        if(((isee[uu][1]**zombi2[i].gen[3][0])*(energy**zombi2[i].gen[3][1])*(voz**zombi2[i].gen[3][2])*zombi2[i].gen[3][3])+((isee[uu][1]**zombi2[i].gen[3][4])*(energy**zombi2[i].gen[3][5])*(voz**zombi2[i].gen[3][6])*zombi2[i].gen[3][7])>maxobject[2]){
          maxobject=isee[uu];
          maxobject.push(((isee[uu][1]**zombi2[i].gen[3][0])*(energy**zombi2[i].gen[3][1])*(voz**zombi2[i].gen[3][2])*zombi2[i].gen[3][3])+((isee[uu][1]**zombi2[i].gen[3][4])*(energy**zombi2[i].gen[3][5])*(voz**zombi2[i].gen[3][6])*zombi2[i].gen[3][7]));
        }
      }
      if(isee[uu][0].constructor.name=="homo"){
        if(((isee[uu][1]**zombi2[i].gen[3][zombi2[i].gen[3].length/2+0])*(energy**zombi2[i].gen[3][zombi2[i].gen[3].length/2+1])*(voz**zombi2[i].gen[3][zombi2[i].gen[3].length/2+2])*zombi2[i].gen[3][zombi2[i].gen[3].length/2+3])+((isee[uu][1]**zombi2[i].gen[3][zombi2[i].gen[3].length/2+4])*(energy**zombi2[i].gen[3][zombi2[i].gen[3].length/2+5])*(voz**zombi2[i].gen[3][zombi2[i].gen[3].length/2+6])*zombi2[i].gen[3][zombi2[i].gen[3].length/2+7])>maxobject[2]){
          maxobject=isee[uu];
          maxobject.push(((isee[uu][1]**zombi2[i].gen[3][zombi2[i].gen[3].length/2+0])*(energy**zombi2[i].gen[3][zombi2[i].gen[3].length/2+1])*(voz**zombi2[i].gen[3][zombi2[i].gen[3].length/2+2])*zombi2[i].gen[3][zombi2[i].gen[3].length/2+3])+((isee[uu][1]**zombi2[i].gen[3][zombi2[i].gen[3].length/2+4])*(energy**zombi2[i].gen[3][zombi2[i].gen[3].length/2+5])*(voz**zombi2[i].gen[3][zombi2[i].gen[3].length/2+6])*zombi2[i].gen[3][zombi2[i].gen[3].length/2+7]));
        }
      }
    }
    var speed=0;
    if(maxobject[0].constructor.name=="zom"){
      speed=(maxobject[1]**zombi2[i].gen[3][7]*zombi2[i].gen[3][8])+(energy**zombi2[i].gen[3][9]*zombi2[i].gen[3][10]+(voz*zombi2[i].gen[3][11]))*0.01;
    }
    if(maxobject[0].constructor.name=="homo"){
      speed=(maxobject[1]**zombi2[i].gen[3][zombi2[i].gen[3].length/2+7]*zombi2[i].gen[3][zombi2[i].gen[3].length/2+8])+(energy**zombi2[i].gen[3][zombi2[i].gen[3].length/2+9]*zombi2[i].gen[3][zombi2[i].gen[3].length/2+10]+(voz*zombi2[i].gen[3][zombi2[i].gen[3].length/2+11]))*0.01;
    }
    zombi2[i].energy-=(zombi2[i].gen[1]*0.07+zombi2[i].gen[0]*Math.abs(speed)*0.1)/environment[0]*5;
    zombi2[i].voz++;
    if(maxobject[0].constructor.name=="homo" || maxobject[0].constructor.name== "zom")
    {
      zombi2[i].napravx=((maxobject[0].x-zombi2[i].x)/maxobject[1]);
      zombi2[i].napravy=((maxobject[0].y-zombi2[i].y)/maxobject[1]);
    }
    else{
      zombi2[i].napravx=(Math.random()-0.5)*0.1;
      zombi2[i].napravy=(Math.random()-0.5)*0.1;
    }
    if(zombi2[i].x<0 || zombi2[i].x>width){
      zombi2[i].napravx=(zombi2[i].x-width/2)/-100000;
    }
    if(zombi2[i].y<0 || zombi2[i].y>height){
      zombi2[i].napravy=(zombi2[i].y-height/2)/-100000;
    }
    if(isNaN(zombi2[i].napravy) || isNaN(zombi2[i].napravx)){
      
    }
    else{
      zombi2[i].x+=zombi2[i].napravx*zombi2[i].gen[0]*speed*5;
      zombi2[i].y+=zombi2[i].napravy*zombi2[i].gen[0]*speed*5;
    }
    if(zombi2[i].energy<=0 || zombi2[i].voz>=100000 || (dvzr<200 & vzr==true)){
      zombi2.splice(i,1)
    }
  }
}
function homoStep(){
  for(var i=0;i<people.length;i++){
    ctx.beginPath(); 
    ctx.arc(people[i].x,people[i].y,3,0,360);
    ctx.fillStyle="blue";
    ctx.fill();
  }
}
setInterval(function(){
  ctx.rect(0,0,width,height);
  ctx.fillStyle=("rgb(" + (150*environment[0]**0.3) +",150," + (150/environment[0]**0.3) +")");
  ctx.fill();
  if(Math.random()<0.05/environment[2]){
    var vzrx=Math.random()*width;
    var vzry=Math.random()*height;
    ctx.beginPath(); 
    ctx.arc(vzrx,vzry,200,0,360);
    ctx.fillStyle="red";
    ctx.fill();
    vzr=true;
  }
  homoStep();
  zombi2Step(vzrx,vzry);
  zombiStep(vzrx,vzry);
  vzr=false;
  if(Math.random()<0.05*environment[1]){
    people.push(new homo(Math.random()*width,Math.random()*width,[Math.random()+0.1,Math.random()*0.0+0.1,Math.random()+0.1],Math.random()*2000+2000));
  }
  if(zombi.length+zombi2.length>150 & Math.random()<0.2){
    environment[Math.round(Math.random()*(environment.length+0.9))]/=1.1;
  }
  if(zombi.length+zombi2.length<40 & Math.random()<0.2){
    environment[Math.round(Math.random()*(environment.length+0.9))]*=1.1;
  }
  if(zombi.length==0){
    rest();
    sc2++;
  }
  if(zombi2.length==0){
    rest();
    sc1++;
  }
  ctx.font='40px serif';
  ctx.lineWidth = 1;
  ctx.strokeStyle="black";
  ctx.fillStyle="red";
  ctx.fillText(sc2, 40, 40,40);
  ctx.strokeText(sc2, 40, 40,40);
  ctx.fillStyle="green";
  ctx.fillText(sc1, width-80, 40,40);
  ctx.strokeText(sc1, width-80, 40,40);
},1);
  people.push(new homo(Math.random()*width,Math.random()*width,[Math.random()+0.1,Math.random()*0.0+0.1,Math.random()+0.1],Math.random()*2000+2000));
setInterval(function(){
  people.splice(0,1);
},2000);
function goto(cx,cy,zx,zy){
    if ((zy-cy)>0){
    return Math.atan((zx-cx)/(zy-cy))/Math.PI * 180+180;}
    else{return Math.atan((zx-cx)/(zy-cy))/Math.PI * 180;}
}
function zom(x,y,child,gen,voz,energy){
  this.x=x;
  this.y=y;
  this.child=child;
  this.voz=voz;
  this.energy=energy;
  this.gen=gen;
  this.napravx=0;
  this.napravy=0;
 }
 function homo(x,y,gen,energy){
  this.x=x;
  this.y=y;
  this.energy=energy;
  this.gen=gen;
 }
 function distance(xxx,yxx){
   return(Math.sqrt(xxx**2+yxx**2))
 }
 function change(gen){
  var gen2=[];
  for(var i=0;i<gen.length; i++){
    if(gen[i].constructor.name=="Number"){
      gen2.push(gen[i]);
    }
    else{
      gen2.push([]);
      for(var u=0;u<gen[i].length; u++){
        gen2[i].push(gen[i][u]);
      }
    }
   }
   for(var i=0;i<gen2.length; i++){
    if(gen2[i].constructor.name=="Number"){
      gen2[i]+=(Math.random()-0.5)*0.05;
    }
    else{
      for(var u=0;u<gen2[i].length; u++){
        gen2[i][u]+=(Math.random()-0.5)*0.05;
      }
    }
   }
   return gen2;
 }
  function rest(){
   startz=25;
   startz2=25;
   vzr=false;
   vzrx=0;
   vzry=0;
   startgen=[0.4,0.4,2,[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],0,0.04,0];
   environment=[3,3,10];
   startpeople=500;
   zombi=[];
   zombi2=[];
   people=[];
   for(var i=0;i<startz;i++){
     var x=Math.random()*width;
     var y=Math.random()*height;
     var child=0;
     var gen=change(startgen);
     var voz=Math.random()*1000;
     var energy=3000+Math.random()*4000;
     var imago=new zom(x,y,child,gen,voz,energy);
     zombi.push(imago);
   }
   for(var i=0;i<startz2;i++){
     var x=Math.random()*width;
     var y=Math.random()*height;
     var child=0;
     var gen=change(startgen);
     var voz=Math.random()*1000;
     var energy=3000+Math.random()*4000;
     var imago=new zom(x,y,child,gen,voz,energy);
     zombi2.push(imago);
   }
  }