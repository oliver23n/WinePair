
let wineType;
let fooditem;


// Get the input for the wine 
function getWine() {
    wineType = $('#inputWine').val();
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

    $.ajax(settings).fail(function(){
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

            $.ajax(settings1).done(function (recipes) {
                if (!$.trim(recipes)) {
                    alert('Not a valid location');
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
                    $('#link' + j).text("Link to this recipe").attr('href', recipes.hits[j].recipe.url);
                }
            });
        })


    });
}
function init() {
    $('#submitB').on('click', getWine);

}
init();



    //get the selected name of the recipe (clicked)
    //store the recipe and type of wine in an object( Name, picture, link, type Of Wine )

