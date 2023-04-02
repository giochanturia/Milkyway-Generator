import * as base from "./base.js";
randomize_and_calculate();{
    this.a = base.getRandomInt(20, 6);
    this.b = base.getRandomInt(25, 4);
    this.c = base.getRandomInt(30,8);
    this.strarray = array['წითელი','ყვითელი','ლურჯი'];
    this.e = base.getRandomstr(strarray);
    if ( e =='წითელი') {
        this.d = base.getRandomInt(this.b+this.c,1);
        this.p = 1 - ((factorial(this.b+this.c))*(factorial(this.a+this.b+this.c-this.d)))/((factorial(this.a+this.b+this.c))*(factorial(this.b+this.c-this.d)));
    }
    if ( e=='ყვითელი'){
        this.d = base.getRandomInt(this.a+this.c,1);
        this.p = 1 - ((factorial(this.a+this.c))*(factorial(this.a+this.b+this.c-this.d)))/((factorial(this.a+this.b+this.c))*(factorial(this.a+this.c-this.d)));
    }
    if (e=='ლურჯი'){
        this.d = base.getRandomInt(this.a+thi.b,1);
        this.p = 1 - ((factorial(this.b+this.a))*(factorial(this.a+this.b+this.c-this.d)))/((factorial(this.a+this.b+this.c))*(factorial(this.b+this.a-this.d)));
    }
    
} 
    update_text(); {
		this.question.text(
			`ყუთში მოთავსებულია ${this.a}$ წითელი, ${this.b}$ ყვითელი და  ${this.c}$ ლურჯი ბურთი. 
			შემთხვევითობის პრინციპით ამოიღეს ${this.d}$ ბურთი. რა არის იმის ალბათობა, 
			რომ ამოღებული ბურთებიდან ერთი მაინც იქნება ${this.e}$ ?`
		);
		this.answer.text(
			`პასუხი: ${this.p}$ .`
		);
			this.explanation.text(`პასუხის საპოვნელად განვიხილოთ ის შემთხვევა, რომელშიც არც ერთი ამოღებული ბურთი სასურველი ფერის არაა
			და ერთს გამოვაკლოთ ამ შედეგის მიღების ალბათობა.  `);
			
		}
		
	
   
