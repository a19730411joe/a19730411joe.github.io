var palette = ["#fff7ec","#fff7eb","#fff6ea","#fff6e9","#fff5e7","#fff5e6","#fff4e5","#fff4e4",
"#fff3e3","#fff3e2","#fff2e1","#fff2e0","#fff1de","#fff1dd","#fff0dc","#fff0db","#feefda","#feefd9",
"#feeed7","#feeed6","#feedd5","#feedd4","#feecd3","#feecd2","#feebd0","#feebcf","#feeace","#feeacd",
"#fee9cc","#fee9ca","#fee8c9","#fee8c8","#fee7c7","#fee7c6","#fee6c4","#fee5c3","#fee5c2","#fee4c1",
"#fee4bf","#fee3be","#fee3bd","#fee2bc","#fee1ba","#fee1b9","#fee0b8","#fee0b7","#fedfb5","#fedeb4",
"#fedeb3","#fdddb2","#fddcb1","#fddcaf","#fddbae","#fddaad","#fddaac","#fdd9ab","#fdd8a9","#fdd8a8",
"#fdd7a7","#fdd6a6","#fdd6a5","#fdd5a4","#fdd4a3","#fdd4a1","#fdd3a0","#fdd29f","#fdd29e","#fdd19d",
"#fdd09c","#fdcf9b","#fdcf9a","#fdce99","#fdcd98","#fdcc97","#fdcc96","#fdcb95","#fdca94","#fdc994",
"#fdc893","#fdc892","#fdc791","#fdc690","#fdc58f","#fdc48e","#fdc38d","#fdc28c","#fdc18b","#fdc08a",
"#fdbf89","#fdbe88","#fdbd87","#fdbc86","#fdbb85","#fdba84","#fdb983","#fdb882","#fdb781","#fdb680",
"#fdb57f","#fdb47d","#fdb27c","#fdb17b","#fdb07a","#fdaf79","#fdae78","#fdac76","#fdab75","#fdaa74",
"#fca873","#fca772","#fca671","#fca46f","#fca36e","#fca26d","#fca06c","#fc9f6b","#fc9e6a","#fc9c68",
"#fc9b67","#fb9a66","#fb9865","#fb9764","#fb9563","#fb9462","#fb9361","#fb9160","#fa905f","#fa8f5e",
"#fa8d5d","#fa8c5c","#f98b5b","#f9895a","#f98859","#f98759","#f88558","#f88457","#f88356","#f78155",
"#f78055","#f77f54","#f67d53","#f67c52","#f67b52","#f57951","#f57850","#f4774f","#f4754f","#f4744e",
"#f3734d","#f3714c","#f2704c","#f26f4b","#f16d4a","#f16c49","#f06b49","#f06948","#ef6847","#ef6646",
"#ee6545","#ed6344","#ed6243","#ec6042","#ec5f42","#eb5d41","#ea5c40","#ea5a3f","#e9593e","#e8573c",
"#e8563b","#e7543a","#e65339","#e65138","#e55037","#e44e36","#e44c35","#e34b34","#e24932","#e14831",
"#e04630","#e0442f","#df432e","#de412d","#dd402b","#dc3e2a","#dc3c29","#db3b28","#da3927","#d93826",
"#d83624","#d73423","#d63322","#d53121","#d43020","#d32e1f","#d22c1e","#d12b1d","#d0291b","#cf281a",
"#ce2619","#cd2518","#cc2317","#cb2216","#ca2015","#c91f14","#c81d13","#c71c12","#c61b11","#c51911",
"#c31810","#c2170f","#c1150e","#c0140d","#bf130c","#be120c","#bc110b","#bb100a","#ba0e09","#b80d09",
"#b70c08","#b60b07","#b50b07","#b30a06","#b20906","#b10805","#af0705","#ae0704","#ac0604","#ab0504",
"#a90503","#a80403","#a60402","#a50302","#a40302","#a20302","#a00201","#9f0201","#9d0201","#9c0101",
"#9a0101","#990101","#970101","#960100","#940100","#920000","#910000","#8f0000","#8e0000","#8c0000",
"#8a0000","#890000","#870000","#860000","#840000","#820000","#810000","#7f0000"]
var width = 950
var height = 500
var margin = {left: 50, right: 10, top: 50, bottom: 50}
var selected_bar_color = '#77a309'
var unselected_bar_color = '#c7f0e4'
var svg2 = d3.select("#canvas1")
    .style("position", "relative")
    .style("float","left")
    .style("left", "5%;")
    .style("width", "950px")
    .style("height", "500px")
    .style("border-radius", "10px")
    .style("font-size", "larger")
    .append("svg")
    .style('width', width)
    .style('height', height)

d3.csv("Real_Data.csv").then((diagnosed_data) => {
    let date = []
    let total_diagnosed = []
    let new_diagnosed = []
    let color = []
    for (data of diagnosed_data) {
        date.push(`${data.Year}/${data.Month}/${data.Day}`)
        total_diagnosed.push(data.Total_Diagnosed)
        new_diagnosed.push(Number(data.NewPerson_Diagnosed))
        color.push(palette[Math.round(data.NewPerson_Diagnosed / 730 * palette.length)])
    }
    let max = d3.max(new_diagnosed)
    let xScale = d3.scaleLinear()
        .domain([1, new_diagnosed.length])
        .range([ width - margin.left - margin.right , 0])
    let xScale_Day = d3.scaleLinear()
        .domain([1, new_diagnosed.length])
        .range([ 0 , width - margin.left - margin.right ])
    let yScale = d3.scaleLinear()
        .domain([0, max])
        .range([height - margin.top - margin.bottom, 0])
    
    let info1 = svg2.append('text')
        .attr('x', 400)
        .attr('y', 150)
        .attr('style', "visibility:hidden")
    let info2 = svg2.append('text')
        .attr('x', 400)
        .attr('y', 170)
        .attr('style', "visibility:hidden")
    let info3 = svg2.append('text')
        .attr('x', 400)
        .attr('y', 190)
        .attr('style', "visibility:hidden")

    let rects = svg2.selectAll("rect")
        .data(new_diagnosed)
        .enter()
        .append("rect")
        .attr("id", (d, i) => i)
        .attr("x", (d,i) =>  xScale(i))
        .attr("y", (d, i) => margin.top + yScale(d))
        .attr('height', (d, i) => (height - margin.top - margin.bottom) - yScale(d) )
        .attr('width', (height - margin.left - margin.right) / new_diagnosed.length)
        .style("fill", (d, i) => color[i])
        .on('mouseover', function(d) {
            index = d.target.id
            rects.transition().style('fill', unselected_bar_color)
            d3.select(this).transition().style('fill', selected_bar_color)
            info1.attr('style', "visibility:visible")
                .text(`日期: ${date[index]}`)
            info2.attr('style', "visibility:visible")
                .text(`總確診數: ${total_diagnosed[index]}`)
            info3.attr('style', "visibility:visible")
                .text(`當日確診數: ${new_diagnosed[index]}`)
        })
        .on('mouseout', function() {
            rects.transition()
                .style('fill', (d, i) => color[i])
            info1.attr('style', "visibility:hidden")
            info2.attr('style', "visibility:hidden")
            info3.attr('style', "visibility:hidden")
        })

    svg2.append('text')
        .attr('x', 400)
        .attr('y', 40)
        .text('2021五月確診人數')

    svg2.append('g')
        .attr('transform', 'translate(30, 50)') //y軸的位置
        .call(d3.axisLeft(yScale))
    svg2.append('text')
        .attr('x', 10)
        .attr('y', 40)
        .text('確診數(人)')

    svg2.append('g')
        .attr('transform', 'translate(30, 450)') //x軸的位置
        .call(d3.axisBottom(xScale_Day))
    svg2.append('text')
        .attr('x', 450)
        .attr('y', 490)
        .text('日期(號)')
})