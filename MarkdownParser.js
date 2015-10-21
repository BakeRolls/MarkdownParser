class MarkdownParser {
	constructor(text) {
		this.text = text;
		this.elements = [];
		this.regex = {
			links: {
				regex: /\[(.+?)\]\((.+?)(\s"?(.+?)"?)?\)/gi,
				parts: { found: 0, text: 1, url: 2, alt: 4 }
			}
		};

		this.query();
	}

	query() {
		for(let element of Object.keys(this.regex)) {
			let match;

			this.elements[element] = [];

			while(match = this.regex[element].regex.exec(this.text)) {
				let parts = { index: match.index };

				for(let part of Object.keys(this.regex[element].parts))
					parts[part] = match[this.regex[element].parts[part]];

				this.elements[element].push(parts);
			}
		}
	}

	generateLink(link) {
		let md = '';

		md  = '[' + link.text + ']';
		md += '(' + link.url;
		md += (link.alt) ? ' "' + link.alt + '"' : '';
		md += ')';

		return md;
	}

	replace(string, index, length, substitute) {
		return string.substring(0, index) + substitute + string.substring(index + length);
	}

	render() {
		this.elements.links.reverse();

		let text = this.text;

		for(let link of this.elements.links) {
			console.log(this.generateLink(link))
			text = this.replace(text, link.index, link.found.length, this.generateLink(link));
		}

		this.elements.links.reverse();

		return text;
	}
}
