const test = {
  speech: 'Hello world'
};

// const INITIAL_NODE = [meetStudent, seeProjects];
//
// const greetings = ['Hi there!', 'Hola!', 'Welcome to -ATION', 'Welcome back!'];
//
// const meetStudent = {
//   speech: [
//     greetings,
//     'May I introduce...'
//   ],
//   choices: [
//     ['Sure', showStudent],
//     ['Nah', goodbye],
//     ['Idk', [seeProjects, whoAreYou, pickOne]]
//   ]
// };
//
// const showStudent = {
//
// };
//
// const seeProjects = {
//   speech: [
//     'We’re currently working on big projects with [name], [name], and [name].',
//     'Would you like to see them when they’re finished?'
//   ]
// };
//
// const whoAreYou = {
//   speech: 'Are you a business or just curious to see our work?'
// };
//
// const pickOne = {
//   speech: 'Would you like to see our concentrations, students, or client projects?'
// };
//
// const goodbye = {
//   speech: 'Goodbye!'
// };

let config,
    chatBox;

function initializeChat(_config={}) {
  config = _config;
  chatBox = document.querySelector(config.selector);
  queue(config.initialNode);
}

function queue(node) {
  chatBox.innerHTML += config.before + node.speech + config.after;
}

