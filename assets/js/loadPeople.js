let peeps;

// GET people
fetch('/assets/json/people.json')
.then((response) => {
  if(response.ok) return response.text();
})
.then((people) => {
  peeps = JSON.parse(people);
  peeps = shuffle(peeps);

  changeStudentTo(RANDOM); // see chatConfig.js

  peeps.forEach((peep, idx) => {
      let person = document.createElement('div');
      person.classList.add('person');

      let hasPic = peep.hasOwnProperty('pic') && peep.pic.length >= 1;
      if (!hasPic) peep.pic = 'http://lorempixel.com/350/200/';

      person.style.cssText = "background-image: url("+peep.pic+"); animation-delay: "+ (200 + 50*idx) +"ms";

      let p = document.createElement('p');
      p.innerHTML = peep.name;

      let a = document.createElement('a');
      a.target = "_blank";
      a.href = peep.url;

      person.appendChild(p);
      a.appendChild(person);

      let peopleDiv = document.querySelector('.people');
      peopleDiv.insertBefore(a, peopleDiv.childNodes[idx]);

  });
});


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
