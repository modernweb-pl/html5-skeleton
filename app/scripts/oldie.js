'use strict';

function chromeframe() {
    var frame = document.createElement('div');
    frame.setAttribute('class', 'chromeframe');
    frame.style.backgroundColor = '#2c4142';
    frame.style.color = '#ffffff';
    frame.style.textAlign = 'center';
    frame.style.fontWeight = 'bold';
    frame.style.padding = '20px';
    frame.innerHTML = '' +
        '<h1>Używasz <strong>bardzo starej</strong> przeglądarki.</h1> ' +
        '<p>Prosimy o <a style="color: #F0D200;" href="http://browsehappy.com/">zaktualizowanie przeglądarki</a> ' +
        'lub <a style="color: #F0D200;" href="http://www.google.com/chromeframe/?redirect=true">aktywację Google Chrome Frame</a> aby usprawnić korzystanie z Internetu.</p>';
    var body = document.getElementsByTagName('body')[0];
    body.insertBefore(frame, body.childNodes[0]);
}
window.onload = chromeframe;
