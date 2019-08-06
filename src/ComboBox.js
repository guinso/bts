/**
 * @module bts
 */

 /**
  * @typedef {Object} SelectOptionItem
  * @param {String} name display text
  * @param {String} value selected value
  */

 /**
  * @typedef {Object} ComboBoxConfig
  * @param {Array<SelectOptionItem>} items combobox's display items
  * @param {String} placeholder combobox placeholder; leave blank will not display
  * @param {Function(Event):void} onChange event handler on selected item changed
  */

/**
 * Create Bootstrap combobox
 * @param {ComboBoxConfig} config combobox configuration
 */
export function makeComboBox(config) {
    let element = document.createElement('select')
    let _config = {}

    if (config) {
        _config = config
    } 

    element.classList.add('form-control')
    
    //apply placeholder if exists
    if (_config.placeholder && _config.placeholder.length > 0) {
        let placeholder = _makePlaceHolder(_config.placeholder)
        element.appendChild(placeholder)
    }

    //add options
    if (_config.items && _config.items.length > 0) {
        _config.items.forEach(item => {
            let tmp = _makeOptionItem(item.name, item.value)
            element.appendChild(tmp) 
        });
    }

    //apply selection change
    if (_config.onChange) {
        element.addEventListener('change', _config.onChange)
    }

    return element
}

function _makePlaceHolder(text) {
    let element = document.createElement('option')
    element.setAttribute('disabled', '')
    element.setAttribute('selected', '')
    element.setAttribute('value', '')
    element.innerText = text

    return element
}

function _makeOptionItem(text, value) {
    let element = document.createElement('option')
    element.setAttribute('value', value)
    element.innerText = text

    return element
}