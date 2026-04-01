const loadLesson = () => {
   fetch("https://openapi.programming-hero.com/api/levels/all") //promise of response

      .then(res => res.json()) //promise of  json data
      // .then((json) => console.log(json.data))
      .then((json) => displayLesson(json.data))
};

const loadLevelWord = (id) => {
   // console.log(id)
   const url = `https://openapi.programming-hero.com/api/level/${id}`
   fetch(url)
      .then((res) => res.json())
      .then((data) => displayLevelWord(data.data))
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
            <h2 class="text-[32px] font-bold">${words.word ? words.word:"শব্দ পাওয়া যায়নি"}</h2>
            <p class="font-medium text-[20px] ">Meaning /Pronounciation</p>
            <div class="text-[32px] font-semibold text-[#18181B] font-bangla">"${words.meaning ? words.meaning:"অর্থ পাওয়া যায়নি"} / ${words.pronunciation? words.pronunciation:"pronunciation পাওয়া যায়নি"}"</div>
            <div class="flex justify-between items-center">
               <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"> 
                  <i class="fa-solid fa-circle-info"></i>
               </button>
               <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
                  <i class="fa-solid fa-volume-high"></i>
               </button>
            </div>
         </div>
      `
      wordContainer.append(card)
   })
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
      <button onClick=loadLevelWord(${lesson.level_no}) class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i> lesson - ${lesson.level_no} </button>
    `
      //4. append to the container}
      levelContainer.append(btnDiv)

   }
}
loadLesson()