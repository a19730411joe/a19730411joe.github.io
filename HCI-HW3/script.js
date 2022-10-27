// canvas setting

const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;


// common setting

ctx.strokeStyle = '#bada55';  // 筆觸顏色
ctx.lineJoin = 'round';  // 兩條線交匯處產生 "圓形" 邊角
ctx.lineCap = 'round';  // 筆觸預設為 "圓形"
ctx.lineWidth = 1;  // 筆頭寬度
let isDrawing = false;  // 是否允許繪製  (或說是否是 mousedown 下筆狀態)


// var init
let points = [];
let lastX = 0;
let lastY = 0;
var count = 0;
let dollar = new DollarRecognizer();
let pass = false;

// main function

canvas.addEventListener('mouseout', () => {
    isDrawing = false;
    ctx.lineWidth = 20;
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
    ctx.lineWidth = 20;
});

canvas.addEventListener('mousedown', (e) => {
    ctx.lineWidth = 20;
    ctx.clearRect(0,0,500,500);
    [lastX, lastY] = [e.offsetX, e.offsetY]; // 設定起始點
    isDrawing = true; // 允許繪製
    pass = true;

    let list = document.getElementsByClassName("button");
    
    list[0].disabled = false;
    list[1].disabled = false;
    list[2].disabled = false;

    points = [];
    count = 0;
    draw(e);
});

canvas.addEventListener('mousemove', (e)=>{
    if(count!=0){
        ctx.lineWidth = 3;
    }
    if(count<2000){
        draw(e);
    }
    else{
        isDrawing = false;
    }
});

/*========== 繪製函數；在 mousemove 的時候使用 ==========*/
function draw(e) {
    if(!isDrawing) return;  // 沒有允許繪製即退出

    /* 繪製路線 Setting */
    ctx.beginPath();  // 開始路徑 or Reset
    ctx.moveTo(lastX, lastY);  // 設定起點
    ctx.lineTo(e.offsetX, e.offsetY);  // 設定終點
    ctx.stroke();  // 依照設定開始繪製

    [lastX, lastY] = [e.offsetX, e.offsetY];  // 位置更新
    points.push(new Point(lastX,lastY));
    count++;
}


function Recognize () {
    if(!pass) return ;
    
    // Recognize
    let result = dollar.Recognize(points,true);
    console.log(result);
    alert('Name = ' + result.Name + '\nScore = ' + result.Score +'\nTime = ' + result.Time);
}
function AddGesture(){
    let index = document.getElementById('myselect').options.selectedIndex;
    let tmp_str = document.getElementById('myselect').options[index].text;
    let num = dollar.AddGesture(tmp_str,points);
    console.log(tmp_str + ' (num = ' + num + ')');
}
function DeleteUserGestures(){
    dollar.DeleteUserGestures();
    alert("user data clear!");
}
