function click() {
    var timecount = 0;
    var newtime = setInterval(function () {
        timecount += 1;
        if(timecount === 60){
            clearInterval(newtime);
        }
    },2000);
    document.getElementById("clock").value = newtime;
}