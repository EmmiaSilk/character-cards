"use strict";


class Forms {

  static createEventHandlers() {
    let form = $('form.js-character-form');

    let editor = $('#editor');

    function addTextInputEventHandler(event, key) {
      editor.on(event, 'input[name="'+key+'"]', function(event) {
        let newValue = event.target.value;
        let character = Forms.getCharacterFromForm(event.target.form);
        charData.getCharacter(character)[key] = newValue;
        Protocol.setCharacterValue(character, key, newValue);
      });
    }

    function addCheckboxEventHandler(event, key) {
      editor.on(event, 'input[name="'+key+'"]', function(event) {
        let newValue = event.target.checked? 1:0 ;
        let character = Forms.getCharacterFromForm(event.target.form);
        charData.getCharacter(character)[key] = newValue;
        Protocol.setCharacterValue(character, key, newValue);
      });
    }

    // Editing for name
    addTextInputEventHandler('input', 'name');
    addCheckboxEventHandler('input', 'shorten_name');
    addTextInputEventHandler('input', 'title');
    addTextInputEventHandler('input', 'class');
    addTextInputEventHandler('change', 'icon');
  }

  static renderCharacterForm(character, id) {
    let form = $('<form>');
    form.addClass('js-character-form character-form');
    form.attr('autocomplete', 'off');

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
}
