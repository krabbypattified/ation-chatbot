/* Setup
 * Initialize Chat
 * Data
 * Functions */


 /* Setup
 ===================*/
const firstTime = localStorage.getItem('firstTime') === null;
if (firstTime) localStorage.setItem('firstTime', 'no');

const initialNode = firstTime ? 'introduce' : 'welcomeBack';


/* Initialize Chat
===================*/
function startChat() {
  initializeChat({
    initialNode: initialNode,
    delay: 1200,
    chatBox: '.chatbot',
    choiceBox: '.reply',
    beforeSpeech: '<div class="box">',
    afterSpeech: '</div>',
    beforeChoice: '<div class="box">',
    afterChoice: '</div>',
    onChatEnd: deleteReplyBox
  });
}


/* Data
===================*/
const introduce = {
  speech: [
    'Welcome!',
    'I\'m Recon, a chat bot developed by the talented students at -ATION.'
  ],
  next: 'meetStudent'
}

const welcomeBack = {
  speech: [RANDOM, 'Ciao!', 'Hola!', 'It\'s good to see you again!', 'Welcome back!', `Good ${timeOfDay()}!`],
  next: ['meetStudent', 'projects', 'pickOne']
}

// Map majors to id (see 'someoneElse' and 'meetStudent')
const majors = {
  'web': 'Web Developer',
  '3d': '3D Artist',
  'business': 'Business Strategist',
  'game': 'Video Game Developer',
  'motion': 'Motion Graphics Artist'
};

let meetStudent = {
  speech: 'This string should be replaced with a person\'s intro phrase.',
  choices: [
    {text: 'Sure!', next: 'showStudent'},
    {text: 'Maybe someone else.', next: 'someoneElse'},
    {text: 'No thanks.', next: 'pickOne'}
  ]
};

const someoneElse = {
  speech: 'Ok. Who would you like to meet?',
  choices: [
    {text: `A ${majors.web}`,      next: 'showStudent', callback: ()=>{changeStudentTo('web')}      },
    {text: `A ${majors['3d']}`,    next: 'showStudent', callback: ()=>{changeStudentTo('3d')}       },
    {text: `A ${majors.business}`, next: 'showStudent', callback: ()=>{changeStudentTo('business')} },
    {text: `A ${majors.game}`,     next: 'showStudent', callback: ()=>{changeStudentTo('game')}     },
    {text: `A ${majors.motion}`,   next: 'showStudent', callback: ()=>{changeStudentTo('motion')}   },
    {text: 'No one', next: 'pickOne'}
  ]
};

let showStudent = {
  speech: 'This string should be replaced with a person and his/her content via changeStudentTo function.',
  next: 'someoneElseAgain'
};

const someoneElseAgain = {
  speech: 'Would you like to meet anybody else?',
  choices: [
    {text: 'Yeah!', next: 'someoneElse'},
    {text: 'No thanks.', next: 'pickOne'}
  ]
};

const creators = {
  speech: 'Would you like to see who created me?',
  choices: [
    {text: 'Yeah!', next: 'showCreators'},
    {text: 'No thanks.', next: 'someoneElse'}
  ],
};

const showCreators = {
  speech: [
    'It is my pleasure to introduce Gabe Rogan and Connor Michael.',
    '<a href="https://gaberogan.com"><img src="https://image.ibb.co/gX5qgF/profile_wide.jpg"></a><img src="https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAARlAAAAJDA3YWQ3YzU4LTRlM2YtNDE1MC05OGVlLTBkMjVjZDM0NTI2Yw.jpg">',
    'Gabe was the designer and developer of this chatbot, and Connor taught me what to say!',
    'If you\'d like to see more of their work, visit <a href="https://gaberogan.com">gaberogan.com</a> or <a href="https://gaberogan.com">Connor\'s LinkedIn</a>'
    // TODO: Connor's linkedin link
  ],
  next: 'pickOne'
};

const projects = {
  speech: 'Would you like to view some of our projects?',
  choices: [
    {text: 'Yeah!', next: 'seeProjects'},
    {text: 'No thanks.', next: 'pickOne'}
  ],
};

const seeProjects = {
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

const whoWorkedOnThese = {
  speech: ['Every student at the top of this page worked on one of these projects.', 'Would you like to meet one of them?'],
  choices: [
    {text: 'Sure!', next: 'someoneElse'},
    {text: 'No thanks.', next: 'funTalking'}
  ]
};

const pickOne = {
  speech: 'Is there anything you\'d like to know about?',
  choices: [
    {text: 'Student concentrations.', next: 'meetStudent'},
    {text: 'Students!', next: 'meetStudent'},
    {text: 'Projects!', next: 'seeProjects'},
    {text: 'Nothin\'.', next: 'goodbye'}
  ]
};

const funTalking = {
  speech: ['Ok. It was fun talking!', ['Cya later!', 'Au revoir!']]
}

const goodbye = {
  speech: [RANDOM, 'Ok, bye!', 'Cya later!', 'Au revoir!']
};

// const seeProjects = {
//   speech: [
//     'We’re currently working on big projects with Mareanca, Town of Vernon, and Shelf.io.',
//     'Would you like to see them when they’re finished?'
//   ],
//   choices: [
//     {text: 'Sure why not?', next: 'email'},
//     {text: 'Um no.', next: 'pickOne'}
//   ]
// };

// const email = {
//   speech: 'Ok, just leave us your email and we\'ll be sure to share what we came up with!',
//   choices: {type: 'input', callback: 'postEmail', next: 'goodbye'}
// }

// const whoAreYou = {
//   speech: 'Are you a business or just curious to see our work?',
//   choices: [
//     {text: 'A business', next: 'seeProjects'},
//     {text: 'Just curious :)', next: 'pickOne'}
//   ]
// };


/* Functions
===================*/
function postEmail() {
    console.log('PUT to email database');
}


function timeOfDay() {
    let today = new Date();
    let curHr = today.getHours();
    if (curHr < 12) return 'morning';
    else if (curHr < 18) return 'afternoon';
    else return 'evening';
}



function deleteReplyBox() {
    document.querySelector('.reply').classList.add('end')
}


function changeStudentTo(_type) {
    let type;
    if (_type === RANDOM) type = random(Object.keys(majors));
    else type = _type;
    // now type should be 'web' or something

    let people = peeps; // temp variable from loadPeople.js
    let peepToShowcase;

    // Bypass filter if RANDOM   OR   filter people by major
    peepToShowcase = _type === RANDOM ? [random(people)] : people.filter(person => (person.major === type));

    // Make peepToShowcase a person object
    if (peepToShowcase.length == 1) { peepToShowcase = peepToShowcase[0]; } // If one person, convert to string.
    else if (peepToShowcase.length > 1) { peepToShowcase = random(peepToShowcase); } // Pick a random person.
    else { // No people with that major found
      showStudent.speech = [`Sorry, there are no ${majors[type]}s in the system. Please pick a different concentration.`];
      showStudent.next = 'someoneElse';
      return;
    }

    // handle the 'meetStudent' node.speech
    let hasMajor = peepToShowcase.hasOwnProperty('major') && peepToShowcase.major.length >= 1;
    let theMajor = hasMajor ? majors[peepToShowcase.major] : 'Digital Media & Design student'; // handle major
    let hasLocation = peepToShowcase.hasOwnProperty('location') && peepToShowcase.location.length >= 1;
    let location = hasLocation ? ` from ${peepToShowcase.location}` : ' from Storrs, CT'; // handle location
    meetStudent.speech = `May I introduce you to an -ATION ${theMajor}${location}?`;

    // Create links to his work
    let links = [];
    let also_ = '';

    if (peepToShowcase.hasOwnProperty('work') && peepToShowcase.work.length >= 1) {
        links = [`Here is some of ${peepToShowcase.name}'s work!`];

        if (typeof peepToShowcase.work === 'string') peepToShowcase.work = [peepToShowcase.work]; // allow for string input with work

        peepToShowcase.work.forEach(imageURL => { // fill links array
          links.push(`<img src="${imageURL}">`);
        });

        also_ = 'also '; // add 'also '
    }

    let visitHimHere = `You can ${also_}visit ${peepToShowcase.name} here:`;

    showStudent.speech = [
      ...links,
      visitHimHere,
      `<a href="${peepToShowcase.url}" target="_blank">${peepToShowcase.url}</a>`
    ];
}
