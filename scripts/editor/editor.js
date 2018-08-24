"use strict";

function recieveMessage(event) {
  if(event.data == "ready") {
    console.log("Ready!");
  }
}


$(document).ready(function() {
  // Setup message listeners
  window.addEventListener("message", recieveMessage);

  // Initialize child iframe
  // let container = $("#appletContainer");
  let iframe = $("#applet");
  iframe.attr("src", "applet.html?editor&manual");

  // $("#appletContainer").html(iframe);
});
