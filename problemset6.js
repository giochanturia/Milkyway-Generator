import * as base from "./base.js";
randomize_and_calculate() {
    this.a = base.getRandomInt(20, 6);
    this.b = base.getRandomInt(25, 4);
    this.c = base.getRandomInt(30,8);
    this.strarray = array['წითელი','ყვითელი','ლურჯი'];
    this.e = base.getRandomstr(strarray);
    if ( e =='წითელი') {
        this.d = base.getRandomInt(b+c,1);
        this.p = 1 - ((factorial(b+c))*(factorial(a+b+c+-d)))/((factorial(a+b+c))*(factorial(b+c-d)));
    }
    if ( e=='ყვითელი'){
        this.d = base.getRandomInt(a+c,1);
        this.p = 1 - ((factorial(a+c))*(factorial(a+b+c+-d)))/((factorial(a+b+c))*(factorial(a+c-d)));
    }
    if (e=='ლურჯი'){
        this.d = base.getRandomInt(a+b,1);
        this.p = 1 - ((factorial(b+a))*(factorial(a+b+c+-d)))/((factorial(a+b+c))*(factorial(b+a-d)));
    }
    
} 
    update_text() {
		this.problem.text(
			`ყუთში მოთავსებულია ${
				this.a
			} წითელი, ${
				this.b
			} ყვითელი და  ${
				this.c
			} ლურჯი ბურთი. შემთხვევითობის პრინციპით ამოიღეს ${
				this.d
			} ბურთი. რა არის იმის ალბათობა, რომ ამოღებული ბურთებიდან ერთი მაინც იქნება ${
				this.e
			} ?`
		);
		this.answer.text(
			`პასუხი: ${
				this.p
			} .`
		);
		
	}
   
