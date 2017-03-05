import { initializeChat } from './chatbot';
import { config } from './chatconfig';
import * as data from './chatdata';

/* listen_once */
Element.prototype.listen_once=function(a,b,c){var d=b;c="undefined"==typeof c||c;var e="listen_once"+(0|9e6*Math.random()).toString(36),f=a.split(" ");d=function(){var a=d;return function(){var b;return this.hasOwnProperty(e)||(this[e]=!0,b=a.apply(this,arguments)),b}}();for(var g=0;g<f.length;g++)this.addEventListener(f[g],d,{capture:c,once:!0})};
var load = document.querySelector('div.load');
load.listen_once('animationEnd webkitAnimationEnd',function() {
  load.style.display = 'none';
  initializeChat(config, data);
}, false);
