define('Sloth', function(){

	//some private vars
	var slice = Array.prototype.slice,
		win = window,
		scr = win.screen,
		undef,
		delegate = win.setTimout,
		branches = [],
		Branch = function(element, threshold, callback){
			this.element = element;
			this.threshold = threshold;
			this.callback = function(){
				callback(element);
			};
		},
		execute = function(event){
			var i = branches.length-1,
				branch;
			console.time('call')
			while(branch = branches[i--]){
				if(branch.isVisible()) {
					console.log(branch);
					delegate(branch.callback,0);
					branches.splice(i, 1);
				}
			}
			console.timeEnd('call')
		};

	Branch.prototype.isVisible = function(){
		return (win.scrollY + scr.availHeight >= this.element.offsetTop - this.threshold);
	};

	var setup = function(){
		win.addEventListener('scroll', execute);

		if(win.scrollY == 0 ) execute();
		setup = undef;
	};

	//return Sloth function
	return function(params){
		if(params) {
			var elements = params.on,
				threshold = params.threshold !== undef ? params.threshold : 100,
				callback = params.callback;

			if(!elements) throw 'No elements passed';
			if(!callback) throw 'No callback passed';

			if(elements instanceof NodeList){
				var i = elements.length;

				while(i--) {
					branches.push(new Branch(elements[i], threshold, callback))
				}
			}else {
				branches.push(new Branch(elements, threshold, callback))
			}

			setup && setup();
		} else{
			throw 'Gimme some data';
		}

	}
});


//Sloth({
// 	on: [], required
//  threshold: 100, default: 100
//  callback: function(){}, required
//
// })