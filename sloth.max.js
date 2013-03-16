(function(context){
	'use strict';

	function sloth(){
		//some private vars
		var slice = Array.prototype.slice,
			wTop,
			wBottom,
			undef,
			delegate = context.setTimeout,
			branches = [],
			Branch = function(element, threshold, callback){
				this.element = element;
				this.threshold = threshold;
				this.callback = function(){
					callback(element);
				};
			},
			execute = function(){
				var i = branches.length,
					branch;

				if(i){
					wTop = context.scrollY;
					wBottom = wTop + context.innerHeight;

					while(i--){
						branch = branches[i];

						if (branch.visible()) {
							delegate( branch.callback, 0 );
							branches.splice(i, 1);
						}
					}
				}else{
					context.removeEventListener('scroll', execute);
				}
			};

		Branch.prototype.visible = function(){
			var elem =  this.element,
				threshold = this.threshold,
				top = elem.offsetTop - threshold,
				bottom = top + elem.offsetHeight + threshold;

			return wBottom >= top && wTop <= bottom;
		};

		//return Sloth function
		return function(params){
			if(params) {
				var elements = params.on,
					threshold = params.threshold !== undef ? params.threshold : 100,
					callback = params.callback,
					i;

				if(!elements || !callback) throw 'elements or callback missing';

				if(elements.length !== undef){
					elements = slice.call(elements);
					i = elements.length;

					while(i--) branches.push(new Branch(elements[i], threshold, callback));
				}else {
					branches.push(new Branch(elements, threshold, callback))
				}

				execute();
				branches.length && context.addEventListener('scroll', execute);
			}
		}
	}

	if(context.define && context.define.amd) {
		context.define('sloth', sloth);
	}else{
		context.sloth = sloth();
	}
})(this);