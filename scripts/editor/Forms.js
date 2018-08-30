"use strict";


class Forms {

  static createEventHandlers() {
    let form = $('form.js-character-form');

    let editor = $('#editor');

    function addTextInputEventHandler(event, key) {
      editor.on(event, 'input[name="'+key+'"]', function(event) {
        let newValue = event.target.value;
        let id = Forms.getCharacterFromForm(event.target.form);
        charData.getCharacter(id)[key] = newValue;
        Protocol.setCharacterValue(id, key, newValue);
      });
    }

    function addCheckboxEventHandler(event, key) {
      editor.on(event, 'input[name="'+key+'"]', function(event) {
        let newValue = event.target.checked? 1:0 ;
        let id = Forms.getCharacterFromForm(event.target.form);
        charData.getCharacter(id)[key] = newValue;
        Protocol.setCharacterValue(id, key, newValue);
      });
    }

    // Editing for name
    editor.on('input', 'input[name="name"]', function(event) {
      let newValue = event.target.value;
      let id = Forms.getCharacterFromForm(event.target.form);
      charData.getCharacter(id).setName(newValue);
      Forms.renameTab(id, newValue);
      Protocol.setCharacterValue(id, 'name', newValue);
    });

    // Other values
    addCheckboxEventHandler('input', 'shorten_name');
    addTextInputEventHandler('input', 'title');
    addTextInputEventHandler('input', 'raceclass');
    addTextInputEventHandler('change', 'icon');

    // Stat blocks
    editor.on('change', 'input[name="stat"]', function(event) {
      let target = $(event.target);
      let stat = target.attr('data-stat');
      let value = event.target.value;

      let form = event.target.form;
      let id = $(form).attr('data-character');

      // Set local values
      let character = charData.getCharacter(id);
      character.setStat(stat, value);
      // Set outbound values
      Protocol.setStat(id, stat, value);

    });

    // Tab switching
    $('#editor>.tabs').on('click', '.tab', function(event) {
      let target = $(event.target);
      // Don't switch if the user is trying to delete the tab
      if(target.is('.close')) {
        return;
      }
      // Switch to this tab
      let tab = target.closest('.tab');
      Forms.selectTab(tab);
      Protocol.navigate('absolute', tab.attr('data-character'));
    });

    // New tab
    $('#editor>.tabs').on('click', '.newtab', function(event) {
      // Get new character ID
      let name = prompt('Character name');
      if(name == null) {
        return;
      }
      name = name.trim();
      // Ensure ID isn't already in use
      let id = name.toLowerCase().replace(/\s/g,'');
      if(id == "") {
        alert('Cannot use blank id');
        return;
      }
      if(charData.getCharacter(id)) {
        alert('Character already exists with id ' + id);
        return;
      }
      // Create new character
      addNewCharacter(id, name);
    });

    // Delete tab
    $('#editor>.tabs').on('click', '.tab>.close', function(event) {
      let tab = $(event.target).parent('.tab');
      let id = tab.attr('data-character');

      let confirmed = confirm('Are you sure you want to delete '+id+'?');
      if(confirmed) {
        console.log('Deleted character ' + id);
        // Local delete
        Forms.removeCharacterForm(id);
        Protocol.delete('character', id);
        // Ensure a tab is selected
        let selected = $('#editor>.tabs').find('.tab.selected');
        if(selected.length == 0){
          // // Select first tab
          let firstTab = $('#editor>.tabs').children().first('.tab');
          let firstId = firstTab.attr('data-character');
          Forms.selectTab(firstTab);
          Protocol.navigate('absolute', firstId);
        }
      }
    });
  }

  static addCharacterForm(character, id) {
    // Tab
    let newTabButton = $('#editor>.tabs>.newtab');
    let tab = Forms.renderTab(character, id);
    newTabButton.before(tab);
    // Form
    let form = Forms.renderCharacterForm(character, id)
    $('#editor>.cardForms').append(form);
    hide(form);
  }

  static removeCharacterForm(id) {
    // Tab
    let tab = $('#editor>.tabs').find('.tab[data-character="'+id+'"]');
    tab.remove();
    // Form
    let form = $('#editor>.cardForms').find('.character-form[data-character="'+id+'"]');
    form.remove();
  }

  static selectTab(element) {
    $('#editor>.tabs').children().removeClass('selected');
    element.addClass('selected');
    // Show the right form
    $('#editor>.cardForms').children().addClass('hidden');
    let form = Forms.getFormFromTab(element);
    form.removeClass('hidden');

    console.log("Selected");
  }

  static renderTab(character, id) {
    let tab = $('<li class="tab">');
    tab.append('<span class="name">'+character.name+'<span>');
    tab.attr('data-character', id);

    let closeButton = $('<span class="close">&times;</span>');
    tab.append(closeButton);

    return tab;
  }

  static renderNewTabButton() {
    let tab = $('<li class="newtab">');

    let button = $('<span class="button">&plus;</span>');
    tab.append(button);

    return tab;
  }

  static renderCharacterForm(character, id) {
    let form = $('<form>');
    form.addClass('js-character-form character-form');
    form.attr('autocomplete', 'off');
    form.attr('data-character', id);

    // Character info
    let table = $('<table class="charInfo">');
    form.append(table);
    table.append(
      Forms.renderTableRow(
        'Character:',
        Forms.renderTextbox('character', id).attr('disabled', 1)
      ),
      Forms.renderTableRow(
        'Name:',
        Forms.renderTextbox('name', character.name)
      ),
      Forms.renderTableRow(
        'Small Name?',
        Forms.renderCheckbox('shorten_name', character.shorten_name)
      ),
      Forms.renderTableRow(
        'Title:',
        Forms.renderTextbox('title', character.title)
      ),
      Forms.renderTableRow(
        'Race/Class:',
        Forms.renderTextbox('raceclass', character.raceclass)
      ),
      Forms.renderTableRow(
        'Icon:',
        Forms.renderTextbox('icon', character.icon)
      ),
    );

    // Stats
    let statBlock = $('<div class="stats">');
    let statDef = charData.definition.stats;
    form.append(statBlock);
    // console.log(character.name);
    for(let set in statDef) {
      let table2 = $('<table>');
      let row1 = $('<tr>');
      let row2 = $('<tr>');
      table2.append(row1, row2);
      for(let stat in statDef[set]) {
        let label = $('<span class="label">');
        label.attr('data-stat', stat);
        label.html(statDef[set][stat]);
        row1.append(label);
        label.wrap("<td>");

        let input = Forms.renderTextbox('stat', character.stats[stat]);
        input.attr('data-stat', stat);
        row2.append(input);
        input.wrap("<td>");
      }
      statBlock.append(table2);
    }

    return form;
  }

  static renderTextbox(name, value) {
    let element = $('<input type="text">');
    element.attr('name', name);
    element.attr('value', value);
    return element;
  }

  static renderCheckbox(name, value) {
    let element = $('<input type="checkbox">');
    element.attr('name', name);
    if(value == '1') {
      element.attr('checked', value);
    }
    return element;
  }

  static renderTableRow(...content) {
    let row = $('<tr>');
    for (let element of content) {
      row.append($('<td>').append(element));
    }
    return row;
  }

  static getCharacterFromForm(form) {
    let element = $(form).find('input[name="character"]');
    return element.val();
  }

  static getFormFromTab(tab) {
    let id = tab.attr('data-character');
    return $('#editor .js-character-form[data-character="'+id+'"]');
  }

  static renameTab(id, newName) {
    let tab = $('#editor>.tabs').find('.tab[data-character="'+id+'"]');
    tab.find('.name').html(newName);
  }
}
