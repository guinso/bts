/**
 * 
 * @param {Number} selectedIndex mark current active page item
 * @param {Number} pageSize number of items contains in one page
 * @param {Number} totalCount total page number
 * @param {Function(Number):void} onIndexSelectFn handler when pagination item is clicked
 */
export function makePagination(pageSize, totalCount, onIndexSelectFn) {
    var pageCount = (totalCount / pageSize) + (totalCount % pageSize > 0 ? 1 : 0);
    var currentIndex = 0
    let displaySize = 5 <= pageCount? 5 : pageCount

    var element = document.createElement("ul");
    element.classList.add("pagination");

    //create page items
    let pageItems = []
    pageItems.push(makePaginationItem('<<', () => {
        clickHandler(0)
        refreshPageItems()
        refreshCurrentIndex()
    }))
    pageItems.push(makePaginationItem('<', () => {
        clickHandler(currentIndex - 1)
        refreshPageItems()
        refreshCurrentIndex()
    }))
    for(let i=0; i < displaySize; i++) {
        pageItems.push(makePaginationItem((i + 1).toString(), (e) => {
            let ele = e.target
            let index = parseInt(ele.innerText) - 1
            clickHandler(index)
        }))
    }
    pageItems.push(makePaginationItem('>', () => {
        clickHandler(currentIndex + 1)
        refreshPageItems()
        refreshCurrentIndex()
    }))
    pageItems.push(makePaginationItem('>>', () => {
        clickHandler(pageCount - 1)
        refreshPageItems()
        refreshCurrentIndex()
    }))

    pageItems.forEach(pageItem => {
        element.appendChild(pageItem)
    })

    refreshPageItems()
    refreshCurrentIndex()

    function clickHandler(index) {
        let tmpIndex = index
        if (tmpIndex < 0) {
            tmpIndex = 0
        } else if (tmpIndex >= pageCount) {
            tmpIndex = pageCount - 1
        }

        if (tmpIndex !== currentIndex) {
            onIndexSelectFn(tmpIndex)

            currentIndex = tmpIndex
        }

        refreshCurrentIndex()
    }

    function refreshPageItems() {
        var displayRange = pageItems.length - 4
        let endIndex = currentIndex + Math.ceil(displayRange / 2)
        if (endIndex >= pageCount) {
            endIndex = pageCount - 1
        }
        let startIndex = (endIndex - displayRange + 1) >= 0? (endIndex - displayRange + 1) : 0

    
        for(let i=0; i < displayRange; i++) { 
            var x = startIndex + i

            pageItems[2 + i].children[0].innerText = (x + 1).toString()
            pageItems[2 + i].dataset.indexValue = x
        }
    }

    function refreshCurrentIndex() {
        pageItems.forEach(item => {
            item.classList.remove('active')

            let index = parseInt(item.children[0].innerText) - 1
            if (index == currentIndex) {
                item.classList.add('active')
            }
        })
    }

    return element;
};

/**
 * 
 * @param {String} text display text
 * @param {Function():void} onClickFn handler when user click pagination item
 */
function makePaginationItem(text, onClickFn) {
    var firstPage = document.createElement("li");
    firstPage.classList.add("page-item");

    var firstLink = document.createElement("a");
    firstLink.classList.add("page-link");
    firstLink.innerText = text;
    firstLink.onclick = onClickFn;
    firstLink.href = "javascript:void(0);";

    firstPage.appendChild(firstLink);

    return firstPage;
};