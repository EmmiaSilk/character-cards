"use strict";

function nextCard(container) {
  let oldCard = container.children().first();
  let newCard = oldCard.next();

  // Unhide next card
  unhide(newCard);

  // Remove old animation classes
  newCard.removeClass('anim-card-exit');
  oldCard.removeClass('anim-card-enter');

  // Set card animation
  oldCard.addClass('anim-card-exit');
  newCard.addClass('anim-card-enter');

  // Move old card to bottom of stack
  container.append(oldCard);

}

function unhide(element) {
  element.removeClass('hidden');
}
function hide(element) {
  element.addClass('hidden');
}

/* Main function */
function run(container, dataSource) {
  let characterList = dataSource.characters;
  // render character cards
  for(let key in characterList)
  {
    let id = 'characterCard--'+key;
    let data = characterList[key];
    container.append( cardGenerator.renderCard(id, data, dataSource.definition) );
  }
}

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

$(document).ready(function() {
  // PARAMS
  let params = {};
  let query = "";
  // Source file
  query = getUrlParameter("datasource");
  if(!query) {
    params.source = "data/example.js";
  }
  else {
    params.source = query;
  }
  // Manual
  query = getUrlParameter("manual");
  if(query && query != "no" && query != "false") {
    params.auto = false;
  }
  else {
    params.auto = true;
  }


  // Create script
  let script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = params.source;
  // Append
  document.head.appendChild(script);
  script.addEventListener('load', function() {
    // Generate cards
    var cardContainer = $('#cardContainer')
    run(cardContainer, charData);
    // Hide cards that should be hidden
    let firstCard = cardContainer.children().first();
    hide(cardContainer.children());
    unhide(firstCard);

    if(params.auto) {
      setInterval(nextCard, 5000, cardContainer);
    }
    else {
      cardContainer.click(function() {
        nextCard(cardContainer);
      })
    }
  });



});
