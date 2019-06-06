'use strict';

const baseUrl = 'https://api.scripture.api.bible/v1/bibles/9879dbb7cfe39e4d-04'
const myHeaders = new Headers();
      myHeaders.append('api-key', 'e905c2f122905efe6cee397e81d3904a');

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
        $('#daily').removeClass('hidden');
    }
    function bible(){
        $('#search').addClass('hidden');
        $('#daily').addClass('hidden');
        $('#bible').removeClass('hidden');
        $('#chapters').addClass('hidden');
        $('#verses').addClass('hidden');
        $('#books').removeClass('hidden');
        $('.chapter-link').remove();
    }
    function search(){
        $('#daily').addClass('hidden');
        $('#bible').addClass('hidden');
        $('#search').removeClass('hidden');
        $('#results').addClass('hidden');
        $('#context').addClass('hidden');
        $('form').removeClass('hidden');
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
    $('#context').on('click', '.prev-chapter', getPrev);
    $('#context').on('click', '.next-chapter', getNext);
    $('#verses').on('click', '.chapter-prev', prev);
    $('#verses').on('click', '.chapter-next', next);


    $('#context').on('click', '.return-link', (event) =>{
        event.preventDefault();
        $('#results').removeClass('hidden');
        $('#context').addClass('hidden');
    });

    $('#bible').on('click', '.book-link', (event)=>{
        event.preventDefault();
        $('#books').addClass('hidden');
    });

    $('#bible').on('click', '.chapter-link', (event)=>{
        event.preventDefault();
        $('#chapters').addClass('hidden');
    });

    $('#back-to-home').click(event => {
        event.preventDefault();
        home();
      });
      $('#back-to-books').click(event => {
        event.preventDefault();
        $('#books').removeClass('hidden');
        $('#chapters').addClass('hidden');
        $('.chapter-link').remove();
      });
      $('#back-to-chapters').click(event => {
        event.preventDefault();
        $('#chapters').removeClass('hidden');
        $('#verses').addClass('hidden');
      });
      
}
$(listen);



















