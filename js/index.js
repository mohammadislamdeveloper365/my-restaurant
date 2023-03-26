const openMenu = getElement('.meal-header-open-menu');
const closeMenu = getElement('.meal-header-close-menu');
const mainMenu = getElement('.meal-header-main-menu');
const searchBtn = getElement('#search-btn');
const searchField = getElement('#search-field');

addListener(openMenu, 'click',function() {
    openMenu.style.display = 'none';
    closeMenu.style.display = 'block';
    mainMenu.style.top = '0';
})

addListener(closeMenu, 'click', function() {
    openMenu.style.display = 'block';
    closeMenu.style.display = 'none';
    mainMenu.style.top = '-100%';
} )

addListener(searchBtn, 'click', function() {
    let mealName = getValue(searchField, true);
    console.log(mealName)
    loadMeals(mealName);
});

function getElement(id) {
    return document.querySelector(id);
}

function getValue (element, isInput) {
    return isInput ? element.value : element.innerText;
}

function addListener(element, eventType, callBack) {
    element.addEventListener(eventType, callBack);
}

function createMealCard(elementName) {
    const element = document.createElement(elementName);
    element.classList.add('meal-main-box-menu-card');
    element.classList.add('p-2');
    return element;
}

function createImage(src) {
    const div = document.createElement('div');
    const img = document.createElement('img');
    img.classList.add('img-fluid');
    img.src= src;
    div.append(img);

    return div;
}


function createCardMealDescription(header, description) {
    const div = document.createElement('div');
    const headerText = document.createElement('h2');
    headerText.innerText = header;
    const para = document.createElement('p');
    para.innerText = description;
    div.append(headerText,para);
    return div;
}


function displayMeal(meals) {
    const mealContainer = getElement('.meal-main-box');
    mealContainer.innerText = '';
    meals = meals ?? [];

    for(let meal of meals) {
            let mealCard = createMealCard('div');
            let imgContainer = createImage(meal.strMealThumb);
            let mealDescription;
            let mealInstructions = meal.strInstructions;
            if(meal.strInstructions.length > 120) {
                mealInstructions = meal.strInstructions.slice(0,120);
                mealInstructions = mealInstructions.concat('...');
                mealDescription = createCardMealDescription(meal.strMeal, mealInstructions);
            }

            else {
                mealDescription = createCardMealDescription(meal.strMeal, mealInstructions);
        }
        
            mealCard.append(imgContainer);
            mealCard.append(mealDescription);
            mealContainer.append(mealCard);
    }
    
    
}

function loadMeals(mealName) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
    .then(response => response.json())
    .then(data => displayMeal(data.meals))
    .catch(error=>{
        console.log("Server is not responding !!! Sorry for the inconvenience"+ error);
        getElement('#default-error').style.display = 'block';
    });
}

loadMeals('fish');


