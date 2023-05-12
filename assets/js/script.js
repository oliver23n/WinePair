
let wineType;
let fooditem;
let savedRecipes = [];

// Get the input for the wine 
function getWine() {
    wineType = $('#inputWine').val().toLowerCase();
    passWine(wineType);



}
function passWine(type) {
    //pair the wine api (Based on the type of wine generate food items)
    const settings = {
        async: true,
        crossDomain: true,
        url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/wine/dishes?wine=' + type,
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '5932463005msha3ed8e2f210665ep1e2f5cjsne6bc7cc14e2c',
            'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
    };

    $.ajax(settings).fail(function () {
        $('#notSupported').modal('show');
    }).done(function (dataWine) {

        console.log(dataWine);
        //remove previous food items 
        $('.foodRecom').empty();
        let = wineDescription = dataWine.text;


        $('#wineDesc').text(dataWine.text);
        // generate the food items
        for (let i = 0; i < dataWine.pairings.length; i++) {
            current = dataWine.pairings[i];
            buttonFood = $('<button>');
            buttonFood.attr('id', 'option' + i).addClass('btn btn-light').text(current).val(current);
            $('.foodRecom').append(buttonFood);
        }
        $('#starterRemove').removeClass('hidden');  
        $('#showRecipes').addClass('hidden');


        $('.foodRecom').on('click', '.btn', function () {
            foodItem = $(this).val();
            //pick if there is any allergy or preference
            let dietpref = '';
            if ($('#gf').is(':checked')) {
                dietpref += ' gluten free ';
            };
            if ($('#df').is(':checked')) {
                dietpref += ' dairy free ';
            };
            if ($('#veg').is(':checked')) {
                dietpref += ' vegetarian ';
            };
            //generate recipes api 
            const settings1 = {
                async: true,
                crossDomain: true,
                url: 'https://edamam-recipe-search.p.rapidapi.com/search?q=' + dietpref + foodItem,
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '5932463005msha3ed8e2f210665ep1e2f5cjsne6bc7cc14e2c',
                    'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com'
                }
            };

            $.ajax(settings1)
                .fail(function () {
                    $('#noRecipe').modal('show');
                }).done(function (recipes) {
                    if (recipes.count == 0) {
                        $('#noRecipe').modal('show');
                        return;
                    }
                    console.log(recipes);
                    cardnum = $('.card');

                    console.log(dietpref);
                    //populate cards
                    for (let j = 0; j < cardnum.length; j++) {
                        //name
                        $('#name' + j).text(recipes.hits[j].recipe.label).val(recipes.hits[j].recipe.label);
                        //pic
                        $('#img' + j).attr('src', recipes.hits[j].recipe.image);
                        //link
                        $('#link' + j).text("Link to this recipe").attr('href', recipes.hits[j].recipe.url).val(recipes.hits[j].recipe.url);
                    }
                    $('#showRecipes').removeClass('hidden');
                });
            $('#showRecipes').on('click', '.saveBtn', function () {
                let thisRecipeName = ($(this).parent().children().eq(0).val());
                let thisRecipeImg = $(this).parent().parent().children('.card-img-top').attr('src');
                let thisRecipeLink = $(this).parent().children().eq(1).val()
                let saveThisRecipe = {
                    wine: wineType,
                    recipeName: thisRecipeName,
                    recipeImg: thisRecipeImg,
                    recipeLink: thisRecipeLink
                };

                let found = false;
                for (let j = 0; j < savedRecipes.length; j++) {
                    if ((savedRecipes[j].recipeName == saveThisRecipe.recipeName) && (savedRecipes[j].wine == saveThisRecipe.wine)) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    savedRecipes.push(saveThisRecipe);
                    localStorage.setItem("stored", JSON.stringify(savedRecipes));
                }

            })
            renderItems();

        })


    });
}
function renderItems() {
    let history = $('#saved');
    //clear 
    history.empty();
    //get from local storage 
    let items = getLocal();
    console.log(items);
    for (let i = 0; i < items.length; i++) {
        div = $('<div>');
        img = $('<img>');
        img.attr('src', items[i].recipeImg);
        name1 = $('<h3>');
        name1.text(items[i].recipeName);
        wine = $('<h4>')
        wine.text(items[i].wine);
        link = $('<a>');
        link.text('Link to recipe').attr('href', items[i].recipeLink);
        div.append(img, name1, wine, link);
        history.append(div);
    }
}
function getLocal() {
    stored = JSON.parse(localStorage.getItem('stored'));
    return stored;
}
function init() {
    $('#submitB').on('click', getWine);
    renderItems();
    savedRecipes = getLocal();

}
init();



    //get the selected name of the recipe (clicked)
    //store the recipe and type of wine in an object( Name, picture, link, type Of Wine )

