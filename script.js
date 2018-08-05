$(document).ready(function() {

  // Important variables
  let cardContainer = $("#cardContainer")

  function generateCards() {

    /* Main function */
    function run() {
      let characterList = charData.characters;
      // Create character cards
      for(let key in characterList)
      {
        let id = "characterCard--"+key;
        let data = characterList[key];
        cardContainer.append( createCard(id, data) );
      }
    }

    /* Functions for creating elements */
    function createCard(id, data) {
      // Create card
      let newCard = $("<div>");
      newCard.addClass("characterCard hidden");
      newCard.attr("id", id);
      let header = $("<div>").addClass("characterCard__header");
      header.append(createIcon(data.icon));
      header.append(createNameText(data.name));
      newCard.append(header);

      // Contents
      let content = $("<div>").addClass("characterCard__content");
      content.append(createClassText(data.class));
      content.append(createStatBlock(data.stats));
      content.append(createTitleText(data.title));
      newCard.append(content);

      return newCard;
    }

    function createIcon(filepath) {
      let icon = $("<div>");
      icon.addClass("characterCard__icon");
      icon.css("background-image", "url(\"images/"+filepath+"\")");

      return icon;
    }

    function createNameText(name) {
      let nameText = $("<div>");
      nameText.addClass("characterCard__nametext");
      // Contents
      nameText.append("<span class=\"stroke\">" + name + "</span>");
      nameText.append("<span class=\"fill\">" + name + "</span>");

      return nameText;
    }

    function createClassText(text) {
      let classText = $("<div>");
      classText.addClass("characterCard__classtext");
      // Contents
      classText.append("<span>" + text + "</span>");

      return classText;
    }

    function createTitleText(title) {
      let titleText = $("<div>");
      titleText.addClass("characterCard__titletext");
      // Contents
      titleText.append("<span>" + title + "</span>");

      return titleText;
    }

    function createStatBlock(statData) {
      let statBlock = $("<div>");
      statBlock.addClass("characterCard__statblock");
      // Contents
      let row1 = $("<div>").addClass("characterCard__statblockrow");
      row1.append( createStatBox("STR", statData.str) );
      row1.append( createStatBox("CON", statData.con) );
      row1.append( createStatBox("DEX", statData.dex) );
      statBlock.append(row1);
      let row2 = $("<div>").addClass("characterCard__statblockrow");
      row2.append( createStatBox("INT", statData.int) );
      row2.append( createStatBox("WIS", statData.wis) );
      row2.append( createStatBox("CHA", statData.cha) );
      statBlock.append(row2);
      return statBlock;
    }
    function createStatBox(statName, value) {
      let newBox = $("<div>");
      newBox.addClass("characterCard__statbox");
      // Contents
      newBox.append(value);
      newBox.append("<br/>");
      newBox.append(statName);
      return newBox;
    }

    run();
  };

  function nextCard() {
    let oldCard = cardContainer.children().first();
    let newCard = oldCard.next();

    // Unhide next card
    unhide(newCard);

    // Remove old animation classes
    newCard.removeClass("anim-card-exit");
    oldCard.removeClass("anim-card-enter");

    // Set card animation
    oldCard.addClass("anim-card-exit");
    newCard.addClass("anim-card-enter");

    // Move old card to bottom of stack
    cardContainer.append(oldCard);

  }

  function unhide(element) {
    element.removeClass("hidden");
  }
  function hide(element) {
    element.addClass("hidden");
  }

  generateCards();
  let firstCard = cardContainer.children().first();
  unhide(firstCard);

  setInterval(nextCard, 5000);

  // cardContainer.click(function() {
  //   nextCard();
  // })

});
