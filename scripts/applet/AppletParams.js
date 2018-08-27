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
AppletParams.auto = !(query && query != "no" && query != "false");

// Controllable by editor
query = getUrlParameter("editor");
AppletParams.editor = (query && query != "no" && query != "false");

// Start with no source data
query = getUrlParameter("nodata");
AppletParams.noData = (query && query != "no" && query != "false");
