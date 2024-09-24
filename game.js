function Cardrotate(id){
   const currenntcard = document.getElementById(id);
   currenntcard.classList.toggle("rotate-180");
}


const items = [
    { name: "rabbit", image: "./src/1.png" },
    { name: "cat", image: "./src/2.png" },
    { name: "racoon", image: "./src/3.png" },
    { name: "cow", image: "./src/4.png" },
    { name: "goat", image: "./src/5.png" },
    { name: "squril", image: "./src/6.png" },
    { name: "lion", image: "./src/7.png" },
    { name: "panda", image: "./src/8.png" },
  ];
  const temp_arr = [...items, ...items];
 

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  const shuffledArray = shuffle(temp_arr);
  const mached_cards=[];

 
  let first_card = false;
  let second_card = false;
  let count = 0;
  let total = 0;
  let first_card_id,second_card_id;
  let card1,card2;
function checkMatch(first_card_id,second_card_id){
   if(first_card_id == second_card_id){
    console.log("matched");
    mached_cards.push(first_card_id,second_card_id);
    console.log(mached_cards);
    announcements(mached_cards);
    count = 0;
   }else{
    console.log("unmatched");
    setTimeout(() => {
        card1.classList.toggle("[transform:rotateY(180deg)]");
        card2.classList.toggle("[transform:rotateY(180deg)]");
      }, 500);
      count = 0;
   }
}
  function flip_card(count,layer1){
    if(count==1){
        card1 = layer1;
        first_card = true;

        console.log(card1.id);
        layer1.classList.toggle("[transform:rotateY(180deg)]");
        first_card_id = card1.id;

    }
    if(count==2){
        card2 = layer1;
        second_card=true;
        console.log(card2.id);
        layer1.classList.toggle("[transform:rotateY(180deg)]");
        second_card_id = card2.id;
        checkMatch(first_card_id,second_card_id,card1,card2)

    }
    if(count>2){
        alert("Not Allowed");
    }
   
  }
  function announcements(mached_cards) {
    const timeDisplay = document.getElementById("time")
    if (mached_cards.length === 16) { 
        const announcement = document.createElement("div");
        announcement.innerHTML = `Congratulations! You won in ${total} moves. Time: ${timeDisplay.textContent}`; 
        announcement.className = "relative bg-white text-black shadow-lg rounded-lg px-5 py-2 mt-4 text-center flex items-center justify-center";
        const container = document.getElementById("con");
        container.append(announcement);
    }
}

window.onload= ()=>{
   const body = document.querySelector("body");
   body.className="bg-violet-300"

  


   const container = document.createElement("div");
   container.className = "flex justify-center h-screen flex-col items-center m-h-screen";
   container.id="con"
   document.body.append(container);

   const nav = document.createElement("nav");
   nav.className="bg-violet-500 text-white p-4 text-center flex gap-5 rounded-lg mb-5";
   container.append(nav);

        
   const Moves = document.createElement("h1");
   Moves.innerHTML = `Moves : 0`;
   Moves.className = "text-md";
   nav.append(Moves);

   function UpdateMoves(total){
    Moves.innerText = `Moves : ${total}`;
   
   }

   let seconds = 0;
   const timeDisplay = document.createElement("h1");
   timeDisplay.id= "time";
   timeDisplay.textContent = "Time: 00:00"; 
   nav.appendChild(timeDisplay); 
   
   seconds = 0;

function updateTimer() {
  seconds++; 
  const minutes = Math.floor(seconds / 60); 
  const remainingSeconds = seconds % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  timeDisplay.textContent = `Time: ${formattedTime}`;
  
  
  return formattedTime;
}

setInterval(() => {
  currentTime = updateTimer();
  console.log(`Current Time: ${currentTime}`); 
}, 1000);


   const maincontainer = document.createElement("div");
   maincontainer.className = "p-5 rounded-lg shadow-2xl shadow-black flex flex-col gap-5 items-center judtify-center";
   container.append(maincontainer);

   

   const cardcontainer = document.createElement("div");
   cardcontainer.className = "grid grid-cols-4 grid-rows-4 items-center justify-center gap-2";
   maincontainer.append(cardcontainer);
   const resetbtn = document.createElement("button");
   resetbtn.className = "bg-red-500 hover:bg-red rounded-lg text-white shadow-xl px-5 py-1";
   resetbtn.textContent = "RESET";
   resetbtn.addEventListener("click",()=>{
    location.reload();
   })
   maincontainer.append(resetbtn)

   for(var i=0;i<shuffledArray.length;i++){
    const card = document.createElement("div");
    card.className="h-20 w-20 group [perspective:1000px]";
    cardcontainer.append(card);
    

    const layer1 = document.createElement("div");
    layer1.className="relative h-full w-full rounded-lg bg-violet-200 shadow-xl transition-all duration-500 [transform-style:preserve-3d]"
    layer1.id=`${shuffledArray[i].name}`
    card.append(layer1);
    layer1.addEventListener("click",()=>{
        total +=1;
       UpdateMoves(total)
        if(count <= 2){
            count = count+1
        }else{
            count = 0;
        }
        flip_card(count,layer1);
    })

// front-side
    const front_side = document.createElement("div");
    front_side.className="absolute inset-0";
    layer1.append(front_side);

    const front_layer = document.createElement("div");
    front_layer.className = "h-full w-full rounded-lg text-center shadow-lg shadow-black [backface-visibility:hidden]";
    front_side.append(front_layer);

    


// back-side

    const back_side = document.createElement("div");
    back_side.className = "absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]"
    layer1.append(back_side);

    const back_img = document.createElement("img");
    back_img.src =`${shuffledArray[i].image}`;
    back_img.alt=`${shuffledArray[i].name}`
    back_img.className = "rounded-lg"
    back_side.append(back_img);
     
    
   }


   

}    


