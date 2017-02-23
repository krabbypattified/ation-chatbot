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
