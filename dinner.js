const STATE = {
    JSONresults: [],
    route: 'start' || 'results' || 'recipe',
};


const PAGE_ELEMENTS = {
    'start': $('.js-home-page'),
    'results': $('.js-results-page'),
    'recipe': $('.js-recipe-page'),
};


const RECIPE_SEARCH_URL = 'https://api.edamam.com/search';




function renderApp(state, elements) {
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
        renderRecipePage(state, elements[state.route]);
    }
}

function getDataFromApi(searchTerm, callback) {
    const query = {
        q: `${searchTerm}`,
        // per_page: 10,
        app_id: '5db20bc7',
        app_key: 'fe650f1917f0df37d3296b96bb8f92d1',
        to: 10,
        from: 0
    }
 $.getJSON(RECIPE_SEARCH_URL, query, displayRecipeData);
    // $.getJSON(RECIPE_SEARCH_URL, query).done(resp => {displayRecipeData(resp)});
}


function displayRecipeData(data) {
   
    const results = data.hits.map((item, index) => {
            return renderRecipeResult(item);
    })
    $('.js-search-results').html(results);
}

function renderRecipeResult(result) {
    return `
    <div>
        <h3><a href="${result.recipe.shareAs}" target="_blank">${result.recipe.label}</a></h3>
        <a class="js-recipe-thumbnail" href="${result.recipe.label}" target="_blank"><img src="${result.recipe.image}"></a>
        <h5>This recipe is brought to you by ${result.recipe.source}</h5>
    </div>
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
        let typedInput = $("#textSearch").val();
        console.log(typedInput);
        getDataFromApi(typedInput);
        $("#textSearch").val('');
        STATE.route = 'results';
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


    $(document).ready(function () {
        renderApp(STATE, PAGE_ELEMENTS);
    });