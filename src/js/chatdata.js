import './chatbot'
import { timeOfDay, changeStudent } from './chatfunctions'

export let introduce = {
  speech: [
    'Welcome!',
    'I\'m Recon, a chat bot developed by the talented students at -ATION.'
  ],
  next: 'meetStudent'
}

export let welcomeBack = {
  speech: [RANDOM, 'Ciao!', 'Hola!', 'It\'s good to see you again!', 'Welcome back!', `Good ${timeOfDay()}!`],
  next: ['meetStudent', 'projects', 'pickOne']
}

export let meetStudent = {
  speech: 'This string should be replaced with a person\'s intro phrase.',
  choices: [
    {text: 'Sure!', next: 'showStudent'},
    {text: 'Maybe someone else.', next: 'someoneElse'},
    {text: 'No thanks.', next: 'pickOne'}
  ]
};

export let someoneElse = {
  speech: 'Ok. Who would you like to meet?',
  choices: [
    {text: `A ${MAJOR['web']}`,      next: 'showStudent',   major: 'web',      callback: changeStudent },
    {text: `A ${MAJOR['3d']}`,       next: 'showStudent',   major: '3d',       callback: changeStudent },
    {text: `A ${MAJOR['business']}`, next: 'showStudent',   major: 'business', callback: changeStudent },
    {text: `A ${MAJOR['game']}`,     next: 'showStudent',   major: 'game',     callback: changeStudent },
    {text: `A ${MAJOR['motion']}`,   next: 'showStudent',   major: 'motion',   callback: changeStudent },
    {text: 'No one', next: 'pickOne'}
  ]
};

export let showStudent = {
  speech: 'This string should be replaced with a person and his/her content via changeStudent function.',
  next: 'someoneElseAgain'
};

export let someoneElseAgain = {
  speech: 'Would you like to meet anybody else?',
  choices: [
    {text: 'Yeah!', next: 'someoneElse'},
    {text: 'No thanks.', next: 'pickOne'}
  ]
};

export let creators = {
  speech: 'Would you like to see who created me?',
  choices: [
    {text: 'Yeah!', next: 'showCreators'},
    {text: 'No thanks.', next: 'someoneElse'}
  ],
};

export let showCreators = {
  speech: [
    'It is my pleasure to introduce Gabe Rogan and Connor Michael.',
    '<a href="https://gaberogan.com"><img src="https://image.ibb.co/gX5qgF/profile_wide.jpg"></a><img src="https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAARlAAAAJDA3YWQ3YzU4LTRlM2YtNDE1MC05OGVlLTBkMjVjZDM0NTI2Yw.jpg">',
    'Gabe was the designer and developer of this chatbot, and Connor taught me what to say!',
    'If you\'d like to see more of their work, visit <a href="https://gaberogan.com">gaberogan.com</a> or <a href="https://gaberogan.com">Connor\'s LinkedIn</a>'
    // TODO: Connor's linkedin link
  ],
  next: 'pickOne'
};

export let projects = {
  speech: 'Would you like to view some of our projects?',
  choices: [
    {text: 'Yeah!', next: 'seeProjects'},
    {text: 'No thanks.', next: 'pickOne'}
  ],
};

export let seeProjects = {
  speech: [
    'Ok! Here are a few things we\'ve worked on recently:',
    // TODO: add everything and make it random?
    '<a href="http://ation.digitalmediauconn.org/project/skybox/"><img src="http://ation.digitalmediauconn.org/wp-content/uploads/2016/03/skybox-work2-600x0-c-default.jpg"></a>',
    '<a href="http://ation.digitalmediauconn.org/project/ct-childrens-alliance/"><img src="http://ation.digitalmediauconn.org/wp-content/uploads/2016/10/ChildrensAlliance_Tile-600x0-c-default.jpg"></a>',
    '<a href="http://ation.digitalmediauconn.org/project/what-is-a-persona/"><img src="http://ation.digitalmediauconn.org/wp-content/uploads/2016/04/persona-work2-600x0-c-default.jpg"></a>',
    'If you\'d like to see more, visit <a href="http://ation.digitalmediauconn.org/work/" target="_blank">ation.digitalmediauconn.org</a>'
  ],
  choices: [
    {text: 'Who worked on these?', next: 'whoWorkedOnThese'},
    {text: 'Thanks for sharing!', next: {speech: 'You\'re welcome!', next: 'pickOne'} }
  ]
};

export let whoWorkedOnThese = {
  speech: ['Every student at the top of this page worked on one of these projects.', 'Would you like to meet one of them?'],
  choices: [
    {text: 'Sure!', next: 'someoneElse'},
    {text: 'No thanks.', next: 'funTalking'}
  ]
};

export let pickOne = {
  speech: 'Is there anything you\'d like to know about?',
  choices: [
    {text: 'Student concentrations.', next: 'meetStudent'},
    {text: 'Students!', next: 'meetStudent'},
    {text: 'Projects!', next: 'seeProjects'},
    {text: 'Nothin\'.', next: 'goodbye'}
  ]
};

export let funTalking = {
  speech: ['Ok. It was fun talking!', ['Cya later!', 'Au revoir!']]
}

export let goodbye = {
  speech: [RANDOM, 'Ok, bye!', 'Cya later!', 'Au revoir!']
};
