function addDemo(id, title, command){
	id = id || ''
	title = title || id

	return new Vue({
		el: id 
		, data: {
			result : []
			, command : command || []
			, title : title
		}
		, template:`
			<h3>{{title}}</h3>
			<div v-for="res in result">
				<span v-if="k != 'error'" v-for="(k,v) in res">{{k}}:<code>{{v}}</code></span>
				<span v-if="res.error">error:<code>{{res.error}}</code></span>
			</div>
		`
		, methods : {
			add : function(res){
				this.result.push(res)
			}
		}
		, ready : function(){
			for(var i in this.command){
				var command = this.command[i]
				var res = {input:command}
				try{
					res.output = eval(command)
					if(typeof(res.output) == 'object')
						res.output = JSON.stringify(res.output)

				}catch(e){
					res.error = e
				}
				
				this.add(res)
			}	
		}
	})
}

