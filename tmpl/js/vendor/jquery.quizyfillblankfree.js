// ***
//  Memory game plugin for jQuery
//  Author: Yane Frenski
//  https://github.com/frenski/quizy-fillintheblank
//
//  (c) 2012-2013 http://yane.fr/
//  MIT licensed
// ***


// IE hack for indexOf
if(!Array.indexOf){
  Array.prototype.indexOf = function(obj){
   for(var i=0; i<this.length; i++){
    if(this[i]==obj){
     return i;
    }
   }
   return -1;
  }
}

(function($) {
  $.fn.quizyFillBlankFree = function(options) {

    // VARIABLES **************************************************************
    // ************************************************************************

    // gets the parameters
    var opts = $.extend({}, $.fn.quizyFillBlankFree.defaults, options);

    // keeps the text items given in the parameters
    var textItems = opts.textItems;

    // keeps the order of the items given in the parameters
    var correctAnswers = opts.correctAnswers;

    // keeps the number of the answers and the number of the drop places
    var phNum = correctAnswers.length;

    // keeps the number of successful drop attemts
    var anCount = 0;

    //counts the amount of seconds to complete it
    var numSeconds = 0;

    // a timer variable
    var gameTimer;

    var responses = [];

    // DOM elements for the text and the draggable answers
    var el1 = $('#'+opts.elementAnId);
    var el2 = $('#'+opts.elementTextId);
    var submitBut = $('#'+opts.elementSubmitId);


    // FUNCTIONS **************************************************************
    // ************************************************************************


    // Function for handling the dropping
    function submitClick( event, ui ) {

        let correctCount =  responses.reduce(function (accumulator, currentValue) {
          return accumulator + ( (currentValue) ? 1:0);
        }, 0);


        let wrongCount = 0;

        responses.forEach((res, idx) => {
          if (!res) {
            setTimeout(function() {
              $('#'+opts.phId+idx).addClass('answ-wrong');
              setTimeout(function() {
                $('#'+opts.phId+idx).val(correctAnswers[idx]);
                $('#'+opts.phId+idx).removeClass('answ-wrong');
              }, 500);
            }, wrongCount*1000);
            wrongCount ++ ;
          }

        });

        // clears the timer
        clearInterval(gameTimer);

        // if set in the opts, calls the callback function
        if(opts.onFinishCall != ''){
          opts.onFinishCall({ correct_answers: correctCount,
                              wrong_answers: wrongCount,
                              all_answers:phNum,
                              time: numSeconds } );
        }
    }

    // Time increase function
    var incTime = function(){
      numSeconds ++;
    }


    // MAIN CODE **************************************************************
    // ************************************************************************

    // Adding the text and the placeholders (the drop-target places)
    for(var i=0; i<phNum; i++){
      el2.append('<span>'+textItems[i]+'</span> <input type="text" id="'+
                  opts.phId + i + '" style="width: ' + opts.blockSize + 'px;"' +
                  ' class="droppable-element quizy-fitb-tinput" data-id="'+i+'" />');

      // If it's the last drop item, adds one text more at the end
      if(i == phNum-1){
        var nId = i+1;
        el2.append('<span>'+textItems[nId]+'</span>');
      }

      $('#'+opts.phId+i).append('<div id="'+opts.checkId+i+
                                    '" class="quizy-fitb-res quizy-fitb-res-no '+
                                    opts.checkId+'">x</div>');
      $('#'+opts.phId+i).append('<div id="'+ opts.numberId+i+
                                  '" class="quizy-fitb-res quizy-fitb-res-num '+
                                  opts.checkId+'">' + correctAnswers[i] + '</div>');
      // $('#'+opts.checkId+i).hide();
      // $('#'+opts.numberId+i).hide();

      responses.push(false);

      // inputEls.push ($('#'))

    }

    // Adding the draggable elements - the possible answers
    var elToAppend = el1;

    $('.quizy-fitb-tinput').blur(function() {
      var id = parseInt($(this).data('id'));
      let inVal = $(this).val().trim().toLowerCase();
      let corVal = correctAnswers[id].trim().toLowerCase()
      if ( inVal == corVal) responses[id] = true;

    });

    submitBut.click(function(){
      submitClick();
    });

  }


  /**** plugin parameters *****************************************************
  *****************************************************************************

    * elementAnId:      String to change the id of the div id with the answers.
                        default: fillblank-ph
    * elementTextId:    String to change the id of the div id with the answers
                        default: fillblank-text
    * textItems:        Array which comprises the texts in-between the blanks.
                        It should include all the text fragments except the
                        missing words (they are like separators of the texts)
                        Should look like this:
                        ['text starts here','continues here', 'finishes here']
    * anItems:          Array with the strings, listing the possible answers
                        Should look like this:
                        ['answer 1', 'answer 2', 'answer 3']
    * anItemsCorrect:   Array with the correct items and their position in
                        the anItems array. Should look like this:
                        [3,0,1] - means:
                        on place 1 goes element 3
                        on place 2 goes element 0
                        on place 3 goes element 1
                        (2 is missing as it's a wrong answer and fits nowhere)
    * answerId:         String to change the class of the div with
                        the answers to prevent any potential conflicts
                        in your code
    * phId:             String to change the class of the spans with the
                        blank spaces to prevent any potential conflicts
                        in your code.
                        default: 'd-nest'
    * checkId:          String to change the class of the divs with the icons
                        showing if the answers was correct or not (in order to
                        prevent any potential conflicts in your code).
                        default:'d-check'
    * numberId:         String to change the class of the divs with the icons
                        showing if the correct position of the item (in order
                        to prevent any potential conflicts in your code).
                        default: 'd-number'
    * blockSize:        The size of the answer divs and also the blank spaces.
                        Change it if you have shorter or longer words than normal
                        default: 100
    * allowTouchDrag:   A boolean parameter (true or false), which enables
                        dragging on touch devices.
                        default: true
    * onFinishCall:     The call back function
                        It sends three arguments: correct_answers,
                                                  all_answers,
                                                  time

  ****************************************************************************/

  $.fn.quizyFillBlankFree.defaults = {elementAnId: 'fillblank-ph', textItems:['Text part1','text part 2', 'text part 3'], elementTextId: 'fillblank-text', elementSubmitId: 'fillblank-submit', correctAnswers:["Answer 1","Answer 2"], answerId:'d-answer', phId: 'd-nest', checkId:'d-check', numberId:'d-number', blockSize:100, onFinishCall:'', allowTouchDrag:true}

})(jQuery);
