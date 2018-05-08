function CountdownTimer(elm,tl,mes){
 this.initialize.apply(this,arguments);
}
CountdownTimer.prototype={
 initialize:function(elm,tl,mes) {
  this.elem = document.getElementById(elm);
  this.tl = tl;
  this.mes = mes;
 },countDown:function(){
  var timer='';
  var today=new Date();
  var day=Math.floor((this.tl-today)/(24*60*60*1000));
  var hour=Math.floor(((this.tl-today)%(24*60*60*1000))/(60*60*1000));
  var min=Math.floor(((this.tl-today)%(24*60*60*1000))/(60*1000))%60;
  var sec=Math.floor(((this.tl-today)%(24*60*60*1000))/1000)%60%60;
  var me=this;

  if( ( this.tl - today ) > 0 ){
   timer += '<div class="line"><span class="number day">'+day+'</span><div class="caption">ДНЕЙ</div>';
   timer += '<div class="caption">:</div><span class="number hour">'+hour+'</span>';
   timer += '<div class="caption">:</div><span class="number min">'+this.addZero(min)+'</span><div class="caption">:</div><span class="number sec">'+this.addZero(sec)+'</span></div>';
   this.elem.innerHTML = timer;
   tid = setTimeout( function(){me.countDown();},10 );
  }else{
   this.elem.innerHTML = this.mes;
   return;
  }
 },addZero:function(num){ return ('0'+num).slice(-2); }
}
function CDT(){

 // Set countdown limit
 var tl = new Date('2018/05/19 00:00:00');

 // You can add time's up message here
 var timer = new CountdownTimer('CDT',tl,'<span class="number end">Конкурс состоялся</span>');
 timer.countDown();
}
window.onload=function(){
 CDT();
}