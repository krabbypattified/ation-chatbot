// Globals
let chatBox,
    choiceBox;

const RANDOM = null;

let specialChoices = false;

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
    afterChoice: '</span>',
    onChatEnd: function () {}
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
    node = _node.constructor === Array ? random(_node) : _node; // Pick a node if random
    node = eval(node); // Evaluate node


    /*============
       Speech
    ============*/


    // Pick a random reply if node.speech = [RANDOM, 'foo', 'bar', 'baz']
    if (node.speech.constructor === Array && node.speech[0] === RANDOM) node.speech = random(node.speech);

    // Make sure node.speech is an array
    if (typeof node.speech === 'string') node.speech = [node.speech];

    // TODO: Implement animation delay. Maybe listen_once. Timeouts cause browser refresh circle.

    // Create speech DOM
    let speechBoxes = createAllSpeech(node.speech);

    // Render speech DOM
    speechBoxes.forEach((box, idx) => {
        setTimeout(() => { chatBox.appendChild(box) }, box.delay); // Render speech
        setTimeout(() => {scrollChatBot(choiceBox)}, idx * config.delay + scrollDelay); // Scroll
    });


    /*============
       Choices
    ============*/

    // TODO: Implement listen_once?

    // Calculate when speech is done
    let whenSpeechIsDone = config.delay * (node.speech.length - 1) + 500/*speech anim-duration*/;

    // If there's 1 reply, it should be an array
    if (Object.prototype.toString.call(node.choices) === "[object Object]")
      node.choices = [node.choices];

    // If no choices exist
    if (typeof node.choices === 'undefined' || node.choices.length < 1) {
      if (typeof config.onChatEnd !== 'undefined') setTimeout(function() {config.onChatEnd()}, whenSpeechIsDone);
      return;
    }

    // Calculate choices delays
    let totalDelayBetweenChoices = delayBetweenChoices * (node.choices.length - 1);
    let whenToScrollChoices = whenSpeechIsDone + choicesDelay;

    // Create all choices DOM
    let textBoxes = createAllChoices(node.choices);

    // Render all choices DOM
    setTimeout(() => {
      textBoxes.forEach((box) => { choiceBox.appendChild(box) });

      // Handle special choices (like inputs) if they exist
      if (specialChoices) {
        document.querySelector(config.choiceBox).classList.add('input');
        autosizeInput(document.getElementById('input'), { minWidth: true });
        document.getElementById('input').focus();
      }
    }, whenSpeechIsDone + choicesDelay);

    // Scroll
    setTimeout(() => {scrollChatBot(choiceBox)}, whenToScrollChoices);

} /* End executeChatNode */





// Helpers

function random(_array) {
    let array = typeof arguments[0] === 'string' ? [...arguments] : _array.slice(0);
    if (array[0] === RANDOM) array.shift();
    let choice = array[Math.floor(Math.random()*array.length)];
    return choice;
}


function createAllSpeech(speech) {
  let textBoxes = [];

  speech.forEach((phrase, idx) => {
      let phraseObj = {};
      phraseObj.text = phrase.constructor === Array ? random(phrase) : phrase;
      phraseObj.delay = idx * config.delay;
      textBoxes.push(createSpeech(phraseObj));
  });

  return textBoxes;
}


function createSpeech(phrase) {
    let textBox = htmlToDOM(config.beforeSpeech + phrase.text + config.afterSpeech);
    textBox.delay = phrase.delay;
    // textBox.style.cssText = "animation-delay: " + phrase.delay + "ms";
    return textBox;
}


function createAllChoices(choices) {
  let choiceBoxes = [];
  specialChoices = false;

  choices.forEach((_choice, idx) => {
      let choice = _choice;

      choice.delay = delayBetweenChoices * idx; // NOTE: use this for animation-delay


      if (choice.hasOwnProperty('type') && choice.type === 'input') {
        specialChoices = true;
        choiceBoxes.push(createInput(choice));
        if (choices.length > 1) console.warn('Including multiple choices with an input box may or may not break the app.');
      }

      else {
        if (choice.text.constructor === Array) choice.text = random(choice.text); // Pick a random text
        choiceBoxes.push(createReply(choice));
      }
  });

  return choiceBoxes;
}


function createReply(_choice) {
    let choice = _choice;

    let textBox = htmlToDOM(config.beforeChoice + choice.text + config.afterChoice);
    textBox.style.cssText = "animation-delay: " + choice.delay + "ms";
    textBox.addEventListener("click", () => {
      choiceBox.innerHTML = '';
      if (typeof choice.next !== 'undefined') executeChatNode(choice.next); // NEXT node
    });
    return textBox;
}


function createInput(_input) {
    let input = _input;

    let string = '<input type="text" id="input" placeholder="Type and hit ENTER...">'; // What to render
    let textBox = htmlToDOM(config.beforeChoice + string + config.afterChoice);
    textBox.style.cssText = "animation-delay: " + input.delay + "ms";

    if (typeof input.callback === 'string') input.callback = eval(input.callback); // Eval callback

    textBox.addEventListener('keyup', () => {
      if (event.which === 13) { // ENTER key
        let inputDOM = document.getElementById('input');

        choiceBox.innerHTML = '';
        if (typeof input.next !== 'undefined') executeChatNode(input.next); // NEXT node

        try {input.callback(inputDOM.value)} // Execute callback
        catch(err) {console.error('Input boxes should have a callback.')}
      }
    });
    return textBox;
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


function scrollChatBot(element) {
    let offset = element.getBoundingClientRect();
    let offsetTop = offset.top;

    let elementHeight = element.clientHeight;

    let windowHeight = window.innerHeight;
    let currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    let bottomOfElement = currentScrollPosition + offsetTop + elementHeight;
    let targetScrollPos = bottomOfElement - windowHeight;

    if (currentScrollPosition < targetScrollPos) {
      window.scroll({
        top: targetScrollPos,
        left: 0,
        behavior: 'smooth'
      });
    }
}
