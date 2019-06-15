'use-strict';
//gets user input for the search query
function getSearch(userInput){
    $('.daily').addClass('hidden');
    $('#results').removeClass('hidden');
   goFetch(`/search?query=${userInput}`, displaySearch);
}
//displays search results
function displaySearch(responseJson){
    let totalResults = responseJson.data.total;
    if (totalResults>0){
    $('#resultsList').html(responseJson.data.verses.map(o => {
        return `
        <li>
        <h3>${o.reference}</h3>
        <p>"${o.text}"</p>
        <a href=""class='context-link' data-context='${o.chapterId}'>view entire chapter &raquo</a>
        </li>`;
    }));
}
    else{
        $('#resultsList').html(`<h3>Your search returned no results.</h3>`)
}}
//gets entire chapter when user clicks on the view entire chapter link in search results
function getContext(event){
    event.preventDefault();
    const contextLink = $(event.target);
    const contextId = contextLink.data('context');
    goFetch(`/chapters/${contextId}`, displayContext);
}
//displays chapter when view entire chapter is clicked in search results
function displayContext(responseJson){
    $('#results').addClass('hidden');
    $('form').addClass('hidden');
    $('#context').removeClass('hidden');
    $('#passage').html(`
    <a href='#' class="return-link">&laquo;</a>
    <h1 class='heading'>${responseJson.data.reference}</h1>
    <p>${responseJson.data.content}</p>`);
    $('#links-bible').html(`
    <a href='#' class='prev-chapter' data-prev='${responseJson.data.previous.id}'>&laquo;</a>
    <a href='#' class='next-chapter' data-next='${responseJson.data.next.id}'>&raquo;</a>`);
}
//displays previous chapter
function getPrev(event){
    event.preventDefault();
    const contextLink = $(event.target);
    const contextId = contextLink.data('prev');
    goFetch(`/chapters/${contextId}`, displayContext);
}
//displays next chapter
function getNext(event){
    event.preventDefault();
    const contextLink = $(event.target);
    const contextId = contextLink.data('next');
    goFetch(`/chapters/${contextId}`, displayContext);
}