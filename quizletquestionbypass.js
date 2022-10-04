// ==UserScript==
// @name         Quizlet Question Bypass
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Gives you the images of the solutions on the bottom. Works best with auto-login quizlet.
// @author       DevT02
// @match        http*://www.quizlet.com/explanations/questions/*
// @match        http*://quizlet.com/explanations/questions/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

window.addEventListener('load', function() {
  'use strict';
  var paywall = document.getElementById('__NEXT_DATA__'); // get data (all urls!)
  var data = paywall.outerHTML; // outer json html

  // couldve used regex, found it annoying
  data = data.split("https://").map(val => { return "https://"+val }).slice(1) // split urls into an array named "data"
  for(let i = 0; i < data.length; i++){
    data[i] = data[i].substring(0, data[i].indexOf("\""))
  }

  console.log(data)

  // remove popup
  var paywallremover = document.getElementsByClassName("hideBelow--s")
  paywallremover[0].remove()


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



