var startz=50;
var startgen=[0.4,0.4,2,[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],0,0.04,0];
var environment=[3,3];
var startpeople=500;
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
  var gen=change(startgen);
  var voz=Math.random()*1000;
  var energy=3000+Math.random()*4000;
  var imago=new zom(x,y,child,gen,voz,energy);
  zombi.push(imago);
}
for(var i=0;i<startpeople;i++){
  people.push(new homo(Math.random()*width,Math.random()*width,[Math.random(),Math.random(),Math.random()],Math.random()*2000+2000));
}
function zombiStep(){
  for(var i=0;i<zombi.length;i++){
    var isee=[];
    ctx.beginPath(); 
    ctx.arc(zombi[i].x,zombi[i].y,1,0,360);
    ctx.fillStyle="rgb("+zombi[i].gen[4]*5000+","+zombi[i].gen[5]*10000+","+zombi[i].gen[6]*5000+")";
    ctx.lineWidth = 4;
    ctx.strokeStyle="green";
    ctx.stroke();
    ctx.fill();
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
      zombi[i].napravx=(zombi[i].x-width/2)/-10000;
    }
    if(zombi[i].y<0 || zombi[i].y>height){
      zombi[i].napravy=(zombi[i].y-height/2)/-10000;
    }
    if(isNaN(zombi[i].napravy) || isNaN(zombi[i].napravx)){
      
    }
    else{
      zombi[i].x+=zombi[i].napravx*zombi[i].gen[0]*speed*5;
      zombi[i].y+=zombi[i].napravy*zombi[i].gen[0]*speed*5;
    }
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
  ctx.rect(0,0,width,height);
  ctx.fillStyle=("rgb(" + (150*environment[0]**0.3) +",150," + (150/environment[0]**0.3) +")");
  ctx.fill();
  homoStep();
  zombiStep();
  if(Math.random()<0.05*environment[1]){
    people.push(new homo(Math.random()*width,Math.random()*width,[Math.random()+0.1,Math.random()*0.0+0.1,Math.random()+0.1],Math.random()*2000+2000));
  }
  if(zombi.length>150 & Math.random()<0.2){
    environment[Math.round(Math.random()*(environment.length+0.9))]/=1.1;
  }
  if(zombi.length<40 & Math.random()<0.2){
    environment[Math.round(Math.random()*(environment.length+0.9))]*=1.1;
  }
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