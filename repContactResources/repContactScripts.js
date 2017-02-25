var addressSearch = document.querySelector(".addressSearch");
var queryResponse;

//Google Civic Info API scripts

function makeRequest(e) {
	let addressSearchBar = document.querySelector(".addressSearchBar");
	let addressToSearch = addressSearchBar.value;
	let request = gapi.client.civicinfo.representatives.representativeInfoByAddress({ 'address': addressToSearch});
	request.then(function(response) {
        queryResponse = response;
		queryResponse.result.officials.forEach(function(e) { console.log(e.name, e.urls[0]); });
	});
	e.preventDefault();
}

function init() {
	gapi.client.setApiKey("AIzaSyCIL7jjwmYLVQW8XHqn6zBX9pp0264RJoM");
	gapi.client.load("civicinfo", "v2").then(function() { 
		console.log("loaded"); 
	});
}

if (addressSearch != null) {
	addressSearch.addEventListener("submit", makeRequest, false);
};



// Links page scripts

function linkInfoFill(e) {
	let linkName = e.target;
	console.log(linkName);
}

if (document.querySelector(".linksWrapper")) {
	let link = document.querySelector(".linksLink");
	link.addEventListener("mouseover", linkInfoFill, false);
}