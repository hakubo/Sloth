define('Sloth', function(){

	//some private vars
	var undef,
		branches = [],
		Branch = function(elements, threshold, callback){
			this.elements = elements;
			this.threshold = threshold;
			this.callback = callback;
		};

	var setup = function(){
		window.addEventListener('scroll', function(event){

		});

		setup = undef;
	};

	//return Sloth function
	return function(params){
		var elements = params.on,
			threshold = params.threshold !== undef ? params.threshold : 100,
			callback = params.callback;

		if(!elements) throw 'No elements passed';
		if(!callback) throw 'No callback passed';

		setup && setup();

		if(elements instanceof Array){
			var i = elements.length;

			while(i--) {
				branches.push(new Branch(elements[i], threshold, callback))
			}
		}else {
			branches.push(new Branch(elements, threshold, callback))
		}
	}
});


//Sloth({
// 	on: [], required
//  threshold: 100, default: 100
//  callback: function(){}, required
//
// })