let config,
    chatBox;

function initializeChat(_config={}) {
  config = _config;
  chatBox = document.querySelector(config.selector);
  queue(config.initialNode);
}

function queue(node) {
  chatBox.innerHTML += config.before + node.speech + config.after;
}
