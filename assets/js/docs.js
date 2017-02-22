/*
initializeChat(); // looks for config object or INITIAL_NODE
initializeChat({
  initialNode: test,
  selector: '.chatbot',
});

// Initial Node
const INITIAL_NODE = myNode;
// const INITIAL_NODE = myRandomNodeSet;

// Random text set
const greetings = ['Hi there!', 'Hola!', 'Welcome to -ATION', 'Welcome back!'];

// Random node set
const randomNodeSet = [nodeA, nodeB, nodeC];

// Each is a node that has speech and choices
const myNode = {
  speech: [
    greetings,
    'How may I help you',
    '<img src=//placehold.it/500>'
  ],
  choices: [
    ['Sure', someNode],
    ['Nah', [randomNodeA, randomNodeB]],
    ['Idk', randomNodeSet]
  ]
};

// This is the simplest type of node. A node with no choices will end the chat.
const mySimpleNode = {
  speech: 'Hi there'
};
*/
