'use-strict';

const VERSES = [
    'ROM.8.28',
    'PHP.3.8',
    '2CO.4.17',
    'EPH.2.10',
    'ROM.3.23',
    'PHP.1.21',
    'PSA.46.1',
    'LUK.12.25',
    'JHN.14.27',
    'JOS.1.9',
    '2TI.1.7',
    '2COR.12.9',
    'HEB.11.1',
    '1PE.1.13',
    'ISA.41.10',
    'JOL.3.16',
    'REV.21.4',
    '2CO.5.17',
    'MAT.11.28',
    'EXO.34.6',
    'EPH.2.4',
    'HEB.4.14',
    'PHP.4.6',
    'JHN.16.33',
    'DEU.10.17',
    '1SA.12.22',
    'LAM.3.22',
    '1PE.1.3',
    'JAS.1.22',
    'COL.3.17',
    'PHP.2.3'
];
function getDaily(){
    let today = new Date();
    let dd = (today.getDate());
    let todaysVerse = VERSES[dd-1];
    goFetch(`/verses/${todaysVerse}`, displayDaily);
}
function displayDaily(responseJson){
    $('#dailyVerse').html(`<li><h1>${responseJson.data.reference}</h1>
    <p>${responseJson.data.content}</p></li>`);
}
$(getDaily);
