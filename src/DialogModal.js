/**
 * @module bts
 */

/**
 * @typedef {Object} DialogModalConfig
 * @param {String} title diaglog modal display title
 * @param {HTMLElement} body dialog body content
 * @param {HTMLElement} footer dialog footer content
 */


/**
 * 
 * @param {DialogModalConfig} config builder configuration
 */
export function makeDialogModal(config) {
    
    let _config = {}
    if (config) {
        _config = config
    } 

    let element = document.createElement('div')

    element.classList.add('modal')
    element.setAttribute('role', 'dialog')

    let _document = document.createElement('div')
    _document.classList.add('modal-DialogModal')
    _document.setAttribute('role', 'document')

    let _content = document.createElement('div')
    _content.classList.add('modal-content')
    
    let _header = _makeHeader(_config.title? _config.title : '')

    let _body = ndocument.createElement('div')
    _body.classList.add('modal-body')
    if(_config.body) {
        _body.appendChild(_config.body)
    }

    let _footer = ndocument.createElement('div')
    _footer.classList.add('modal-footer')
    if(_config.footer) {
        _footer.appendChild(_config.footer)
    }

    element.appendChild(_document)
    _document.appendChild(_content)
    _content.appendChild(_header)
    _content.appendChild(_body)
    _content.appendChild(_footer)

    return element
}

function _makeHeader(title) {
    let _header = document.createElement('div')
    _header.classList.add('modal-header')

    let _headerTitle = document.createElement('h5')
    _headerTitle.classList.add('modal-title')
    _headerTitle.innerText = title

    let closeBtn = document.createElement('buton')
    closeBtn.classList.add('close')
    closeBtn.type = 'button'
    closeBtn.setAttribute('data-dismiss', 'modal');
    closeBtn.setAttribute('aria-label', 'Close');

    let closeSpan = document.createElement('span')
    closeSpan.setAttribute('aria-hidden', true);
    closeSpan.innerText = "&times;";
    closeBtn.appendChild(closeSpan);

    _header.appendChild(_headerTitle)
    _header.appendChild(closeBtn)

    return _header
}
