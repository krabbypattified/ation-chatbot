// Initial node based on nth time visiting
const nthTime = localStorage.getItem('nthTime');
if (nthTime === null) localStorage.setItem('nthTime', 1);
else localStorage.setItem('nthTime', nthTime + 1);

let initialNode;
if (nthTime === 1) initialNode = 'introduce';
if (nthTime === 2) initialNode = 'welcomeBack';
else initialNode = 'welcomeBack';
// else initialNode = 'welcomeBackAgain';


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
