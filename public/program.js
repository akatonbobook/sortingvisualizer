let array;
let c;

let sorting = false;

window.onload = init;

function updateCal(initialize){
    var cal = document.getElementById("cal");
    if(initialize){
        cal.innerText = "0";
    }
    else{
        var n = 0 + cal.innerText;
        n++;
        cal.innerText = n;
    }
}

const wait = (msec) => {
    return new Promise(resolve => {
        setTimeout(resolve, msec);
    });
};

function normalize() {
    c.width = c.clientWidth;
    c.height = c.clientHeight;
}


async function bar(n, v, f) {
    ctx = c.getContext('2d');
    if(f){
        ctx.fillStyle = "#00ffff";
    }
    else{
        ctx.fillStyle = "#00CCFF";
    }
    ctx.clearRect(Math.ceil(n*c.width/array.length), 0, Math.ceil(c.width/array.length), c.height);
    ctx.fillRect(Math.ceil(n*c.width/array.length), (array.length-v)*c.height/array.length, Math.ceil(c.width/array.length), v*c.height/array.length);
    if(f){
        await wait(1);
        bar(n, v, false);
    }
}

async function swap(a1, i, a2, j){
    var tmp = a1[i];
    a1[i] = a2[j];
    a2[j] = tmp;
    updateCal(false);
    if (a1 == array){
        await bar(i, a1[i], true);
    }
    else{
        await wait(1);
    }
    if (a2 == array){
        await bar(j, a2[j], true);
    }
    else{
        await wait(1);
    }
}

function onShuffle(){
    array = [...Array(Number(document.getElementById("num").value)).keys()].map(i => i+1);

    for(var i = array.length - 1; i > 0; i--){
        var r = Math.floor(Math.random() * (i + 1));
        var tmp = array[i];
        array[i] = array[r];
        array[r] = tmp;
    }
    normalize();

    array.forEach((v, i) => {
        bar(i, v, false);
    });
}

async function bubbleSort(arr){
    try{
        var n = arr.length;
        for(var i = 0; i < n-1; i++){
            for(var j = n-1; j>i; j--){
                if(!sorting) throw new Error();
                if(arr[j-1]>arr[j]){
                    await swap(arr, j-1, arr, j);
                }
            }
        }
    }
    catch(e){ }

    var btn = document.getElementById("bubble");
    btn.value = "BubbleSort";
    var btns = document.getElementsByTagName('input');
    for(var j = 0; j < btns.length; j++){
        if(btns.item(j).id != btn.id){
            btns.item(j).disabled = false;
        }
    }
    sorting = false;
}

async function mergeSort(arr, l, r){
    if(!sorting) throw new Error();
    var n = r-l;
    if(n <= 1) return;
    var m = Math.floor((l+r)/2);
    await mergeSort(arr, l, m);
    await mergeSort(arr, m, r);
    await merge(arr, l, m, r);
}

async function merge(arr, l, m, r){
    if(!sorting) throw new Error();
    var lp = 0;
    var rp = 0;
    var L = arr.slice(l, m);
    var R = arr.slice(m, r);
    console.log([l, m, r, L, R]);
    
    for(var i = l; i < r; i++){
        if(!sorting) throw new Error();
        if(lp > L.length - 1){
            await swap(arr, i, R, rp);
            rp++;
        }
        else if(rp > R.length - 1){
            await swap(arr, i, L, lp);
            lp++;
        }
        else if(L[lp] < R[rp]){
            await swap(arr, i, L, lp);
            lp++;
        }
        else{
            await swap(arr, i, R, rp);
            rp++;
        }
    }
}

async function onMergeSort(){
    try{
        await mergeSort(array, 0, array.length);
    }
    catch(e){}
    
    var btn = document.getElementById("merge");
    btn.value = "MergeSort";
    var btns = document.getElementsByTagName('input');
    for(var j = 0; j < btns.length; j++){
        if(btns.item(j).id != btn.id){
            btns.item(j).disabled = false;
        }
    }
    sorting = false;
}

async function insert(arr, i){
    if(!sorting) throw new Error();
    var p = Math.floor((i - 1)/2);
    if(i == 0) return;
    else if(arr[p] >= arr[i]) return;
    else{
        await swap(arr, p, arr, i);
        await insert(arr, p);
    }
}

async function deleteMax(arr, n){
    var p = 0;
    var c;
    if (2*p+1 > n-1) c = n;
    else if (2*p+1 == n-1) c = 2*p+1;
    else if (arr[2*p+1] > arr[2*p+2]) c = 2*p+1;
    else c = 2*p+2;

    while(c < n && arr[c] > arr[p]){
        if(!sorting) throw new Error();
        await swap(arr, p, arr, c);
        p = c;
        if (2*p+1 > n-1) c = n;
        else if (2*p+1 == n-1) c = 2*p+1;
        else if (arr[2*p+1] > arr[2*p+2]) c = 2*p+1;
        else c = 2*p+2;
    }
}

async function heapSort(arr){
    try{
        for(var i = 0; i < arr.length; i++){
            if(!sorting) throw new Error();
            await insert(arr, i);
        }
    
        for(var i = arr.length - 1; i > 0; i--){
            if(!sorting) throw new Error();
            await swap(arr, 0, arr, i);
            await deleteMax(arr, i);
        }
    }
    catch(e){ }

    var btn = document.getElementById("heap");
    btn.value = "HeapSort";
    var btns = document.getElementsByTagName('input');
    for(var j = 0; j < btns.length; j++){
        if(btns.item(j).id != btn.id){
            btns.item(j).disabled = false;
        }
    }
    sorting = false;
}

function verifySorted(arr, i, j){
    if(j-i+1<2) return true;
    for(var k = i; k <= j; k++){
        if(!sorting) throw new Error();
        if(arr[i] != arr[k]) return false;
    }
    return true;
}

function pivot(arr, i, j){
    var l = i + 1;
    while(l < j && arr[l] == arr[i]){
        if(!sorting) throw new Error();
        l++;
    }
    if(arr[l] > arr[i]) return arr[l];
    else return arr[i];
}

async function partition(arr, p, i, j){
    var l = i;
    var r = j;
    while(l <= r){
        if(!sorting) throw new Error();
        while(arr[l] < p) l++;
        while(arr[r] >= p) r--;
        if(l <= r){
            await swap(arr, l, arr, r);
            l++;
            r--;
        }
    }
    return r;
}

async function quickSort(arr, i, j){
    if(verifySorted(arr, i, j)) return;

    var p = pivot(arr, i, j);
    var c = await partition(arr, p, i, j);

    await quickSort(arr, i, c);
    await quickSort(arr, c+1, j);
}

async function onQuickSort(){
    try{
        await quickSort(array, 0, array.length - 1);
    }
    catch(e){ }

    var btn = document.getElementById("quick");
    btn.value = "QuickSort";
    var btns = document.getElementsByTagName('input');
    for(var j = 0; j < btns.length; j++){
        if(btns.item(j).id != btn.id){
            btns.item(j).disabled = false;
        }
    }
    sorting = false;
}

function init(){
    sorting = false;
    c = document.getElementById("array_view");
    onShuffle();

    document.getElementById("num").addEventListener('input', e => {
        onShuffle();
    });

    var sortbtns = document.getElementsByClassName("sort");

    for(var i = 0; i < sortbtns.length; i++){
        sortbtns.item(i).addEventListener('click', e => {
            var btn = document.getElementById(e.target.id);
            var btns = document.getElementsByTagName('input');
            if(!sorting){
                sorting = true;
                updateCal(true);
                btn.value = "Stop";
                for(var j = 0; j < btns.length; j++){
                    if(btns.item(j).id != btn.id){
                        btns.item(j).disabled = true;
                    }
                }
                switch (e.target.id){
                    case 'bubble':
                        bubbleSort(array);
                        break;
                    case 'merge':
                        onMergeSort();
                        break;
                    case 'heap':
                        heapSort(array);
                        break;
                    case 'quick':
                        onQuickSort();
                        break;
                }
            }
            else{
                sorting = false;
                switch (e.target.id){
                    case 'bubble':
                        btn.value = "BubbleSort";
                        break;
                    case 'merge':
                        btn.value = "MergeSort";
                        break;
                    case 'heap':
                        btn.value = "HeapSort";
                        break;
                    case 'quick':
                        btn.value = "QuickSort";
                        break;
                }
                for(var j = 0; j < btns.length; j++){
                    if(btns.item(j).id != btn.id){
                        btns.item(j).disabled = false;
                    }
                }
            }
        });
    }

}    
