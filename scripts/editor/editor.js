"use strict";

$(document).ready(function() {
  // Setup message listeners
  window.addEventListener("message", Protocol.recieveMessage);

  // Initialize child iframe
  // let container = $("#appletContainer");
  let iframe = $("iframe#applet");
  iframe.attr("src", "applet.html?editor&manual");
  iframe.ready(function() {
    Protocol.communicationPartner = iframe[0].contentWindow;
  });

  // $("#appletContainer").html(iframe);
  let form = $('form.js-character-form');

  function getFormCharacter(form) {
    return $(form).find('input[name="character"]')[0].value;
  }

  // Editing for name
  $('input[name="name"]')[0].oninput = function(event) {
    let newValue = event.target.value;
    let character = getFormCharacter(event.target.form);
    Protocol.setCharacterValue(character, "name", newValue);
  };
  // Editing for shorten_name
  $('input[name="shorten_name"]')[0].oninput = function(event) {
    console.log(event.target);
    let newValue = event.target.checked? 1:0 ;
    let character = getFormCharacter(event.target.form);
    Protocol.setCharacterValue(character, "shorten_name", newValue);
  }
  // Editing for title
  $('input[name="title"]')[0].oninput = function(event) {
    let newValue = event.target.value;
    let character = getFormCharacter(event.target.form);
    Protocol.setCharacterValue(character, "title", newValue);
  };
  // Editing for class
  $('input[name="class"]')[0].oninput = function(event) {
    let newValue = event.target.value;
    let character = getFormCharacter(event.target.form);
    Protocol.setCharacterValue(character, "class", newValue);
  };
  // Editing for icon
  $('input[name="icon"]')[0].onchange = function(event) {
    let newValue = event.target.value;
    let character = getFormCharacter(event.target.form);
    Protocol.setCharacterValue(character, "icon", newValue);
  };
});
