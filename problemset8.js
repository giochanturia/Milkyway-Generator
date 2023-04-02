import * as base from "./base.js";
randomize_and_calculate(); {
    this.a = base.getRandomInt(40, 1);
    this.b = base.getRandomInt(10, 1);
    this.c = base.getRandomInt(11, 1);
    this.d = base.getRandomInt(30, 1);
    this.e = base.getRandomInt(13,1);
    this.f = base.getRandomInt(15, 1);
    this.p = (this.a*this.b+this.c*this.d)/((this.a+this.d)*100);
    }
    
 
    update_text(); {
		this.problem.text(
			` ${
				this.a
			} გრამი შაქრის წყალხსნარი, ${
				this.b
			} პროცენტიანი შემცველობით შეურიეს  ${
				this.d
			} გრამ შაქრის წყალხსნარს, რომელსაც ${
				this.c
			} პროცენტიანი შემცველობა ჰქონდა. რა იქნება მიღებულ ხსნარში შაქრის შემცველობა?`
		);
		this.answer.text(
			`პასუხი: ${
				this.p
			} პროცენტი.` 
		);
		
	}