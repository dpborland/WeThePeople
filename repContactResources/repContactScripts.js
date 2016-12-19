var addressSearch = document.querySelector(".addressSearch");
var queryResponse;

//Google Civic Info API scripts

function makeRequest() {
	let addressToSearch = document.querySelector(".addressSearchBar");
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

addressSearch.addEventListener("submit", init, false);