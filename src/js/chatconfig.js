// Initial node based on firstTime
const firstTime = localStorage.getItem('firstTime') === null;
if (firstTime) localStorage.setItem('firstTime', 'no');
const initialNode = firstTime ? 'introduce' : 'welcomeBack';

// Config object
export let config = {
  initialNode: initialNode,
  delay: 1200,
  chatBox: '.chatbot',
  choiceBox: '.reply',
  beforeSpeech: '<div class="box">',
  afterSpeech: '</div>',
  beforeChoice: '<div class="box">',
  afterChoice: '</div>',
  onChatEnd: ()=>{ document.querySelector('.reply').classList.add('end') }
};
