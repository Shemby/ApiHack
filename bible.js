'use-strict';
//calls api for books
function getBooks(){
    goFetch(`/books`, displayBooks);
}
//displays books
function displayBooks(responseJson){
    $('#book-names').html(responseJson.data.map(i =>{
        return `
        <a href="#"class='book-link'data-book='${i.id}'>${i.name}</a>`
    }))
}
//calls api for chapter numbers
function getChapters(event){
    event.preventDefault();
    $('#chapters').removeClass('hidden');
    const bookLink = $(event.target);
    const bookId = bookLink.data('book');
    goFetch(`/books/${bookId}/chapters`, displayChapters);
}
//displays chapter numbers
function displayChapters(responseJson){
    $('#chapter-names').html(responseJson.data.map(i =>{
        return `
        <a href="#"class='chapter-link'data-chapter='${i.id}'>${i.reference}</a>`
    }))
}
//calls api for chapter chosen by user
function getVerses(event){
    event.preventDefault();
    $('#verses').removeClass('hidden');
    $('#content').empty();
    const chapterLink = $(event.target);
    const chapterId =chapterLink.data('chapter');
    goFetch(`/chapters/${chapterId}`, displayVerses);
}
//displays chapter chosen by user
function displayVerses(responseJson){
    $('#verse-heading').html(`${responseJson.data.reference}`);
    $('#content').html(`${responseJson.data.content}`);
    $('#bible-links').html(`
        <a href='#' class='chapter-prev' data-prev='${responseJson.data.previous.id}'>&laquo;</a>
        <a href='#' class='chapter-next' data-next='${responseJson.data.next.id}'>&raquo;</a>`);
}
//displays previous chapter
function prev(event){
    event.preventDefault();
    const chapterLink = $(event.target);
    const chapterId = chapterLink.data('prev');
    goFetch(`/chapters/${chapterId}`, displayVerses);
}
//displays next chapter
function next(event){
    event.preventDefault();
    const chapterLink = $(event.target);
    const chapterId = chapterLink.data('next');
    goFetch(`/chapters/${chapterId}`, displayVerses);
}
$(getBooks);