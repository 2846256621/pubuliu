var last = document.getElementById("prev");
var first = document.getElementById("next");
var list = document.getElementsByTagName("li");
var index = 0;
function next() {
    index++;
    if(index === list.length){
        index = 0;
    }
    console.log(index);
    for(var i =0;i< list.length;i++){
      list[i].style.opacity = 0;
   }
   list[index].style.opacity = 1;
}
setInterval("prev()",1000);
setInterval("next()",3000);

 function prev() {
    index--;
    if(index === -1){
        index = list.length -1;
    }
    for(var i =0;i< list.length;i++){
        list[i].style.opacity = 0;
    }
    list[index].style.opacity = 1;
}