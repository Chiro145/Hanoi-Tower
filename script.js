var i_level = null,
    g_animation_delay = null,
    i_isRunning = false,
    DISK_MANAGE = [],
    w_scale = window.innerWidth / (1024 * 6),
    i_isAbort = false,
    i_fast_cal = [-1, 1, 3, 7, 15, 31, 63, 127, 255],
    i_count = 0,
    i_disk_size

/*INIT*/

const container = document.getElementById('container')

const root = document.documentElement
root.style.setProperty('--w_scale', w_scale)
root.style.setProperty('--g_pprogess', "13%")
root.style.setProperty('--g_animation_delay', "200ms")

/*FUNC*/

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function init_cor(amount){
    for ( let i = 1; i <= 8; ++i ){
        DISK_MANAGE[i].style.display = 'none'
    }
    let i_c = 0
    for ( let i = amount; i >= 1; i-- ){
        DISK_MANAGE[i].style.transition = `left 500ms ease, top 500ms ease`
        DISK_MANAGE[i].style.position = 'absolute'
        DISK_MANAGE[i].style.display = 'flex'
        DISK_MANAGE[i].style.left = '25%'
        DISK_MANAGE[i].style.top = 90 - (100 * (w_scale * 166 / window.innerHeight) * i_c) + '%'
        i_c++
    }
    console.log("INIT DONE!")
}

function swap_disk(id, source, target){
    if ( i_isAbort == true )
        return
    i_count++
    root.style.setProperty('--g_pprogess', 13 + ((i_count / i_fast_cal[i_disk_size]) * 85) + "%")
    console.log(13 + i_count / i_fast_cal[i_disk_size] * 85 + "%")
    DISK_MANAGE[id].style.transition = `left ${g_animation_delay}ms ease, top ${g_animation_delay}ms ease`
    DISK_MANAGE[id].style.left = (25 + 25 * target) + '%'
    DISK_MANAGE[id].style.top = 90 - (100 * (w_scale * 166 / window.innerHeight) * i_level[target]) + '%'
    i_level[target]++
    i_level[source]--
}

async function Abort(){
    if ( i_isRunning == false || i_isAbort == true )
        return
    i_isAbort = true 
}

async function Started(){
    if ( i_isRunning == true )
        return
    i_count = 0
    i_isRunning = true
    root.style.setProperty('--g_pprogess', "13%")
    i_disk_size = document.getElementById("I_NOD").value
    g_animation_delay = document.getElementById("I_DA").value
    root.style.setProperty('--g_animation_delay', g_animation_delay + "ms")
    i_level = [i_disk_size, 0, 0]
    init_cor(i_disk_size)
    await sleep(1000)
    i_process(i_disk_size, 0, 1, 2).then(() => {
        i_isRunning = false
        i_isAbort = false
        console.log("Done!")
    })
}

async function i_process(disk_size, source_col, temp_col, target_col) {
    if ( i_isAbort == true )
        return
    if ( disk_size == 1 ){
        swap_disk(disk_size, source_col, target_col)
        console.log("move disk", disk_size ,"from", source_col, "to", target_col, "\n")
        if ( i_isAbort == false )
            await sleep(g_animation_delay)
        return
    }
    await i_process(disk_size - 1, source_col, target_col, temp_col)
    swap_disk(disk_size, source_col, target_col)
    console.log("move disk", disk_size, "from", source_col, "to", target_col,"\n")
    if ( i_isAbort == false )
        await sleep(g_animation_delay)
    await i_process(disk_size - 1, temp_col, source_col, target_col)
}

/*LOAD TEXTURE*/

for (let i = 1; i <= 8; i++) {
    const img = document.createElement('img')
    DISK_MANAGE[i] = img
    img.src = `img/${i}.svg`
    img.id = "DISK"
    img.style.display = 'none'
    container.appendChild(img)
}

for (let i = 1; i <= 3; i++) {
    const img = document.createElement('img')
    img.src = `img/STICK.svg`
    img.id = "STICK"
    img.style.display = 'flex'
    img.style.top = (90 - (100 * (w_scale * 166 / window.innerHeight) * 1)) + '%'
    img.style.left = (25 + 25 * (i - 1)) + '%'
    container.appendChild(img)
}

console.log(window.innerWidth)

