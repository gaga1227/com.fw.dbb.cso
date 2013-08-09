/*
CUSTOM FORM ELEMENTS
Update: JX 20120719 - updated condition to allow multiple classes for form elements
Update: JX 20130322 - added icon to 'span.select' via 'data-icon' on 'select'
Update: JX 20130325 - removed 'disabled' styles content
*/

var checkboxHeight = "35";
var radioHeight = "35";
var selectWidth = "190";

/* No need to change anything after this */
document.write('<style type="text/css">input.styled { display: none; } select.styled { position: relative; width: '+selectWidth+"px; opacity: 0; filter: alpha(opacity=0); z-index: 5; } .disabled {}</style>");var Custom={init:function(){var inputs=document.getElementsByTagName("input"),span=Array(),textnode,iconnode,option,active;for(a=0;a<inputs.length;a++){if((inputs[a].type=="checkbox"||inputs[a].type=="radio")&&inputs[a].className.indexOf("styled")>=0){span[a]=document.createElement("span");span[a].className=inputs[a].type;if(inputs[a].checked==true){if(inputs[a].type=="checkbox"){position="0 -"+(checkboxHeight*2)+"px";span[a].style.backgroundPosition=position}else{position="0 -"+(radioHeight*2)+"px";span[a].style.backgroundPosition=position}}inputs[a].parentNode.insertBefore(span[a],inputs[a]);inputs[a].onchange=Custom.clear;if(!inputs[a].getAttribute("disabled")){span[a].onmousedown=Custom.pushed;span[a].onmouseup=Custom.check}else{span[a].className=span[a].className+=" disabled"}}}inputs=document.getElementsByTagName("select");for(a=0;a<inputs.length;a++){if(inputs[a].className.indexOf("styled")>=0){option=inputs[a].getElementsByTagName("option");active=option[0].childNodes[0].nodeValue;textnode=document.createTextNode(active);for(b=0;b<option.length;b++){if(option[b].selected==true){textnode=document.createTextNode(option[b].childNodes[0].nodeValue)}}span[a]=document.createElement("span");span[a].className="select";span[a].id="select"+inputs[a].name;span[a].appendChild(textnode);if(inputs[a].getAttribute("data-icon")){iconnode=document.createElement("i");iconnode.className=inputs[a].getAttribute("data-icon");span[a].appendChild(iconnode)}inputs[a].parentNode.insertBefore(span[a],inputs[a]);if(!inputs[a].getAttribute("disabled")){inputs[a].onchange=Custom.choose}else{inputs[a].previousSibling.className=inputs[a].previousSibling.className+=" disabled"}}}document.onmouseup=Custom.clear},pushed:function(){element=this.nextSibling;if(element.checked==true&&element.type=="checkbox"){this.style.backgroundPosition="0 -"+checkboxHeight*3+"px"}else{if(element.checked==true&&element.type=="radio"){this.style.backgroundPosition="0 -"+radioHeight*3+"px"}else{if(element.checked!=true&&element.type=="checkbox"){this.style.backgroundPosition="0 -"+checkboxHeight+"px"}else{this.style.backgroundPosition="0 -"+radioHeight+"px"}}}},check:function(){element=this.nextSibling;if(element.checked==true&&element.type=="checkbox"){this.style.backgroundPosition="0 0";element.checked=false}else{if(element.type=="checkbox"){this.style.backgroundPosition="0 -"+checkboxHeight*2+"px"}else{this.style.backgroundPosition="0 -"+radioHeight*2+"px";group=this.nextSibling.name;inputs=document.getElementsByTagName("input");for(a=0;a<inputs.length;a++){if(inputs[a].name==group&&inputs[a]!=this.nextSibling){inputs[a].previousSibling.style.backgroundPosition="0 0"}}}element.checked=true}},clear:function(){inputs=document.getElementsByTagName("input");for(var b=0;b<inputs.length;b++){if(inputs[b].type=="checkbox"&&inputs[b].checked==true&&inputs[b].className.indexOf("styled")>=0){inputs[b].previousSibling.style.backgroundPosition="0 -"+checkboxHeight*2+"px"}else{if(inputs[b].type=="checkbox"&&inputs[b].className.indexOf("styled")>=0){inputs[b].previousSibling.style.backgroundPosition="0 0"}else{if(inputs[b].type=="radio"&&inputs[b].checked==true&&inputs[b].className.indexOf("styled")>=0){inputs[b].previousSibling.style.backgroundPosition="0 -"+radioHeight*2+"px"}else{if(inputs[b].type=="radio"&&inputs[b].className.indexOf("styled")>=0){inputs[b].previousSibling.style.backgroundPosition="0 0"}}}}}},choose:function(){option=this.getElementsByTagName("option");for(d=0;d<option.length;d++){if(option[d].selected==true){document.getElementById("select"+this.name).childNodes[0].nodeValue=option[d].childNodes[0].nodeValue}}}};window.onload=Custom.init;