// ==UserScript==
// @name         Quizlet Question Bypass
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Gives you the images of the solutions on the bottom. Works best with auto-login quizlet.
// @author       DevT02
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
  var paywall = document.getElementById('__NEXT_DATA__'); // get paywall
  var data = paywall.outerHTML; // outer json html
  // couldve used regex, found it annoying
  console.log('quizletquestionbypass by DEVT02')


  data = data.split("https://").map(val => { return "https://"+val }).slice(1) // split urls into an array named "data"
  function dataIncludes(a1, i){
    return data[i].includes(a1)
  }
  var selectEachElement = $("div[class^='ExplanationsSolutionCard'],div[class*=' ExplanationsSolutionCard']")

  // Actually unblur KATEX
  selectEachElement.each(function (index, element){
       $(selectEachElement).eq(index).children().eq(1).children().first().children().first().removeAttr('style').css("filter","blur(0)")

  });

 // WORKING  $("div[class^='ExplanationsSolutionCard'],div[class*=' ExplanationsSolutionCard']").eq(1).children().eq(1).children().first().children().first().removeAttr('style').css("filter","blur(0)"); <-- (bruh the amount of debugging)

  for(let i = 0; i < data.length; i++){
    data[i] = data[i].substring(0, data[i].indexOf("\""))
    if (dataIncludes("lateximg.png", i) || dataIncludes("quizlet.com/explanations", i) || dataIncludes("assets", i) || dataIncludes("textbook_covers", i) || dataIncludes("cache", i)){
      data.splice(i, 1)
      i--
    }
  }

  console.log(data)

   // remove popup
   var paywallremover = document.getElementsByClassName("hideBelow--s")
   try{
       paywallremover[0].remove()
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

