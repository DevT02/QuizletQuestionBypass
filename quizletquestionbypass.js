// ==UserScript==
// @name         Quizlet Question Bypass
// @namespace    http://tampermonkey.net/
// @version      0.30
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

  // split urls into an array named "data"
  data = data.split("https://").map(val => { return "https://"+val }).slice(1);
  function dataIncludes(a1, i){
    return data[i].includes(a1)
  }

  var selectEachElement = $("div[class^='ExplanationsSolutionCard'],div[class*=' ExplanationsSolutionCard']") // LUL selector

  if (!LOGGED_IN){
      var selectElementContainer = $("div[class^='ExplanationSolutionsContainer'],div[class*=' ExplanationSolutionsContainer']")
      $(selectElementContainer).eq(0).removeAttr('style').css("max-height","10000rem") // best for when not logged in

      selectElementContainer.each(function (index, element){
          $(selectElementContainer).eq(0).children().removeAttr('hidden') // show hidden divs (again best when not logged in)
      });
  }


  // Actually unblur KATEX
  selectEachElement.each(function (index, element){
       $(selectEachElement).eq(index).children().eq(1).children().first().children().first().removeAttr('style').css("filter","blur(0)")

  });

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
    switch (true){
        case (index == 0):
           btn.innerText = "Next Problem";
           break;
        case (index == 1):
           btn.innerText = "Skip 2 Problems";
           break;
        case (index == 2):
           btn.innerText = "Previous Problem";
           break;
        case (index == originalArray.length - 1):
           btn.innerText = "Back to Textbook";
           break;
        default:
           return;
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
  document.getElementById("buttonContainer").style.display = "flex";
  document.getElementById("buttonContainer").style.alignItems = "center";
  document.getElementById("buttonContainer").style.justifyContent = "center";

  // remove popup
  var paywallremover = [ document.getElementsByClassName("hideBelow--s"), document.getElementsByClassName("hideBelow--s"), document.getElementsByClassName("hideBelow--m")]
  try{
      paywallremover.forEach(element => element[0].remove())
  }
  catch (err){
      console.log(err)
  }

  // add new container for images
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


  // to work in tandem with quizlet bypass
  let div = document.createElement('div');
  div.classList.add('hideBelow--s');
  document.body.appendChild(div)
  let div2 = document.createElement('div');
  div2.classList.add('hideAbove--s');
  document.body.appendChild(div2)
}, false);
