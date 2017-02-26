(function(){var t=/\s/g;var e=/>/g;var n=/</g;function i(i){return i.replace(t,"&nbsp;").replace(e,"&lt;").replace(n,"&gt;")}var r="__autosizeInputGhost";function o(){var t=document.createElement("div");t.id=r;t.style.cssText="display:inline-block;height:0;overflow:hidden;position:absolute;top:0;visibility:hidden;white-space:nowrap;";document.body.appendChild(t);return t}var a=o();function d(t,e){var n=window.getComputedStyle(t);var d="box-sizing:"+n.boxSizing+";border-left:"+n.borderLeftWidth+" solid black"+";border-right:"+n.borderRightWidth+" solid black"+";font-family:"+n.fontFamily+";font-feature-settings:"+n.fontFeatureSettings+";font-kerning:"+n.fontKerning+";font-size:"+n.fontSize+";font-stretch:"+n.fontStretch+";font-style:"+n.fontStyle+";font-variant:"+n.fontVariant+";font-variant-caps:"+n.fontVariantCaps+";font-variant-ligatures:"+n.fontVariantLigatures+";font-variant-numeric:"+n.fontVariantNumeric+";font-weight:"+n.fontWeight+";letter-spacing:"+n.letterSpacing+";margin-left:"+n.marginLeft+";margin-right:"+n.marginRight+";padding-left:"+n.paddingLeft+";padding-right:"+n.paddingRight+";text-indent:"+n.textIndent+";text-transform:"+n.textTransform;function f(e){e=e||t.value||t.getAttribute("placeholder")||"";if(document.getElementById(r)===null){a=o()}a.style.cssText+=d;a.innerHTML=i(e);var n=window.getComputedStyle(a).width;t.style.width=n;return n}t.addEventListener("input",function(){f()});var l=f();if(e&&e.minWidth&&l!=="0px"){t.style.minWidth=l}return f}if(typeof module==="object"){module.exports=d}else{window.autosizeInput=d}})();

// Globals
let chatBox,
    choiceBox;

const RANDOM = null;

const choicesDelay = 270;
const delayBetweenChoices = 200;
const scrollDelay = 200; // buggy if too small

const config = {
    initialNode: 'demoNode',
    chatBox: '.chatbot',
    choiceBox: '.replies',
    delay: 1300, // how fast to talk
    beforeSpeech: '<span>',
    afterSpeech: '</span>',
    beforeChoice: '<span>',
    afterChoice: '</span>'
};

// Demo data
const demoRandomSpeech = [RANDOM, 'Hi there!', 'Hola!', 'Welcome to -ATION', 'Welcome back!'];
const otherNode = {speech: 'Bye!'};
const demoNode = {
    speech: [demoRandomSpeech, 'This is a chatbot demo.'],
    choices: [
      {text: 'Yeaa wassup', next: ['demoNode', 'otherNode']},
      {text: 'Go away', next: 'otherNode'},
      {text: ['Go away!!', 'Shut up!'], next: {speech: 'Fine. Bye!'}}
    ]
};



// Chat functions

function initializeChat(_config) {
    let node = eval(config.initialNode); // parse it
    Object.assign(config, _config); // override default config
    chatBox = document.querySelector(config.chatBox); // set chat location
    choiceBox = document.querySelector(config.choiceBox); // set reply location
    executeChatNode(config.initialNode); // first message
}

function executeChatNode(_node) {

    let node;

    // Pick a node if random
    node = _node.constructor === Array ? random(_node) : _node;

    // String to actual node
    node = eval(node);


    /*============
       Speech
    ============*/


    // Pick a random reply if node.speech = [RANDOM, 'foo', 'bar', 'baz']
    if (node.speech.constructor === Array && node.speech[0] === RANDOM) node.speech = random(node.speech);

    // Make sure node.speech is an array
    if (typeof node.speech === 'string') node.speech = [node.speech];

    // TODO: Implement animation delay. Maybe listen_once. Timeouts cause browser refresh circle.

    // Display speech
    node.speech.forEach((_text, idx) => {
      let text = _text.constructor === Array ? random(_text) : _text; // Pick a random text
      let whenToScrollSpeech = idx * config.delay + scrollDelay;
      setTimeout(() => {showSpeech(text)}, idx * config.delay);
      setTimeout(() => {scrollChatBot()}, whenToScrollSpeech);
    });


    /*============
       Choices
    ============*/

    // TODO: Implement listen_once? Implement animation-delay.

    // If there's 1 reply, it should be an array
    if (Object.prototype.toString.call(node.choices) === "[object Object]")
      node.choices = [node.choices];

    // If no choices exist
    if (node.choices === undefined) return;



    let whenSpeechIsDone = config.delay * (node.speech.length - 1) + 500/*speech anim-duration*/;
    let totalDelayBetweenChoices = delayBetweenChoices * (node.choices.length - 1);
    let whenToScrollChoices = whenSpeechIsDone + choicesDelay +
    totalDelayBetweenChoices + 400/*choice anim-duration*/ + scrollDelay;

    // Show all choices
    node.choices.forEach((choice, idx) => {
        let text = choice.text.constructor === Array ? random(choice.text) : choice.text; // Pick a random text
        let delay = whenSpeechIsDone + choicesDelay + (delayBetweenChoices * idx);

        if (choice.hasOwnProperty('type') && choice.type === 'input') {
          setTimeout(() => { showInput(choice.callback, choice.next) }, delay);
          if (node.choices.length > 1) console.warn('You\'ve included an input box along with other choices. This may or may not break the app.');
        }

        else {
          setTimeout(() => { showChoice(text, choice.next) }, delay);
        }
    });

    // Scroll
    setTimeout(() => {scrollChatBot()}, whenToScrollChoices); //TODO: make sure this works nicely

} /* End executeChatNode */




// Helpers

function random(_array) {
    let array = typeof arguments[0] === 'string' ? [...arguments] : _array.slice(0);
    if (array[0] === RANDOM) array.shift();
    let choice = array[Math.floor(Math.random()*array.length)];
    return choice;
}


function showSpeech(text) {
    let textBox = htmlToDOM(config.beforeSpeech + text + config.afterSpeech);
    chatBox.appendChild(textBox);
}


function showChoice(text, next = null) {
    let textBox = htmlToDOM(config.beforeChoice + text + config.afterChoice);
    // textBox.style.cssText = "color: blue";
    textBox.addEventListener("click", () => {
      choiceBox.innerHTML = '';
      if (next !== null) executeChatNode(next); // NEXT node
    });
    choiceBox.appendChild(textBox);
}


function showInput(_func, next = null) {
    let string = '<input type="text" id="input" placeholder="Type and hit ENTER...">';
    let textBox = htmlToDOM(config.beforeChoice + string + config.afterChoice);
    textBox.addEventListener('keyup', () => {
      if (event.which === 13) { // ENTER key
        let input = document.getElementById('input');
        choiceBox.innerHTML = '';
        if (next !== null) executeChatNode(next); // NEXT node
        let func = typeof _func === 'string' ? eval(_func) : _func;
        func(input.value); // Execute callback
      }
    });
    choiceBox.appendChild(textBox);

    document.querySelector(config.choiceBox).classList.add('input');
    autosizeInput(document.getElementById('input'), { minWidth: true });
    document.getElementById('input').focus();
}


function htmlToDOM(html) {
    var frame = document.createElement('iframe');
    frame.style.display = 'none';
    document.body.appendChild(frame);
    frame.contentDocument.open();
    frame.contentDocument.write(html);
    frame.contentDocument.close();
    var el = frame.contentDocument.body.firstChild;
    document.body.removeChild(frame);
    return el;
}


function scrollChatBot() {
    let choiceBox = document.querySelector('.reply');
    let offset = choiceBox.getBoundingClientRect();
    let offsetTop = offset.top;

    let choiceBoxHeight = choiceBox.clientHeight;

    let windowHeight = window.innerHeight;
    let currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    let bottomOfChoiceBox = currentScrollPosition + offsetTop + choiceBoxHeight;
    let targetScrollPos = bottomOfChoiceBox - windowHeight;

    if (currentScrollPosition < targetScrollPos) {
      window.scroll({
        top: targetScrollPos,
        left: 0,
        behavior: 'smooth'
      });
    }
}

const bot = 'Recon';

const greetings = [RANDOM, 'Hi there!', 'Hola!', 'Welcome to -ATION!', 'Welcome!'];

function postEmail() {
  console.log('PUT to email database');
}

const test = {
  speech: [
    ['yo', 'hi', 'wassup'],
    [`I'm ${bot}.`, 'suuuppp'],
    'May I introduce you to one of our students? He\'s a web developer from Vernon, CT.'
  ],
  choices: [
    {type: 'text', text: 'Sure!', next: {speech: 'fine ill leave'}},
    {type: 'text', text: 'Sure!', next: {speech: 'fine ill leave'}},
    {type: 'text', text: 'Sure!', next: {speech: 'fine ill leave'}},
    {type: 'text', text: 'Sure!', next: {speech: 'fine ill leave'}},
    {text: 'Maybe someone else.', next: 'meetStudent'},
    {text: 'No thanks.', next: ['seeProjects', 'whoAreYou', 'pickOne']}
  ]
};

const meetStudent = {
  speech: [
    greetings,
    'I\'m '+bot+', a bot developed by the talented students at -ATION!',
    'May I introduce you to one of our students? He\'s a web developer from Vernon, CT.'
  ],
  choices: [
    {text: 'Sure!', next: 'showStudent'},
    {text: 'Maybe someone else.', next: 'meetStudent'},
    {text: 'No thanks.', next: ['seeProjects', 'whoAreYou', 'pickOne']}
  ]
};

const showStudent = {
  speech: ['Here is some of his work!', '<img src="assets/img/mustang.jpg">'],
};

const seeProjects = {
  speech: [
    'We’re currently working on big projects with Mareanca, Town of Vernon, and Shelf.io.',
    'Would you like to see them when they’re finished?'
  ],
  choices: [
    {text: 'Sure why not?', next: 'email'},
    {text: 'Um no.', next: 'pickOne'}
  ]
};

const email = {
  speech: 'Ok, just leave us your email and we\'ll be sure to share what we came up with!',
  choices: {type: 'input', callback: 'postEmail', next: 'goodbye'}
}

const whoAreYou = {
  speech: 'Are you a business or just curious to see our work?',
  choices: [
    {text: 'A business', next: 'seeProjects'},
    {text: 'Just curious :)', next: 'pickOne'}
  ]
};

const pickOne = {
  speech: 'Would you like to see our concentrations, students, or client projects?',
  choices: [
    {text: 'concentrations!', next: 'meetStudent'},
    {text: 'Students!', next: 'meetStudent'},
    {text: 'Client projects!', next: 'seeProjects'}
  ]
};

const goodbye = {
  speech: [RANDOM, 'Bye!', 'Cya!', 'Au revoir!']
};

/*
initializeChat({
    initialNode: 'demoNode', // if it's an array, then it's random
    chatBox: '.chatbot',
    choiceBox: '.replies',
    delay: 1300,
    beforeSpeech: '<div>',
    afterSpeech: '</div>',
    beforeChoice: '<div>',
    afterChoice: '</div>'
});

// Feel free to use RANDOM here
const demoRandomSpeech = [RANDOM, 'Hi there!', 'Hola!', 'Welcome to -ATION', 'Welcome back!'];
const greetings = ['Hi there!', 'Hola!', 'Welcome to -ATION', 'Welcome back!'];
const randomNodeSet = ['nodeA', 'nodeB', 'nodeC'];

const demoNode = {
    // Use `RANDOM` as index [0] for random one-liners
    // speech: [RANDOM, 'This is a demo.', 'This is a chatbot demo.'],
    speech: [demoRandomSpeech, 'This is a chatbot demo.'],
    choices: [
      // Using an array in 'text' or 'next' means pick a random one.
      {text: 'Yeaa wassup', next: ['demoNode', 'otherNode']},
      {text: 'Go away', next: 'otherNode'},
      {text: ['Go away!!', 'Shut up!'], next: {speech: 'Fine. Bye!'}} // you can embed a node if u want
    ]
};

// Simple example node. A node with no choices will end the chat.
const otherNode = { speech: 'Hi there' };
*/

Element.prototype.listen_once=function(a,b,c){var d=b;c="undefined"==typeof c||c;var e="listen_once"+(0|9e6*Math.random()).toString(36),f=a.split(" ");d=function(){var a=d;return function(){var b;return this.hasOwnProperty(e)||(this[e]=!0,b=a.apply(this,arguments)),b}}();for(var g=0;g<f.length;g++)this.addEventListener(f[g],d,{capture:c,once:!0})};

// Fix for multiple triggers from page start
let loaded = false;

// Initialize Chat
function startChat() {
  if (!loaded) {
    initializeChat({
      // initialNode: ['meetStudent', 'seeProjects', 'whoAreYou', 'pickOne'],
      initialNode: 'test',
      chatBox: '.chatbot',
      choiceBox: '.reply',
      beforeSpeech: '<div class="box">',
      afterSpeech: '</div>',
      beforeChoice: '<div class="box">',
      afterChoice: '</div>'
    });
    loaded = true;
  }
}

// GET people
fetch('/assets/json/people.json')
.then((response) => {
  if(response.ok) return response.text();
})
.then((people) => {
  let peeps = JSON.parse(people);

  peeps.forEach((peep, idx) => {
      let person = document.createElement('div');
      person.classList.add('person');
      person.style.cssText = "background-image: url("+peep.pic+"); animation-delay: "+ (200 + 50*idx) +"ms";

      let p = document.createElement('p');
      p.innerHTML = peep.name;

      let a = document.createElement('a');
      a.target = "_blank";
      a.href = peep.url;

      person.appendChild(p);
      a.appendChild(person);

      let peopleDiv = document.querySelector('.people');
      peopleDiv.insertBefore(a, peopleDiv.childNodes[idx])

  });
});

!function(a,b,c){"use strict";function d(){function h(a,b){this.scrollLeft=a,this.scrollTop=b}function i(a){return.5*(1-Math.cos(Math.PI*a))}function j(a){if("object"!=typeof a||null===a||a.behavior===c||"auto"===a.behavior||"instant"===a.behavior)return!0;if("object"==typeof a&&"smooth"===a.behavior)return!1;throw new TypeError("behavior not valid")}function k(c){var d,e,f;do c=c.parentNode,d=c===b.body,e=c.clientHeight<c.scrollHeight||c.clientWidth<c.scrollWidth,f="visible"===a.getComputedStyle(c,null).overflow;while(!d&&(!e||f));return d=e=f=null,c}function l(b){b.frame=a.requestAnimationFrame(l.bind(a,b));var d,f,h,c=g(),j=(c-b.startTime)/e;if(j=j>1?1:j,d=i(j),f=b.startX+(b.x-b.startX)*d,h=b.startY+(b.y-b.startY)*d,b.method.call(b.scrollable,f,h),f===b.x&&h===b.y)return void a.cancelAnimationFrame(b.frame)}function m(c,d,e){var i,j,k,m,o,n=g();c===b.body?(i=a,j=a.scrollX||a.pageXOffset,k=a.scrollY||a.pageYOffset,m=f.scroll):(i=c,j=c.scrollLeft,k=c.scrollTop,m=h),o&&a.cancelAnimationFrame(o),l({scrollable:i,method:m,startTime:n,startX:j,startY:k,x:d,y:e,frame:o})}if(!("scrollBehavior"in b.documentElement.style)){var d=a.HTMLElement||a.Element,e=468,f={scroll:a.scroll||a.scrollTo,scrollBy:a.scrollBy,scrollIntoView:d.prototype.scrollIntoView},g=a.performance&&a.performance.now?a.performance.now.bind(a.performance):Date.now;a.scroll=a.scrollTo=function(){return j(arguments[0])?void f.scroll.call(a,arguments[0].left||arguments[0],arguments[0].top||arguments[1]):void m.call(a,b.body,~~arguments[0].left,~~arguments[0].top)},a.scrollBy=function(){return j(arguments[0])?void f.scrollBy.call(a,arguments[0].left||arguments[0],arguments[0].top||arguments[1]):void m.call(a,b.body,~~arguments[0].left+(a.scrollX||a.pageXOffset),~~arguments[0].top+(a.scrollY||a.pageYOffset))},d.prototype.scrollIntoView=function(){if(j(arguments[0]))return void f.scrollIntoView.call(this,arguments[0]||!0);var c=k(this),d=c.getBoundingClientRect(),e=this.getBoundingClientRect();c!==b.body?(m.call(this,c,c.scrollLeft+e.left-d.left,c.scrollTop+e.top-d.top),a.scrollBy({left:d.left,top:d.top,behavior:"smooth"})):a.scrollBy({left:e.left,top:e.top,behavior:"smooth"})}}}"object"==typeof exports?module.exports={polyfill:d}:d()}(window,document);
