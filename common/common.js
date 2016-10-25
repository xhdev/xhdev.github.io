function init(){
	document.write('<script src="https://xhdev.github.io/common/vue.min.js"></script>')

	window.onload = function(){
		addNavbar()
		addFooter()
	}
}

init() 

function addNavbar(){
	var child = document.body.childNodes[0]
	var box = document.createElement("div")
	box.id = 'navbar' 
	document.body.insertBefore(box, child)

	new Vue({
		el: '#navbar'
		, template : `
			<div class="navbar navbar-inverse">
				<div class="navbar-inner">
					<a class="brand" href="/">xhdev.github.io</a>
				</div>
			</div>
		`
	})
}

function addFooter(){
	var box = document.createElement("div")
	box.id = 'footer' 
	document.body.appendChild(box)

	new Vue({
		el: '#footer'
		, data: {
			CSSData: {
				'border':['多重边框']
				, 'background':['背景条纹', '复杂的背景图案']
				, 'float':['清除浮动']
			}
			, JSData : {
				'基础':[]
				, '深入':['语法','值', '运算符', 'Boolean', 'Number', 'String', /*'语句', '异常捕获',*/ 'Function', '变量', '对象与继承', 'Array', 'RegExp', 'Date', 'Math', 'JSON', '标准全局变量', '编码']
			}
		}
		, template : `
		<div class="container">
			<div class="hero-unit">
				<h2>CSS</h2>
				<div class="row">
					<div class="span4" v-for="(k, value) in CSSData">
						<div v-if="value.length > 0">
							<h3>{{k}}</h3>
							<ul>
								<li v-for="v in value"><a href='/css/{{k}}/{{v}}.html'>{{v}}</a></li>
							</ul>
						</div>
						<div v-else>
							<h4><a href="/css/{{k}}.html">{{k}}</a></h4>
						</div>
					</div>

				</div>

				<h2>JS</h2>
				<div class="row">
					<div class="span4" v-for="(k, value) in JSData">
						<div v-if="value.length > 0">
							<h3>{{k}}</h3>
							<ul>
								<li v-for="v in value"><a href='/js/{{k}}/{{v}}.html'>{{v}}</a></li>
							</ul>
						</div>
						<div v-else>
							<h4><a href="/js/{{k}}.html">{{k}}</a></h4>
						</div>
					</div>

				</div>
			</div>
		</div>
		`
	})
}

function addDemo(id, text, command, expect, js){

	id = id || ''

	if(typeof(text) == 'string')
		text = {
			title : text
		}

	var box = document.createElement("div")
	var name = id.split('#')
	box.id = name[1]
	document.body.appendChild(box)

	return new Vue({
		el: id 
		, data: {
			result : []
			, command : command || []
			, expect : expect || []
			, text : text
			, label : ['input', 'output', 'error', 'expect', 'typeof', 'constructor']
			, js : js || ''
		}
		, template:`
			<div class="container">
				<h3>{{{ text.title }}}</h3>
				<p v-if="text.intro" v-for="intro in text.intro">{{{ intro }}}</p>
				<pre v-if="js">{{js}}</pre>
				<table v-if="command && command.length" class="table table-bordered table-striped">
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
				</table>
			</div>
		`
		, methods : {
			add : function(data){
				this.result.push(data)
			}
		}
		, ready : function(){
			if(this.js){
				var jsResult = eval(this.js)
			}

			for(var i in this.command){
				var data = {input:this.command[i], expect:this.expect[i]}
				try{

					data.output = eval(data.input)

					data['typeof'] = typeof(data.output)

					if(data.output !== undefined && data.output !== null){
						data['constructor'] = data.output.constructor.name
					}

					if(typeof(data.output) == 'object')
						data.output = JSON.stringify(data.output)

				}catch(e){
					data.error = e
				}
				
				this.add(data)
			}	
		}
	})
}
