// Obtener JSON 
let consult = () =>{ 
 return fetch("https://www.reddit.com/reddits.json")
  .then(response => response.json())
}

// Cargar contenido
let createList = () =>{
  consult()
  .then(data => {
    elements = data.data.children;
    // Contador par agregar id 
    var contador = 0;
    elements.map(element =>{  
      contador = contador + 1; 
      let title = element.data.url,
          description = element.data.description,
          img = element.data.icon_img,
          subTitle = element.data.title,
          subs = element.data.subscribers;

      // convertir Markdown a HTML
      let converter = new showdown.Converter()
      description = converter.makeHtml(description);

      // Simplificar string titulo
      title = title.substring(3);

      showElement(title, description, img, subTitle, subs, contador);
    })
    document.querySelector("#listIndex2").click();
  })
}

// Crear elementos lista 
let showElement = (title, description, img, subTitle, subs, contador) =>{
  let nameContainer = document.createElement("div");
  nameContainer.setAttribute("class", "nameContainer");
  nameContainer.setAttribute("id", "listIndex"+contador);
  nameContainer.innerHTML = title;
  nameContainer.onclick = () => showElementContent(description, img, subTitle, subs);
  nameContainer.addEventListener("click", function() {toggleBackground(contador);});
  document.querySelector(".contentTitles").appendChild(nameContainer);
}

// Crear contenido elementos
let showElementContent = (description, img, subTitle, subs) =>{
  document.querySelector(".imageReddit").src = img;
  document.querySelector(".descriptionContainer").innerHTML = "";
  document.querySelector(".descriptionContainer").innerHTML = description;
  document.querySelector(".subInfoTitle").innerHTML = subTitle;
  document.querySelector(".subInfoSubs").innerHTML = "Subs: "+ subs;
}

// Cambiar background elemento señalad0
let toggleBackground = (contador) =>{
  let elementDiv = document.querySelector("#listIndex"+contador);
  for (var i = 1; i < 26 ; i++) {
    let clearStyle = document.querySelector("#listIndex"+i);
    clearStyle.classList.remove("selectedDiv");
  }
  elementDiv.classList.add("selectedDiv");
}


createList();

