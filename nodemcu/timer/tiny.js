const Timer = require("tiny-timer");
let i = 0;

const timer = new Timer();

function loop(callback) {
  timer.on("tick", (ms) => console.log("tick", ms));
  timer.on("done", () => console.log("done!"));
  timer.on("statusChanged", (status) => console.log("status:", status));

  timer.start(50000);

  i++;
  if (i < 50000) setTimeout(loop, 948);
}

loop();
