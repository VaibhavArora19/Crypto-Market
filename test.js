const timeArray= [];
let time = new Date().getHours();

for(let i = 0; i<12; i++)
{
    if(time == 12) {
        timeArray.push(12 + ':00 PM')
    }
     else if(time > 12 || time <0) {
        timeArray.push(Math.abs(time%12) + ':00 PM');
        time = time
    }
    else if (time < 12 && time > 0){
        timeArray.push(Math.abs(time)  + ':00 AM');
    }
    time = time -4;
   
}
console.log(timeArray);