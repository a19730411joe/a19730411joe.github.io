/* 
**試著將整個輸入值轉化為class
*/


// function 可以視為struct, 簡易版class
function Point(x, y)
{
	this.X = x;
	this.Y = y;
}

function Unistroke(name, points) // constructor
{
	this.Name = name;
	this.Points = Resample(points, NumPoints);
	var radians = IndicativeAngle(this.Points);
	this.Points = RotateBy(this.Points, -radians);
	this.Points = ScaleTo(this.Points, SquareSize);
	this.Points = TranslateTo(this.Points, Origin);
	this.Vector = Vectorize(this.Points); // for Protractor
}

function distance(a,b){
    let x = a.X - b.X;
    let y = a.Y - b.Y;
    return Math.sqrt(x * x + y * y);
}


/*
function Rectangle(x, y, width, height) // constructor
{
	this.X = x;
	this.Y = y;
	this.Width = width;
	this.Height = height;
}
*/




class graphics{
    #Center;
    #Data;
    #Single_data;


    




    #Resample(points){
        let total_distance = 0;
        for(let i=1;i<points.length;++i){
            distance(points[i],points[i-1]);
        }
        let interval =  total_distance/(points.length-1);
        let temp_len = 0;
        for(let i=1;i<points.length;++i){
            let temp_dist = distance(points[i],points[i-1]);
            if(temp_len + temp_dist > interval){

            }
            else{
                temp_len += temp_dist;
            }
        }
    }

    #Rotate(){

    }

    #Scale(){

    }

    #Translate(){

    }
    constructor(points){
        





    }



    



    Centroid()
    {
        var x = 0.0, y = 0.0;
        for (var i = 0; i < points.length; i++) {
            x += points[i].X;
            y += points[i].Y;
        }
        x /= points.length;
        y /= points.length;
        center = new Point(x,y);
    }

    

    


    // public function
    Recognize(){

    }

    Add(){

    }


    Delete(){

    }
}




let temp = new graphics;
console.log(temp.a);