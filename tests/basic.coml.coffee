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
				syntax: 'for object and so attributes',
					-> 'And this text will be put inside the div'
