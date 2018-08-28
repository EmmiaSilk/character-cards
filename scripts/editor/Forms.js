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
    addTextInputEventHandler('input', 'class');
    addTextInputEventHandler('change', 'icon');

    // Tab switching
    $('#editor>.tabs').on('click', '.tab', function(event) {
      let tab = $(event.target).closest('.tab');
      Forms.selectTab(tab);
      Protocol.navigate('absolute', tab.attr('data-character'));
    });
  }

  static selectTab(element) {
    $('#editor>.tabs').children().removeClass('selected');
    element.addClass('selected');
    // Show the right form
    $('#editor>.cardForms').children().addClass('hidden');
    let form = Forms.getFormFromTab(element);
    form.removeClass('hidden');
    // Tell applet to show the given card
  }

  static renderTab(character, id) {
    let tab = $('<li class="tab">')
    tab.append('<span class="name">'+character.name+'<span>');
    tab.attr('data-character', id);

    let closeButton = $('<span class="close">&times;</span>');
    tab.append(closeButton);


    return tab;
  }

  static renderCharacterForm(character, id) {
    let form = $('<form>');
    form.addClass('js-character-form character-form');
    form.attr('autocomplete', 'off');
    form.attr('data-character', id);

    let table = $('<table>');
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
