/**
 * @module bts
 */

/**
 * @typedef {Object} ButtonConfig
 * @param {String} text button display text
 * @param {String} style Boostrap button style; default is primary
 */

export function makeButton(config) {
    let button = document.createElement('button')

    let _config = {}
    if (config) {
        _config = config
    }
    
    button.classList.add('btn')

    if (_config.style) {
        button.classList.add('btn-' + _config.style)
    } else {
        button.classList.add('btn-primary')
    }

    if (_config.text) {
        button.innerHTML = _config.text
    }

    return button
}