!(function(params) {
    console.log("inherit!");
    var xiaohua = new Dog('flower', 'male');
    console.log(xiaohua);

})();

function Animal(name, sex) {
    this.name = name;
    this.sex = sex || 'female';
    this.announce = function() {
        console.log('announce!');
    }
}

function Dog(name, sex) {

    var mcall = Animal.call(this);
    this.announce();
}