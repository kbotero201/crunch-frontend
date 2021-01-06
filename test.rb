//CSS
#slider-menu {
    display: flex;
    overflow-x: auto;
    margin: 1rem 0;
    max-width: calc(100vw - 2rem);
  }
  
  #slider-menu img {
    flex: 0 1 auto;
    height: 150px;
    margin-right: 0.5rem;
    cursor: pointer;
  }
  
  #slider-menu img:last-child {
    margin-right: 0;
  }
  

  //

  function sliderMenu(cereal){
    let menu = document.querySelector("#slider-menu")
    let img = document.createElement("img")
    let id = cereal.id
    img.src = cereal.image
    menu.append(img)
}





<h3> You may also like: </h3>

      <div id="slider-menu">
        
      </div>