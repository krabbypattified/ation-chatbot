// Globals
let chatBox,
    choiceBox;
const RANDOM = null;
const config = {
    initialNode: 'demoNode',
    chatBox: '.chatbot',
    choiceBox: '.replies',
    delay: 1300,
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

    // Pick a random reply if node.speech = [RANDOM, 'foo', 'bar', 'baz']
    if (node.speech.constructor === Array && node.speech[0] === RANDOM) node.speech = random(node.speech);

    // Make sure node.speech is an array
    if (typeof node.speech === 'string') node.speech = [node.speech];

    // TODO: animation delay or timeout here? Timeouts cause browser refresh circle.

    // Display speech
    node.speech.forEach((_text, idx) => {
      let text = _text.constructor === Array ? random(_text) : _text; // Pick a random reply
      setTimeout(() => {showSpeech(text)}, idx * config.delay);
      setTimeout(() => {scrollChatBot()}, idx * config.delay + 200);
    });


    // If there's 1 reply, it should be an array
    if (Object.prototype.toString.call(node.choices) === "[object Object]")
      node.choices = [node.choices];

    // Handle timeout
    let timeout = 400;
    let responseInterval = 200;
    let responseDelay = 270 - 400; // responseDelay should be desiredDelay - animation-delay (to avoid jiter)
    let scrollDelay = 270 + (node.choices.length * responseInterval);
    // animation-delay 400ms

    // TODO: no timeouts for replies. just animation delays

    // If choices exist
    if (node.choices !== undefined) {

      // Show choices for node
      node.choices.forEach((choice, idx) => {

            // Handle timeout
            let multipleLines = node.speech.constructor === Array && node.speech[0] !== RANDOM;
            if (multipleLines) timeout = (node.speech.length - 1) * config.delay + (idx * responseInterval) + responseDelay;
            else timeout = 400 + (idx * responseInterval) + responseDelay;
            if (timeout < 0) timeout = 0;

            // If input, display input
            if (choice.hasOwnProperty('type') && choice.type === 'input') {
              setTimeout(() => {showInput(choice.callback, choice.next)}, timeout);
              if (node.choices.length > 1) console.warn('You\'ve included an input box along with other choices. This may or may not break the app.');
            }

            // Else if text, display text
            else {
              let text = choice.text.constructor === Array ? random(choice.text) : choice.text;
              setTimeout(() => {showChoice(text, choice.next)}, timeout);
            }
        });

    }

    setTimeout(() => {scrollChatBot()}, scrollDelay);
  }




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

function showChoice(text, next) {
    let textBox = htmlToDOM(config.beforeChoice + text + config.afterChoice);
    // textBox.style.cssText = "color: blue";
    textBox.addEventListener("click", () => {
      choiceBox.innerHTML = '';
      executeChatNode(next); // NEXT node
    });
    choiceBox.appendChild(textBox);
}

function showInput(_func, next) {
    let string = '<input type="text" id="input" placeholder="Type and hit ENTER...">';
    let textBox = htmlToDOM(config.beforeChoice + string + config.afterChoice);
    textBox.addEventListener('keyup', () => {
      if (event.which === 13) { // ENTER key
        let input = document.getElementById('input');
        choiceBox.innerHTML = '';
        executeChatNode(next); // NEXT node
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
