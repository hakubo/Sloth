Library to lazy initialize components of a webpage when they become visible

it listens to scroll event only when some callbacks were registered


Features:
- fires callback for elements that become visible
- support for threshold - so it can fire callback right before element is visible
- uses AMD
- removes listener when it has nothing to do
- works when scrolling down and up
- 323B(!) - minified and gzipped

Basic usage:


	sloth({
		on: element/array of element/node list,
		threshold: no of pixels [OPTIONAL] - default: 100
		callback: function to call when element is visible - as parameter it gets element that become visible
	});

example:

	require(['sloth'], function(sloth){
		sloth({
    		on: document.getElementsByTagName('div'),
    		threshold: 100
    		callback: function(element){
    			element.className += ' visible';
    		}
    	});
	});

