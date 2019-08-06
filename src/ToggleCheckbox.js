/**
 * Create Toggle button style checkbox
 * 
 * @param {Element} element 
 * @param {JSON} option 
 * options:
 * {Boolean}     option.value       checkbox default value
 * {String}      option.id          checkbox id, if not specify, at random guid will be generated
 * {Function}    option.onChange    function to fire when value change
 */
export function makeToggleCheckbox(config) {
    let element = document.createElement('div')

    let _config = {}
    if (config) {
        _config = config
    }

    //create checkbox
    let input = document.createElement('input')
    input.type = 'checkbox'
    input.classList.add('tgl')
    input.classList.add('tgl-light')

    if (_config.id && _config.id.length > 0) {
        input.id = _config.id
    } else {
        input.id = generateUUID()
    }

    if (_config.value) {
        input.checked = _config.value
    }

    if(_config.onChange) {
        input.addEventListener('change', _config.onChange)
    }

    //create label
    let label = document.createElement('label')
    label.setAttribute('for', input.id)
    label.classList.add('tgl-btn')

    //put checkbox and label into container
    element.innerHTML = ''
    element.appendChild(input)
    element.appendChild(label)

    return element
};

function generateUUID() {
    var d = Date.now();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
};