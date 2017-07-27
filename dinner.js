




// $(function () {
//   $(STARTBUTTON).css('border', '10px solid red').click(function (event) {
//     event.preventDefault();
//     STATE.route = 'question'
//     renderQuiz(STATE, ELEMENTS);
//   });
//   $(QUESTION).css('border', '10px solid blue').submit(function (event) {
//     event.preventDefault();

//     STATE.route = 'feedbackpage'
//     renderQuiz(STATE, ELEMENTS);
//   });
//   $(NEXTBUTTON).css('border', '10px solid green').click(function (event) {
//     event.preventDefault();
//     currentQuestion++
//     //--------------------------------------------------------------------------------REPLACE CONDITIONAL CHECK WITH RUNNING CHOOSE QUESTION FUNCTION 
//     chooseQuestion();

//     renderQuiz(STATE, ELEMENTS);
//   });
//   $(TRYAGAINBUTTON).css('border', '10px solid yellow').click(function (event) {
//     event.preventDefault();
//     STATE.route = 'startpage'
//     renderQuiz(STATE, ELEMENTS);
//   });
// });


// function renderQuiz(state, elements) {
//   $(elements.startpage).hide();
//   $(elements.feedbackpage).hide();
//   $(elements.scorepage).hide();
//   $(elements.question).hide();
//   // console.log('route', state.route)
//   // console.log('selector', elements[state.route])
//   // console.log('jquery', $(elements[state.route]))
//   if (state.route === 'question') {
//     console.log(STORE[currentQuestion]);
//     $(QUESTIONCONTAINER).find('p').text(STORE[currentQuestion].question);
//   }
//   $(elements[state.route]).show()

// }