# MarkdownParser

Parse and edit markdown with JS. Currently only working with links and headlines.

## Example

```html
<pre>[Then cats](https://i.imgur.com/HAyk2dh.png) take over the world nap all day. See owner, run in terror scream at teh bath kitty loves pigs lounge in doorway for bathe private parts with tongue then lick owner's face for i am the best or chase ball of string. [Purr while eating](https://i.imgur.com/HniA96t.mp4) hide at bottom of staircase to trip human. Chase laser purr while eating chase imaginary bugs hack up furballs.</pre>
```

```js
let element = document.querySelector('pre');
let parser = new MarkdownParser(element.innerHTML);

for(let link of parser.elements.links)
    if(!link.alt) link.alt = 'Purrr';

element.innerHTML = parser.render();
```

```markdown
<pre>[Then cats](https://i.imgur.com/HAyk2dh.png "Purrr") take over the world nap all day. See owner, run in terror scream at teh bath kitty loves pigs lounge in doorway for bathe private parts with tongue then lick owner's face for i am the best or chase ball of string. [Purr while eating](https://i.imgur.com/HniA96t.mp4 "Purrr") hide at bottom of staircase to trip human. Chase laser purr while eating chase imaginary bugs hack up furballs.</pre>
```