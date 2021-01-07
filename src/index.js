
let splash = document.querySelector(".splash")
let form = document.querySelector("form")
const body = document.querySelector("body");
const overlay = document.querySelector("#overlay");
const main = document.querySelector("main")
const filter1Btn = document.querySelector(".filter1Btn")
let cereals = []

// SPLASH SCREEN

document.addEventListener('DOMContentLoaded', (evt) =>{
    burst()
    setTimeout(()=>{
        splash.classList.add("display-none")
    }, 1000)
})

// FETCH FUNCTIONS

function getCereals(){
    return fetch('http://127.0.0.1:3000/api/v1/cereals/')
    .then(resp => resp.json()
    .then(data => {
        data.forEach(cereal => {
          cereals.push(cereal)
          displayCereals(cereal)
        })
        data.forEach(data => sliderMenu(data))
        console.log(data)
    }))
}


function displayCereals(cereal){

    //CREATE ELEMENTS

    let card = document.createElement("div")
    let img = document.createElement("img")
    let popUpImg = document.createElement("img")
    let h2 = document.createElement("h2")
    let pMilk = document.createElement("p")
    let pTopping = document.createElement("p")
    let pDescription = document.createElement("p")
    let pSmallDescription = document.createElement("p")

    let div1 = document.createElement("div")
    let div2 = document.createElement("div")

    let upvoteDiv= document.createElement("div")
    let upvoteDivVotes = document.createElement("div")
    let upvoteDivButton = document.createElement("div")



    //EDIT ELEMENTS
    
    card.classList.add("card")
    h2.textContent = cereal.name 
    img.src = cereal.image
    popUpImg.src = cereal.image
    pMilk.textContent = cereal.milk
    pDescription.textContent = cereal.description
    pSmallDescription.textContent = cereal.description // <- cut the string turn it into small description
    pTopping.textContent = cereal.topping
    card.dataset.id = cereal.id

    div1.classList.add("div1")
    div2.classList.add("div2")

    upvoteDiv.classList.add("wrap")
    upvoteDivVotes.classList.add("votes")
    upvoteDivVotes.textContent = cereal.likes
    upvoteDivButton.classList.add("button")
    upvoteDivButton.textContent = "Vote this up now"

  


    //APPEND ELEMENTS

    upvoteDiv.append(upvoteDivVotes, upvoteDivButton)

    div1.append(img)
    div2.append(h2, pSmallDescription, upvoteDiv )

    card.append(div1, div2)
    main.append(card)

    img.addEventListener("click", function(evt){
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
        closeBtn.textContent = "X" 

        //Body
        let popUpBody = document.createElement("div");
        popUpBody.classList.add("popUpBody");
        popUpBody.dataset.id = cereal.id
        let ul = document.createElement("ul")

        //DISPLAY COMMENTS 
        fetch(`http://127.0.0.1:3000/api/v1/cereals/${cereal.id}`)
          .then(resp => resp.json()
          .then(data => {
              data.comments.forEach(comment =>{
                let li = createComment(comment.id, comment.text, comment.name)
                ul.append(li)
            })
          }))
        //COMMENT FORM 
        let submit = document.createElement("input")
        let inputName = document.createElement("input")
        let input = document.createElement("input")
        let form = document.createElement("form")
        let br = document.createElement("br")
        input.type = "text"
        input.placeholder = "Type Comment here.."
        input.name = "text"
        inputName.type = "text"
        inputName.placeholder = "Type your name here.."
        inputName.name = "nameText"
        submit.type = "submit"
        form.dataset.id = cereal.id
        form.classList.add("commentForm")
        form.append(inputName, input, br, submit)

          form.addEventListener("submit", (event) => {
            event.preventDefault();

            const newComment = {
              name: event.target.nameText.value,
              text: event.target.text.value,
              cereal_id: parseInt(event.target.dataset.id)
            }

            const config = {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
              },
              body: JSON.stringify(newComment)
            }

            fetch('http://127.0.0.1:3000/api/v1/comments', config)
                .then(response => response.json())
                .then(comment => {
                  let li = createComment(comment.id, comment.text, comment.name)
                  ul.append(li)
                })

            event.target.reset()

          })

        //Append
        popUpHeader.append(title, closeBtn);
        popUpBody.append(popUpImg, pDescription, pMilk, pTopping, ul,form);
        popUp.append(popUpHeader, popUpBody);
        body.append(popUp);

        // Close PopUP
        closeBtn.addEventListener("click", function(evt){
            overlay.style.opacity = "0";
            overlay.style.pointerEvents = "none";
            popUp.remove();
        })

      

    
    })


  card.addEventListener("click", function(evt){
    if(evt.target.matches(".button")){
      console.log("clcked!")
      let card = evt.target.closest(".card")
      let id = card.dataset.id
      let p = card.querySelector(".votes")
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
      p.textContent = `${data.likes}`
      console.log(data)
      })

    }
  })

    
}


// COMMENT FUNCTION

function createComment(id,text,name){
  let comment = document.createElement("li")
  comment.classList.add("comment")
  let li = document.createElement("li")
  li.textContent = name + " : " + text
  let deleteBtn = document.createElement("button")
  deleteBtn.classList.add("deleteBtn")
  deleteBtn.textContent = "X"
  // Comment Delete
  deleteBtn.addEventListener("click", function(evt){
    fetch(`http://localhost:3000/api/v1/comments/${id}`, {
      method: 'DELETE',
    })
      .then(r => r.json())
      .then(() => {
        console.log(deleteBtn.parentNode)
        deleteBtn.parentNode.remove()
      })
  })
  comment.append(li, deleteBtn)
  return comment
}

// SLIDER MENU


function sliderMenu(cereal){
    let menu = document.querySelector("#slider-menu")
    let img = document.createElement("img")
    let id = cereal.id
    img.src = cereal.image
    img.dataset.id = id 
    menu.append(img)



      //window.open('https://attacomsian.com', '_blank');

    img.addEventListener("click", function(evt){
      console.log("clicked!")

      return fetch(`http://127.0.0.1:3000/api/v1/cereals/${id}`)
      .then(resp => resp.json())
      .then(data => {
       window.open(data.ad_url, '_blank')
      })

    })

    
}

// CLEAR CARDS FROM MAIN

function clearMain(){
  while(main.childElementCount > 0){
    main.firstChild.remove()
  }
}


// FILTER 1
filter1Btn.addEventListener("click", function(event){
  clearMain()
  return fetch('http://127.0.0.1:3000/api/v1/cereals/')
    .then(resp => resp.json()
    .then(data => {
      data.forEach(cereal => {
        if(cereal.likes == 0){
          displayCereals(cereal)
        }
      })
      }))
})


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
  
  //Word Array
  words = [ "cereal"];



getCereals()