//    data
// var data = [
//     {label:'Hydroelectric power',number:2602000},
//     {label:'Thermal power',number:34639103},
//     {label:'Nuclear power',number:2887000},
//     {label:'Renewable power',number:11026797},
// ];


d3.csv('power.csv').then((dataset) => {
    //console.log(dataset);
    //console.log(data);
    //var color = ["#0080FF","#EA0000","#A6A600","#02C874"];
    var total = 51154900;

//    defination

var r1 = 120;
var r2 = 140;

var x_shift = 500;
var y_shift = 150;



var arc1 = d3.arc()
    .outerRadius(r1)
    .innerRadius(0);
var arc2 = d3.arc()
    .outerRadius(r2)
    .innerRadius(0);
var pie = d3.pie()
    .sort(null)
    .value(function(d){
        return d.number;
    })



//    code

//    svg
var svg = d3.select('#canvas')
    .append('svg')
    .attr('width',1000)
    .attr('height',700)

svg.append('text')
    .attr('class','title')
    .attr('x',x_shift-300)
    .attr('y',y_shift-50)
    .text('台灣電力供給種類及比例圖')
    .style('font-size',40)
    
//    total number
svg.append('text')
    .attr('class','total1')
    .attr('x',x_shift)
    .attr('y',y_shift+250)
    .text('Total power : ')
svg.append('text')
    .attr('class','total2')
    .attr('x',x_shift+50)
    .attr('y',y_shift+280)
    .text('51154900千瓦')

//    reset total
svg.append('text')
    .attr('class','reset')
    .attr('x',x_shift)
    .attr('y',y_shift+50)

    .text('Total')
    .on('click',function(){
        d3.selectAll('.arc')
            .attr('d',arc2)
            .attr('fill',function(d,i){
                return d.data.color;
            })
        d3.select('.total1')
            .text('Total power : ')
        d3.select('.total2')
            .text(51154900 + '千瓦')
    })
    
//    attribute
var arcs = svg.selectAll('.chart')
    .data(pie(dataset))
    .enter()
    .append('g')
    .attr('class','chart')
    
//    path
arcs.append('path')
    .attr('class','arc')
    .attr('transform','translate(300,300)')
    .attr('d',arc2)
    .attr('fill',function(d,i){
        return d.data.color;
    })
    .on('mouseover',function(d,i){
        d3.selectAll('.arc')
            .attr('d',arc1)
            .attr('fill',function(d,i){
                return d.data.color;
            })
        
        d3.select(this)
            .attr('d',arc2)
             console.log(this);            
        d3.selectAll('.total1')
            .text(i.data.label+ ' : ')
        d3.selectAll('.total2')
            .text(i.data.number + '千瓦')
    })

//    legend back
arcs.append('rect')
.attr('class','legend')
.attr('x',x_shift-20)
.attr('y',function(d,i){
    return y_shift+80+i*30;
})
.attr('rx',10)
.attr('ry',10)
.attr('width',200)
.attr('height',25)
.attr('fill','white')
.on('click',function(d,i){
    d3.select('.total1')
        .text(i.data.label + ' : ')
    d3.select('.total2')
        .text((100*(i.data.number/total)).toFixed(2) + '%')
    d3.selectAll('.arc')
        .attr('d',arc1)
        .attr('fill','grey')
    d3.selectAll('.arc').filter(function(a){
        return (i.index == a.index);
    })
        .attr('d',arc2)
        .attr('fill','#3C3C3C')
})
.on('mouseover',)

//    legend
arcs.append('text')
    .attr('class','legend')
    .attr('x',x_shift)
    .attr('y',function(d,i){
        return y_shift+100+i*30;
    })
    .attr('fill',function(d,i){
        return d.data.color;
    })
    .text(function(d,i){
        return d.data.label;
    })
    .on('click',function(d,i){
        d3.select('.total1')
            .text(i.data.label + ' : ')
        d3.select('.total2')
            .text((100*(i.data.number/total)).toFixed(2) + '%')
        d3.selectAll('.arc')
            .attr('d',arc1)
            .attr('fill','grey')
        d3.selectAll('.arc').filter(function(a){
            return (i.index == a.index);
        })
            .attr('d',arc2)
            .attr('fill','#3C3C3C')
    })

d3.selectAll('text')
    .style('font-family','sans-serif')
d3.selectAll('.title')
    .style('font-family','微軟正黑體')


})

