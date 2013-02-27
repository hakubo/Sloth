Library to lazy initialize components of a webpage when they become visible

it listens to scroll event only when some callbacks were registered


Basic usage:

	Sloth({
		on: element/array of element/node list,
		threshold: no of pixels [OPTIONAL] - default: 100
		callback: function to call when element is visible - as parameter it gets element that become visible
	});

ie:

	Sloth({
		on: document.getElementsByTagName('div'),
		threshold: 100
		callback: function(element){
			element.className += ' visible';
		}
	});

