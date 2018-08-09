window.onload = function () {
    imageLocation("container","box");
    var ImageData = {  //模拟json字符串，获取图片数据
        "data":[{"src":"38.jpg"},{"src":"13.jpg"},{"src":"22.jpg"},{"src":"23.jpg"},{"src":"27.jpg"},
            {"src":"40.jpg"},{"src":"34.jpg"},{"src":"33.jpg"},{"src":"32.jpg"},{"src":"31.jpg"},{"src":"30.jpg"}]};
    //添加节点以至于可以无限浏览。循环中操作。
    window.onscroll = function () {  //监控滚动条
        if(checkTop()){
            var container = document.getElementById("container"); //先找到父元素
            for(var i =0 ;i<ImageData.data.length;i++){   //循环json字符串
                var box = document.createElement("div"); //创建子元素节点（第一层div）
                box.className = "box";    //设置统一的class，以识别其添加的层次
                container.appendChild(box); //向父级元素中追加创建的新节点
                var imgbox = document.createElement("div");//（第二层div）
                imgbox.className = "img_box";
                box.appendChild(imgbox);
                var img = document.createElement("img"); //（第三层内包含图片）
                img.src = "image/"+ImageData.data[i].src;
                imgbox.appendChild(img);
            }
            imageLocation("container","box");//每次加载过后要进行高度排序，进行循环放置图片
        }
    }
};



// //找到该进行加载的高度，进行循环的无限加载
function checkTop() {
    var parents = document.getElementById("container");
    var contents = getElementboxs(parents,"box");//通过父级元素找到所有的‘box’的数组
    var lastImagetop = contents[contents.length - 1].offsetTop;//得到最后一张图片距顶部的高度
    var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;//得到滚动条的高度（包括隐藏部分）
    var screenHeight = document.documentElement.clientHeight||document.body.clientHeight;//得到屏幕的高度
    if(lastImagetop < screenHeight + scrollTop){
        return true;
    }
}
//得到图片的大小，每行的个数，以及图片的高度
function imageLocation(parent,content){
   var cparent = document.getElementById(parent);
   var ccontent = getElementboxs(cparent,content);//得到所有的‘box’
   var imgWidth = ccontent[0].offsetWidth; //每张图片的宽度
   var screenWidth = document.documentElement.clientWidth;//得到屏幕的宽度
   var num = Math.floor(screenWidth/imgWidth); //得到每行可以放下图片的个数,取整数
   cparent.style.cssText = "width:"+ imgWidth*num +"px;margin:0 auto";//固定个数，并居中显示

   var imgHeightArr = [];//将第一行的图片的高度放入数组
   for(var i = 0;i<ccontent.length;i++){
       if(i<num){
           imgHeightArr[i] = ccontent[i].offsetHeight;
       }
       else{
           var minHeigthImg = Math.min.apply(null,imgHeightArr);//得到高度最小的图片
           var minHeightIndex = getminHeightIndex(imgHeightArr,minHeigthImg);//得到最小高度的下标
           ccontent[i].style.position = "absolute";//固定图片的位置，绝对定位
           ccontent[i].style.top= minHeigthImg +"px";//设置图片距顶部的高度，刚好是高度最小的那张图片的位置
           ccontent[i].style.left = ccontent[minHeightIndex].offsetLeft + "px";//设置图片距离左边的距离，则是最低图片的下标距离最左边的距离
           imgHeightArr[minHeightIndex] = imgHeightArr[minHeightIndex] + ccontent[i].offsetHeight;  //图片放好后，改变最低图片的高度，加上新放上去的，其成为最高的图片，进入下次循环
       }
   }
}
function getminHeightIndex(imgHeightArr,minHeightImg) {
    for(var i in imgHeightArr){
        if(imgHeightArr[i] === minHeightImg){
            return i;
        }
    }
}


//得到所有的‘box’数组
function getElementboxs(parent,content) {
    var getboxsArr = [];//得到所有的‘box’放入数组
    var allcontent = parent.getElementsByTagName("*");
    for(var i =0;i<allcontent.length;i++){
        if(allcontent[i].className === content){
            getboxsArr.push(allcontent[i]);
        }
    }
    return getboxsArr;
}