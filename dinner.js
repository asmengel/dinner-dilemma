const STATE = {
  JSONresults: [],
  route: 'start' || 'results' || 'recipe',
};


const PAGE_ELEMENTS = {
  'start': $('.js-home-page'),
  'results': $('.js-results-page'),
  'recipe': $('.js-recipe-page'),
};


function renderApp(state, elements) {
  // default to hiding all routes, then show the current route
  Object.keys(elements).forEach(function(route) {
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


$('.js-home-submit').on('click', function(event) {
  event.preventDefault();
  console.log('home submit button clicked');
  STATE.route = 'results';
  renderApp(STATE, PAGE_ELEMENTS); 
});


function renderResultsPage(state, element){
    console.log('You are on the results page');
}


// User submits new search
$('.js-results-submit').click(function(event){
  event.preventDefault();
    STATE.route = 'results';
  console.log('you are back on the results page with new results');
  renderApp(STATE, PAGE_ELEMENTS);
});


// Returns user to home screen
$('.js-return-submit').click(function(event){
  event.preventDefault();
    STATE.route = 'start';
  console.log('you are back HOME');
  renderApp(STATE, PAGE_ELEMENTS);
});


$(document).ready(function() {
  renderApp(STATE, PAGE_ELEMENTS);
});