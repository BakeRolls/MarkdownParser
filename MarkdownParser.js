class MarkdownParser {
	constructor(text) {
		this.text = text;
		this.elements = [];
		this.regex = {
			headlines: {
				regex: /(#+)\s(.+?)\n/gi,
				parts: { found: 0, level: 1, text: 2 }
			},
			links: {
				regex: /\[(.+?)\]\((.+?)(\s"?(.+?)"?)?\)/gi,
				parts: { found: 0, text: 1, url: 2, alt: 4 }
			}
		};

		this.query();
	}

	query() {
		this.elements = [];

		for(let element of Object.keys(this.regex)) {
			let match;

			//this.elements[element] = [];

			while(match = this.regex[element].regex.exec(this.text)) {
				let parts = {
					type: element,
					index: match.index
				};

				for(let part of Object.keys(this.regex[element].parts))
					parts[part] = match[this.regex[element].parts[part]];

				//this.elements[element].push(parts);
				this.elements.push(parts);
			}
		}

		this.elements.sort(function(a, b) {
			return a.index > b.index;
		});
	}

	generateTag(tag) {
		let md = '';

		switch(tag.type) {
			case 'links':
				md  = '[' + tag.text + '](' + tag.url;
				md += (tag.alt) ? ' "' + tag.alt + '"' : '';
				md += ')';
				break;

			case 'headlines':
				md = tag.level + ' ' + tag.text;
				break;
		}

		return md;
	}

	generateHeadline(headline) {
		return headline.level + ' ' + headline.text;
	}

	replace(string, index, length, substitute) {
		return string.substring(0, index) + substitute + string.substring(index + length);
	}

	get(type) {
		return this.elements.filter(function(a) {
			return a.type == type;
		})
	}

	render() {
		this.elements.reverse();

		let text = this.text;

		for(let element of this.elements)
			text = this.replace(text, element.index, element.found.length, this.generateTag(element));

		this.elements.reverse();

		return text;
	}
}
