function addDemo(id, title, command, expect){

	id = id || ''
	title = title || id

	var box = document.createElement("div");
	var name = id.split('#')
	box.id = name[1]
	document.body.appendChild(box)

	return new Vue({
		el: id 
		, data: {
			result : []
			, command : command || []
			, expect : expect || []
			, title : title
			, label : ['input', 'output', 'error', 'expect', 'constructor']
		}
		, template:`
			<div class="container">
				<h3>{{title}}</h3>
				<table class="table table-bordered table-striped">
					<thead>
						<tr>
							<th v-for="k in label">
								<span class="label label-info" v-if="k == 'input'">{{k}}</span>
								<span class="label label-success" v-if="k == 'output'">{{k}}</span>
								<span class="label label-important" v-if="k == 'error'">{{k}}</span>
								<span class="label" v-if="k != 'error' && k != 'output' && k != 'input'">{{k}}</span>
							</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="res in result">
							<td v-for="k in label"><code v-if="res[k] !== undefined">{{res[k]}}</code></td>
						</tr>
					</tbody>
				</tabel>
			</div>
		`
		, methods : {
			add : function(res){
				this.result.push(res)
			}
		}
		, ready : function(){
			for(var i in this.command){
				var res = {input:this.command[i], expect:this.expect[i]}
				try{
					res.output = eval(res.input)
					res['constructor'] = res.output.constructor.name

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

