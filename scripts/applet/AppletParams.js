"use strict";

const AppletParams = {};
let query = "";

// Source file
query = getUrlParameter("datasource");
if(!query) {
  AppletParams.source = "data/example.js";
}
else {
  AppletParams.source = query;
}

// Manual (click for next card)
query = getUrlParameter("manual");
if(query && query != "no" && query != "false") {
  AppletParams.auto = false;
}
else {
  AppletParams.auto = true;
}

// Controllable by editor
query = getUrlParameter("editor");
if(query && query != "no" && query != "false") {
  AppletParams.editable = true;
}
else {
  AppletParams.editable = false;
}
