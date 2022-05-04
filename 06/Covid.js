//選取svg
let svg =d3.select("#Canvas")
    .append("svg")
    .attr('width' , 900)
    .attr('height' , 500)
//
let xScale = d3.scaleLinear()
    .domain([0,32])
    .range([0,700])
let yScale = d3.scaleLinear()
    .domain([0,700])
    .range([400,0])
let Total_yScale = d3.scaleLinear()
    .domain([0,8000])
    .range([400,0])
let Total_Dia = 0 
let Ticks = Array(31)
for(let i = 1 ; i<=31 ; i++){
    Ticks[i-1] = i
}
//讀取檔案
d3.csv("Real_Data.csv").then((data)=>{
    //計算總數，因為資料的總數是一年的
    data.forEach((d,index)=>{
        Total_Dia += +d.NewPerson_Diagnosed       
    })
    let Dia = Total_Dia
    //更改資料類型
    let line_data = []
    data.forEach((d,index)=>{
        if(index != 0){
            //30
            start_x = xScale(+d.Day)+100
            //
            end_y = Total_yScale(Total_Dia)+30
            Total_Dia -= (+data[index-1].NewPerson_Diagnosed)
            //Total_Dia - 31的new_Dia
            start_y = Total_yScale(Total_Dia)+30
            //31
            end_x = xScale(+data[index-1].Day)+100
            line_data.push({point_x1 : start_x, point_y1 : start_y 
                ,point_x2 : end_x,point_y2 : end_y})
        }
    })
    //console.log("Total = " + Total_Dia)
    //對於坐標軸的註釋
    let leftText = svg.append("text")
                        .attr("transform" , "translate(50,20)")
                        .text("新增人數(長條)")
    let rightText = svg.append("text")
                        .attr("transform" , "translate(760,20)")
                        .text("本月染疫人數(折線)")
    let bottomText = svg.append("text")
                        .attr("transform" , "translate(450,470)")
                        .text("日期")
    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x" , (d)=>xScale(+d.Day)+92.5)
        .attr("y" , (d)=>yScale(+d.NewPerson_Diagnosed)+30)
        .attr("height" , (d)=>400 - yScale(+d.NewPerson_Diagnosed))
        .attr("width",15)
        .attr("fill","rgb(50, 200, 252 , 1)")
        .on("mouseover",function(){
            Circle = svg.selectAll("circle")
            Circle.attr("opacity" , "0.3")
            Line = svg.selectAll("line")
            Line.attr("opacity" , "0.3")
            rightText.attr("opacity" , "0.5")
        })
        .on("mouseleave",function(){
            Circle = svg.selectAll("circle")
            Circle.attr("opacity" , "1")
            Line = svg.selectAll("line")
            Line.attr("opacity" , "1")
            rightText.attr("opacity" , "1")
        })
    svg.selectAll("line")
        .data(line_data)
        .enter()
        .append("line")
        .attr("x1" , (d)=>d.point_x1)
        .attr("y1" , (d)=>d.point_y1)
        .attr("x2" , (d)=>d.point_x2)
        .attr("y2" , (d)=>d.point_y2)
        .attr("stroke-width" , "2")
        .attr("stroke" , "red")
        .on("mouseover",function(){
            Bar = svg.selectAll("rect")
            Bar.attr("opacity" , "0.3")
            leftText.attr("opacity" , "0.5")
        })
        .on("mouseleave",function(){
            Bar = svg.selectAll("rect")
            Bar.attr("opacity" , "1")
            leftText.attr("opacity" , "1")
        })
        //console.log("Dia = " + Dia)
    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx" , (d)=>xScale(+d.Day)+100)
        .attr("cy" , function(d){
            Height = Total_yScale(Dia)+30
            Dia -= +d.NewPerson_Diagnosed
            return Height
        })
        .attr("r" , "3")
        .attr("stroke" , "black")
        .attr("fill" , "red")
        .on("mouseover",function(){
            Bar = svg.selectAll("rect")
            Bar.attr("opacity" , "0.3")
            leftText.attr("opacity" , "0.5")
        })
        .on("mouseleave",function(){
            Bar = svg.selectAll("rect")
            Bar.attr("opacity" , "1")
            leftText.attr("opacity" , "1")
        })
        // .on("click",function(d){
        //     console.log(d)
        // })
    
    //坐標軸 ↓
    let xAxis = d3.axisBottom(xScale)
                    .tickValues(Ticks.filter(element=>element % 2 ==0))
    let yAxis = d3.axisLeft(yScale)
    let yAxis_2 = d3.axisRight(Total_yScale)
        svg.append("g")
            .attr("class" , "axis")
            .attr("transform" , "translate(100,430)")
            .call(xAxis)
        svg.append("g")
            .attr("class" , "axis")
            .attr("transform" , "translate(100,30)")
            .call(yAxis)
            svg.append("g")
            .attr("class" , "axis")
            .attr("transform" , "translate(800,30)")
            .call(yAxis_2)
})