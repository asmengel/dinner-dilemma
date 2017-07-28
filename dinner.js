const STATE = {
    searchTerm: 'tacos',
    data: null,
    recipeDetail: null,
    currentInded: null,
    route: 'start' //'results'  'recipe',
};


const PAGE_ELEMENTS = {
    'start': $('.js-home-page'),
    'results': $('.js-results-page'),
    'recipe': $('.js-recipe-page'),
};


const RECIPE_SEARCH_URL = 'https://api.edamam.com/search';




function renderApp(state, elements) {
    console.log('=====', state)
    // default to hiding all routes, then show the current route
    Object.keys(elements).forEach(function (route) {
        elements[route].hide();
    });
    elements[state.route].show();

    if (state.route === 'start') {
        console.log('render Start Page');
        //renderStartPage(state, elements[state.route]);
    }
    else if (state.route === 'results') {
        console.log('render Results Page');
        renderResultsPage(state, elements[state.route]);
    }
    else if (state.route === 'recipe') {
        console.log('render Recipe Page');
        console.log(state.currentIndex);
        // renderRecipePage(state, elements[state.route]);
        displayRecipeIngredients(state);
    }
}

function getDataFromApi(searchTerm, callback) {
    const query = {
        q: searchTerm,
        // per_page: 10,
        app_id: '5db20bc7',
        app_key: 'fe650f1917f0df37d3296b96bb8f92d1',
        to: 10,
        from: 0
    }
    $.getJSON(RECIPE_SEARCH_URL, query, function (results) {
        STATE.data = results;
        displayRecipeData(STATE);
    });

    // $.getJSON(RECIPE_SEARCH_URL, query).done(resp => {displayRecipeData(resp)});
}


function displayRecipeData(state) {
    const data = state.data;
    const results = data.hits.map((item, index) => {
        return renderRecipeResult(item);
    })
    $('.js-search-results ul').html(results);
}

function renderRecipeResult(item, index) {
    return `
    <li class="js-recipe-index js-index-${index}">
        <h3><a href="${item.recipe.shareAs}" target="_blank">${item.recipe.label}</a></h3>
        <a class="js-recipe-thumbnail" href="${item.recipe.shareAs}" target="_blank"><img src="${item.recipe.image}"></a>
        <h5>This recipe is brought to you by ${item.recipe.source}</h5>
         <button type="submit" class="js-recipe-ingredients">
                Recipe Ingredients
            </button> 
    </li>
    `;
}


$('.js-home-submit').on('click', function (event) {
    event.preventDefault();
    console.log('home submit button clicked');
    let typedInput = $("#textSearch").val();
    console.log(typedInput);
    getDataFromApi(typedInput);
    $("#textSearch").val('');
    STATE.route = 'results';
    renderApp(STATE, PAGE_ELEMENTS);
});


function renderResultsPage(state, element) {
    console.log('You are on the results page');
}


// User submits new search
$('.js-results-submit').click(function (event) {
    event.preventDefault();
    let typedInput = $("#textSearch-2").val();
    console.log(typedInput);
    getDataFromApi(typedInput);
    STATE.route = 'results';
    $("#textSearch-2").val('');
    console.log('you are back on the results page with new results');
    renderApp(STATE, PAGE_ELEMENTS);
});

// Returns user to home screen
$('.js-return-submit').click(function (event) {
    event.preventDefault();
    STATE.route = 'start';
    console.log('you are back HOME');
    renderApp(STATE, PAGE_ELEMENTS);
});



// event listener to reroute to recipe page and render recipe ingredients
$('.js-search-results').on('click', '.js-recipe-ingredients', function (event) {
    event.preventDefault();
    // STATE.recipeDetail = $('.js-se)
    STATE.route = 'recipe';
    
    console.log($(event.currentTarget).closest('li').index());
    STATE.currentIndex = $(event.currentTarget).closest('li').index();
    // displayRecipeIngredients(STATE, event.currentTarget);
    renderApp(STATE, PAGE_ELEMENTS);
})

function displayRecipeIngredients(state) {
    const data = state.data;
    const results = renderRecipePage(state);
    console.log(results);
    $('.js-recipe-page').html(results);
}

// render results page with single recipe and details
function renderRecipePage(state) {
    console.log(state.data);
    console.log(state.currentIndex);
    console.log(state.data.hits[state.currentIndex]);

    const recipeDetails = state.data.hits[state.currentIndex].recipe;
    state.recipeDetail = `
        <div>
            <h3><a href="${recipeDetails.shareAs}" target="_blank">${recipeDetails.label}</a></h3>
            <a class="js-recipe-thumbnail" href="${recipeDetails.shareAs}" target="_blank"><img src="${recipeDetails.image}"></a>
            <h5>This recipe is brought to you by ${recipeDetails.source}</h5>
                <ul><li>${recipeDetails.ingredientLines.join('<li>')}</ul> 
        </div>
        `;
    return state.recipeDetail;
}



$(document).ready(function () {
    renderApp(STATE, PAGE_ELEMENTS);
});



    // if you always re-write the same thing
    //$('.js-home-submit, .js-results-submit').on('click', handleSubmit);