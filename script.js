const select = document.getElementById('sizes')
const turno = document.getElementById('turno')
const button = document.getElementById('play')
const tent=document.getElementById('tent')
const secondi=document.getElementById('sec')
const minuti=document.getElementById('min')

let size = 6
let grid
let found = 0
 
let totalBoatCells = 0
let boats = []

select.addEventListener('change', () => {
    size = parseInt(select.value, 10)
})


function getBoatSizes(level) {
    const boatSizes = {
        6: [4, 3, 2, 2],
        7: [4, 3, 3, 2, 2],
        8: [5, 4, 3, 3, 2]
    }

    return boatSizes[level]
}

function createBoats(){
    grid=document.getElementsByClassName('cell')
    let boats=[]
    let vertical=true
    
    for(let b of getBoatSizes(size)){
        let start
        if(vertical){
            let row=Math.floor(Math.random()*(size))
        }else{
            let row=Math.floor(Math.random()*(size))
        }
    }
    
}

function createGrid(container) {
    let styleSize = 100
    let index = 0
    for (let i = 0; i < size; i++) {
        let r = document.createElement('div')
        r.classList.add('row')
        r.style.height = `${styleSize / size}%`
        for (let j = 0; j < size; j++) {
            let div = document.createElement('div')
            div.classList.add('cell')
            div.style.width = `${styleSize}%`

            div.setAttribute('index', index)
            div.onclick = () => { shoot(div.getAttribute('index')) }
            r.appendChild(div)
            index++
        }
        container.appendChild(r)
    }
}
 
function play() {
    document.getElementById('scelta').style.display = 'none'
    turno.innerHTML = 'clicca una cella!'
    button.disabled = true
    found = 0
    createGrid(document.getElementById('grid'))
    createBoats(size)
    setInterval(()=>{
        let sec=parseInt(secondi.innerHTML)
        let min=parseInt(minuti.innerHTML)
        sec++
        if(sec==60){
            sec=0
            min++
        }
        secondi.innerHTML=sec<10?'0'+sec:sec
        minuti.innerHTML=min<10?'0'+min:min
    },1000)
}

const shoot = (pos) => {
    const grid = document.getElementsByClassName('cell')
    if((grid)[pos].hasAttribute('disabled'))return
    if (grid[pos].hasAttribute('boat')) {
        grid[pos].innerText = '⛴️'
        found++
    }else{
        grid[pos].innerText = '❌'
    }
    grid[pos].setAttribute('disabled',true)
    tent.innerHTML=parseInt(tent.innerHTML)+1
    if (found === totalBoatCells) {
        for (let cell of grid) {
            cell.style.pointerEvents = 'none'
        }
        setTimeout(() => {
            alert('victory')
        }, 500)
    }
}








