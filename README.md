COML
===

Hypertext Markup - in CoffeeScript!

COML allows you to write your HTML as valid coffeescript, here is an example:

```coffeescript
Coml = require('../lib/coml').Coml

console.log new Coml(root).parse ->
	html ->
		head ->
			title -> 'This is the title'

		body ->
			text 'This will simply add some text'
			h1 -> 'All your favourite tags are included'
			h2 -> 'The nesting is made using functions'
		
			p ->
				span '.smalltext#id', ->
					'We can use HAML like syntax for class and ids'
		
			div '.class#id', {further: 'attributes', are: 'added', like: 'this'}, -> 
				'Just remember those commas'
		
			div '.class',
				its: 'also worth noting'
				coffescript: 'lets you use this'
				syntax: 'for objects and so attributes',
					-> 'And this text will be put inside the div'
```

results in:

```html
<html>
	<head>
		<title>This is the title</title>
	</head>
	<body>
		This will simply add some text
		<h1>All your favourite tags are included</h1>
		<h2>The nesting is made using functions</h2>
		<p>
			<span class='smalltext' id='id'>We can use HAML like syntax for class and ids</span>
		</p>
		<div class='class' id='id' further='attributes' are='added' like='this'>
			Just remember those commas
		</div>
		<div class='class' its='also worth noting' coffescript='lets you use this' syntax='for object and so attributes'>
			And this text will be put inside the div
		</div>
	</body>
</html>
```
```
