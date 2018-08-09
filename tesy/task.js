let arr =[1,2,4,5,9];
let item =4;
function myfuntion(arr,item) {
    for(let i=0;i<arr.length;i++) {
        if(arr[i] === item)
        {
            for(let j=i;j<arr;j++)
                arr[j] = arr[j+1];
        }
    }
}
console.log(myfuntion(arr,item));