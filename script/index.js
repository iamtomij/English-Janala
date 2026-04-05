
const createElement = (arr) => {
   const htmlElements = arr.map(el => `<span class="btn">${el}</span>`)
   return htmlElements.join("")
}


function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const manageSpinner = (status) => {
   if (status == true) {
      document.getElementById("spinner").classList.remove("hidden")
      document.getElementById("word-container").classList.add("hidden")
   } else {
      document.getElementById("word-container").classList.remove("hidden")
      document.getElementById("spinner").classList.add("hidden")
   }
}

const loadLesson = () => {
   fetch("https://openapi.programming-hero.com/api/levels/all") //promise of response

      .then(res => res.json()) //promise of  json data
      // .then((json) => console.log(json.data))
      .then((json) => displayLesson(json.data))
};

const removedActive = () => {
   const lessonButton = document.querySelectorAll(".lesson-btn")
   lessonButton.forEach(btn => btn.classList.remove("active"))
}

const loadLevelWord = (id) => {
   manageSpinner(true)
   // console.log(id)
   const url = `https://openapi.programming-hero.com/api/level/${id}`
   fetch(url)
      .then((res) => res.json())
      .then((data) => {
         removedActive() //remove all active class from all button

         const clickBtn = document.getElementById(`lesson-btn-${id}`)
         clickBtn.classList.add("active")
         displayLevelWord(data.data)
      })
}

/**
{
    "word": "Eager",
    "meaning": "আগ্রহী",
    "pronunciation": "ইগার",
    "level": 1,
    "sentence": "The kids were eager to open their gifts.",
    "points": 1,
    "partsOfSpeech": "adjective",
    "synonyms": [
        "enthusiastic",
        "excited",
        "keen"
    ],
    "id": 5
}
*/


const loadWordDetail = async (id) => {
   const url = `https://openapi.programming-hero.com/api/word/${id}`
   const res = await fetch(url)
   const details = await res.json()
   displayWordDetails(details.data)
}

const displayWordDetails = (word) => {
   console.log(word)
   const detailsBox = document.getElementById("details-container");
   detailsBox.innerHTML = `
   <div class="">
         <h2 class="text-[36px] font-semibold">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2>
      </div>
      <div class="">
        <h2 class="font-semibold text-[24px]">Meaning</h2>
        <p class="font-bangla">${word.meaning}</p>
      </div>
      <div class="">
         <h2 class="font-semibold text-[24px]">Example</h2>
         <p>${word.sentence}</p>
      </div>
      <div class="space-x-4 space-y-3">
         <h2 class="font-semibold text-[24px]">Synonyms</h2>
         <div class"">${createElement(word.synonyms)}</div>
      </div>
   `
   document.getElementById("word_modal").showModal()
}

const displayLevelWord = (words) => {
   const wordContainer = document.getElementById("word-container");
   wordContainer.innerHTML = "";

   if (words.length === 0) {
      wordContainer.innerHTML = `
      <div class="text-center col-span-full space-y-3 font-bangla">
         <img class="mx-auto" src="./assets/alert-error.png" alt="" >
            <p class="font-normal text-[#79716B] text-[13px]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h3 class="text-[34px] font-medium">নেক্সট Lesson এ যান</h3>
         </div>
      `
      manageSpinner(false)
      return
   }

   /**
   "id": 4,
   "level": 5,
   "word": "Diligent",
   "meaning": "পরিশ্রমী",
   "pronunciation": "ডিলিজেন্ট"
   */


   words.forEach(words => {
      console.log(words)
      const card = document.createElement("div");
      card.innerHTML = `
               <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="text-[32px] font-bold">${words.word ? words.word : "শব্দ পাওয়া যায়নি"}</h2>
            <p class="font-medium text-[20px] ">Meaning /Pronounciation</p>
            <div class="text-[32px] font-semibold text-[#18181B] font-bangla">"${words.meaning ? words.meaning : "অর্থ পাওয়া যায়নি"} / ${words.pronunciation ? words.pronunciation : "pronunciation পাওয়া যায়নি"}"</div>
            <div class="flex justify-between items-center">
               <button onclick="loadWordDetail(${words.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"> 
                  <i class="fa-solid fa-circle-info"></i>
               </button>
               <button onClick="pronounceWord('${words.word}')" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
                  <i class="fa-solid fa-volume-high"></i>
               </button>
            </div>
         </div>
      `
      wordContainer.append(card)
   })
   manageSpinner(false)
}

const displayLesson = (lessons) => {
   //1. get the container & empty
   const levelContainer = document.getElementById("level-container");
   levelContainer.innerHTML = "";

   //2. get into every lesson 
   for (let lesson of lessons) {

      //3. create element
      const btnDiv = document.createElement("div")
      btnDiv.innerHTML = `
      <button id="lesson-btn-${lesson.level_no}" onClick=loadLevelWord(${lesson.level_no}) class="btn btn-outline btn-primary lesson-btn">
      <i class="fa-solid fa-book-open"></i> lesson - ${lesson.level_no} </button>
    `
      //4. append to the containe
      levelContainer.append(btnDiv)

   }
}
loadLesson()

document.getElementById("btn-search").addEventListener("click", () => {
   removedActive()
   const input = document.getElementById("input-search")
   const searchValue = input.value
   console.log(searchValue
   )

   fetch("https://openapi.programming-hero.com/api/words/all")
      .then(res => res.json())
      .then(data => {
         const allWords = data.data
         console.log(allWords)
         const filterWords = allWords.filter(words => words.word.toLowerCase().includes(searchValue.toLowerCase()))
         console.log(filterWords)
         displayLevelWord(filterWords)
      })
})
