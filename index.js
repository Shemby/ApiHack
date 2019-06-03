'use strict';

const baseUrl = 'https://api.scripture.api.bible/v1/bibles/9879dbb7cfe39e4d-04'
const myHeaders = new Headers();
      myHeaders.append('api-key', 'e905c2f122905efe6cee397e81d3904a');

function getSearch(userInput){
    $('.daily').addClass('hidden');
    $('#results').removeClass('hidden');
   goFetch(`/search?query=${userInput}`, displaySearch);
}
function getContext(event){
    event.preventDefault();
    const contextLink = $(event.target);
    const contextId = contextLink.data('context');
    goFetch(`/chapters/${contextId}`, displayContext);
}
function displayContext(responseJson){
    $('#results').addClass('hidden');
    $('#context').removeClass('hidden').html(`
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
        <a href=""class='context-link' data-context='${o.chapterId}'>view entire chapter</a>
        </li>`;
    }));
}
    else{
        $('#resultsList').html(`<h3>Your search returned no results.</h3>`)
}}
function goFetch(query, display){
    const url = `${baseUrl}${query}`;
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

    function home(){
        $('#bible').addClass('hidden');
        $('#search').addClass('hidden');
        $('#daily').removeClass('hidden')
    }
    function bible(){
        $('#search').addClass('hidden');
        $('#daily').addClass('hidden');
        $('#bible').removeClass('hidden')
    }
    function search(){
        $('#daily').addClass('hidden');
        $('#bible').addClass('hidden');
        $('#search').removeClass('hidden')
    }

function listen() {
    $('form').submit (event => {
        event.preventDefault();
        const userInput = $('#searchQuery').val();
        getSearch(userInput);
    })

    $('body').on('click', '#home', home);
    $('body').on('click', '#read', bible);
    $('body').on('click', '#topic', search);

    $('#resultsList').on('click', '.context-link', getContext);

    $('#books').on('click', '.book-link', getChapters);
    $('#chapters').on('click', '.chapter-link', getVerses);


    $('#context').on('click', '.return-link', (event) =>{
        event.preventDefault();
        $('#results').removeClass('hidden');
        $('#context').addClass('hidden');
    });

    $('#bible').on('click', '.book-link', (event)=>{
        event.preventDefault();
        $('.books').addClass('hidden');
    });

    $('#bible').on('click', '.chapter-link', (event)=>{
        event.preventDefault();
        $('#chapters').addClass('hidden');
    });
}
$(listen);



















