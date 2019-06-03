'use-strict';

function getBooks(){
    goFetch(`/books`, displayBooks);
}
function displayBooks(responseJson){
    console.log(responseJson);
    $('#books').html(responseJson.data.map(i =>{
        return `
        <a href="#"class='book-link'data-book='${i.id}'>${i.name}</a>`
    }))
}
function getChapters(event){
    event.preventDefault();
    const bookLink = $(event.target);
    const bookId = bookLink.data('book');
    goFetch(`/books/${bookId}/chapters`, displayChapters);
}
function displayChapters(responseJson){
    console.log(responseJson);
    $('#chapters').html(responseJson.data.map(i =>{
        return `
        <a href="#"class='chapter-link'data-chapter='${i.id}'>${i.reference}</a>`
    }))
}
function getVerses(event){
    event.preventDefault();
    const chapterLink = $(event.target);
    const chapterId =chapterLink.data('chapter');
    goFetch(`/chapters/${chapterId}`, displayVerses);
}
function displayVerses(responseJson){
    console.log(responseJson);
    $('#verses').html(`
    <h1>${responseJson.data.reference}</h1>
    <p class='verses'>${responseJson.data.content}</p>`)
    
}
$(getBooks);