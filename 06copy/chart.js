

d3.csv('Real_data.csv').then((dataset) => {
    //console.log(dataset);
    dataset.sort(function(a,b){
        return a.Day-b.Day;
    });
    var svg3 = d3.select('#canvas-sdj')
        .append('svg')
        .attr('width',900)
        .attr('height',600)

        svg3.append('text')
        .attr('class','title')
        .attr('x',300)
        .attr('y',50)
        .text('2021年5月疫情趨勢圖')
        .style('font-size',40)
    
    var svgwidth = 800;
    var svgheight = 400;
    var x_shift = 50;
    var y_shift = 100;



    //    開始做柱狀圖
    let xScale3 = d3.scaleLinear()
        .domain([0,31])
        .range([0,svgwidth])
        
    let yScale3 = d3.scaleLinear()
        .domain([0,723])
        .range([0,svgheight])

    var rects = svg3.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        //.style("fill",'#0000CD')
        
    rects.attr("x",function(d,i){
        //console.log(i);
        return 15+x_shift+xScale3(i);
    })
        .attr("y",function(d,i){
            //console.log(d.NewPerson_Diagnosed);
            return y_shift+svgheight-yScale3(d.NewPerson_Diagnosed);
        })
        .attr('width',25)
        .attr('height',function(d,i){
            //console.log(d.NewPerson_Diagnosed);
            return yScale3(d.NewPerson_Diagnosed);
        })
    

    //    上色    
    var prenum = 0;
    var preslope = 0;
    var color = ['blue','green','red'];
    rects.style("fill",function(d,i){
        //console.log(d.NewPerson_Diagnosed);
        //console.log(prenum);
        //console.log(preslope);
        if(prenum == 0){
            prenum = parseInt(d.NewPerson_Diagnosed);
            return color[1];
        }
        else if (prenum != 0){
            console.log(d.NewPerson_Diagnosed);
            console.log(prenum);
            let slope = d.NewPerson_Diagnosed/prenum;
            //console.log(slope);
            if(preslope<slope){
                preslope = slope;
                prenum = d.NewPerson_Diagnosed;
                return color[2];
            }
            else{
                preslope = slope;
                prenum = d.NewPerson_Diagnosed
                return color[1];
            }  
        }
    })

    //    座標軸
    let x_axis = d3.scaleLinear()
        .domain([0,31])
        .range([0,svgwidth])
    let y_axis = d3.scaleLinear()
        .domain([0,723])
        .range([svgheight,0])

    let xAxis = d3.axisBottom(x_axis)
        .ticks([31])
        .tickSizeOuter(0)
    let yAxis = d3.axisLeft(y_axis)
        .tickPadding(10)
        .tickSizeOuter(0)

    svg3.append('g').attr('class', 'axis')
        .attr('transform', 'translate(50,100)')
        .call(yAxis)
    svg3.append('g').attr('class', 'axis')
        .attr('transform', 'translate(50,500)')
        .call(xAxis)

})