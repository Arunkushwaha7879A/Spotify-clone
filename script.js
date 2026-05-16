let currentsong = new Audio;


async function getsongs() {
    let a = await fetch("http://127.0.0.1:3000/music/")
    let response = await a.text()
    console.log(response)
    let div = document.createElement("div")
    div.innerHTML = response
    let as = div.getElementsByTagName("a")
    
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/music/")[1])
        }

    }

    return songs

}

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

const playMusic = (track , pause = false ) => {
    currentsong.src = "/music/" + track
   if(!pause){
    currentsong.play()
    play.src = "pause.svg"
   }
    
   
     document.querySelector(".songinfo").innerHTML=decodeURI(track)
     document.querySelector(".songtime").innerHTML="00:00 / 00:00"
}



async function main() {

    
    let songs = await getsongs()
    playMusic(songs[0], true) 

    let Songul = document.querySelector(".songlist").getElementsByTagName("ul")[0]
    for (const song of songs) {
        Songul.innerHTML = Songul.innerHTML + `<li> 
                        <img class = "invert" src="music.svg" alt="">
                        <div class="info">
                            <div>${song.replaceAll("%20", " ")}</div>
                            <div>harry</div>
                        </div>
                         <div class="playnow">
                            <span>play now</span>
                             <img class="invert" src="play.svg" alt="">
                         </div>
                    </li>`
    }

    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {

        e.addEventListener("click", element => {

            console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })
    })

    play.addEventListener("click", ()=>{
        if (currentsong.paused) {
            currentsong.play()
            play.src="pause.svg"
           
            
        }
        else {
            currentsong.pause()
            play.src = "play.svg"
        }
    })

    currentsong.addEventListener("timeupdate" , ()=>{
        console.log(currentsong.currentTime , currentsong.duration)
        document.querySelector(".songtime").innerHTML=`${secondsToMinutesSeconds(currentsong.currentTime)} /
        ${secondsToMinutesSeconds(currentsong.duration)}`

        document.querySelector(".circle").style.left=(currentsong.currentTime/currentsong.duration)*100 + "%";
    })

//     document.querySelector(".seekbar").addEventListener("click" ,  e=>{
//      document.querySelector(".circle").style.circle.left=(e.offsetX/e.target.getBoundingClientRect().width)*100
//     })
// }






// main() 