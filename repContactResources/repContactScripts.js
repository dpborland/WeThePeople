var addressSearch = document.querySelector(".addressSearch");
var queryResponse;

//Google Civic Info API scripts

function makeRequest(e) {
	let addressSearchBar = document.querySelector(".addressSearchBar");
	let addressToSearch = addressSearchBar.value;
	let urlAddress = addressToSearch.split(" ").join("+");
	let request = gapi.client.civicinfo.representatives.representativeInfoByAddress({ 'address': urlAddress});
	request.then(function(response) {
        queryResponse = response;
        console.log(queryResponse);
	});
	console.log(urlAddress);
	e.preventDefault();
}

function init() {
	gapi.client.setApiKey("AIzaSyCIL7jjwmYLVQW8XHqn6zBX9pp0264RJoM");
	gapi.client.load("civicinfo", "v2").then(function() { 
		console.log("loaded"); 
	});
}

addressSearch.addEventListener("submit", makeRequest, false);