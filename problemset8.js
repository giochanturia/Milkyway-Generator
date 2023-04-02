import * as base from "./base.js";
randomize_and_calculate(); {
    this.a = base.getRandomInt(40, 1);
    this.b = base.getRandomInt(10, 1);
    this.c = base.getRandomInt(11, 1);
    this.d = base.getRandomInt(30, 1);
    this.e = base.getRandomInt(13,1);
    this.f = base.getRandomInt(15, 1);
    this.p = (this.a*this.b/(this.b+this.c)+this.d*this.e/(this.e+this.f));
    }
    
 
    update_text(); {
		this.problem.text(
			` $${this.a}$ კგ ოქროსა და სპილენძის შენადნობი შეფარდებით $${this.b}$ : $${this.c}$ შეურიეს $${this.d}}$კგ ოქროსა და სპილენძის შენადნობს შეფარდებით $${this.e}$ : $${this.f}$ . რა იქნება ახალ შენადნობში ოქროს მასა?`
		);
		this.answer.text(
			`პასუხი: $${
				this.p
			}$ კგ` 
		);
		
		
	}