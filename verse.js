'use-strict';
//array containing verse references for calling the api for daily verse
const VERSES = [
    'ROM.8.28',
    'PHP.3.7-PHP.3.8',
    '2CO.4.17-2CO.4.18',
    'EPH.2.10',
    'ROM.3.23-ROM.3.24',
    'PHP.1.21',
    'PSA.23.1-PSA.23.4',
    'LUK.12.24-LUK.12.26',
    'JHN.14.27',
    'JOS.1.9',
    '2TI.1.7',
    '2COR.12.9',
    'HEB.11.1',
    '1PE.1.20-1PE.1.21',
    'ISA.41.9-ISA.41.10',
    'JOL.3.16',
    'REV.21.3-REV.21.4',
    '2CO.5.17',
    'MAT.11.28-MAT.11.30',
    'MAT.22.37-MAT.22.40',
    'EPH.2.4-EPH.2.5',
    'HEB.4.14-HEB.4.15',
    'PHP.4.6-PHP.4.7',
    'JHN.16.33',
    'DEU.10.17-DEU.10.18',
    '1SA.12.22',
    'LAM.3.22-LAM.3.24',
    '1PE.1.3-1PE.1.5',
    'JAS.1.22-JAS.1.25',
    'COL.3.17',
    'PHP.2.3-PHP.2.4'
];
//calls api for daily verse
function getDaily(){
    let today = new Date();
    let dd = (today.getDate());
    let todaysVerse = VERSES[dd-1];
    goFetch(`/passages/${todaysVerse}`, displayDaily);
}
//displays daily verse
function displayDaily(responseJson){
    $('#dailyVerse').html(`<li><h3 class='reference'>${responseJson.data.reference}</h3>
    <p>${responseJson.data.content}</p>
    </li>`);
}
$(getDaily);
