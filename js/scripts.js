var Waveform;(function(b){var a;if(typeof AudioContext!=="undefined"){a=new AudioContext();}else{if(typeof webkitAudioContext!=="undefined"){a=new webkitAudioContext();
}else{console.log("Unable to run this Web Audio API example");return;}}Waveform={settings:{canvas_width:453,canvas_height:66,bar_width:3,bar_gap:0.2,wave_start_color:"#ff7700",wave_end_color:"#ff2400",download:false,shadow_height:70,shadow_start_color:"#ff7700",shadow_end_color:"#ff2400",shadow_opacity:0.2,shadow_gap:1,onComplete:function(c,d){}},generate:function(e,d){this.settings.canvas=document.createElement("canvas");
this.settings.context=this.settings.canvas.getContext("2d");this.settings.canvas.width=(d.canvas_width!==undefined)?parseInt(d.canvas_width):this.settings.canvas_width;
this.settings.canvas.height=(d.canvas_height!==undefined)?parseInt(d.canvas_height):this.settings.canvas_height;this.settings.wave_start_color=(d.wave_start_color!==undefined)?d.wave_start_color:this.settings.wave_start_color;
this.settings.wave_end_color=(d.wave_end_color!==undefined)?d.wave_end_color:this.settings.wave_end_color;this.settings.shadow_start_color=(d.shadow_start_color!==undefined)?d.shadow_start_color:this.settings.shadow_start_color;
this.settings.shadow_end_color=(d.shadow_end_color!==undefined)?d.shadow_end_color:this.settings.shadow_end_color;this.settings.shadow_opacity=(d.shadow_opacity!==undefined)?parseFloat(d.shadow_opacity):this.settings.shadow_opacity;
this.settings.shadow_gap=(d.shadow_gap!==undefined)?parseInt(d.shadow_gap):this.settings.shadow_gap;this.settings.bar_width=(d.bar_width!==undefined)?parseInt(d.bar_width):this.settings.bar_width;
this.settings.bar_gap=(d.bar_gap!==undefined)?parseFloat(d.bar_gap):this.settings.bar_gap;this.settings.download=(d.download!==undefined)?d.download:this.settings.download;
this.settings.onComplete=(d.onComplete!==undefined)?d.onComplete:this.settings.onComplete;this.settings.shadow_height=(d.shadow_height!==undefined)?parseFloat(d.shadow_height):this.settings.shadow_height;
var c=new FileReader();Waveform.audioContext=a;c.onload=function(f){Waveform.audioContext.decodeAudioData(f.target.result,function(g){Waveform.extractBuffer(g);
});};c.readAsArrayBuffer(e);},extractBuffer:function(f){f=f.getChannelData(0);var m=this.settings.canvas.width;var h=Math.floor(f.length/m);var k=[];var l=this.settings.canvas.height-this.settings.shadow_height;
for(var g=0;g<m;g+=this.settings.bar_width){k.push(this.bufferMeasure(g*h,h,f)*10000);}for(var e=0;e<m;e+=this.settings.bar_width){var d=l/Math.max.apply(Math,k);
var c=this.bufferMeasure(e*h,h,f)*10000;c*=d;c+=1;this.drawBar(e,c);if(this.settings.shadow_height>0){d=this.settings.shadow_height/Math.max.apply(Math,k);
c=this.bufferMeasure(e*h,h,f)*10000;c*=d;c+=1;this.drawShadow(e,c);}}if(this.settings.download){this.generateImage();}this.settings.onComplete(this.settings.canvas.toDataURL("image/png"),this.settings.context.getImageData(0,0,this.settings.canvas.width,this.settings.canvas.height));
this.settings.context.clearRect(0,0,this.settings.canvas.width,this.settings.canvas.height);},bufferMeasure:function(c,f,g){var e=0;for(var d=c;d<=(c+f)-1;
d++){e+=Math.pow(g[d],2);}return Math.sqrt(e/g.length);},drawBar:function(f,g){var e=this.settings.context.createLinearGradient(0,0,0,170);e.addColorStop(0,this.settings.wave_start_color);
e.addColorStop(1,this.settings.wave_end_color);this.settings.context.fillStyle=e;var d=this.settings.bar_width;if(this.settings.bar_gap!==0){d*=Math.abs(1-this.settings.bar_gap);
}var c=f+(d/2),j=this.settings.canvas.height-g;j=j-this.settings.shadow_height;this.settings.context.fillRect(c,j,d,g);},drawShadow:function(f,g){var e=this.settings.context.createLinearGradient(0,0,0,170);
e.addColorStop(0,this.settings.shadow_start_color);e.addColorStop(1,this.settings.shadow_end_color);this.settings.context.fillStyle=e;var d=this.settings.bar_width;
if(this.settings.bar_gap!==0){d*=Math.abs(1-this.settings.bar_gap);}var c=f+(d/2),j=this.settings.canvas.height-this.settings.shadow_height;j=j+this.settings.shadow_gap;
this.settings.context.globalAlpha=this.settings.shadow_opacity;this.settings.context.fillRect(c,j,d,g);this.settings.context.globalAlpha=1;},generateImage:function(){var d=this.settings.canvas.toDataURL("image/png");
var c=document.createElement("a");c.href=d;c.setAttribute("download","");c.click();}};})(jQuery);(function(a){a.SimplyAjaxLoader=function(c,o){var d={deeplinking:false,debug:false,autoload:false,load_start:function(){},load_end:function(q,p){},close:function(p){}};
var e=this,k,n=location.href,f=location.pathname=="/",b,l,h=a(c),j,i=false,g=false;e.settings={};var m=function(){e.settings=a.extend({},d,o);if(typeof NProgress!=="undefined"){NProgress.configure({showSpinner:false});
i=true;}var p='<div class="apc"><div class="apc-block"><div class="apc-container"><div class="apc-close-layer"></div><div class="apc-page on"></div></div></div></div>';
a("body").append(p);k=a(".apc");b=a(".apc .apc-page");if(e.settings.deeplinking){a(window).on("popstate",e.start);e.start();}a(document).on("click",".apc-next",e.click_open);
a(document).on("click",".apc-prev",e.click_open);a(document).on("click",".apc-close",e.close);a(document).on("click",".apc-close-layer",e.close);h.each(function(){a(this).on("click",e.click_open);
});};e.click_open=function(p){if(a(this).attr("href")!=="#"){g=a(this);if(e.settings.deeplinking){history.pushState(null,null,g.attr("href"));e.start();
}else{e.load_start();}}p.preventDefault();};e.close=function(p){if(e.settings.debug){console.log("Close content.");}k.find(".apc-block").removeClass("on");
setTimeout(function(){k.removeClass("on");},500);setTimeout(function(){a("body").removeClass("apc-open");if(i){NProgress.done();}if(e.settings.deeplinking){history.pushState(null,"",n);
}e.clear_content();},500);p.preventDefault();};e.start=function(r){if(!f){f=true;return false;}if(window.location.hash){return false;}if(g!=false){e.load_start();
return false;}var p=location.pathname.replace(/^.*[\\/]/,"");if(p!=""){if(a('a[href="'+p+'"]:first').length){g=a('a[href="'+p+'"]:first');}else{var q=document.createElement("a");
q=a(q).attr("href",p).addClass("ajax-link");g=q;}e.load_start();}};e.load_start=function(p){if(i){NProgress.start();}e.settings.load_start.call(undefined);
if(b.find("#ajax-container").length){b.addClass("start");setTimeout(function(){b.addClass("over move-container");},10);setTimeout(function(){b.removeClass("on start");
},100);setTimeout(function(){b.removeClass("move-container");e.clear_content();e.load_ajax();},500);}else{a("body").addClass("apc-open");setTimeout(function(){k.addClass("on");
},100);setTimeout(function(){e.load_ajax();},500);}};e.load_ajax=function(){a.ajax({url:g.attr("href"),dataType:"html",cache:false,async:true,success:function(p){j=a("<div>"+p+"</div>").find("#ajax-container");
if(j.length<=0){e.load_error_page();return;}j.imagesLoaded({background:true},function(){e.show_content();});},error:function(r,p,q){e.load_error_page();
}});};e.show_content=function(){if(i){NProgress.done();}k.find(".apc-block").scrollTop(0);b.append(j);e.add_navigation();e.settings.load_end.call(undefined,b);
g=false;if(k.find(".apc-block").hasClass("on")){b.addClass("on");setTimeout(function(){b.removeClass("over");},800);}else{k.find(".apc-block").addClass("on");
}};e.add_navigation=function(){var p,x,r=new Array(),u,t="",v="",w=g.attr("href"),s="light-nav",q;if(g.attr("data-nav-container")){x=g.attr("data-nav-container");
if(a(x).length){a(".ajax-link",x).each(function(){if(a(this).attr("href")!==""||a(this).attr("href")!=="#"){r.push(a(this).attr("href"));}});q=r.length-1;
if(q>0){u=r.indexOf(w);if(u==0){t="#";v=r[1];}else{if(u==q){t=r[q-1];v="#";}else{v=r[u+1];t=r[u-1];}}t='<a href="'+t+'" class="arrow-nav left apc-prev" data-nav-container="'+x+'"><span><i class="icon icon-angle-left"></i></span></a>';
v='<a href="'+v+'" class="arrow-nav right apc-next" data-nav-container="'+x+'"><span><i class="icon icon-angle-right"></i></span></a>';}}}if(b.find("#ajax-container.light-bg").length){s="dark-nav";
}b.prepend('<div class="apc-nav '+s+'">'+t+v+'<a href="#" class="apc-close"><span class="pe-7s-close"></span></a></div>');};e.clear_content=function(){b.removeClass("start");
b.empty();};e.load_error_page=function(){a.ajax({url:"404.html",dataType:"html",cache:false,async:true,success:function(p){j=a("<div>"+p+"</div>").find("#ajax-container");
if(j.length<=0){console.log(p);return;}j.imagesLoaded({background:true},function(){e.show_content();});},error:function(r,p,q){console.log("xhr: "+r+" status: "+p+" error: "+q);
}});};m();};})(jQuery);(function(a){a.fn.extend({ResVid:function(b){var c={syntax:""};var b=a.extend(c,b);return a("iframe",this).each(function(f){if(a(this).parent().hasClass("wpb_video_wrapper")){return;
}var e=b,g=a(this);$players=/www.youtube.com|player.vimeo.com/;if(g.attr("src")!==undefined&&g.attr("src")!==""&&g.attr("src").search($players)>0){var d=(g.height()/g.width())*100;
g.css({position:"absolute",top:"0",left:"0",width:"100%",height:"100%"});g.wrap('<div class="video-wrap" style="width:100%;position:relative;height:0;padding-bottom:'+d+'%" />');
}});}});})(jQuery);
/*!
* Parallax Scroll
**/
(function(b){b(function(){a.init();});var a={showLogs:false,round:1500,init:function(){this._log("init");
if(this._inited){this._log("Already Inited");this._inited=true;return;}this._requestAnimationFrame=(function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(d,c){window.setTimeout(d,1000/60);
};})();this._onScroll(true);},_inited:false,_properties:["x","y","z","rotateX","rotateY","rotateZ","scaleX","scaleY","scaleZ","scale"],_requestAnimationFrame:null,_log:function(c){if(this.showLogs){console.log("Parallax Scroll / "+c);
}},_onScroll:function(d){var c=b(document).scrollTop();var e=b(window).height();this._log("onScroll "+c);b("[data-parallax]").each(b.proxy(function(n,f){var C=b(f);
var o=[];var t=false;var w=C.data("style");if(w==undefined){w=C.attr("style")||"";C.data("style",w);}var z=[C.data("parallax")];var E;for(E=2;;E++){if(C.data("parallax"+E)){z.push(C.data("parallax-"+E));
}else{break;}}var p=z.length;for(E=0;E<p;E++){var B=z[E];var k=B["from-scroll"];if(k==undefined){k=Math.max(0,b(f).offset().top-e);}k=k|0;var q=B.distance;
var h=B["to-scroll"];if(q==undefined&&h==undefined){q=e;}q=Math.max(q|0,1);var u=B.easing;var v=B["easing-return"];if(u==undefined||!b.easing||!b.easing[u]){u=null;
}if(v==undefined||!b.easing||!b.easing[v]){v=u;}if(u){var m=B.duration;if(m==undefined){m=q;}m=Math.max(m|0,1);var D=B["duration-return"];if(D==undefined){D=m;
}q=1;var y=C.data("current-time");if(y==undefined){y=0;}}if(h==undefined){h=k+q;}h=h|0;var g=B.smoothness;if(g==undefined){g=30;}g=g|0;if(d||g==0){g=1;
}g=g|0;var x=c;x=Math.max(x,k);x=Math.min(x,h);if(u){if(C.data("sens")==undefined){C.data("sens","back");}if(x>k){if(C.data("sens")=="back"){y=1;C.data("sens","go");
}else{y++;}}if(x<h){if(C.data("sens")=="go"){y=1;C.data("sens","back");}else{y++;}}if(d){y=m;}C.data("current-time",y);}this._properties.map(b.proxy(function(L){var F=0;
var K=B[L];if(K==undefined){return;}if(L=="scale"||L=="scaleX"||L=="scaleY"||L=="scaleZ"){F=1;}else{K=K|0;}var H=C.data("_"+L);if(H==undefined){H=F;}var G=((K-F)*((x-k)/(h-k)))+F;
var I=H+(G-H)/g;if(u&&y>0&&y<=m){var J=F;if(C.data("sens")=="back"){J=K;K=-K;u=v;m=D;}I=b.easing[u](null,y,J,K,m);}I=Math.ceil(I*this.round)/this.round;
if(I==H&&G==K){I=K;}if(!o[L]){o[L]=0;}o[L]+=I;if(H!=o[L]){C.data("_"+L,o[L]);t=true;}},this));}if(t){if(o.z!=undefined){var s=B.perspective;if(s==undefined){s=800;
}var r=C.parent();if(!r.data("style")){r.data("style",r.attr("style")||"");}r.attr("style","perspective:"+s+"px; -webkit-perspective:"+s+"px; "+r.data("style"));
}if(o.scaleX==undefined){o.scaleX=1;}if(o.scaleY==undefined){o.scaleY=1;}if(o.scaleZ==undefined){o.scaleZ=1;}if(o.scale!=undefined){o.scaleX*=o.scale;o.scaleY*=o.scale;
o.scaleZ*=o.scale;}var A="translate3d("+(o.x?o.x:0)+"px, "+(o.y?o.y:0)+"px, "+(o.z?o.z:0)+"px)";var l="rotateX("+(o.rotateX?o.rotateX:0)+"deg) rotateY("+(o.rotateY?o.rotateY:0)+"deg) rotateZ("+(o.rotateZ?o.rotateZ:0)+"deg)";
var j="scaleX("+o.scaleX+") scaleY("+o.scaleY+") scaleZ("+o.scaleZ+")";var i=A+" "+l+" "+j+";";this._log(i);C.attr("style","transform:"+i+" -webkit-transform:"+i+" "+w);
}},this));if(window.requestAnimationFrame){window.requestAnimationFrame(b.proxy(this._onScroll,this,false));}else{this._requestAnimationFrame(b.proxy(this._onScroll,this,false));
}}};})(jQuery);(function(a){a.ajaxTransport("+binary",function(b,d,c){if(window.FormData&&((b.dataType&&(b.dataType=="binary"))||(b.data&&((window.ArrayBuffer&&b.data instanceof ArrayBuffer)||(window.Blob&&b.data instanceof Blob))))){return{send:function(f,o){var p=new XMLHttpRequest(),e=b.url,l=b.type,g=b.async||true,m=b.responseType||"blob",k=b.data||null,j=b.username||null,n=b.password||null;
p.addEventListener("load",function(){var i={};i[b.dataType]=p.response;o(p.status,p.statusText,i,p.getAllResponseHeaders());});p.open(l,e,g,j,n);for(var h in f){p.setRequestHeader(h,f[h]);
}p.responseType=m;p.send(k);},abort:function(){c.abort();}};}});})(jQuery);