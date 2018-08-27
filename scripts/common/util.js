"use strict";

function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

function setDataset(dataset) {
  charData = dataset;
  onDatasetLoaded();
}

function loadScriptFromPath(source) {
  // Load data as script
  console.log("Loading script from " + source);
  let script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = source;
  return script;
}
