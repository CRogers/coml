Coml = require('../lib/coml').Coml

console.log new Coml(root).parse ->
	html ->
		head ->
			title -> 'Testestest'

		body ->
			text "text test"
			h1 -> 'This is a test'
			h2 -> 'How in the hell are we going to solve this problem'
			div '.class#id', {more: 'attributes'}, -> 
				'Yes, now we can write html as valid coffeescript'
