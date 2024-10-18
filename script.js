var i_level = null,
    g_animation_delay = null,
    i_isRunning = false,
    DISK_MANAGE = [],
    w_scale = window.innerWidth / (1066 * 9)

const container = document.getElementById('container')

const root = document.documentElement;
root.style.setProperty('--w_scale', w_scale);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function init_cor(amount){
    for ( let i = 1; i <= 8; ++i ){
        DISK_MANAGE[i].style.display = 'none';
    }
    let i_c = 0
    for ( let i = amount; i >= 1; i-- ){
        DISK_MANAGE[i].style.transition = `left 500ms ease, top 500ms ease`;
        DISK_MANAGE[i].style.position = 'absolute';
        DISK_MANAGE[i].style.display = 'flex';
        DISK_MANAGE[i].style.left = '25%';
        DISK_MANAGE[i].style.top = 90 - (100 * (w_scale * 166 / window.innerHeight) * i_c) + '%';
        i_c++;
    }
    console.log("INIT DONE!")
}

function swap_disk(id, source, target){
    DISK_MANAGE[id].style.transition = `left ${g_animation_delay}ms ease, top ${g_animation_delay}ms ease`;
    DISK_MANAGE[id].style.left = (25 + 25 * target) + '%';
    DISK_MANAGE[id].style.top = 90 - (100 * (w_scale * 166 / window.innerHeight) * i_level[target]) + '%';
    i_level[target]++;
    i_level[source]--;
}

async function Started(){
    if ( i_isRunning == true )
        return
    i_isRunning = true;
    let disk_size = document.getElementById("I_NOD").value;
    g_animation_delay = document.getElementById("I_DA").value;
    i_level = [disk_size, 0, 0]
    init_cor(disk_size)
    await sleep(1000)
    i_process(disk_size, 0, 1, 2).then(() => {
        i_isRunning = false;
        console.log("Done!")
    });
}

async function i_process(disk_size, source_col, temp_col, target_col) {
    if ( disk_size == 1 ){
        swap_disk(disk_size, source_col, target_col);
        console.log("move disk", disk_size ,"from", source_col, "to", target_col, "\n")
        await sleep(g_animation_delay)
        return
    }
    await i_process(disk_size - 1, source_col, target_col, temp_col);
    swap_disk(disk_size, source_col, target_col);
    console.log("move disk", disk_size, "from", source_col, "to", target_col,"\n")
    await sleep(g_animation_delay)
    await i_process(disk_size - 1, temp_col, source_col, target_col);
}

for (let i = 1; i <= 8; i++) {
    const img = document.createElement('img')
    DISK_MANAGE[i] = img;
    img.src = `img/${i}.png`
    img.id = "DISK"
    img.style.display = 'none'
    container.appendChild(img)
}

for (let i = 1; i <= 3; i++) {
    const img = document.createElement('img')
    img.src = `img/STICK.png`
    img.id = "STICK"
    img.style.display = 'flex'
    img.style.top = (85 - (100 * (w_scale * 166 / window.innerHeight) * 1)) + '%'
    img.style.left = (25 + 25 * (i - 1)) + '%'
    container.appendChild(img)
}

console.log(window.innerWidth)

