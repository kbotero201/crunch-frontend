
let splash = document.querySelector(".splash")

document.addEventListener('DOMContentLoaded', (evt) =>{
    burst()
    setTimeout(()=>{
        splash.classList.add("display-none")
    }, 4000)
})

// FETCH

function getCereals(){
    return fetch('http://127.0.0.1:3000/api/v1/cereals/')
    .then(resp => resp.json()
    .then(data => {
        data.forEach(data => displayCereals(data))
        data.forEach(data => sliderMenu(data))
        console.log(data)
    }))
}

// CONST ELEMENTS

const body = document.querySelector("body");
const overlay = document.querySelector("#overlay");
const main = document.querySelector("main")


function displayCereals(cereal){

    //CREATE ELEMENTS

    let pLikes = document.createElement("p")
    let card = document.createElement("div")
    let img = document.createElement("img")
    let popUpImg = document.createElement("img")
    let h2 = document.createElement("h2")
    let pMilk = document.createElement("p")
    let pTopping = document.createElement("p")
    let pDescription = document.createElement("p")
    let pSmallDescription = document.createElement("p")
    let button = document.createElement("button")
    let ul = document.createElement("ul")

    //EDIT ELEMENTS
    
    card.classList.add("card")
    h2.textContent = cereal.name 
    img.src = cereal.image
    popUpImg.src = cereal.image
    pMilk.textContent = cereal.milk
    pDescription.textContent = cereal.description
    pSmallDescription.textContent = cereal.description // <- cut the string turn it into small description
    pTopping.textContent = cereal.topping
    button.textContent= "Like"
    button.classList.add("like-btn")
    pLikes.textContent = `${cereal.likes} Likes`
    pLikes.classList.add("like")
    card.dataset.id = cereal.id
    


    
     

    //APPEND ELEMENTS

    card.append(img, h2, pSmallDescription)
    main.append(card)

    card.addEventListener("click", function(evt){
        // POP UP

        overlay.style.opacity = "1";
        overlay.style.pointerEvents = "all";
        let popUp = document.createElement("div");
        popUp.classList.add("popUp");

        //Header
        let popUpHeader = document.createElement("div");
        popUpHeader.classList.add("popUpHeader");
        let title = document.createElement("div");
        title.classList.add("title");
        title.textContent = h2.textContent;
        let closeBtn = document.createElement("button");
        closeBtn.classList.add("closeBtn");
        closeBtn.textContent = "X" // &times; <- make it into a symbol

        //Body
        let popUpBody = document.createElement("div");
        popUpBody.classList.add("popUpBody");
        popUpBody.dataset.id = cereal.id

        //DISPLAY COMMENTS 
        cereal.comments.forEach(comment =>{
            let li = document.createElement("li")
            li.textContent = comment.text
            ul.append(li)
        } )

        //COMMENT FORM 
        let submit = document.createElement("input")
        let input = document.createElement("input")
        let form = document.createElement("form")
        let br = document.createElement("br")
        input.type = "text"
        input.placeholder = "Type Comment here.."
        input.name = "text"
        submit.type = "submit"
        form.append(input,br, submit)

        //Append
        popUpHeader.append(title, closeBtn);
        popUpBody.append(popUpImg, pDescription, pMilk, pTopping, pLikes, button, ul,form);
        popUp.append(popUpHeader, popUpBody);
        body.append(popUp);

        closeBtn.addEventListener("click", function(evt){
            overlay.style.opacity = "0";
            overlay.style.pointerEvents = "none";
            popUp.remove();
        })

        button.addEventListener("click", function(evt){
        })

        // LIKE FEATURE 

        popUpBody.addEventListener("click", function(evt){
            if(evt.target.matches(".like-btn")){
                console.log("clcked!")
                let card = evt.target.closest(".popUpBody")
                let id = popUpBody.dataset.id
                let p = card.querySelector(".like")
                let newLikes = parseInt(p.textContent) + 1

                console.log("clicked")
        
            return fetch(`http://127.0.0.1:3000/api/v1/cereals/${id}`, {
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json"
            },
                body: JSON.stringify({
                    likes: newLikes
                }),
            })
            .then(response => response.json())
            .then(data => {
                p.textContent = `${data.likes} Likes`
                console.log(data)
            })
        
            }
        })
    
    })

    
}






function sliderMenu(cereal){
    let menu = document.querySelector("#slider-menu")
    let img = document.createElement("img")
    let id = cereal.id
    img.src = cereal.image
    menu.append(img)
}

form = document.querySelector("form")



// BURST WELCOME SCREEN 

function burst() {
    var canvas = document.querySelector(".splash");
    var ctx = canvas.getContext("2d");
    // Utilities
    function randomColor() {
      return '#' + Math.random().toString(16).slice(2, 8);
    }
    
    function randomWord() {
    var word = words[Math.floor(Math.random() * words.length)];
    return word;
  }
    
    function randomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    //Make the canvas occupy the full page
    var W = window.innerWidth,
      H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
    var particles = [];
    var mouse = {};
    //Lets create some particles now
    var particle_count = 100;
    for (var i = 0; i < particle_count; i++) {
      particles.push(new particle());
    }
    canvas.addEventListener('mousedown', track_mouse, false);
    canvas.addEventListener('touch', track_mouse, false);
  
    function track_mouse(e) {
      mouse.x = e.pageX;
      mouse.y = e.pageY;
  
      for (var i = 0; i < particle_count; i++) {
        particles.push(new particle());
      }
    }
  
    function particle() {
      //speed, life, location, life, colors
      //speed range = -2.5 to 2.5
      this.speed = {
        x: -2.5 + Math.random() * 5,
        y: -2.5 + Math.random() * 5
      };
      //location = center of the screen
      if (mouse.x && mouse.y) {
        this.location = {
          x: mouse.x,
          y: mouse.y
        };
      } else {
        this.location = {
          x: W / 2,
          y: H / 2
        };
      }
      this.color = randomColor()
  
      this.font = {
        size: randomInt(3, 15)
      }
      
      this.word = randomWord()
    }
  
    function draw() {
      ctx.globalCompositeOperation = "source-over";
      //Painting the canvas
      ctx.fillStyle = "#5c00ee";
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        ctx.beginPath();
        ctx.font = p.font.size + "vh Luckiest Guy";
        ctx.textAlign = "center";
        ctx.transition = "all 2s ease";
        ctx.fillStyle = p.color;
        ctx.fillText(p.word, p.location.x, p.location.y);
        ctx.fill();
        ctx.stroke();
  
        //move the particles
        p.location.x += p.speed.x;
        p.location.y += p.speed.y;
        
        p.speed.x += randomInt(-0.01, 0.01);
        p.speed.y += randomInt(-0.01, 0.01);
        
      }
    }
    setInterval(draw, 10);

  };
  
  // Big Word Array
  words = [ "cereal"];

getCereals()

