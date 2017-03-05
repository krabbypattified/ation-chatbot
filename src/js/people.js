import Prismic from 'prismic.io'

Prismic.api("https://ation-chatbot.prismic.io/api#format=json").then(api => {
  return api.query(""); // An empty query will return all the documents
}).then(function(response) {
    // console.log(response.results);
    let peeps = shuffle(response.results);
    let people = peeps.map(peep=>{

      let work = [];
      if (peep.get('student.work')) {
        peep.get('student.work').value.forEach(piece=>{
          work.push(piece.fragments.piece.url);
        })
      }

      return {
        name: peep.get('student.name') ? peep.get('student.name').blocks[0].text : null,
        pic: peep.get('student.pic') ? peep.get('student.pic').url : null,
        major: peep.get('student.major') ? peep.get('student.major').value : null,
        location: peep.get('student.location') ? peep.get('student.location').blocks[0].text : null,
        url: peep.get('student.url') ? peep.get('student.url').value.url : null,
        work: work
      };
    });
    // console.log(people);
    window.peeps = people;

    window.dispatchEvent( new Event('peopleLoaded') );

    people.forEach((peep, idx) => {
        let person = document.createElement('div');
        person.classList.add('person');

        if (!peep.pic) peep.pic = 'http://lorempixel.com/350/200/';

        person.style.cssText = "background-image: url("+peep.pic+"); animation-delay: "+ (200 + 50*idx) +"ms";

        let p = document.createElement('p');
        p.innerHTML = peep.name;

        let a = document.createElement('a');
        a.target = peep.url ? "_blank" : "";
        a.href = peep.url || "javascript:void(0)";

        person.appendChild(p);
        a.appendChild(person);

        let peopleDiv = document.querySelector('.people');
        peopleDiv.insertBefore(a, peopleDiv.childNodes[idx]);

    });


},
function(err) { console.log("Something went wrong: ", err) });



// GET people
// fetch('people.json')
// .then((response) => {
//   if(response.ok) return response.text();
// })
// .then((people) => {
//   let peeps = JSON.parse(people);
//   peeps = shuffle(peeps);
//   window.peeps = peeps;
//
//   window.dispatchEvent( new Event('peopleLoaded') );
//
//   peeps.forEach((peep, idx) => {
//       let person = document.createElement('div');
//       person.classList.add('person');
//
//       let hasPic = peep.hasOwnProperty('pic') && peep.pic.length >= 1;
//       if (!hasPic) peep.pic = 'http://lorempixel.com/350/200/';
//
//       person.style.cssText = "background-image: url("+peep.pic+"); animation-delay: "+ (200 + 50*idx) +"ms";
//
//       let p = document.createElement('p');
//       p.innerHTML = peep.name;
//
//       let a = document.createElement('a');
//       a.target = "_blank";
//       a.href = peep.url;
//
//       person.appendChild(p);
//       a.appendChild(person);
//
//       let peopleDiv = document.querySelector('.people');
//       peopleDiv.insertBefore(a, peopleDiv.childNodes[idx]);
//
//   });
// });


/* Functions
===================*/

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
}
