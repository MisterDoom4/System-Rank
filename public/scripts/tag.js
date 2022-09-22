let dropdown = document.getElementById('locality-dropdown');
let dropdown2 = document.getElementById('locality-dropdown2');
function createComboBox(){
    dropdown.length = 0;
    let defaultOption = document.createElement('option');
    defaultOption.text = 'Participante';
    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;
    const url = '/api/getAll';
    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function() {
        if (request.status === 200) {
          const data = JSON.parse(request.responseText);
          let option;
          for (let i = 0; i < data.length; i++) {
            option = document.createElement('option');
            option.text = data[i].name;
            dropdown.add(option);
          }
         } else {
          // Reached the server, but it returned an error
        }   
      }
      request.onerror = function() {
        console.error('An error occurred fetching the JSON from ' + url);
      };
      request.send();
}
function createComboBox2(){
    dropdown2.length = 0;
    let defaultOption2 = document.createElement('option');
    defaultOption2.text = 'Participante';
    dropdown2.add(defaultOption2);
    dropdown2.selectedIndex = 0;
    const url2 = '/api/getAll';
    const request2 = new XMLHttpRequest();
    request2.open('GET', url2, true);
    request2.onload = function() {
        if (request2.status === 200) {
          const data2 = JSON.parse(request2.responseText);
          let option2;
          for (let i = 0; i < data2.length; i++) {
            option2 = document.createElement('option');
            option2.text = data2[i].name;
            dropdown2.add(option2);
          }
         } else {
          // Reached the server, but it returned an error
        }   
      }
      request2.onerror = function() {
        console.error('An error occurred fetching the JSON from ' + url);
      };
      request2.send();
}

window.onload = function(){
    createComboBox();
    createComboBox2();
}
