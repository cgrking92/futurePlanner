const curUrl = document.location.origin;
let check = '';


if (curUrl === 'http://localhost:3000' || curUrl === 'http://devfp.englishegg.co.kr:81') {
    check = 'http://devecm.englishegg.co.kr:81';    
}else{
    check = 'https://ecm.englishegg.co.kr';
}

export const API_URL = check;
