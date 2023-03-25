const openMenu = getElement('.meal-header-open-menu');
const closeMenu = getElement('.meal-header-close-menu');
const mainMenu = getElement('.meal-header-main-menu');

addListener(openMenu, 'click',function() {
    console.log(this);
    openMenu.style.display = 'none';
    closeMenu.style.display = 'block';
    mainMenu.style.top = '0';
})

addListener(closeMenu, 'click', function() {
    console.log(this);
    openMenu.style.display = 'block';
    closeMenu.style.display = 'none';
    mainMenu.style.top = '-100%';
} )

function getElement(id) {
    return document.querySelector(id);
}


function addListener(element, eventType, callBack) {
    element.addEventListener(eventType, callBack);
}


