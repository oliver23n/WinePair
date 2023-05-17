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
        //if the input is invalid
        $('#notSupported').modal('show');
    }).done(function (dataWine) {

        //remove previous food items 
        $('.foodRecom').empty();

        //description of wine
        let = wineDescription = dataWine.text;
        $('#wineDesc').text(dataWine.text);

        // generate the food items(buttons)
        for (let i = 0; i < dataWine.pairings.length; i++) {
            current = dataWine.pairings[i];
            buttonFood = $('<button>');
            buttonFood.attr('id', 'option' + i).addClass('btn btn-light').text(current).val(current);
            $('.foodRecom').append(buttonFood);
        }
        //show the buttons and the dietary preference
        $('#starterRemove').removeClass('hidden');
        //hide recipes if there are any
        $('#showRecipes').addClass('hidden');

        //when a food item is selected
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
                    //if there is no result
                    $('#noRecipe').modal('show');
                }).done(function (recipes) {
                    //if there is no recipe
                    if (recipes.count == 0 || recipes.count == 1) {
                        $('#noRecipe').modal('show');
                        return;
                    }

                    cardnum = $('.card');

                    //populate cards
                    for (let j = 0; j < cardnum.length; j++) {
                        //name
                        if (recipes.hits[j]) {
                        $('#name' + j).text(recipes.hits[j].recipe.label).val(recipes.hits[j].recipe.label);
                        //pic
                        $('#img' + j).attr('src', recipes.hits[j].recipe.image);
                        //link
                        $('#link' + j).text("Link to this recipe").attr('href', recipes.hits[j].recipe.url).val(recipes.hits[j].recipe.url);
                        $('#card-' + j).removeClass('hidden');
                    }
                    }
                    //show the recipes
                    $('#showRecipes').removeClass('hidden');
                });
            //saving the recipe 
            $('#showRecipes').on('click', '.saveBtn', function () {
                //get the name
                let thisRecipeName = ($(this).parent().children().eq(0).val());
                //get the img
                let thisRecipeImg = $(this).parent().parent().children('.card-img-top').attr('src');
                //get the link
                let thisRecipeLink = $(this).parent().children().eq(1).val()
                //store 
                let saveThisRecipe = {
                    wine: wineType,
                    recipeName: thisRecipeName,
                    recipeImg: thisRecipeImg,
                    recipeLink: thisRecipeLink
                };
                //check if it is a duplicate
                let found = false;
                for (let j = 0; j < savedRecipes.length; j++) {
                    if ((savedRecipes[j].recipeName == saveThisRecipe.recipeName) && (savedRecipes[j].wine == saveThisRecipe.wine)) {
                        found = true;
                        break;
                    }
                }
                //if its not a duplicate store it in client-storage
                if (!found) {
                    savedRecipes.push(saveThisRecipe);
                    localStorage.setItem("stored", JSON.stringify(savedRecipes));
                }
                //show the saved recipes
                renderItems();
            })
        })
    });
}
//show saved recipes
function renderItems() {
    let history = $('#saved');
    //clear 
    history.empty();
    //get from local storage 
    let items = getLocal();

    for (let i = 0; i < items.length; i++) {
        div = $('<div>');
        div.addClass ("previous")
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
//get from local storage
function getLocal() {
    stored = localStorage.getItem('stored');
    if (stored) {
        return JSON.parse(stored);
    } else {
        return []
    }
}
//main
function init() {
    $('#submitB').on('click', getWine);
    renderItems();
    savedRecipes = getLocal();
}

init();




