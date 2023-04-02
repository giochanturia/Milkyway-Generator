import * as base from "./base.js";
randomize_and_calculate(); {
    this.a = base.getRandomInt(800, 100);
    this.b = base.getRandomInt(68, 4);
    this.c = base.getRandomInt(95,11);
    this.d = base.getRandomInt(900,100);
    this.p = (this.a*this.b+this.c*this.d)/((this.a+this.d)*100);
    }
    
 
    update_text(); {
		this.question.text(
			` ${
				this.a
			}$ გრამი შაქრის წყალხსნარი, ${
				this.b
			}$ პროცენტიანი შემცველობით შეურიეს  ${
				this.d
			}$ გრამ შაქრის წყალხსნარს, რომელსაც ${
				this.c
			}$ პროცენტიანი შემცველობა ჰქონდა. რა იქნება მიღებულ ხსნარში შაქრის შემცველობა?`
		);
		this.answer.text(
			`პასუხი: ${
				this.p
			}$ პროცენტი.`
		);
		this.explanation.text('ვიპოვოთ შაქრის მასა ცალკეულ ხსნარებში, შევკრიბოთ და შევაფარდოთ მიღებული ხსნარის ჯამურ მასასთან.'

		);
		
	}