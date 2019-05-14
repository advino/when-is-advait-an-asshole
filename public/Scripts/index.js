let socket = io();

let state = document.getElementById('state');
let status = document.getElementById('status');
let date = document.getElementById('date');

socket.on('message', function(msg) {
  console.log(msg);
  if(msg.score > .7) {
    state.innerHTML = "👹 Advait is an Asshole!";
  } else {
    state.innerHTML = "😊 Advait is not an Asshole!";
  }

  let messageDate = msg.date;
  date.innerHTML = messageDate;

  let capital = msg.buffer[0].toUpperCase();
  let remainder = msg.buffer.slice(1, msg.buffer.length);
  let final = capital + remainder;
  status.innerHTML = final;
});
