const bot = 'Recon';

const greetings = [RANDOM, 'Hi there!', 'Hola!', 'Welcome to -ATION!', 'Welcome!'];

function postEmail() {
  console.log('PUT to email database');
}

const meetStudent = {
  speech: [
    greetings,
    'I\'m '+bot+', a bot developed by the talented students at -ATION!',
    'May I introduce you to one of our students? He\'s a web developer from Vernon, CT.'
  ],
  choices: [
    {text: 'Sure!', next: 'showStudent'},
    // {type: 'input', callback: postEmail, next: 'goodbye'},
    // {text: 'Maybe someone else.', next: 'meetStudent'},
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
  // TODO: next node to allow conversation to go on [func, 'somenode']
  choices: function(input) {
    console.log(input);
  }
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
