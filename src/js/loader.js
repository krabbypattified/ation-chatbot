import './listen_once';
import { initializeChat } from './chatbot';
import { config } from './chatconfig';
import * as data from './chatdata';

// Loader box
var load = document.querySelector('div.load');

// Don't load chat multiple times
let chatStarted = false;

// To load chat
load.listen_once('animationEnd webkitAnimationEnd',function() {
    load.style.display = 'none';
    if (!chatStarted) initializeChat(config, data); chatStarted = true;
}, false);

// For slow internet
setTimeout(function() {
    if (!chatStarted) initializeChat(config, data); chatStarted = true;
}, 2000);

// Scroll up before u close
window.addEventListener('beforeunload', function() {
  scroll(0,0);
}, false);
