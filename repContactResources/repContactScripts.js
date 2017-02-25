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

var linksObject = {
	votingGuide: ["This is the official US gov't guide to voting and elections.",
		"repContactResources/images/sixtyfivescreen.jpg"]
}

function linkInfoFill(e) {
	let linkName = e.target;
	let linkInfo = document.querySelector(".linksDescriptionsText");
	let linkImg = document.querySelector(".linksScreenshot");
	/*linkInfo.textContent = linkName.id;
	console.log(linkName.textContent);*/
	linkInfo.textContent = linksObject[linkName.id][0];
	linkImg.src = linksObject[linkName.id][1];
	window.setTimeout(function() {
		linkImg.style.width = "100%";
    }, 250);

}

function linkInfoClear() {
	let linkInfo = document.querySelector(".linksDescriptionsText");
	let linkImg = document.querySelector(".linksScreenshot");
	linkInfo.textContent = "Hover over a link for more information";
	linkImg.style.width = "0%";
}

if (document.querySelector(".linksWrapper")) {
	let link = Array.from(document.querySelectorAll(".linksLink"));
	link.map(function(x) {
        x.addEventListener("mouseover", linkInfoFill, false);
        x.addEventListener("mouseout", linkInfoClear, false);
    });
}