'use-strict';

function getBooks(){
    goFetch(`/books`, displayBooks);
}
function displayBooks(responseJson){
    $('#book-names').html(responseJson.data.map(i =>{
        return `
        <a href="#"class='book-link'data-book='${i.id}'>${i.name}</a>`
    }))
}
function getChapters(event){
    event.preventDefault();
    $('#chapters').removeClass('hidden');
    const bookLink = $(event.target);
    const bookId = bookLink.data('book');
    goFetch(`/books/${bookId}/chapters`, displayChapters);
}
function displayChapters(responseJson){
    $('#chapters').append(responseJson.data.map(i =>{
        return `
        <a href="#"class='chapter-link'data-chapter='${i.id}'>${i.reference}</a>`
    }))
}
function getVerses(event){
    event.preventDefault();
    $('#verses').removeClass('hidden');
    $('#content').empty();
    const chapterLink = $(event.target);
    const chapterId =chapterLink.data('chapter');
    goFetch(`/chapters/${chapterId}`, displayVerses);
}
function displayVerses(responseJson){
    $('#verse-heading').html(`${responseJson.data.reference}`);
    $('#content').html(`${responseJson.data.content}`);
    $('#links').html(`
        <a href='#' class='chapter-prev' data-prev='${responseJson.data.previous.id}'>Previous Chapter</a>
        <a href='#' class='chapter-next' data-next='${responseJson.data.next.id}'>Next Chapter</a>`);
}
function prev(event){
    event.preventDefault();
    const chapterLink = $(event.target);
    const chapterId = chapterLink.data('prev');
    goFetch(`/chapters/${chapterId}`, displayVerses);
}
function next(event){
    event.preventDefault();
    const chapterLink = $(event.target);
    const chapterId = chapterLink.data('next');
    goFetch(`/chapters/${chapterId}`, displayVerses);
}
$(getBooks);