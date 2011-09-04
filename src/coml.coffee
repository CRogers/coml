root = exports ? this

tags = ['a','abbr','acronym','address','applet','area','article','aside','audio','b','base','basefont','bdo','big','blockquote','body','br','button','canvas','caption','center','cite','code','col','colgroup','command','datalist','dd','del','details','dfn','dir','div','dl','dt','em','embed','fieldset','figcaption','figure','font','footer','form','frame','frameset','h1','h2','h3','h4','h5','h6','head','header','hgroup','hr','html','i','iframe','img','input','ins','keygen','kbd','label','legend','li','link','map','mark','menu','meta','meter','nav','noframes','noscript','object','ol','optgroup','option','output','p','param','pre','progress','q','rp','rt','ruby','s','samp','script','section','select','small','source','span','strike','strong','style','sub','summary','sup','table','tbody','td','textarea','tfoot','th','thead','time','title','tr','tt','u','ul','var','video','wbr','xmp']

tagsr = ['(text)']
tagsr.push '(' + tag + ')' for tag in tags

rstr = '(\\n(\\s|(return))+(' + (tagsr.join '|') + '))\\('
regex = new RegExp rstr, 'g'
		

root.coml = (f) ->

	# This is evil
	# We change all the "tag(" functions to "tag.call(this, " so the output object can
	# be propogated down the coml tree

	fstr = f.toString().replace(regex, '$1.call(this, ');
	[start, fstr..., end] = fstr.split '\n'
	f = new Function '', fstr.join '\n'
	
	output = {}
	output.out = ''
	f.call output
	output.out

mkfunc = (name) ->
	(args...) ->
		attrs = {}
		
		@out += "<#{name}"
		
		for i in [0..args.length]
			arg = args[i]
			switch typeof arg
				when 'string'
					classname = (/\.([\w-]+)/.exec arg)[1]
					if classname
						attrs.class = classname
			
					id = (/#([\w-]+)/.exec arg)[1]
					if id
						attrs.id = id
		
				when 'object'
					for key, value of arg
						attrs[key] = value
				
				when 'function'
					if i isnt args.length-1
						error 'function should be last arg for tag'
						return
					
					for attr, val of attrs
						@out += " #{attr}='#{value}'"
					
					console.log this
					@out += '>' + arg.call this
		
		@out += "</#{name}>"

root[tag] = mkfunc(tag) for tag in tags

root.text = (txt) -> this.out += txt


error = (msg) ->
	console.log "Error #{msg}"
