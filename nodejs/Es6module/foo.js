class Hello {
    constructor(hi) {
          console.log(hi);
        this.say = function () {
            console.log('say invocked!');
        }

    }
}


let a = 'ccc';
console.log(a);

var  h = new Hello('sb dada!');
h.say();
