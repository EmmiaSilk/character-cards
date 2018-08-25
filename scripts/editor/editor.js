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

  $(".js-input").change(function(event) {
    let text = event.target.value;
    Protocol.say(text);
  });
});
