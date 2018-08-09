window.onload = function (){
    imageLocation("container","box");//parent是最外面的div，content是内层的div，即'box'
    // var ImageData = {"data":[{"src":"11.jpg"},{"src":"13.jpg"},{"src":"30.jpg"},{"src":"34.jpg"},{"src":"27.jpg"},
    //         {"src":"12.jpg"},{"src":"14.jpg"},{"src":"31.jpg"},{"src":"33.jpg"} ]};
    // //json字符串模拟数据
    // window.onscroll = function () {
    //   if(checkFlag()){  //如果到底部开始加载
    //
    //       for(var i = 0;i<ImageData.data.length;i++) {
    //           var container = document.getElementById("container"); //得到父级内容
    //           var boxs = document.createElement("div");  //创建元素
    //           boxs.className = "box";   //设置统一的class
    //           container.appendChild(boxs);  //追加子节点到父级元素中
    //           var imgboxs = document.createElement("div");
    //           imgboxs.className = "box_img";
    //           boxs.appendChild(imgboxs);
    //           var img = document.createElement("img");  //最内层是图片，创建图片节点
    //           img.src = "images/" + ImageData.data[i].src;  //将模拟的图片索引添加
    //           imgboxs.appendChild(img);    //追加到父元素中
    //       }
    //       imageLocation("container","box");  //再次调用方法，让他自动排序
    //   }
    // }

};
 // function checkFlag() {
 //     var  parents = document.getElementById("container"); //得到最外层的父div
 //     var  contents = getChildElement(parents,"box"); //返回所有的‘box’
 //     var lastImageTop = contents[contents.length - 1].offsetTop; //得到最后一张图片的距顶部的高度
 //     var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;//得到当前滚动条的高度（下滑隐藏）
 //     var pageHeight = document.documentElement.clientHeight||document.body.clientHeight;//得到当前页面的高度。
 //     if(lastImageTop < scrollTop + pageHeight){  //当图片距顶高度小于滚动条高度+当前页面高度时，开始加载
 //         return true;
 //     }
 // }






function imageLocation(parent,content) {
    var cparent = document.getElementById(parent);//把父级空间所有的div传入
    var ccontent=getChildElement(cparent,content);//将的到的‘box’数组赋值给ccontent
    var imgWidth = ccontent[0].offsetWidth; //得到每张图片宽度
    var screenWidth = document.documentElement.clientWidth;//得到屏幕宽度
    var cols = Math.floor(screenWidth/imgWidth);//得到每行可以放下多少张图片，并且取整数
    cparent.style.cssText = "width:"+imgWidth*cols+"px;margin:0 auto";//将每行放的图片个数固定，并且居中显示

    var boxHeightArr = [];//新建数组存放每张图片的高度
    for(var i = 0;i<ccontent.length;i++){
        if(i<cols) {     //只存入第一行的图片高度
            boxHeightArr[i] = ccontent[i].offsetHeight; //得到每张图片的高度
        }
        else{
            var minHeight = Math.min.apply(null,boxHeightArr); //找到高度最小的图片
            var minIndex = getminHeightLocation(boxHeightArr,minHeight); //调用方法得到高度最小的下标
            ccontent[i].style.position = "absolute"; //通过‘box’来移动摆放图片，绝对布局，控制位置
            ccontent[i].style.top = minHeight + "px";//设置高度，因为在图片下面摆放，所以高度为上一张图片的高度
            ccontent[i].style.left = ccontent[minIndex].offsetLeft +"px";
            //设置距离左边的位置，位置是由图片的宽度控制的，
            // 即距左边的距离就是图片的个数乘以图片的宽度。因为每张图片的宽度相同，也可以通过图片的个数乘以每张图片的宽度进行计算
            //但是这样要加上每张图片的padding,会比较麻烦
            boxHeightArr[minIndex] = boxHeightArr[minIndex] + ccontent[i].offsetHeight; //因为图片的放置，这一列将成为最高的，然后在循环找最低的下标
        }
    }
}

function getminHeightLocation(boxHeightArr,minHeight) {  //得到最小高度的下标
    for( var i in boxHeightArr){     //遍历数组，返回高度最低的图片的下标
        if( boxHeightArr[i] === minHeight){
            return i;
        }
    }
}
function getChildElement(parent,content) {
    var contentArr = [];
    var allcontent = parent.getElementsByTagName("*");//得到所有的div
    for(var i = 0;i<allcontent.length;i++){ //将class等于'box'的放入数组
        if(allcontent[i].className == content){
            contentArr.push(allcontent[i]);
        }
    }
    return contentArr; //返回数组
}
// 第一步：确定图片的摆放位置，及图片的居中显示
// 思路：一个大的div包括了所有的图片div，图片分为外层的div ->'box',内层的图片div。通过传参传入父级div ->container,
//在经过for循环判断id 得到 子级的每张图片的div ->'box',将其放入数组。然后通过数组元素计算出每张图片的大小，再得到
//屏幕的大小，再而算出来每行可以仿多少张图片。为了避免图片在窗口大小变化时，每行的个数也发生变化，从而要固定每行的
//图片张数。
//
//第二步：将第一行图片的高度放入数组，然后找出高度最小的图片，再调用函数通过for循环找到最小高度的图片找到其下标，
// 然后让下一行的第一张图片放在高度最小的那张图片下面，进行定位，再改变图片的高度（上一张+下一张），以及相对于
// 距离左边的距离，并改变最小下标的高度，在通过数组‘box’的改变（i++）进行下一次循环。
//
//c.offsetLeft 和 c.offsetTop
// 一般指当前元素的CSS边框相对于其offsetParent的X和Y坐标
// c.offsetHeight 和 c.offsetWidth
// 当前元素及其所有内容的高度，宽度。
//

