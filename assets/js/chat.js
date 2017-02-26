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
