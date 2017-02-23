// fix for multiple triggers from page start
let loaded = false;

function startChat() {
  if (!loaded) {
    initializeChat({
      // initialNode: ['meetStudent', 'seeProjects', 'whoAreYou', 'pickOne'],
      initialNode: 'meetStudent',
      chatBox: '.chatbot',
      choiceBox: '.reply',
      beforeSpeech: '<div class="box">',
      afterSpeech: '</div>',
      beforeChoice: '<div class="box">',
      afterChoice: '</div>'
    });
    loaded = true;
  }
}
