tags = ['a','abbr','acronym','address','applet','area','article','aside','audio','b','base','basefont','bdo','big','blockquote','body','br','button','canvas','caption','center','cite','code','col','colgroup','command','datalist','dd','del','details','dfn','dir','div','dl','dt','em','embed','fieldset','figcaption','figure','font','footer','form','frame','frameset','h1','h2','h3','h4','h5','h6','head','header','hgroup','hr','html','i','iframe','img','input','ins','keygen','kbd','label','legend','li','link','map','mark','menu','meta','meter','nav','noframes','noscript','object','ol','optgroup','option','output','p','param','pre','progress','q','rp','rt','ruby','s','samp','script','section','select','small','source','span','strike','strong','style','sub','summary','sup','table','tbody','td','textarea','tfoot','th','thead','time','title','tr','tt','u','ul','var','video','wbr','xmp']


class Coml
	constructor: (par) ->
		@out = {stream: []};
		par[tag] = mkfunc(tag, @out) for tag in tags
		par.text = (txt) -> @out.stream += txt

	parse: (f) ->
		@out.stream = []
		f()
		html = @out.stream
		@out.stream = []
		html

exports.Coml = Coml

mkfunc = (name, out) ->
	(args...) ->
		attrs = {}
		out.stream.push "<#{name}"
		
		console.log args
		
		if args.length > 1
			for i in [0..args.length-2]
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
		
		for attr, val of attrs
				out.stream.push " #{attr}='#{value}'"
		out.stream.push '>'
		
		console.log out.stream.join ("")
		lastarg = args[args.length-1]
				
		if typeof lastarg is 'function'					
			out.stream.push lastarg() + "</#{name}>"
		else
			error "Last arg must be function"


error = (msg) ->
	console.log "Error #{msg}"
