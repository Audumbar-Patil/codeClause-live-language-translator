//Importing all the COMPONENTS

import React, { useEffect } from "react";
import countries from "../data";

//----------------------------------------------------------------------//

// This function will store the values from the specified elements 
 
const Translate = () => {
  useEffect(() => {
    const fromText = document.querySelector(".from-text");
    const toText = document.querySelector(".to-text");
    const selectTag = document.querySelectorAll("select");
    const translateBtn = document.querySelector("button");


//----------------------------------------------------------------------//

//this is a loop for forEach that iterates over the languageCode from countries data

    selectTag.forEach((tag) => {
      for (let languageCode in countries) {

        let option = `<option value="${languageCode}">${countries[languageCode]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
      }
    });


//----------------------------------------------------------------------//

//In this function for clearing text from toText if there is nothing in fromText
    fromText.addEventListener("keyup", () => {
      if (!fromText.value) {
        toText.value = "";
      }
    });

    
//----------------------------------------------------------------------//

//in this function if there is no value in fromText and translate button is pressed
    translateBtn.addEventListener("click", () => {
      let text = fromText.value.trim();
      let translateFrom = selectTag[0].value;
      let translateTo = selectTag[1].value;
      if (!text) return (
        toText.setAttribute("placeholder","PLZ ENTER TEXT")
    );
    
  
//----------------------------------------------------------------------//

//Make use of the API to get the result 
      toText.setAttribute("placeholder", "Translating...");
      let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
      fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
          toText.value = data.responseData.translatedText;
          data.matches.forEach((data) => {
            if (data.id === 0) {
              toText.value = data.translation;
            }
          });
          toText.setAttribute("placeholder", "Translation");
        });
    });

  }, []);


//----------------------------------------------------------------------//

//JSX for frontend
  return (
    <div>
      <div className="container">
        
        <div className="wrapper">
        <div className="wrapperFrom">
          <div className="text-input">
            <textarea
              spellcheck="false"
              className="from-text"
              placeholder="ENTER TEXT"
            ></textarea>
            
          </div>
          <li className="row-from">
              
              <select></select>
            </li>

        </div>

         
        <button>Translate Text</button>
        <li className="exchange">
        </li>

      

        <div className="wrapperTo">
          <div className="text-input">
            <textarea
              spellcheck="false"
              className="to-text"
              placeholder="TRANSLATED TEXT"
            ></textarea>
            </div>
            <div className="btnFrom">
              
            </div>
            <li className="row-to">
              <select></select>
              
            </li>
          </div>
          </div>
          </div>

          <div className="heading">
          <h1>Live Language Translation WebApp using REACT and API </h1>
        </div>
       
    </div>
  );
};

export default Translate;
