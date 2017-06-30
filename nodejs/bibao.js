(function (params) {
    var title =
        `/**
 * 使用IIFE immediately Invoked Function Expression 立即执行（调用）函数表达式
 * 实现独立作用域区域
     for (var index = 1; index <= 5; index++) {
        (function (j) {
            setTimeout(function () {
                console.log(j);

            }, j * 1000)
        })(index);
    }
 */`;
    console.log(title);
    /*  for (var index = 1; index <= 5; index++) {
          (function (j) {
              setTimeout(function () {
                  console.log(j);
  
              }, j * 1000)
          })(index);
      }*/
})();

//在for 的封闭空间里面构建一个新的闭包空间
(function (a) {
    for (var index = 0; index <= 5; index++) {
        
        (function () {
            var __temp__ = index;
            setTimeout(function () {
                console.log(__temp__);
            }, index * 1000);
        }());
        
    }
    console.log(index,'out of the for'); 
    // output: 6 'out of the for'
    //在这里就可以说明了 index不仅存在for(){}的区块里了。

}('dd'));
//使用let进行劫持{}变成块作用域
// (function () {
//     for (let index = 0; index <= 5; index++) { //这里的let将for 变成了一个index一个闭包
//         setTimeout(function () {
//             console.log(index); 
//         }, index * 1000);
        
//     }
//     // console.log(index,'out of the for'); 这里调用会出现下面的异常错误
//     /*
//     console.log(index,'out of the for');
//                 ^

//     ReferenceError: index is not defined
//     */
// }());
