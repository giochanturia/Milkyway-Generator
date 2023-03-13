import * as base from "./base.js";
randomize_and_calculate() {
    this.a = base.getRandomInt(20, 6);
    this.b = base.getRandomInt(25, 4);
    this.c = base.getRandomInt(30,8);
    this.strarray = array['წითელი','ყვითელი','ლურჯი'];
    this.e = base.getRandomstr(strarray);
    if ( e =='წითელი') {
        this.d = base.getRandomInt(b+c,1);
    }
    if ( e=='ყვითელი'){
        this.d = base.getRandomInt(a+c,1);
    }
    if (e=='ლურჯი'){
        this.d = base.getRandomInt(a+b,1);
    }
    
    //to be continued
}