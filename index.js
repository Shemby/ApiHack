'use strict';

const apiKey = 'e905c2f122905efe6cee397e81d3904a';
const baseUrl = 'https://api.scripture.api.bible/v1/bibles/06125adad2d5898a-01/search?query='
const myHeaders = new Headers();
      myHeaders.append('api-key', 'e905c2f122905efe6cee397e81d3904a');

function getResults(userInput){
    const url = `${baseUrl}${userInput}`;
    console.log(url);
    
    fetch(url,{
        headers: myHeaders
    })
        .then(response => {
            if (response.ok) {
            return response.json();   
            }
        throw new Error(response.statusText);
        })
    .then(display)
    .catch(err => {
        $('#error-message').text(`something went wrong: ${err.message}`);
    });
}
function display(responseJson){
    console.log(responseJson);
    $('#resultsList').empty();
    $('#resultsList').html(responseJson.data.verses.map(o => {
        return `<h1>${o.reference}:${o.text}</h1>`;
    }));
}
function listen() {
    $('form').submit (event => {
        event.preventDefault();
        const userInput = $('#searchQuery').val();
        getResults(userInput);
    })
}
$(listen);