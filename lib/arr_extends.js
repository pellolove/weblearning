
 
// 方法一 新建一个临时数组进行接收，然后进行匹对返回
Array.prototype.distinct =
    function () {
        let arr = this; 
        let new_arr = [];
        if (arr.length == 0) {
            new_arr = arr;
        } else {
            arr.forEach((item, index) => {
                if (new_arr.indexOf(item) < 0) {
                    new_arr.push(item);
                }
            });
        }
        return new_arr;
    }

 
// 方法二 使用slice在原数组上进行操作(此方法暂时还不可用)
// Array.prototype.distinct = function () {



//     for (var i = 0; i < this.length; i++) {
//         let item = this[i];
//         this.splice(i, 1, null); //先删除要检查的项,并且使用一个null来顶一下位置
//         if (this.indexOf(item) < 0) { //如果检测数组里没有之前删除的项了，再通过splice添加进到原数组里
//             this.splice(i, 1, item);
//         } else {
//             this.splice(i, 1);//这里其实是移除占位的null
//         }
//     }
//     return this;

// };

// 关于排序

// arr.sort((a,b)=>{return a-b})

let arr = [4, 5, 6, 7, 4, 34, 7, 5, 6, 7, 56]
console.log(`原来数组 ${arr} \n输出数组${arr.distinct()} `);