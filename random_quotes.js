/* Magic Mirror Module: random_quotes
 * v1.0 - June 2016
 *
 * By Ashley M. Kirchner <kirash4@gmail.com>
 * Beer Licensed (meaning, if you like this module, feel free to have a beer on me, or send me one.)
 */

Module.register("random_quotes",{

	/* Quotes are courtesy of BrainyQuote.com
	   There is no 'automated' way to fetch random quotes from BrainyQuote.com. You'll have to
	   manually do that yourself. Or find a free random quote API at which point you are welcome
	   to rewrite this module to use that. All the ones I've found are paid services. Free ones
	   only allow a single quote for the day. Kinda defeats the purpose.
	 */

	// Module config defaults.
	defaults: {
		updateInterval: 300,	// Value is in SECONDS
		fadeSpeed: 4,			// How fast (in SECONDS) to fade out and back in when changing quotes
		category: 'random',		// Category to use
		quotes: {
			inspirational: [
				"Your big opportunity may be right where you are now. ~ Napoleon Hill",
				"Hope is but the dream of those who wake. ~ Matthew Prior",
				"Men must live and create. Live to the point of tears. ~ Albert Camus",
				"Try to be a rainbow in someone's cloud. ~ Maya Angelou",
				"We do not remember days, we remember moments. ~Cesare Pavese",
				"In fact, I wouldn't really call this a Gospel album, I call it more an inspirational album. ~ Smokey Robinson",
				"Act like you expect to get into the end zone. ~ Christopher Morley",
				"A compliment is something like a kiss through a veil. ~ Victor Hugo",
				"Our technological powers increase, but the side effects and potential hazards also escalate. ~ Alvin Toffler",
				"You affect the world by what you browse. ~Tim Berners-Lee",
			],
			life: [
				"Love is a smoke made with the fume of sighs. ~William Shakespeare",
				"Life is 10 percent what you make it, and 90 percent how you take it. ~ Irving Berlin",
				"Arise! Awake! and stop not until the goal is reached. ~ Swami Vivekananda",
				"Television has changed the American child from an irresistable force to an immovable object. ~ Laurence J. Peter",
				"Without deep reflection one knows from daily life that one exists for other people. ~ Albert Einstein",
				"To me, having kids is the ultimate job in life. I want to be most successful at being a good father. ~ Nick Lachey",
				"I believe that I was a dog in a past life. That's the only thing that would explain why I like to snack on Purina Dog Chow. ~ Dean Koontz",
				"To be idle is a short road to death and to be diligent is a way of life; foolish people are idle, wise people are diligent. ~ Buddha",
				"We can't plan life. All we can do is be available for it. ~ Lauryn Hill",
				"Friends are as companions on a journey, who ought to aid each other to persevere in the road to a happier life. ~ Pythagoras",
			],
			love: [
				"Men always want to be a woman's first love - women like to be a man's last romance. ~ Oscar Wilde",
				"Throw your dreams into space like a kite, and you do not know what it will bring back, a new life, a new friend, a new love, a new country. ~ Anais Nin",
				"It is easier to go down a hill than up, but the view is from the top. ~ Arnold Bennett",
				"Sometimes life hits you in the head with a brick. Don't lose faith. ~ Steve Jobs",
				"I've sometimes thought of marrying - and then I've thought again. ~ Noel Coward",
				"In the end, the love you take is equal to the love you make. ~ Paul McCartney",
				"I love argument, I love debate. I don't expect anyone just to sit there and agree with me, that's not their job. ~ Margaret Thatcher",
				"Grief is the price we pay for love. ~ Queen Elizabeth II",
				"We waste time looking for the perfect lover, instead of creating the perfect love. ~ Tom Robbins",
				"True love comes quietly, without banners or flashing lights. If you hear bells, get your ears checked. ~ Erich Segal",
			],
			motivational: [
				"Be kind whenever possible. It is always possible. ~ Dalai Lama",
				"You are never too old to set another goal or to dream a new dream. ~ C. S. Lewis",
				"Get action. Seize the moment. Man was never intended to become an oyster. ~ Theodore Roosevelt",
				"The people who influence you are the people who believe in you. ~ Henry Drummond",
				"Design is not just what it looks like and feels like. Design is how it works. ~ Steve Jobs",
				"We should not give up and we should not allow the problem to defeat us. ~ A. P. J. Abdul Kalam",
				"You can't cross the sea merely by standing and staring at the water. ~ Rabindranath Tagore",
				"Leap, and the net will appear. ~ John Burroughs",
				"Do your work with your whole heart, and you will succeed - there's so little competition. ~ Elbert Hubbard",
				"Do not wait to strike till the iron is hot; but make it hot by striking. ~ William Butler Yeats",
			],
			positive: [
				"Learn from yesterday, live for today, hope for tomorrow. The important thing is not to stop questioning. ~ Albert Einstein",
				"Everybody's worried about stopping terrorism. Well, there's a really easy way: stop participating in it. ~ Noam Chomsky",
				"Keep your head and your heart going in the right direction, and you will not have to worry about your feet. ~ Unknown",
				"Computers themselves, and software yet to be developed, will revolutionize the way we learn. ~ Steve Jobs",
				"Technology is just a tool. In terms of getting the kids working together and motivating them, the teacher is the most important. ~ Bill Gates",
				"It is only when they go wrong that machines remind you how powerful they are. ~ Calvin James",
				"So, we have choice, and sometimes it seems very hard, but the best way to heal physically or emotionally is to keep positive. ~ Petra Nemcova",
				"Say and do something positive that will help the situation; it doesn't take any brains to complain. ~ Robert A. Cook",
				"Regardless what technology is, I like analog too. ~ Lou Gramm",
				"Any sufficiently advanced technology is indistinguishable from magic. ~Arthur C. Clarke",
			],
			success: [
				"The road to success is always under construction. ~ Lily Tomlin",
				"The first step toward success is taken when you refuse to be a captive of the environment in which you first find yourself. ~ Mark Caine",
				"People who are really serious about software should make their own hardware. ~Alan Toffler",
				"Nothing is as seductive as the assurance of success. ~ Gertrude Himmelfarb",
				"Be a yardstick of quality. Some people aren't used to an environment where excellence is expected. ~ Steve Jobs",
				"I'll tell you, there is nothing better in life than being a late bloomer. I believe that success can happen at any time and at any age. ~ Salma Hayek",
				"Work out your own salvation. Do not depend on others. ~ Gautam Buddha",
				"No one who achieves success does so without acknowledging the help of others. The wise and confident acknowledge this help with gratitude. ~ Alfred North Whitehead",
				"Success is not final, failure is not fatal: it is the courage to continue that counts. ~ Winston Churchill",
				"Success is finding satisfaction in giving a little more than you take. ~ Christopher Reeve",
			]
		},
	},


	// Define start sequence.
	start: function() {
		Log.info("Starting module: " + this.name);

		this.lastQuoteIndex = -1;

		// Schedule update timer.
		var self = this;
		setInterval(function() {
			self.updateDom(self.config.fadeSpeed * 1000);
		}, this.config.updateInterval * 1000);
	},

	/* randomIndex(quotes)
	 * Generate a random index for a list of quotes.
	 *
	 * argument quotes Array<String> - Array with quotes.
	 *
	 * return Number - Random index.
	 */
	randomIndex: function(quotes) {
		if (quotes.length === 1) {
			return 0;
		}

		var generate = function() {
			return Math.floor(Math.random() * quotes.length);
		};

		var quoteIndex = generate();

		while (quoteIndex === this.lastQuoteIndex) {
			quoteIndex = generate();
		}

		this.lastQuoteIndex = quoteIndex;

		return quoteIndex;
	},

	/* quoteArray()
	 * Retrieve an array of quotes for the time of the day.
	 *
	 * return quotes Array<String> - Array with quotes for the time of the day.
	 */
	quoteArray: function() {
		if (this.config.category == 'random') {
			return this.config.quotes[Object.keys(this.config.quotes)[Math.floor(Math.random() * Object.keys(this.config.quotes).length)]];
		} else {
			return this.config.quotes[this.config.category];
		}
	},

	/* randomQuote()
	 * Retrieve a random quote.
	 *
	 * return quote string - A quote.
	 */
	randomQuote: function() {
		var quotes = this.quoteArray();
		var index = this.randomIndex(quotes);
		return quotes[index].split(" ~ ");
	},

	// Override dom generator.
	getDom: function() {
		var quoteText = this.randomQuote();

		var qMsg = quoteText[0];
		var qAuthor = quoteText[1];

		var wrapper = document.createElement("div");

		var quote = document.createElement("div");
		quote.className = "bright medium light";
		quote.style.textAlign = 'center';
		quote.style.margin = '0 auto';
		quote.style.maxWidth = '50%';
		quote.innerHTML = qMsg;

		wrapper.appendChild(quote);

		var author = document.createElement("div");
		author.className = "light small dimmed";
		author.innerHTML = "~ " + qAuthor;

		wrapper.appendChild(author);

		return wrapper;
	}

});
