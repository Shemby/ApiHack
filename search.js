'use-strict';

function getSearch(userInput){
    $('.daily').addClass('hidden');
    $('#results').removeClass('hidden');
   goFetch(`/search?query=${userInput}`, displaySearch);
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
    <a href='#' class="return-link"><-- Return to search results</a>
    <p>${responseJson.data.content}</p>
    <a href='#' class='prev-chapter' data-prev='${responseJson.data.previous.id}'>Previous Chapter</a>
    <a href='#' class='next-chapter' data-next='${responseJson.data.next.id}'>Next Chapter</a>`
    );
}
function getPrev(event){
    event.preventDefault();
    const contextLink = $(event.target);
    const contextId = contextLink.data('prev');
    goFetch(`/chapters/${contextId}`, displayContext);
}
function getNext(event){
    event.preventDefault();
    const contextLink = $(event.target);
    const contextId = contextLink.data('next');
    goFetch(`/chapters/${contextId}`, displayContext);
}