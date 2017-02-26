// Fix for multiple triggers from page start
let loaded = false;

// Initialize Chat
function startChat() {
  if (!loaded) {
    initializeChat({
      initialNode: ['meetStudent', 'seeProjects', 'whoAreYou', 'pickOne'],
      chatBox: '.chatbot',
      choiceBox: '.reply',
      beforeSpeech: '<div class="box">',
      afterSpeech: '</div>',
      beforeChoice: '<div class="box">',
      afterChoice: '</div>',
      onChatEnd: function () {
        console.log('hi');
        document.querySelector('.reply').classList.add('end')
      }
    });
    loaded = true;
  }
}

// GET people
fetch('/assets/json/people.json')
.then((response) => {
  if(response.ok) return response.text();
})
.then((people) => {
  let peeps = JSON.parse(people);

  peeps.forEach((peep, idx) => {
      let person = document.createElement('div');
      person.classList.add('person');
      person.style.cssText = "background-image: url("+peep.pic+"); animation-delay: "+ (200 + 50*idx) +"ms";

      let p = document.createElement('p');
      p.innerHTML = peep.name;

      let a = document.createElement('a');
      a.target = "_blank";
      a.href = peep.url;

      person.appendChild(p);
      a.appendChild(person);

      let peopleDiv = document.querySelector('.people');
      peopleDiv.insertBefore(a, peopleDiv.childNodes[idx])

  });
});
