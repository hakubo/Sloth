Library to lazy initialize components of a webpage when they become visible

it listens to scroll event only when some callbacks were registered

Features:
- no dependencies
- fires callback for elements that become visible
- support for threshold - so it can fire callback right before or after an element is visible
- uses AMD
- uses global sloth if no amd defined
- removes listener when it has nothing to do
- works when scrolling down and up
- 459B(!) - minified and gzipped

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
    		threshold: 100,
    		callback: function(element){
    			element.className += ' visible';
    		}
    	});
	});

or if you don't use any amd framework

		sloth({
    		on: document.getElementsByTagName('div'),
    		threshold: 100,
    		callback: function(element){
    			element.className += ' visible';
    		}
    	});

Parameters:

on - element or elements that you want to fire callback on
it can be a single element, a NodeList or an regular array of elements
callback will be fired for all of these elements

threshold - a threshold that sloth should use 100 is a default value
means that callback will be fired when element is 100px away from being visible
you can also pass negative number so callback will be called after an element is visible

callback - is a callback to fire when an element is visible (duh...)
there is one parameter passed to callback and this is an element that has just become visible
so you don't have to guess what to do on which element



As seen on
http://microjs.com/#sloth
