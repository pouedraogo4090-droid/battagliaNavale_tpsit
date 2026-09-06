const select = document.getElementById('sizes')
const turno = document.getElementById('turno')
const button = document.getElementById('play')
const tent=document.getElementById('tent')
const secondi=document.getElementById('sec')
const minuti=document.getElementById('min')

let size = 6
let grid
let found = 0
 
let totCells = 0
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
    boats=[]
    let vertical=true
    totCells=0
    
    for(let b of getBoatSizes(size)){
        let placed=false
        while(!placed){
            vertical=Math.random()<0.5
            let start
            let row
            let col
            if(vertical){
                row=Math.floor(Math.random()*(size-b+1))
                col=Math.floor(Math.random()*(size))
                start=row*size+col
            }else{
                row=Math.floor(Math.random()*(size))
                col=Math.floor(Math.random()*(size-b+1))
                start=row*size+col
            }
            let occup=false
            for(let i=0;i<b;i++){
                let pos=vertical?start+(i*size):start+i
                if(grid[pos].hasAttribute('boat')){
                    occup=true
                    break
                }
            }
            if(!occup){
                let currentBoat=[]
                for(let i=0;i<b;i++){
                    let pos=vertical?start+(i*size):start+i
                    grid[pos].setAttribute('boat',true)
                    currentBoat.push(pos)
                }
                boats.push(currentBoat)
                totCells+=b
                placed=true
            }
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
    setTimeout(()=>{
        if (grid[pos].hasAttribute('boat')) {
            grid[pos].innerText = '⛴️'
            found++
        }else{
            grid[pos].innerText = '🌊'
        }
        grid[pos].setAttribute('disabled',true)
        tent.innerHTML=parseInt(tent.innerHTML)+1
        if (grid[pos].hasAttribute('boat')) {
            for (let boat of boats) {
                if (boat.includes(parseInt(pos, 10))) {
                    if (boat.every(p => grid[p].hasAttribute('disabled'))) {
                        setTimeout(() => {
                            alert('Barca affondata!')
                        }, 100)
                    }
                }
            }
        }
        if (found === totCells) {
            for (let cell of grid) {
                cell.style.pointerEvents = 'none'
            }
            setTimeout(() => {
                alert('victory')
            }, 500)
        }
    },320)
}








