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
  initializeSave();

  // let script = loadScriptFromPath('data/example.js');
  // document.head.appendChild(script);
  // script.addEventListener('load', function() {
  //   setDataset(new DataSet(generatedData));
  // });
  setDataset(DataSet.getDefaultDataset());
});

function onDatasetLoaded() {
  let cardForms = $('#editor>.cardForms');
  let tabs = $('#editor>.tabs');
  tabs.html("");
  cardForms.html("");

  // "New tab" button
  let button = Forms.renderNewTabButton();
  tabs.append(button);

  // Generate forms and tabs
  for (var key in charData.characters) {
    let character = charData.getCharacter(key);
    Forms.addCharacterForm(character, key);
  }
  // Select first tab
  Forms.selectTab(tabs.children().first());

}

function initializeSave() {
  let save = $("#saveButton");
  let load = $("#loadButton");
  let create = $("#newButton");

  // Regenerate uri on mouseover
  save.on("mouseover", function(event) {
    let jsStart = "var generatedData = \n";
    let str = JSON.stringify(charData, null, 2);
    // Generate URI
    let header = "data:application/javascript,";
    let uri = header + encodeURIComponent(jsStart + str);
    // Set save button HREF
    save.attr('href', uri);
  });
  // // Tell clicks to be ignored, preventing errors.
  // save.on("click", function(event) {
  //   return false;
  // });

  load.on("change", function(event) {
    let target = event.target;
    if(target.files.length === 0) {
      return;
    }
    let okay = confirm('Loading a dataset will overwrite any work you have already done. Are you sure?');
    if(okay) {
      let file = target.files[0];
      let reader = new FileReader();
      reader.onload = function(event) {
        let output = event.target.result;
        // Remove initial variable declaration and comments
        output = output.replace(/^(var generatedData =)/,'');
        output = output.replace(/\/\/.*/g, '');
        let json = JSON.parse(output);
        console.log(json);

        let dataset = new DataSet(json);
        setDataset(dataset);
        Protocol.replace('dataset', null, dataset);
      }
      reader.readAsText(file);
    }
  });

  create.on("click", function(event) {
    let okay = confirm('Creating a new dataset will overwrite any work you have already done. Are you sure?');
    if(okay) {
      let dataset = DataSet.getDefaultDataset();
      setDataset(dataset);
      Protocol.replace('dataset', null, dataset);
    }
  });
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
