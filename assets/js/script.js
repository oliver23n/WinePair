
let wineType;
let fooditem;


// Get the input for the wine 
function getWine(){
    wineType = $('#inputWine').val();
    passWine(wineType);
}
function sendWineData(){

}
function passWine(type){
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

    $.ajax(settings).done(function (dataWine) {
        let = wineDescription = dataWine.text;
        //pick if there is any allergy or preference
        let dietpref = '';
        $('#wineDesc').text(dataWine.text);
        // generate the food items
        for(let i = 0; i<dataWine.pairings.length; i++ ){
            $('#option' + i).text(dataWine.pairings[i]).val(dataWine.pairings[i]);
        }

        $('.foodRecom').on('click','.btn', function(){
           foodItem = $(this).val();
            //generate recipes api 
            const settings1 = {
                async: true,
                crossDomain: true,
                url: 'https://edamam-recipe-search.p.rapidapi.com/search?q=' + foodItem,
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '5932463005msha3ed8e2f210665ep1e2f5cjsne6bc7cc14e2c',
                    'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com'
                }
            };

            $.ajax(settings1).done(function (recipes) {
                console.log(recipes);
                cardnum = $('.card');
                //populate cards
                for(let j = 0; j<cardnum.length; j++){
                    //name
                    $('#name' + j).text(recipes.hits[j].recipe.label).val(recipes.hits[j].recipe.label);
                    //pic
                    $('#img'+j).attr('src',recipes.hits[j].recipe.image);
                    //link
                    $('#link'+j).text("Link to the recipe").attr('href',recipes.hits[j].recipe.url);
                }
            });
        })
        

        console.log(dataWine);

        
        //generate recipes api 
        const settings1 = {
                async: true,
                crossDomain: true,
            url: 'https://edamam-recipe-search.p.rapidapi.com/search?q=' + fooditem,
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '5932463005msha3ed8e2f210665ep1e2f5cjsne6bc7cc14e2c',
                'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com'
            }
        };
        
        $.ajax(settings1).done(function (response1) {
                console.log(response1);
            });
        });
    }
    function init(){
        $('#submitB').on('click',getWine);
        
        
        
    }
    init();
    
    
    //based on the picked food item and the allergy populate the cards 
    //get the selected name of the recipe (clicked)
    //store the recipe and type of wine in an object( Name, picture, link, type Of Wine )

