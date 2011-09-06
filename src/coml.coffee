tags = ['a','abbr','acronym','address','applet','area','article','aside','audio','b','base','basefont','bdo','big','blockquote','body','br','button','canvas','caption','center','cite','code','col','colgroup','command','datalist','dd','del','details','dfn','dir','div','dl','dt','em','embed','fieldset','figcaption','figure','font','footer','form','frame','frameset','h1','h2','h3','h4','h5','h6','head','header','hgroup','hr','html','i','iframe','img','input','ins','keygen','kbd','label','legend','li','link','map','mark','menu','meta','meter','nav','noframes','noscript','object','ol','optgroup','option','output','p','param','pre','progress','q','rp','rt','ruby','s','samp','script','section','select','small','source','span','strike','strong','style','sub','summary','sup','table','tbody','td','textarea','tfoot','th','thead','time','title','tr','tt','u','ul','var','video','wbr','xmp']

class Stream
	constructor: ->
		@stream = ""
	append: (data) ->
		@stream += data
	get: -> @stream
	reset: -> @stream = ""


# Every time a new Coml object is created, we make all the tag functions, bind their output
# to a stream contained within this specific object then shove all the functions into the
# root object of the file/view so they can be used as barewords. This allows us to not use global
# objects to calculate the result.

class Coml
	constructor: (par) ->
		@out = new Stream();
		par[tag] = mkfunc(tag, @out) for tag in tags
		par.text = (txt) => @out.append txt

	parse: (f) ->
		@out.reset()
		f()
		html = @out.get()
		@out.reset()
		html

exports.Coml = Coml

mkfunc = (name, out) ->
	(args...) ->
		attrs = {}
		out.append "<#{name}"
		
		console.log args
		
		if args.length > 1
			for i in [0..args.length-2]
				arg = args[i]
				switch typeof arg
				
					# .class#id type things
					when 'string'
						classname = /\.([\w-]+)/.exec arg
						if classname
							attrs.class = classname[1]

						id = /#([\w-]+)/.exec arg
						if id
							attrs.id = id[1]
					
					# {further: 'attribute'} type things
					when 'object'
						for key, value of arg
							attrs[key] = value

			for attr, value of attrs
				out.append " #{attr}='#{value}'"
			
		out.append '>'
			
		lastarg = args[args.length-1];
		
		if typeof lastarg isnt 'function'
			error "Last argument of #{name} must be a function"
			return
		
		res = lastarg()
		
		if typeof res is 'string'
			out.append res
			
		out.append "</#{name}>"
		return

error = (msg) ->
	console.log "Error #{msg}"
