"use strict";

let charData = DataSet.getDefaultDataset();

$(document).ready(function() {
  // Setup message listeners
  window.addEventListener('message', Protocol.recieveMessage);

  // Initialize child iframe
  // let container = $('#appletContainer');
  let iframe = $('iframe#applet');
  iframe.attr('src', 'applet.html?editor&manual');
  iframe.ready(function() {
    Protocol.communicationPartner = iframe[0].contentWindow;
  });

  Forms.createEventHandlers();

  let script = loadScriptFromPath('data/example.js');
  document.head.appendChild(script);
  script.addEventListener('load', function() {
    setDataset(new DataSet(generatedData));
  });
});

function onDatasetLoaded() {
  let cardForms = $('#editor>.cardForms');
  let tabs = $('#editor>.tabs');

  // "New tab" button
  let button = Forms.renderNewTabButton();
  tabs.append(button);

  // Generate forms and tabs
  for (var key in charData.characters) {
    let character = charData.getCharacter(key);
    // Forms
    // let form = Forms.renderCharacterForm(character, key)
    // cardForms.append(form);
    // hide(form);
    // Tabs
    Forms.addCharacterForm(character, key);
    // let tab = Forms.renderTab(character, key);
    // tabs.append(tab);
  }
  // Select first tab
  Forms.selectTab(tabs.children().first());

}

function addNewCharacter(id, name) {
  let character = new Character();
  if(name) {
    character.setName(name);
  }
  charData.setCharacter(id, character);
  Forms.addCharacterForm(character, id);
  Protocol.add('character', id, character);
}
