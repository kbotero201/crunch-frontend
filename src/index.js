
// FETCH

function getCereals(){
    return fetch('http://127.0.0.1:3000/api/v1/cereals/')
    .then(resp => resp.json()
    .then(data => {
        data.forEach(data => displayCereals(data))
        console.log(data)
    }))
}

function updateLikes(){

  return fetch("http://127.0.0.1:3000/api/v1/cereals/3", {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ 
    likes: 0
  })
  })
  .then(resp => resp.json())
  .then(console.log)

}

// CONST ELEMENTS

let main = document.querySelector("main")


function displayCereals(cereal){

    //CREATE ELEMENTS

    let pLikes = document.createElement("p")
    let card = document.createElement("div")
    let img = document.createElement("img")
    let h2 = document.createElement("h2")
    let pMilk = document.createElement("p")
    let pTopping = document.createElement("p")
    let pDescription = document.createElement("p")
    let button = document.createElement("button")
    let ul = document.createElement("ul")

    //EDIT ELEMENTS
    
    card.classList.add("card")
    h2.textContent = cereal.name 
    img.src = cereal.image
    pMilk.textContent = cereal.milk
    pDescription.textContent = cereal.description
    pTopping.textContent = cereal.topping
    button.textContent= "Like"
    button.classList.add("like-btn")
    pLikes.textContent = `${cereal.likes} Likes`
    pLikes.classList.add("like")
    card.dataset.id = cereal.id


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
     

    //APPEND ELEMENTS

    card.append(img, h2, pLikes, button, pDescription, pMilk, pTopping, ul, form)
    main.append(card)




}


// LIKE FEATURE 

main.addEventListener("click", function(evt){
    if(evt.target.matches(".like-btn")){
        console.log("clcked!")
        let card = evt.target.closest(".card")
        let id = card.dataset.id
        let p = card.querySelector(".like")
        let newLikes = parseInt(p.textContent) + 1

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

form = document.querySelector("form")







getCereals()



