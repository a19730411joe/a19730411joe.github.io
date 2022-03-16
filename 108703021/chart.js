

var Val = [746675,745758,719681,618436,320360,217657,94641,93229,88669,73606]
var Name = 
[
'Counter-Strike: Global Offensive',
'ELDEN RING',
'Lost Ark',
'Dota 2',
'PUBG: BATTLEGROUNDS',
'Apex Legends',
'Destiny 2',
'Rust',
'Grand Theft Auto V',
'NARAKA: BLADEPOINT',
]



var interval = 50  //不重要 會被覆蓋
var bar_width = 500
var bar_height = 20




//    起始點
var x_basic = 200
var y_basic = 120

//    畫框大小
var x_final = 800
var y_final = 500

//    建立畫布
let Svg = d3.select('#canvas')
    .append('svg')
    .style('height',y_final+2*y_basic)
    .style('width',x_final+2*x_basic)


//    比例縮放器
let xScale = d3.scaleLinear()
.domain([0, d3.max(Val)])
.range([0,x_final])

let yScale = d3.scaleLinear()
.domain([0,Val.length])
.range([0,y_final])

let Rects = Svg.selectAll("rect")
    .data(Val)
    .enter()
    .append("rect")
    .style("fill",'#69a3b2')
        
Rects.attr("x",x_basic)
    .attr("y", (d, i) => y_basic+yScale(i))
    .attr('width',(d,i) => xScale(d))
    .attr('height',bar_height)

//    座標軸



let xAxis = d3.axisBottom(xScale)
    .tickPadding(10)
    .tickSizeOuter(0)
    
let yAxis = d3.axisLeft(yScale)
    .tickFormat(function(d,i){
        if(i!=10){
            return Name[i];
        }
    })


  
Svg.append('g').attr('class', 'axis')

    .attr('transform', 'translate(200,120)') 
    .call(yAxis)
    


Svg.append('g').attr('class', 'axis')
    .attr('transform', 'translate(200,620)')
    .call(xAxis)


var text = Svg.selectAll('mytext')
.data(Val)
.enter()
.append('text')
.attr('x',(d,i)=>xScale(d)+x_basic)
.attr('y',(d,i)=>yScale(i)+y_basic)
.text((d,i)=>d)
.style('fill','#e6550d')


Svg.append('g').attr('class','axistitle')
.append('text')
.attr('text-anchor','end')
.attr("y",90)
.attr("x",180)
.text("Game Name")
Svg.append('g').attr('class','axistitle')
.append('text')
.attr('text-anchor','end')
.attr("y",650)
.attr("x",1125)
.text("People Number")
