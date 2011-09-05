Coml = require('../lib/coml').Coml

console.log new Coml(root).parse ->
	html ->
		head ->
			title -> 'Testestest'

		body ->
			h1 -> 'This is a test'
			h2 -> 'How in the hell are we going to solve this problem'
			div -> 
				'Yes, now we can write html as valid coffeescript'
