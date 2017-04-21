// Imports
import { random } from './chatbot'
import { meetStudent, showStudent, seeProjects } from './chatdata'

/* Setup
===================*/

// Listen for when people are loaded
window.addEventListener('peopleLoaded', function () {
  changeStudent(RANDOM);
});

// Listen for when client work is loaded
window.addEventListener('clientWorkLoaded', function () {
  insertClientWork();
});

// Majors
window.MAJOR = {
  'web': 'Web Developer',
  '3d': '3D Artist',
  'business': 'Business Strategist',
  'game': 'Video Game Developer',
  'motion': 'Motion Graphics Artist'
};


/* Functions
===================*/
export function postEmail() {
    console.log('PUT to email database');
}


export function timeOfDay() {
    let today = new Date();
    let curHr = today.getHours();
    if (curHr < 12) return 'morning';
    else if (curHr < 18) return 'afternoon';
    else return 'evening';
}

export function insertClientWork() {
  seeProjects.speech = [
    'Ok! Here are a few things we\'ve worked on recently:',
    ...client_work,
    'If you\'d like to see more, visit <a href="http://ation.digitalmediauconn.org/work/" target="_blank">ation.digitalmediauconn.org</a>'
  ];
}

// TODO: make it pluck array and re-loop

export function changeStudent(_type) {
    let type;
    if (_type === RANDOM) type = random(Object.keys(MAJOR));
    else if (typeof _type == 'undefined') type = this.major;
    else type = _type; // shouldn't fire in my chatbot
    // now type should be 'web' or something

    let peepToShowcase;

    peepToShowcase = peeps.find(function(person, idx) {
        // Don't look for 'type' if RANDOM
        if (_type === RANDOM && person.work.length > 0) {
            peeps.push(peeps.splice(idx, 1)[0]); // move chosen person to end of array
            return true;
        }
        // ELSE filter people by major
        else if (person.major === type) {
            peeps.push(peeps.splice(idx, 1)[0]);
            return true;
        }
    });

    // If no one found
    if (peepToShowcase === undefined) {
        showStudent.speech = [`Sorry, there are no ${MAJOR[type]}s in the system. Please pick a different concentration.`];
        showStudent.next = 'someoneElse';
        return;
    }


    // handle the 'meetStudent' node.speech
    let hasMajor = peepToShowcase.major && peepToShowcase.major.length >= 1;
    let theMajor = hasMajor ? MAJOR[peepToShowcase.major] : 'Digital Media & Design student'; // handle major
    let hasLocation = peepToShowcase.location && peepToShowcase.location.length >= 1;
    let location = hasLocation ? ` from ${peepToShowcase.location}` : ' from Storrs, CT'; // handle location
    meetStudent.speech = `May I introduce you to an -ATION ${theMajor}${location}?`;

    // Create links to his work
    let links = [];
    let also_ = '';

    if (peepToShowcase.work && peepToShowcase.work.length >= 1) {
        links = [`Here is some of ${peepToShowcase.name}'s work!`];

        if (typeof peepToShowcase.work === 'string') peepToShowcase.work = [peepToShowcase.work]; // allow for string input with work

        peepToShowcase.work.forEach(media => { // fill links array
          links.push(media);
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
