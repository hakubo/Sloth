describe('Sloth library', function(){

	window.addEventListener = function(event, callback){
		callback();
	};

	window.setTimeout = function(callback) {
		callback();
	};

	it('is defined', function(){
		expect(sloth).toBeDefined();
		expect(typeof sloth).toBe('function');
	});

	it('throws exceptions when required parameters are not passed', function(){
		expect(function(){
			sloth()
		}).toThrow('Gimme some data');

		expect(function(){
			sloth({
				on: document.body
			})
		}).toThrow('elements or callback missing');

		expect(function(){
			sloth({
				callback: function(){

				}
			})
		}).toThrow('elements or callback missing');
	});

	it('does nothing when no elements are registered', function(){
		scrollTo(0,0);
		expect(document.getElementById('testDiv').className).toEqual('', 'class should be empty');
	});

	it('fires callback when element becomes visible', function(){
		jasmine.Clock.useMock();

		sloth({
			on: document.getElementById('testDiv'),
			callback: function(element){
				element.className = 'passed';
			}
		});

		jasmine.Clock.tick(1);

		expect(document.getElementById('testDiv').className).toEqual('passed', 'class should equal passed');
	});

	it('does nothing to elements that are out of view port', function(){
		jasmine.Clock.useMock();

		sloth({
			on: document.getElementById('outofviewTest'),
			callback: function(element){
				element.className = 'passed';
			}
		});

		jasmine.Clock.tick(1);

		expect(document.getElementById('outofviewTest').className).toEqual('', 'class passed should not be added to elemnt out of view');
	})
});