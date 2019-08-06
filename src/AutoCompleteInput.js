/**
 * @typedef {Object} AutoCompleteInputConfig
 * @property {String} id input text ID
 * @property {String} placeholder input text placeholder display text
 * @property {Function(String, Function(Array<Object>):void):void} getListFN get list of selecteable item for auto complete
 * @property {Function(String):void} selectedFN handle selected item triggered
 * @property {Function(String, String):String} formatItemListFN handle to return custom format text to autocomplete list
 * @property {String} style input text's style attribute
 * 
 */

/**
 * Tools to create autocomplete text input
 * source: https://www.w3schools.com/howto/howto_js_autocomplete.asp
 * 
 * @param {AutoCompleteInputConfig} options provide all possible customization
 */
export function AutoCompleteInput(options) {
    this.input = null
    this.container = null
    this.list = null

    this.config = {}
    if (options) {
        this.config = options
    }

    //setup control
    this._setupContainer()
    this._setupInput()
    this._setupList()
    
    //combine all elements
    this.container.appendChild(this.input)
    this.container.appendChild(this.list)

    this.selectedIndex = 0

    var thisInstance = this
    document.addEventListener('click', function(e) {
        thisInstance._clearList(e.target)
    })  
    
    this.input.addEventListener('keydown', function(e) {
        thisInstance._keyPressed(e)
    })
};

AutoCompleteInput.prototype._setupInput = function() {
    var thisInstance = this

    this.input = document.createElement('input')
    this.input.classList.add('form-control')
    this.input.setAttribute('type', 'text')
    if (this.config.id) {
        this.input.setAttribute('id', this.config.id)
    }

    if (this.config.placeholder) {
        this.input.setAttribute('placeholder', this.config.placeholder)
    }

    if (this.config.style) {
        this.input.setAttribute('style', this.config.style)
    }

    //listen when there is input changes
    this.input.addEventListener('input', function(e){ 
        thisInstance.selectedIndex = -1
        thisInstance._populateList() })   

};

AutoCompleteInput.prototype._setupContainer = function() {
    var thisInstance = this
    this.container = document.createElement('div')
    this.container.innerHTML = ''
    this.container.classList.add('bts-autocomplete')

    //listen when out of focus
    this.container.addEventListener('blur', function(e){ 
        thisInstance.list.classList.remove('show-block')})
};

AutoCompleteInput.prototype._setupList = function() {
    this.list = document.createElement('div')
    this.list.classList.add('bts-autocomplete-list')
};

AutoCompleteInput.prototype.getControl = function() {
    return this.container
};

AutoCompleteInput.prototype.getInputControl = function() {
    return this.input
};

AutoCompleteInput.prototype._populateList = function() {
    var thisInstance = this

    this.list.innerHTML = '' //clear all item
    this.list.classList.add('show-block') //show list

    if (typeof this.config.getListFN === 'undefined') {
        return
    }

    this.config.getListFN(this.getValue(), function(items){
        var tmpDiv = null

        items.forEach(function(item){
            tmpDiv = document.createElement('div')
            tmpDiv.classList.add('bts-autocomplete-item')

            if (typeof thisInstance.config.formatItemListFN !== 'undefined') {
                tmpDiv.innerHTML = thisInstance.config.formatItemListFN(item, thisInstance.getValue())
            } else {
                tmpDiv.innerHTML = item
            }

            tmpDiv.addEventListener('click', function(e){
                thisInstance.setValue(e.target.innerHTML)
                thisInstance._clearList()

                if (typeof thisInstance.config.selectedFN !== 'undefined') {
                    thisInstance.config.selectedFN(item)
                }
            })

            thisInstance.list.appendChild(tmpDiv)
        })
    })
};

AutoCompleteInput.prototype._clearList = function(elemt) {
    var thisInstance = this
    var items = this.list.querySelectorAll('.bts-autocomplete-item')
    for(var i=0; i < items.length; i++) {
        var item = items[i]
        if (elemt != thisInstance.input 
            && item != elemt 
            && item != thisInstance.container) {
            thisInstance.list.removeChild(item)
        }
    }
};

AutoCompleteInput.prototype._keyPressed = function(keydownEvent) {
    var items = this.list.querySelectorAll('.bts-autocomplete-item')

        if (keydownEvent.keyCode == 40) { // Down key
            this.selectedIndex++
            this.setActiveItem(items)      
        } 
        else if (keydownEvent.keyCode == 38) { // Up key
            this.selectedIndex--
            this.setActiveItem(items)
        } 
        else if (keydownEvent.keyCode == 13) {// Enter key
            keydownEvent.preventDefault()        
            if (this.selectedIndex > -1) {
                if (this.input) items[this.selectedIndex].click()
            }
        }   
}

AutoCompleteInput.prototype.setActiveItem = function(itemList) {
    this.clearActiveItem(itemList)
    if (this.selectedIndex >= itemList.length) { this.selectedIndex = 0 }       // set selectedIndex to first item list
    if (this.selectedIndex < 0) { this.selectedIndex = (itemList.length - 1) }  // set selectedIndex to last item list
    if (itemList.length !== 0) { itemList[this.selectedIndex].classList.add('bts-autocomplete-active') }
}

AutoCompleteInput.prototype.clearActiveItem = function(itemList) {
    for (var i = 0; i < itemList.length; i++) {
        itemList[i].classList.remove('bts-autocomplete-active')
      }
}  

AutoCompleteInput.prototype.getValue = function() {
    return this.input.value
};

AutoCompleteInput.prototype.setValue = function(newValue) {
    this.input.value = newValue
};