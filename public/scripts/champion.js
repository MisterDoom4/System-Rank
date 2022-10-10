function champion() {
    let tab = '';
    let url = '/api/champions';
    let request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function () {
        if (request.status === 200) {
            let data = JSON.parse(request.responseText);
            for (let i = 0; i < data.length; i++) {
                if(data[i].genre =="M"){
                    if(data[i].main){
                        tab += `<div class="ranks">
                                    <a href="/api/showRank?main=true&genre=M"> 
                                        <div class="title_name">AEW World Championship</div>
                                        <div class="grid-content">
                                            <div class="champion"> <img src="/images/${data[i].name}.png"> </div>
                                            <figcaption>
                                                <div class="grid-caption">
                                                    <h4 class="grid-caption-text"><a href="/api/show?name=${data[i].name}">${data[i].name}</a></h4>
                                                </div>
                                            </figcaption>
                                        </div>
                                    </a>
                                </div>`;
                    }
                    else{
                        tab += `<div class="ranks">
                                    <a href="/api/showRank?main=false&genre=M"> 
                                        <div class="title_name">TNT Championship</div>
                                        <div class="grid-content">
                                            <div class="champion"> <img src="/images/${data[i].name}.png"> </div>
                                            <figcaption>
                                                <div class="grid-caption">
                                                    <h4 class="grid-caption-text"><a href="/api/show?name=${data[i].name}">${data[i].name}</a></h4>
                                                </div>
                                            </figcaption>
                                        </div>
                                    </a>
                                </div>`;
                    }  
                }
                else{
                    if(data[i].main){
                        tab += `<div class="ranks">
                                    <a href="/api/showRank?main=true&genre=F"> 
                                        <div class="title_name">Women's World Championship</div>
                                        <div class="grid-content">
                                            <div class="champion"> <img src="/images/${data[i].name}.png"> </div>
                                            <figcaption>
                                                <div class="grid-caption">
                                                    <h4 class="grid-caption-text"><a href="/api/show?name=${data[i].name}">${data[i].name}</a></h4>
                                                </div>
                                            </figcaption>
                                        </div>
                                    </a>
                                </div>`;
                    }
                    else{
                        tab += `<div class="ranks">
                                    <a href="/api/showRank?main=false&genre=F"> 
                                        <div class="title_name">TBS Championship</div>
                                        <div class="grid-content">
                                            <div class="champion"> <img src="/images/${data[i].name}.png"> </div>
                                            <figcaption>
                                                <div class="grid-caption">
                                                    <h4 class="grid-caption-text"><a href="/api/show?name=${data[i].name}">${data[i].name}</a></h4>
                                                </div>
                                            </figcaption>
                                        </div>
                                    </a>
                                </div>`;
                    }  
                }
            }
        } else {

        }
        document.getElementById("divisions").innerHTML = tab;
    }
    request.onerror = function () {
        console.error('An error occurred fetching the JSON from ' + url);
    };

    request.send();
}
function championTag() {
    let tab = '';
    let url = '/api/championsTag';
    let request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function () {
        if (request.status === 200) {
            let data = JSON.parse(request.responseText);
            for (let i = 0; i < data.length; i++) {
                if(data[i].genre =="M"){
                        tab += `<div class="ranks">
                                    <a href="/api/showRankTag?genre=M"> 
                                        <div class="title_name">World Tag Team Championship</div>
                                        <div class="grid-content">
                                            <div class="champion"> <img src="/images/${data[i].name}.png"> </div>
                                            <figcaption>
                                                <div class="grid-caption">
                                                    <h4 class="grid-caption-text"><a href="/api/showTag?name=${data[i].name}">${data[i].name}</a></h4>
                                                </div>
                                            </figcaption>
                                        </div>
                                    </a>
                                </div>`;
                }
                else{
                        tab += `<div class="ranks">
                                    <a href="/api/showRankTag?genre=F"> 
                                        <div class="title_name">Women's Tag Team Championship</div>
                                        <div class="grid-content">
                                            <div class="champion"> <img src="/images/${data[i].name}.png"> </div>
                                            <figcaption>
                                                <div class="grid-caption">
                                                    <h4 class="grid-caption-text"><a href="/api/showTag?name=${data[i].name}">${data[i].name}</a></h4>
                                                </div>
                                            </figcaption>
                                        </div>
                                    </a>
                                </div>`;
                }
            }
        } else {
        }
        document.getElementById("divisions").innerHTML = tab;
    }
    request.onerror = function () {
        console.error('An error occurred fetching the JSON from ' + url);
    };

    request.send();
}
{/* <button><a href="/api/showRank?main=true&genre=M">Principal Masculino</a></button>
          <!-- TODO: queria o botão na esquerda da tabela -->
          <button><a href="/api/showRank?main=false&genre=M">Secundário Masculino</a></button>
          <button><a href="/api/showRank?main=true&genre=F">Principal Feminino</a></button>
          <button><a href="/api/showRank?main=false&genre=F">Secundário Feminino</a></button> */}