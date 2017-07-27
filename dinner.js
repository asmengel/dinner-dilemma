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



function getDataFromApi(searchTerm) {
    const query = {
        q: `${searchTerm}`,
        // per_page: 10,
        app_id: '67bb135e',
        app_key: 'cf938fd53dff4dc81290c3ee4cbe8846',
        to: 0,
        from: 10
    };

    $.getJSON(RECIPE_SEARCH_URL, query, function (data) {
        console.log(data);
        //globalData = data;
        //displayYouTubeSearchData(data)
        showResults(data.items)
    });
};

function showResults(result) {
    var html = " ";
    $.each(result, function (index, value) {
        
            var title = value.snippet.title;
            var videoLink = "https://www.youtube.com/watch?v=" + value.id.videoId;
            html += `<div><h3>${value.snippet.title}</h3><img src="${value.snippet.thumbnails.default.url}"/><a href="${videoLink}">${videoLink}</a><p>${value.snippet.description}</p><p>${value.snippet.publishedAt}</p></div>`;
        }
    )

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