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
	votingGuide: ["This is the official US government's guide to voting and elections.  Find answers to common questions about voting in the United States.",
		"repContactResources/images/usagovscreen.jpg", "USA.gov voting and elections guide screenshot"],

	eac: ["Among other things, the Electoral Assistance Commission serves as a national clearinghouse and information resource for election administration.  Their website offers a wealth of practical resources for voters, as well as guidelines for offical election administration procedures.",
		"repContactResources/images/eacscreen.jpg", "EAC homepage screenshot"],

	votefouroneone: ["Vote411 was created by the League of Women Voters, and provides nonpartisan information to the public with both general and state-specific information on much of the election process.",
		"repContactResources/images/vote411screen.jpg", "vote411 homepage screenshot"],

	fec: ["The Federal Elections Commission is an independent regulatory agency that administers and enforces federal campaign finance laws.  Their website allows users to learn about these laws, and to see campaign finance disclosures.",
		"repContactResources/images/fecscreen.jpg", "FEC homepage screenshot"],

	whitehouse: ["This is the official homepage of the White House, and by extension the Executive Branch.  Users can find out more about the current administration, as well as past administrations.",
		"repContactResources/images/whitehousescreen.jpg", "White House homepage screenshot"],

	senate: ["The homepage of the US Senate.  Go here to look up information on any acting Senator, learn about active legislation, watch a live floor webcast, and more.",
		"repContactResources/images/senatescreen.jpg", "Senate homepage screenshot"],

	house: ["This is the hompage of the US House of Representatives.  Users can find out information about current Representatives, learn about legislation, and watch live webcasts of the House in session.",
		"repContactResources/images/housescreen.jpg", "House of Reps homepage screenshot"],

	supremecourt: ["Homepage of the US Supreme Court.  Go here to learn about the Court and the Justices, read past opinions, and view the upcoming schedule.",
		"repContactResources/images/supremecourtscreen.jpg", "Supreme Court homepage screenshot"],

	sixtyfive: ["The 65 is committed to making Congress work for us by mobilizing with a shared common mission, called a Weekly Call to Action.  Users can find out what issues are currently being persued, check out calling/writing scripts, and retrieve contact information for their Senators.",
		"repContactResources/images/sixtyfivescreen.jpg", "The 65 homepage screenshot"],

	indivisible: ["Indivisible tried to demystify conressional advocacy but providing a practical guide for local citizen groups.  These groups have been responsible for organizing many of the town halls that have been in the news this February.",
		"repContactResources/images/indivisiblescreen.jpg", "Indivisible homepage screenshot"],

	knock: ["Knock on Every Door is an attempt to build a largescale, grassroots, volunteer led effort to reach out to potential first time voters.  Users can sign up to receive more information on volunteering with local groups.",
		"repContactResources/images/knockscreen.jpg", "Knock on Every Door homepage screenshot"],

	run: ["Run for Something advocates for, and supports, young people (those 35 and under) running for elected office. ",
		"repContactResources/images/runscreen.jpg", "Run for Something homepage screenshot"],

	threeonefouraction: ["The goal of 314 Action is to strengthen communication between the STEM community, the public, and elected officials.  One of the ways they hope to acheive this goal is but advocating for STEM professionals to run for office.",
		"repContactResources/images/314screen.jpg", "314 Action homepage screenshot"]

}

function linkInfoFill(e) {
	let linkName = e.target;
	let linkInfo = document.querySelector(".linksDescriptionsText");
	let linkImg = document.querySelector(".linksScreenshot");

	linkInfo.style.opacity = "0";
	linkInfo.textContent = linksObject[linkName.id][0];
	linkImg.src = linksObject[linkName.id][1];
	linkImg.alt = linksObject[linkName.id][2];
	window.setTimeout(function() {
		linkImg.style.opacity = "1";
		linkInfo.style.opacity = "1";
    }, 50);

}

function linkInfoClear() {
	let linkInfo = document.querySelector(".linksDescriptionsText");
	let linkImg = document.querySelector(".linksScreenshot");
	linkInfo.textContent = "Hover over a link for more information";
	linkImg.style.opacity = "0";
}

if (document.querySelector(".linksWrapper")) {
	let link = Array.from(document.querySelectorAll(".linksLink"));
	link.map(function(x) {
        x.addEventListener("mouseover", linkInfoFill, false);
        x.addEventListener("mouseout", linkInfoClear, false);
    });
}