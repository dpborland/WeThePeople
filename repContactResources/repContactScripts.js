var addressSearch = document.querySelector(".addressSearch");
var queryResponse;

//Google Civic Info API scripts

function makeRequest(e) {
	let addressSearchBar = document.querySelector(".addressSearchBar");
	let addressToSearch = addressSearchBar.value;
	let request = gapi.client.civicinfo.representatives.representativeInfoByAddress({ 'address': addressToSearch});
	request.then(function(response) {
		queryResponse = response;
		return queryResponse;
	}).then(function() {
		localStorage.setItem("queryResponse", JSON.stringify(queryResponse));
        window.location.href = "http://contactmyreps.com/results.html";
	});
	e.preventDefault();

	/*.then(constructResultsTemplate()).then(resultsTemplateFill());
	e.preventDefault();

	queryResponse === undefined ?
        alert("Please enter a valid address")
	: (
		localStorage.setItem("queryResponse", JSON.stringify(queryResponse)),
        window.location.href = "http://contactmyreps.com/results.html"
	);*/

}

if (window.location.href === "http://contactmyreps.com/results.html") {
	document.addEventListener("DOMContentLoaded", constructResultsTemplate, false)
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

	votefouroneone: ["Vote411 was created by the League of Women Voters, and provides general and state-specific nonpartisan information to the public on much of the election process.",
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

	indivisible: ["Indivisible tries to demystify conressional advocacy by providing a practical organizational guide for local citizen groups.  Indivisible groups have been responsible for organizing many of the town halls that have been in the news this February.",
		"repContactResources/images/indivisiblescreen.jpg", "Indivisible homepage screenshot"],

	knock: ["Knock on Every Door is an attempt to build a largescale, grassroots, volunteer led effort to reach out to potential first time voters.  Users can sign up to receive more information on volunteering with local groups.",
		"repContactResources/images/knockscreen.jpg", "Knock on Every Door homepage screenshot"],

	run: ["Run for Something advocates for, and supports, young people (those 35 and under) running for elected office. ",
		"repContactResources/images/runscreen.jpg", "Run for Something homepage screenshot"],

	threeonefouraction: ["The goal of 314 Action is to strengthen communication between the STEM community, the public, and elected officials.  They hope to acheive this goal in part by advocating for STEM professionals to run for office.",
		"repContactResources/images/314screen.jpg", "314 Action homepage screenshot"]

}

function linkInfoFill(e) {
	let linkName = e.target;
	let linkInfo = document.querySelector(".linksDescriptionsText");
	let linkImg = document.querySelector(".linksScreenshot");
	let linkInfoPlaceholder = document.querySelector(".linksDescriptionsPlaceholder");

	linkInfo.textContent = linksObject[linkName.id][0];
	linkImg.src = linksObject[linkName.id][1];
	linkImg.alt = linksObject[linkName.id][2];
	window.setTimeout(function() {
		linkInfoPlaceholder.style.opacity = "0";
		linkImg.style.opacity = "1";
		linkInfo.style.opacity = "1";
    }, 100);

}

function linkInfoClear() {
	let linkInfo = document.querySelector(".linksDescriptionsText");
	let linkInfoPlaceholder = document.querySelector(".linksDescriptionsPlaceholder");
	let linkImg = document.querySelector(".linksScreenshot");

	linkInfo.style.opacity = "0";
	linkInfoPlaceholder.style.opacity = "1";
	linkImg.style.opacity = "0";

}

if (document.querySelector(".linksWrapper")) {
	let link = Array.from(document.querySelectorAll(".linksLink"));
	link.map(function(x) {
        x.addEventListener("mouseover", linkInfoFill, false);
        x.addEventListener("mouseout", linkInfoClear, false);
    });
}


//--- Puts together the basic results page ---//

function constructResultsTemplate(x) {
    let numberNeeded = x.result.officials.length;
	let template = document.querySelector(".repsWrapper");
	let contentWrapper = document.querySelector(".contentWrapper");
	let templateArray = [];

	for (var i = 0; i <= (numberNeeded - 2); i++) {
		templateArray[i] = template.cloneNode(true);
		contentWrapper.appendChild(templateArray[i]);
	}
};


//--- Fills the results template with appropriate info ---//

function resultsTemplateFill() {
    let repsArray = queryResponse1.result.officials;
	let repsTitle = queryResponse1.result.offices;
	let repImgContainer = document.querySelectorAll(".repImgContainer");
	let repImg = document.querySelectorAll(".repImg");
	let repName = document.querySelectorAll(".repName");
	let repTitle = document.querySelectorAll(".repTitle");
	let repAddressOptional = document.querySelectorAll(".repAddressOptionalLine");
	let repAddressOne = document.querySelectorAll(".repAddressOne");
	let repAddressTwo = document.querySelectorAll(".repAddressTwo");
	let repPhone = document.querySelectorAll(".repPhone");
	let repWebsite = document.querySelectorAll(".repWebsite");
	let socialMediaLink = Array.from(document.querySelectorAll(".socialMediaLink"));
	let socialMediaLinkGroup = [];
	let socialMediaIcon = Array.from(document.querySelectorAll(".socialMediaIcon"));
	let socialMediaIconGroup = [];
	let socialMediaCache = [];
    let titles = queryResponse1.result.offices;

// Creates new array that groups social media elements into sub-arrays for easier processing
	while (socialMediaIcon.length > 0) {
        socialMediaIconGroup.push(socialMediaIcon.splice(0, 2));
        socialMediaLinkGroup.push(socialMediaLink.splice(0, 2));
    }
//Parses the JSON response and inserts appropriate data in DOM
	repsArray.forEach(function(value, index) {
	//If an image link exists in the JSON, fills the appropriate url for the div's background image.  Otherwise adds a filler image.
		value.photoUrl === undefined ? repImgContainer[index].style = "background-image: url(repContactResources/images/flagBWBLUR2.jpg);"
			: repImgContainer[index].style = "background-image: url(" + value.photoUrl + ");";

	//Fills the img tag with the appropriate src and alt.  If no image available, adds a filler image
		value.photoUrl === undefined ? (repImg[index].src = "images/flagBWBLUR2.jpg", repImg[index].alt = "Filler Image")
			: (repImg[index].src = value.photoUrl, repImg[index].alt = value.name);

	//Fills the rep's name
		repName[index].textContent = value.name;

	//Fills rep's title and party (if available)
		value.party === undefined || value.party === "Unknown" ? repTitle[index].textContent = "Party Unknown - "
			: repTitle[index].textContent = "(" + value.party.slice(0, 1) + ") - ";

	//Fills the rep's address.  The repAddressOptional holds a place for 3 line addresses
		if (value.address === undefined) {
            repAddressOptional[index].style = "height: 0px";
            repAddressOptional[index].style = "margin-top: none";
            repAddressOne[index].textContent = "Address unknown";
        }
		else if (value.address[0].line2 === undefined) {
            repAddressOptional[index].style = "height: 0px";
            repAddressOptional[index].style = "margin-top: none";
            repAddressOne[index].textContent = value.address[0].line1;
            repAddressTwo[index].textContent = value.address[0].city + ", " + value.address[0].state + " " + value.address[0].zip;
        }
		else {
            repAddressOptional[index].textContent = value.address[0].line1;
            repAddressOne[index].textContent = value.address[0].line2;
            repAddressTwo[index].textContent = value.address[0].city + ", " + value.address[0].state + " " + value.address[0].zip;
        }

	//If a phone number exists in the JSON, it is added.  Otherwise a filler message is added
		value.phones === undefined ? repPhone[index].textContent = "Phone Number Unknown"
			: repPhone[index].textContent = value.phones;

	//Fills the rep's website
		value.urls === undefined ? (repWebsite[index].textContent = "")
			:	(repWebsite[index].textContent = "Visit my Website",
				repWebsite[index].href = value.urls[0]);

	//Fills the rep's Facebook and Twitter
		//If there isn't any social media info available, hide the elements
		value.channels === undefined ?
			(socialMediaIconGroup[index][0].classList.add("socialMediaIconInvisible"),
			socialMediaIconGroup[index][1].classList.add("socialMediaIconInvisible"))
		//Otherwise, search the Reps' channels property for Facebook and Twitter values, and add them to the social media cache
			:	(value.channels.forEach(function(x) {
					if (x.type.toLowerCase() == "facebook") {
						return socialMediaCache[0] = x;
					}
					else if (x.type.toLowerCase() == "twitter") {
						return socialMediaCache[1] = x;
					}
			}),
		//Then, for each cache array index, assign the values to the appropriate elements
			socialMediaCache.forEach(function(val, num) {
			//If the Rep only has a Twitter account, pops empty Facebook index 0, fills first div element with Twitter data, hides second div
				if ((socialMediaCache.length === 2) && (socialMediaCache[0] === undefined)) {
					socialMediaCache = socialMediaCache.pop();
                   socialMediaIconGroup[index][0].classList.add(val.type.toLowerCase() + "Icon");
                   socialMediaLinkGroup[index][0].href = "https://www." + val.type.toLowerCase() + ".com/" + val.id;
                   socialMediaIconGroup[index][1].classList.add("socialMediaIconInvisible");
               }
            //If Rep has both a Facebook and Twitter, fills first div element with Facebook data and second div element with Twitter data
               else if (socialMediaCache.length === 2) {
					socialMediaIconGroup[index][num].classList.add(val.type.toLowerCase() + "Icon");
					socialMediaLinkGroup[index][num].href = "https://www." + val.type.toLowerCase() + ".com/" + val.id;
               }
            //If Rep only has a Facebook, fills first div element, hides second
               else if (socialMediaCache.length === 1) {
					socialMediaIconGroup[index][0].classList.add(val.type.toLowerCase() + "Icon");
					socialMediaLinkGroup[index][0].href = "https://www." + val.type.toLowerCase() + ".com/" + val.id;
					socialMediaIconGroup[index][1].classList.add("socialMediaIconInvisible");
               }
			}),
			//Finally, empty the cache array of social media info, so it will be empty for next Rep
			socialMediaCache = []
			);

	//Combs through the official indices property of the offices branch to cross reference the Reps' index
        titles.forEach(function(x) {
            x.officialIndices.forEach(function(y) {
                if (y === index) {
                    repTitle[index].textContent += x.name.replace("United States", "US");
                };
            });
        });

	});

}

