// console.log("hello world");//return in console window
// prompt(" good night")//is used to take input with displaying the text
// alert("this is alert")//diaplay alerr on the screen
const url="https://api.dictionaryapi.dev/api/v2/entries/en/";
const result=document.getElementById("result");
const sound = document.getElementById("sound");
const btn =document.getElementById("search-btn") ;


btn.addEventListener("click" , () => {
    let inpWord =document.getElementById("inp-word").value;
    fetch(`${url}${inpWord}`)
        .then ((response) => response.json())
        .then ((data) => {
            console.log(data);
            result.innerHTML =`
            <div class="word">
                    <h3>${inpWord}</h3>
                    <button onclick="playSound()">
                        <i class="fas fa-volume-up"></i>
                    </button>
                </div>
                <div class="details">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                    <p>/${data[0].phonetic}/</p>
                </div>
                <p class="word-meaning">
                    ${data[0].meanings[0].definitions[0].definition}
                </p>
                <p class="word-example">
                    ${
                        data[0].meanings[0].definitions[0].example ||"Example Not Found😥"
                    }
                </p> `;
            sound.setAttribute("src",data[0].phonetics[0].audio);
        })
        .catch(()=>
        {
            result.innerHTML=`<h3 class = "error " > Cound not found the word😪</h3>
            `;
        })
});
function playSound()
{
    sound.play();
}

function voice()
{
    var recognition =new webkitSpeechRecognition();
    recognition.lang ="en-GB";
    recognition.onresult=function(event)
    {
        console.log(event);
        document.getElementById("inp-word").value= event.results[0][0].transcript;
    }
    recognition.start();
}