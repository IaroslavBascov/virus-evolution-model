var startz=50;
var startgen=[0.4,0.4,2];
var startpeople=100;
var zombi=[];
var people=[];
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
  var gen=startgen;
  var voz=Math.random()*1000;
  var energy=3000+Math.random()*1000;
  var imago=new zom(x,y,child,gen,voz,energy);
  zombi.push(imago);
}
for(var i=0;i<startpeople;i++){
  people.push(new homo(Math.random()*width,Math.random()*width,[Math.random(),Math.random(),Math.random()],Math.random()*2000+2000));
}
function zombiStep(){
  for(var i=0;i<zombi.length;i++){

    if(zombi[i].x<0 || zombi[i].x>width){
      zombi[i].napravx=(zombi[i].x-width/2)/-10000;
    }
    if(zombi[i].y<0 || zombi[i].y>height){
      zombi[i].napravy=(zombi[i].y-height/2)/-10000;
    }
    ctx.beginPath(); 
    ctx.arc(zombi[i].x,zombi[i].y,3,0,360);
    ctx.fillStyle="green";
    ctx.fill();
    for(var u=0;u<people.length;u++){
      var d=distance(zombi[i].x-people[u].x,zombi[i].y-people[u].y);
      if(d<200){
        zombi[i].napravx=(people[u].x-zombi[i].x)/d*0.1;
        zombi[i].napravy=(people[u].y-zombi[i].y)/d*0.1;
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
        if(d<15){
          zombi[i].x+=(zombi[u].x-zombi[i].x)/-d*zombi[i].gen[0]*0.4;
          zombi[i].y+=(zombi[u].y-zombi[i].y)/-d*zombi[i].gen[0]*0.4;
        }
        if(d<20){
          if(zombi[i].energy*zombi[i].child/zombi[i].voz>zombi[i].energy*zombi[i].child/zombi[i].voz){
            zombi[u].gen=change(zombi[i].gen);
          }
        }
      }
    }
    zombi[i].energy-=zombi[i].gen[1]*0.1+zombi[i].gen[0]*0.1;
    zombi[i].voz++;
    zombi[i].napravx+=(Math.random()-0.5)*0.01;
    zombi[i].napravy+=(Math.random()-0.5)*0.01;
    zombi[i].x+=zombi[i].napravx*zombi[i].gen[0]*10;
    zombi[i].y+=zombi[i].napravy*zombi[i].gen[0]*10;
    if(zombi[i].energy<=0 || zombi[i].voz>=100000){
      zombi.splice(i,1)
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
  ctx.clearRect(0,0,width,height);
  zombiStep();
  homoStep()
},1);
setInterval(function(){
  people.push(new homo(Math.random()*width,Math.random()*width,[Math.random()+0.1,Math.random()+0.1,Math.random()+0.1],Math.random()*2000+2000));
},500);
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
   for(var i=0;i<gen.length; i++){
     gen[i]+=(Math.random()-0.5)*0.01;
   }
   return gen;
 }