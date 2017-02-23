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
    let node = _node.constructor === Array ? random(_node) : _node;
    node = eval(node);

    // Handle single speech box
    if (typeof node.speech === 'string') {
      showSpeech(node.speech)
    }

    // Handle random single speech
    else if (node.speech[0] === RANDOM) {
      showSpeech(random(node.speech));
    }

    // Handle multiple speech boxes
    else {
      node.speech.forEach((_text, idx) => {
        let text = _text.constructor === Array ? random(_text) : _text;
        setTimeout(() => {showSpeech(text)}, idx * config.delay);
        setTimeout(() => {scrollChatBot()}, idx * config.delay + 200);
      });
    }

    let timeout = config.delay / 2;
    let responseInterval = 130;
    let responseDelay = -400; // responseDelay should be minus animation-delay
    let multipleLines = node.speech.constructor === Array && node.speech[0] !== RANDOM;

    // Show choices for node
    if (node.choices.constructor === Array) {
      node.choices.forEach((choice, idx) => {

          // Handle timeout
          if (multipleLines) timeout = node.speech.length * config.delay + idx * responseInterval + responseDelay;
          else timeout = config.delay / 2 + idx * responseInterval + responseDelay;
          if (timeout < 0) timeout = 0;

          let text = choice.text.constructor === Array ? random(choice.text) : choice.text;

          setTimeout(() => {showChoice(text, choice.next)}, timeout);
      });
    }

    else if (typeof node.choices === 'function') {
      setTimeout(() => {showInput('blah', node.choices)}, timeout);
    }

    setTimeout(() => {scrollChatBot()}, timeout);
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
  textBox.addEventListener("click", () => {
    choiceBox.innerHTML = '';
    executeChatNode(next); // NEXT node
  });
  choiceBox.appendChild(textBox);
}

function showInput(text, func) {
  let string = '<input type="text" id="input" placeholder="Type and hit ENTER...">';
  let textBox = htmlToDOM(config.beforeChoice + string + config.afterChoice);
  textBox.addEventListener('keyup', () => {
    if (event.which === 13) { // ENTER key
      let input = document.getElementById('input');
      choiceBox.innerHTML = '';
      func(input.value);
    }
  });
  choiceBox.appendChild(textBox);
  document.querySelector(config.choiceBox + ' .box').classList.add('input');
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
