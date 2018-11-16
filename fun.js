/** SCRIPT TO GET TOOLS CONFIG */
// ajax de preenchimento do toolkits
var ajax = new XMLHttpRequest();
ajax.onload = function () {
    var tools = JSON.parse(this.responseText);
    setTools(tools);
};
ajax.open("GET", 'tools.json', true);
ajax.send();





/** SCRIPT TO GET FILTER CONFIG */
var filter_ajax = new XMLHttpRequest();
filter_ajax.onload = function () {
    var filters = JSON.parse(this.responseText);
    setFilter(filters);
};
filter_ajax.open("GET", 'filters.json', true);
filter_ajax.send();

function setFilter(obj) {
    var x = 0,
        total = obj.length,
        boxFilters = document.getElementById('toolfilters');

    for (; x < total; x++) {
        var filter = document.createElement('li'),
            tags = document.createElement('span');
       
            // tags do filtro
        tags.innerHTML = "#";
        tags.style.color = obj[x].color;
        filter.appendChild(tags);
        
        // nome do filtro
        if(obj[x].filter.toLowerCase() == 'all'){
            // starta todos os elementos visiveis;
            filter.classList.add('ativo');
        }
        filter.appendChild(document.createTextNode(obj[x].filter))
        filter.setAttribute('data-filterBy', obj[x].filter.toLowerCase());
        // ativando o onclick para o filtro
        filter.onclick = function () {
            applyFilter(this);
            removeAllClass(document.querySelectorAll('[data-filterBy]'),'ativo')
            this.classList.add('ativo');
            this.style.border='3px solid'+obj[x].color;
        }
        
        boxFilters.appendChild(filter);
    }
}



// Tool List -  here is where all the magic is happening
function setTools(obj) {
    var x = 0,
        total = obj.length,
        box = document.getElementById('toollist');

    for (; x < total; x++) {
        var tool = document.createElement('li'),
            title = document.createElement('h2'),
            boxTags = document.createElement('div'),
            resumo = document.createElement('p'),
            boxLinks = document.createElement('div'),
            repo = document.createElement('a'),
            site = document.createElement('a'),
            wedo=document.createElement('a');


        // tags
        boxTags.classList.add('boxTags');

        for (var i = 0; i < obj[x].tags.length; i++) {
            var tags = document.createElement('span');
            tags.innerHTML = '#' + obj[x].tags[i].toLowerCase();
            addClass(tags, obj[x].tags[i]);
            boxTags.appendChild(tags);
        }

        tool.setAttribute('data-filter', obj[x].tags.toString().toLowerCase())
        tool.classList.add('ativo');

        // titulos
        title.innerHTML = obj[x].titulo;

        // resumo
        resumo.innerHTML = obj[x].resumo;

        //repo
        repo.href = obj[x].repositorio;
        repo.target='_blank';
        repo.classList.add('repo');
        repo.setAttribute('data-try', obj[x].titulo.split(' ')[0]);
        boxLinks.appendChild(repo)

        //site
        site.href = obj[x].site;
        site.target='_blank';
        site.classList.add('site');
        boxLinks.appendChild(site);
        boxLinks.appendChild(wedo);

        // enviar interesse
        wedo.innerHTML=' 🖐 We it do for your';
        wedo.classList.add('link');
        wedo.setAttribute('data-toolName',obj[x].titulo);
        wedo.onclick = function () {
            sendInterest(this);            
        }

        boxLinks.classList.add('boxLinks');
    
        tool.appendChild(boxTags);
        tool.appendChild(title);
        tool.appendChild(resumo);
        tool.appendChild(boxLinks);


        box.appendChild(tool);
    }
}


// funcoes usada por todo o codigo

//remove espacos em brancos do texto, transforma-o em classe e adicionao à um elemento
function addClass(obj, classe,all=false) {
    var newClass = classe.replace(/\s/, "");
    if(all){
       var total=obj.length,x=0;
        for(x;x<total;x++ ){
            addClass(obj[x],'ativo');
        }    
    }else{
        obj.classList.add(newClass);
    }
};
// remove todas as classes
function removeAllClass(obj, classe) {
    var total=obj.length,x=0,
    newClass = classe.replace(/\s/, "");
    for(x;x<total;x++ ){
        obj[x].classList.remove(newClass);
    }    
};


//aplica os filtros
function applyFilter(obj) {
    removeAllClass(document.querySelectorAll('[data-filter]'),'ativo');
    var choice=obj.getAttribute('data-filterBy');
    if(choice == 'all'){
        addClass(document.querySelectorAll('[data-filter]'),'ativo',true)
    }else{
        var elem = document.querySelectorAll('[data-filter*="' + choice + '"]');
        addClass(elem,'ativo',true)
    }
}

function sendInterest(obj){
    var modal= document.querySelector('.modal'),
        inputTool=document.getElementById('tool');
    
    inputTool.setAttribute('value',obj.getAttribute('data-toolName'));
    modal.classList.add('ativo');
}

