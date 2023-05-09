//pair the wine
const settings = {
    async: true,
    crossDomain: true,
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/wine/dishes?wine=malbec',
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '5932463005msha3ed8e2f210665ep1e2f5cjsne6bc7cc14e2c',
        'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
    }
};

$.ajax(settings).done(function (response) {
    console.log(response);
});