const { Timer } = require("timer-node");

const timer = new Timer({
  label: "test-timer",
  startTimestamp: 0,
});


let i=0;
// for(let i=0;i<20000;i++)
// {
//       console.log(timer.time())
      
// }
function loop(){
      //console.log(timer.time());.
      console.log(timer.format("%label [%s] seconds [%ms] ms"));
      i++;
      if(i<20){
            setTimeout(loop,940)//set delay 940 milisec
      }
}
loop()
