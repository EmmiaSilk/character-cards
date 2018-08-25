"use strict";

let appletWindow = null;

function recieveMessage(event) {
  if(event.data == "ready") {
    console.log("Ready!");
    appletWindow = event.source;
  }
}

function sendMessage(message) {
  appletWindow.postMessage(message, "*");
}


$(document).ready(function() {
  // Setup message listeners
  window.addEventListener("message", recieveMessage);

  // Initialize child iframe
  // let container = $("#appletContainer");
  let iframe = $("#applet");
  iframe.attr("src", "applet.html?editor&manual");

  // $("#appletContainer").html(iframe);

  $(".js-input").change(function(event) {
    let text = event.target.value;
    sendMessage(text);
  });
});
