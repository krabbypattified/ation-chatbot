import Prismic from 'prismic.io'

Prismic.api("https://ation-chatbot.prismic.io/api#format=json").then(api => {
  return api.query(""); // An empty query will return all the documents
}).then(function(response) {
    console.log(response.results);
    let people = shuffle(response.results);
    people = people.map(peep=>{

      let work = [];
      // Embeds
      if (peep.get('student.work_links')) {
        peep.get('student.work_links').value.forEach(embed=>{
          work.push(embed.fragments.embed.value.oembed.html);
        })
      }
      // Images
      if (peep.get('student.work')) {
        peep.get('student.work').value.forEach(piece=>{
          if (piece.fragments.piece) {
            work.push(`<img src="${piece.fragments.piece.url}">`);
          }
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

    // Filter out invalid people
    people = people.filter(peep=>{
      return peep.name && peep.url ? true : false;
    });

    // console.log(people);
    window.peeps = people;

    window.dispatchEvent( new Event('peopleLoaded') );

    people.forEach((peep, idx) => {
        let person = document.createElement('div');
        person.classList.add('person');

        if (!peep.pic) peep.pic = `http://lorempixel.com/${330+randomInt(1,40)}/${180+randomInt(1,40)}/abstract`;

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


/* Functions
===================*/

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
