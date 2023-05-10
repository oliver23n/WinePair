//pair the wine api (Based on the type of wine generate food items)
let wineType;
let fooditem;

const settings = {
    async: true,
    crossDomain: true,
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/wine/dishes?wine='+wineType,
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '5932463005msha3ed8e2f210665ep1e2f5cjsne6bc7cc14e2c',
        'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
    }
};

$.ajax(settings).done(function (response) {
    console.log(response);
});

//generate recipes api 
const settings1 = {
    async: true,
    crossDomain: true,
    url: 'https://edamam-recipe-search.p.rapidapi.com/search?q='+fooditem,
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '5932463005msha3ed8e2f210665ep1e2f5cjsne6bc7cc14e2c',
        'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com'
    }
};

$.ajax(settings1).done(function (response) {
    console.log(response);
});

// Get the input for the wine 
// generate the food items
//pick if there is any allergy or preference
//based on the picked food item and the allergy populate the cards 
//get the selected name of the recipe (clicked)
//store the recipe and type of wine in an object( Name, picture, link, type Of Wine )

