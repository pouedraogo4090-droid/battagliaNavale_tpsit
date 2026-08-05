const select = document.getElementById('sizes')
const turno = document.getElementById('turno')
const button = document.getElementById('play')
const tent=document.getElementById('tent')
const secondi=document.getElementById('sec')
const minuti=document.getElementById('min')

let size = 6
let grid
let found = 0
 
select.addEventListener('change', () => {
    size = parseInt(select.value, 10)
})

class Boat{
    constructor(size,axis,start,end,hits){
        size=this.size
        axis=this.axis
        start=this.start
        end=this.end
        hits=0
    }
}

function createBoats(level) {
    const grid = document.getElementsByClassName('cell')
    let boatSizes=[size-2,size-3,size-3,size-4,size-4]
    for(let i=0;i<size;i++){
        let b=new Boat()
        b.size=boatSizes[Math.floor(Math.random()*(boatSizes.length+1))]
        console.log(b.size)
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
            div.classList.add(container == document.getElementById('opponentView') ?'oppCell':'cell')
            div.style.width = `${styleSize}%`

            div.setAttribute('index', index)
            container == document.getElementById('opponentView') ? null : div.onclick = () => { shoot(div.getAttribute('index')) }
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
    createGrid(document.getElementById('grid'))
    createBoats()
    setInterval(()=>{
        let sec=parseInt(secondi.innerHTML)
        let min=parseInt(minuti.innerHTML)
        if(sec==60){
            sec=0
            min++
        }
        sec++
        secondi.innerHTML=sec<10?'0'+sec:sec
        minuti.innerHTML=min
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
    if (found === size) {
        for (let cell of grid) {
            cell.style.pointerEvents = 'none'
        }
        setTimeout(() => {
            alert('victory')
        }, 500)
    }

}








