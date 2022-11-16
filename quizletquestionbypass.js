// ==UserScript==
// @name         Quizlet Question Bypass
// @namespace    http://tampermonkey.net/
// @version      0.26
// @description  Gives you the images of the solutions on the bottom. Works best with auto-login quizlet.
// @author       DevT02
// @license MIT
// @match        http*://www.quizlet.com/explanations/questions/*
// @match        http*://quizlet.com/explanations/questions/*
// @match        http*://www.quizlet.com/explanations/textbook-solutions/*
// @match        http*://quizlet.com/explanations/textbook-solutions/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @grant        none
// ==/UserScript==
/* globals jQuery, $, waitForKeyElements */

window.addEventListener('load', function() {
  'use strict';
  var LOGGED_IN = true;


  var paywall = document.getElementById('__NEXT_DATA__'); // get paywall
  var data = paywall.outerHTML == null ? location.reload() : paywall.outerHTML; // outer json html (RELOAD IF NO HTML IS AVAILABLE, THIS IS FOR FIREFOX)
  console.log('Pre-checks completed! QuizletQuestionBypass by DevT02')
  console.log('Check out my other projects at https://github.com/DevT02/') // START PROGRAM
  var currentUrl = window.location.href;
  // split urls into an array named "data"
  data = data.split("https://").map(val => { return "https://"+val }).slice(1);
  function dataIncludes(a1, i){
    return data[i].includes(a1)
  }
  console.log(data)
  var selectEachElement = $("div[class^='ExplanationsSolutionCard'],div[class*=' ExplanationsSolutionCard']") // LUL selector

  if (!LOGGED_IN){
  var selectElementContainer = $("div[class^='ExplanationSolutionsContainer'],div[class*=' ExplanationSolutionsContainer']")
  $(selectElementContainer).eq(0).removeAttr('style').css("max-height","10000rem") // best for when not logged in

  selectElementContainer.each(function (index, element){
      console.log($(selectElementContainer).eq(0).children().removeAttr('hidden')) // show hidden divs (again best when not logged in)

  });
  }

  // var selectEachNextPage = $("div[class^='NavigationLink'],div[class*=' NavigationLink']")
  // var href;
  // selectEachNextPage.each(function (index, element){
  //      console.log($(selectEachElement).eq(0));
  //      console.log($(this).val($().attr("baseURI")));
  // });
    // Actually unblur KATEX
 // console.log("hrefvalue" + href);
  selectEachElement.each(function (index, element){
       $(selectEachElement).eq(index).children().eq(1).children().first().children().first().removeAttr('style').css("filter","blur(0)")

  });
  // window.alert(selectEachElementUnderContainer)
  //  console.log(selectEachElementUnderContainerTwo)
//   $(selectEachElementUnderContainer).clone().insertAfter(selectEachElementUnderContainer);

//   $(selectEachElementUnderContainer).eq(0).children().first().eq(1).children().first().eq(1)

 // WORKING  $("div[class^='ExplanationsSolutionCard'],div[class*=' ExplanationsSolutionCard']").eq(1).children().eq(1).children().first().children().first().removeAttr('style').css("filter","blur(0)"); <-- (bruh the amount of debugging)
  var data2 = [];
  for(let i = 0; i < data.length; i++){
    data[i] = data[i].substring(0, data[i].indexOf("\""))
    if (dataIncludes("lateximg.png", i) || dataIncludes("assets", i) || dataIncludes("textbook_covers", i) || dataIncludes("cache", i)){
      data.splice(i, 1)
      i--
    }
    else if (dataIncludes("textbook-solutions", i)){
        data2.push(data[i])
    }
  }
  for (let i = 0; i < 3; i++){
     console.log(data2[i]);
      // 0 = next question, 1 = 2nd next question, 2 = previous!
  }

  var buttonCont = document.createElement("div");
  buttonCont.setAttribute('id', 'buttonContainer');
  buttonCont.style.backgroundColor = "white";
  document.body.appendChild(buttonCont);

  var buttonContainer = document.getElementById('buttonContainer');
  var buttonFrag = document.createDocumentFragment();

  // skip question buttons if logged in (WIP)
  data2.forEach(function(url, index, originalArray) {
    var btn = document.createElement('button');
    btn.style.textAlign = 'center';
    btn.style.transitionDuration = '0.4s'; // if i decide to add a hover event (unfortunately requires a css file)
    btn.style.display = 'inline-block';
    btn.style.margin= '6px 8px';
    switch (index){
        case 0:
           btn.innerText = "Next Problem";
           break;
        case 1:
           btn.innerText = "Skip 2 Problems";
           break;
         case 2:
           btn.innerText = "Previous Problem";
           break;
        default:
           btn.innerText = "Back to Textbook";

    }
    btn.style.padding = '20px 40px';
    btn.style.background = 'white'; // setting the background color to white
    btn.style.color = 'black'; // setting the color to black
    btn.style.border = '2px solid #f44336'
    btn.style.fontSize = '20px'; // setting the font size to 20px
    btn.onclick = function() {
       location.href = url;
    }
    buttonContainer.appendChild(btn);
  });
  buttonContainer.appendChild(buttonFrag);



//   $("body").append ( `
// <div class="b1opuclq">
//   <div class="n8ph3fp">
//     <div class="pm71d3p">
//       <div class="NavigationLink--previous l1srttcv">
//         <a aria-label="Exercise 38" class="AssemblyLink AssemblyLink--medium AssemblyLink--primary" href="https://quizlet.com/explanations/textbook-solutions/calculus-early-transcendentals-7th-edition-9780538497909/chapter-13-exercises-38-51c1de04-83d6-422e-b1b3-9d88871db621">
//           <svg aria-label="caret left" class="AssemblyIcon AssemblyIcon--small-deprecated" role="img">
//             <noscript></noscript>
//             <use xlink:href="#caret-left"></use>
//             <noscript></noscript>
//           </svg>
//           <span>Exercise 38</span>
//         </a>
//       </div>
//     </div>
//     <div class="c19lz1jp">
//       <div class="">
//         <div class="ShowStepsButtonContainer b6g4t1k">
//           <button type="button" aria-label="Show all steps" class="AssemblyButtonBase AssemblyPrimaryButton--default AssemblyButtonBase--large AssemblyButtonBase--padding AssemblyButtonBase--fullWidth">
//             <span>Show all steps</span>
//           </button>
//         </div>
//       </div>
//     </div>
//     <div class="n5cc71p">
//       <div class="NavigationLink--next l1srttcv">
//         <a aria-label="Exercise 2" class="AssemblyLink AssemblyLink--medium AssemblyLink--primary" href="https://quizlet.com/explanations/textbook-solutions/calculus-early-transcendentals-7th-edition-9780538497909/chapter-13-exercises-2-ca468437-b351-4d0e-b434-f21d63e85c3a">
//           <span>Exercise 2</span>
//           <svg aria-label="caret right" class="AssemblyIcon AssemblyIcon--small-deprecated" role="img">
//             <noscript></noscript>
//             <use xlink:href="#caret-right"></use>
//             <noscript></noscript>
//           </svg>
//         </a>
//       </div>
//     </div>
//   </div>
// </div>
// ` );

  console.log(data)

   // remove popup
   var paywallremover = document.getElementsByClassName("hideBelow--s")
   var paywallremover2 = document.getElementsByClassName("hideAbove--s")

   try{
       paywallremover[0].remove()
       paywallremover2[0].remove()

   }
   catch (err){
       console.log(err)
   }
  // add new container

  var imgCont = document.createElement("div");
  imgCont.setAttribute('id', 'imageContainer')
  imgCont.style.backgroundColor = "white";
  document.body.appendChild(imgCont);

  var container = document.getElementById('imageContainer');
  var docFrag = document.createDocumentFragment();

  data.forEach(function(url, index, originalArray) {
    var img = document.createElement('img');
    img.src = url;
    docFrag.appendChild(img);
  });
  container.appendChild(docFrag);

}, false);

