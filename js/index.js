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
    loadMeals(mealName);
});

addListener(searchField, 'keydown', function(event) {
    let mealName = getValue(searchField, true);
    if(event.key === "Enter")
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
    element.setAttribute('data-bs-toggle','modal');
    element.setAttribute('data-bs-target','#mealModal');
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
    const defaultError = getElement("#default-error");
    const spinner = getElement('#spinner-loading');
    defaultError.innerText = '';
    spinner.style.display = "block";
    const mealContainer = getElement('.meal-main-box');
    mealContainer.innerText = '';
    meals = meals ?? [];
    if(meals.length) {
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
                addListener(mealCard, 'click',()=>{
                    loadMealsById(meal);
                })

                mealCard.append(imgContainer);
                mealCard.append(mealDescription);
                mealContainer.append(mealCard);
                
        }
    }
    
    else {
        console.log("Please enter valid value");
        defaultError.innerText = "Sorry Enter Valid values like chicken/ beef/ rice/ burger/ fish etc.."
    }

    spinner.style.display = 'none';
    
}

function loadMeals(mealName) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
    .then(response => response.json())
    .then(data => displayMeal(data.meals))
    .catch(error=>{
        const spinner = getElement("#spinner-loading");
        console.log("Server is not responding !!! Sorry for the inconvenience"+ error);
        getElement('#default-error').innerText = "Server is not responding !!! Sorry for the inconvenience";
        spinner.style.display = 'none';
    });
}

function loadMealsById(meal) {
    const mealHeader = getElement('#mealModalLabel');
    const mealId = getElement('#mealModalSubHeader');
    const mealBody = getElement('#mealModalBody');
    mealHeader.innerText = meal.strMeal;
    mealId.innerText = "ID: "+meal.idMeal;
    mealBody.innerText = meal.strInstructions;
}

loadMeals('fish');

