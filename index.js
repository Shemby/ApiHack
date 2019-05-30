'use strict';

const baseUrl = 'https://api.scripture.api.bible/v1/bibles/9879dbb7cfe39e4d-04'
const myHeaders = new Headers();
      myHeaders.append('api-key', 'e905c2f122905efe6cee397e81d3904a');

function getSearch(userInput){
    $('.daily').addClass('hidden');
    const url = `${baseUrl}/search?query=${userInput}`;
    $('#results').removeClass('hidden');
    fetch(url,{
        headers: myHeaders
    })
        .then(response => {
            if (response.ok) {
            return response.json();   
            }
        throw new Error(response.statusText);
        })
    .then(displaySearch)
    .catch(err => {
        $('#error-message').text(`something went wrong: ${err.message}`);
    });
}
function getChapter(event){
    event.preventDefault();
    const chapterLink = $(event.target);
    const chapterId = chapterLink.data('chapter');
    const url =`${baseUrl}/chapters/${chapterId}`;
    fetch(url,{
        headers: myHeaders
    })
        .then(response =>{
            if(response.ok){
                return response.json();
            }
        throw new Error(response.statusText);
        })
    .then(displayChapter)
    .catch(err => {
        $('#error-message').text(`something went wrong: ${err.message}`);
    });

}
function displayChapter(responseJson){
    console.log(responseJson);
    $('#results').addClass('hidden');
    $('#resultsList').html(`<li class='chapterResponse'><h1>${responseJson.data.reference}</h1>
    <p>${responseJson.data.content}</p></li>`);
}
function displaySearch(responseJson){
    console.log(responseJson);
    let totalResults = responseJson.data.total;
    if (totalResults>0){
    $('#resultsList').html(responseJson.data.verses.map(o => {
        return `<li><h3>${o.reference}</h3><p>"${o.text}"</p><a href=""
        class='chapter-link' data-chapter='${o.chapterId}'>view entire chapter</a></li>`;
    }));
}
    else{
        $('#resultsList').html(`<h3>Your search returned no results.</h3>`)
}}
function listen() {
    $('form').submit (event => {
        event.preventDefault();
        const userInput = $('#searchQuery').val();
        getSearch(userInput);
    })
    $('#resultsList').on('click', '.chapter-link', getChapter);
}
$(listen);