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
  for (var key in charData.characters) {
    let form = Forms.renderCharacterForm(charData.getCharacter(key), key)
    $('#editor').append(form);
  }

}
