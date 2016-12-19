var addressToSearch = document.querySelector(".addressSearchBar");
var addressSearch = document.querySelector(".addressSearch");
var queryResponse;

//Google Civic Info API scripts

function makeRequest() {
	let request = gapi.client.civicinfo.representatives.representativeInfoByAddress({ 'address': addressToSearch.value});
	request.then(function(response) {
        queryResponse = response;
	});
}

function init() {
	gapi.client.setApiKey("AIzaSyCIL7jjwmYLVQW8XHqn6zBX9pp0264RJoM");
	gapi.client.load("civicinfo", "v2").then(function() { 
		console.log("loaded"); 
	});
}

let hello = function() {
	console.log("hello"); 
}

addressSearch.addEventListener("submit", hello, false);