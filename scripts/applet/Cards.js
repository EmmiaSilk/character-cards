const Cards = {};

Cards.get = function(characterId) {
  let card = $('#cardContainer>.characterCard[data-character="'+characterId+'"]');
  if(card.length == 0) {
    return null;
  }
  return card[0];
}

Cards.setName = function(card, newName) {
  // Change name element
  let oldElement = $(card).find('.characterCard__nametext');
  let newElement = CardGenerator.renderNameText(newName);
  oldElement.replaceWith(newElement);
}

Cards.setShortenName = function(card, value) {
  let nameElement = $(card).find('.characterCard__nametext');
  nameElement.attr('data-shorten', value);
}

Cards.setTitle = function(card, newTitle) {
  // Change name element
  let oldElement = $(card).find('.characterCard__titletext');
  let newElement = CardGenerator.renderTitleText(newTitle);
  oldElement.replaceWith(newElement);
}

Cards.setClass = function(card, newClass) {
  // Change name element
  let oldElement = $(card).find('.characterCard__classtext');
  let newElement = CardGenerator.renderClassText(newClass);
  oldElement.replaceWith(newElement);
}

Cards.setIcon = function(card, newPath) {
  // Change name element
  let iconElement = $(card).find('.characterCard__icon');
  iconElement.attr('data-path', newPath);
  iconElement.css('background-image', 'url("'+newPath+'")');
}

Cards.setStat = function(card, stat, newValue) {
  let statElement = $(card).find('.characterCard__statbox[data-stat="'+stat+'"]');
  let valueElement = statElement.find('.value');
  if(newValue === "") {
    newValue = "???";
  }
  valueElement.html(newValue);
}
