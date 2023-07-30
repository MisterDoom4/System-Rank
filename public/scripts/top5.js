function createtop5Secundary() {
  let tab = '';
  let url = '/api/top5?main=false&genre=M';
  let request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.onload = function () {
    if (request.status === 200) {
      let data = JSON.parse(request.responseText);
      for (let i = 0; i < data.length; i++) {
        if (data[i].champion) {
          tab += `<div class="grid-content">
            <div class="champion"><img src="/images/${data[i].name}.png" /></div>
            <figcaption>
              <div class="grid-caption">
                <h4 class="grid-caption-text"><a href="/api/show?name=${data[i].name}">${data[i].name}</a></h4>
              </div>
            </figcaption>
          </div>
          <div class="tbl-content">
          <table cellpadding="0" cellspacing="0" border="0">
            <tbody>`;
        }
        else {
          tab += `
              <tr>
                <td>${i}</td>
                <td>${data[i].name}</td>
                <td>${data[i].points}</td>
              </tr>`;
        }
      }
      tab += ` </tbody>
            </table>
    </div>`;
    } else {

    }
    document.getElementById("secundario-m").innerHTML = tab;
  }
  request.onerror = function () {
    console.error('An error occurred fetching the JSON from ' + url);
  };

  request.send();
}
function createtop5Principal() {
  let tab = '';
  let url = '/api/top5?main=true&genre=M';
  let request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.onload = function () {
    if (request.status === 200) {
      let data = JSON.parse(request.responseText);
      for (let i = 0; i < data.length; i++) {
        if (data[i].champion) {
          tab += `<div class="grid-content">
            <div class="champion"><img src="/images/${data[i].name}.png" /></div>
            <figcaption>
              <div class="grid-caption">
                <h4 class="grid-caption-text"><a href="/api/show?name=${data[i].name}">${data[i].name}</a></h4>
              </div>
            </figcaption>
          </div>
          <div class="tbl-content">
          <table cellpadding="0" cellspacing="0" border="0">
            <tbody>`;
        }
        else {
          tab += `
              <tr>
                <td>${i}</td>
                <td>${data[i].name}</td>
                <td>${data[i].points}</td>
              </tr>`;
        }
      }
      tab += ` </tbody>
            </table>
    </div>`;
    } else {

    }
    document.getElementById("principal-m").innerHTML = tab;
  }
  request.onerror = function () {
    console.error('An error occurred fetching the JSON from ' + url);
  };

  request.send();
}
function createtop5FemaleSecundary() {
  let tab = '';
  let url = '/api/top5?main=false&genre=F';
  let request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.onload = function () {
    if (request.status === 200) {
      let data = JSON.parse(request.responseText);
      for (let i = 0; i < data.length; i++) {
        if (data[i].champion) {
          tab += `<div class="grid-content">
            <div class="champion"><img src="/images/${data[i].name}.png" /></div>
            <figcaption>
              <div class="grid-caption">
                <h4 class="grid-caption-text"><a href="/api/show?name=${data[i].name}">${data[i].name}</a></h4>
              </div>
            </figcaption>
          </div>
          <div class="tbl-content">
          <table cellpadding="0" cellspacing="0" border="0">
            <tbody>`;
        }
        else {
          tab += `
              <tr>
                <td>${i}</td>
                <td>${data[i].name}</td>
                <td>${data[i].points}</td>
              </tr>`;
        }
      }
      tab += ` </tbody>
            </table>
    </div>`;
    } else {

    }
    document.getElementById("secundario-f").innerHTML = tab;
  }
  request.onerror = function () {
    console.error('An error occurred fetching the JSON from ' + url);
  };

  request.send();
}
function createtop5FemalePrincipal() {
  let tab = ``;
  let url = '/api/top5?main=true&genre=F';
  let request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.onload = function () {
    if (request.status === 200) {
      let data = JSON.parse(request.responseText);
      for (let i = 0; i < data.length; i++) {
        if (data[i].champion) {
          tab += `<div class="grid-content">
            <div class="champion"><img src="/images/${data[i].name}.png" /></div>
            <figcaption>
              <div class="grid-caption">
                <h4 class="grid-caption-text"><a href="/api/show?name=${data[i].name}">${data[i].name}</a></h4>
              </div>
            </figcaption>
          </div>
          <div class="tbl-content">
          <table cellpadding="0" cellspacing="0" border="0">
            <tbody>`;
        }
        else {
          tab += `
              <tr>
                <td>${i}</td>
                <td class="name">${data[i].name}</td>
                <td>${data[i].points}</td>
              </tr>`;
        }
      }
      tab += ` </tbody>
            </table>
    </div>`;
    } else {

    }
    document.getElementById("principal-f").innerHTML = tab;
  }
  request.onerror = function () {
    console.error('An error occurred fetching the JSON from ' + url);
  };

  request.send();
}
function createtop5Tag() {
  let tab = ``;
  let url = '/api/top5Tag?genre=M';
  let request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.onload = function () {
    if (request.status === 200) {
      let data = JSON.parse(request.responseText);
      for (let i = 0; i < data.length; i++) {
        if (data[i].champion) {
          tab += `<div class="grid-content">
            <div class="champion"><img src="/images/tags/${data[i].name}.png" /></div>
            <figcaption>
              <div class="grid-caption">
                <h4 class="grid-caption-text"><a href="/api/showTag?name=${data[i].name}">${data[i].name}</a></h4>
              </div>
            </figcaption>
          </div>
          <div class="tbl-content">
          <table cellpadding="0" cellspacing="0" border="0">
            <tbody>`;
        }
        else {
          tab += `
              <tr>
                <td>${i}</td>
                <td class="name">${data[i].name}</td>
                <td>${data[i].points}</td>
              </tr>`;
        }
      }
      tab += ` </tbody>
            </table>
    </div>`;
    } else {

    }
    document.getElementById("tag-m").innerHTML = tab;
  }
  request.onerror = function () {
    console.error('An error occurred fetching the JSON from ' + url);
  };

  request.send();
}
function createtop5FemaleTag() {
  let tab = ``;
  let url = '/api/top5Tag?genre=F';
  let request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.onload = function () {
    if (request.status === 200) {
      let data = JSON.parse(request.responseText);
      for (let i = 0; i < data.length; i++) {
        if (data[i].champion) {
          tab += `<div class="grid-content">
            <div class="champion"><img src="/images/tags/${data[i].name}.png" /></div>
            <figcaption>
              <div class="grid-caption">
                <h4 class="grid-caption-text"><a href="/api/showTag?name=${data[i].name}">${data[i].name}</a></h4>
              </div>
            </figcaption>
          </div>
          <div class="tbl-content">
          <table cellpadding="0" cellspacing="0" border="0">
            <tbody>`;
        }
        else {
          tab += `
              <tr>
                <td>${i}</td>
                <td class="name">${data[i].name}</td>
                <td>${data[i].points}</td>
              </tr>`;
        }
      }
      tab += ` </tbody>
            </table>
    </div>`;
    } else {

    }
    document.getElementById("tag-f").innerHTML = tab;
  }
  request.onerror = function () {
    console.error('An error occurred fetching the JSON from ' + url);
  };

  request.send();
}
window.onload = function () {
  createtop5Secundary();
  createtop5Principal();
  createtop5Tag();
  createtop5FemaleSecundary();
  createtop5FemalePrincipal();
  createtop5FemaleTag();
}