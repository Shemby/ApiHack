'use strict';

const baseUrl = 'https://api.scripture.api.bible/v1/bibles/9879dbb7cfe39e4d-04'
const myHeaders = new Headers();
      myHeaders.append('api-key', 'e905c2f122905efe6cee397e81d3904a');

function getSearch(userInput){
    $('.daily').addClass('hidden');
    $('#results').removeClass('hidden');
   goFetch(`/search?query=${userInput}`, displaySearch);
}
function getChapter(event){
    event.preventDefault();
    const chapterLink = $(event.target);
    const chapterId = chapterLink.data('chapter');
    goFetch(`/chapters/${chapterId}`, displayChapter);
}
function displayChapter(responseJson){
    console.log(responseJson);
    $('#results').addClass('hidden');
    $('#chapter').removeClass('hidden').html(`
    <h1>${responseJson.data.reference}</h1>
    <p><a href="" class="return-link"><-- Return to search results</a></p>
    <p>${responseJson.data.content}</p>`);
}
function displaySearch(responseJson){
    let totalResults = responseJson.data.total;
    if (totalResults>0){
    $('#resultsList').html(responseJson.data.verses.map(o => {
        return `
        <li>
        <h3>${o.reference}</h3>
        <p>"${o.text}"</p>
        <a href=""class='chapter-link' data-chapter='${o.chapterId}'>view entire chapter</a>
        </li>`;
    }));
}
    else{
        $('#resultsList').html(`<h3>Your search returned no results.</h3>`)
}}
function goFetch(query, display){
    const url = `${baseUrl}${query}`;
    console.log(url);
    return fetch(url,{
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
function listen() {
    $('form').submit (event => {
        event.preventDefault();
        const userInput = $('#searchQuery').val();
        getSearch(userInput);
    })
    $('#resultsList').on('click', '.chapter-link', getChapter);

    $('#chapter').on('click', '.return-link', (event) =>{
        event.preventDefault();
        $('#results').removeClass('hidden');
        $('#chapter').addClass('hidden');
    }); 
}
$(listen);