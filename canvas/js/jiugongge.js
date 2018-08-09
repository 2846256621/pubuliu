var list; //声明全局变量
window.onload = function () {
    list=document.getElementsByClassName("li_div");
};

var one,two,three;
function begin() {
    recolor();
    //随机产生3个数字
    var leng=list.length;
    one = Math.floor(Math.random()*leng);
    two = Math.floor(Math.random()*leng);
    three = Math.floor(Math.random()*leng);
    //以防随机数相同
    if(one === two){
        one = Math.floor(Math.random()*leng);
    }
    else if(two === three){
        two = Math.floor(Math.random()*leng);
    }
    else if(three === one){
        three =Math.floor(Math.random()*leng);
    }
}
//随机产生颜色
function colors() {
    var r = Math.floor(Math.random()*256);
    var g = Math.floor(Math.random()*256);
    var b = Math.floor(Math.random()*256);
    var rgb ="("+ r +","+g+","+b+")";
    return rgb;
}
//将随机色与三个随机数匹配
function  maxColors() {
    list[one].style.backgroundColor  ="rgb"+colors();
    list[two].style.backgroundColor = "rgb"+colors();
    list[three].style.backgroundColor = "rgb"+colors();
    console.log(list[one].style.backgroundColor);
}


var time;
function runner(){   //点击开始颜色的变化
    time = setInterval(function(){
        begin();//调用随机数字
        maxColors();//调用给随机数字加随机色
        },2000);
    }
//setInterval()函数是循环调用其中的内容，先调用随机数函数，再调用给随机数匹配随机色函数
//其中每次三个颜色变化后，又要改回默认值，则在产生随机数中改动，则两个函数循环调用时，
//就可以清除颜色，再产生新的颜色了


function recolor(){  //每次再把随机颜色改回默认颜色
    for(var i = 0; i < list.length; i++){
        if(list[i].style.backgroundColor != "#eaa6e8"){
            list[i].style.backgroundColor="#eaa6e8"
        }
    }
}

function stopper() {   //点击停止颜色的变化
    clearInterval(time);
    for(var i = 0; i < list.length; i++){
        list[i].style.backgroundColor = ' ';
    }
    if(document.getElementById("Stop").value =="点击暂停"){
        document.getElementById("run").value ="点击继续";
    }
}


