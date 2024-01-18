var settings = {};

initPopup();

const refreshableSettings = [
	"blurImages",
	"blurVideos",
	"blurMale",
	"blurFemale", 
	"unblurImages",
	"unblurVideos",
	"blurryStartMode",
	"strictness",
];

const allSettings = ["status", "blurAmount", "gray", ...refreshableSettings];

var refreshMessage, container;

function initPopup() {
	// console.log("HB==initPopup");
	loadLocalSettings().then(function () {
		if (document.readyState === "complete" || "interactive") {
			displaySettings(settings);
			addListeners();
		} else {
			document.addEventListener("DOMContentLoaded", function () {
				displaySettings(settings);
				addListeners();
			});
		}
	});
}

function loadLocalSettings() {
	return new Promise(function (resolve) {
		chrome.storage.sync.get(["hb-settings"], function (storage) {
			settings = storage["hb-settings"];
			resolve();
		});
	});
}

function toggleAllInputs() {
	if (container) {
		container.style.opacity = settings.status ? 1 : 0.5;
	}
	allSettings.forEach(function (setting) {
		if (setting !== "status") {
			document.querySelector("input[name=" + setting + "]").disabled =
				!settings.status;
		}
	});
}

function displaySettings(settings) {
	document.querySelector("input[name=status]").checked = settings.status;
	document.querySelector("input[name=blurryStartMode]").checked =
		settings.blurryStartMode;
	document.querySelector("input[name=blurAmount]").value =
		settings.blurAmount;
	document.querySelector("span[id=blur-amount-value]").innerHTML =
		settings.blurAmount + "px";
	document.querySelector("input[name=gray]").checked = settings.gray ?? true;
	document.querySelector("input[name=strictness]").value =
		+settings.strictness;
	document.querySelector("span[id=strictness-value]").innerHTML =
		+settings.strictness * 100 + "%";
	document.querySelector("input[name=blurImages]").checked =
		settings.blurImages;
	document.querySelector("input[name=blurVideos]").checked =
		settings.blurVideos;
	document.querySelector("input[name=blurMale]").checked = settings.blurMale;
	document.querySelector("input[name=blurFemale]").checked =
		settings.blurFemale;
	document.querySelector("input[name=unblurImages]").checked =
		settings.unblurImages;
	document.querySelector("input[name=unblurVideos]").checked =
		settings.unblurVideos;

	toggleAllInputs();
}

/* addListeners - (1) Listen for changes to popup modal inputs (2) route to appropriate function  */
function addListeners() {
	document
		.querySelector("input[name=status]")
		.addEventListener("change", updateStatus);
	document
		.querySelector("input[name=blurryStartMode]")
		.addEventListener("change", updateCheckbox("blurryStartMode"));
	document
		.querySelector("input[name=blurImages]")
		.addEventListener("change", updateCheckbox("blurImages"));
	document
		.querySelector("input[name=blurVideos]")
		.addEventListener("change", updateCheckbox("blurVideos"));
	document
		.querySelector("input[name=blurMale]")
		.addEventListener("change", updateCheckbox("blurMale"));
	document
		.querySelector("input[name=blurFemale]")
		.addEventListener("change", updateCheckbox("blurFemale"));
	document
		.querySelector("input[name=blurAmount]")
		.addEventListener("change", updateBlurAmount);
	document
		.querySelector("input[name=gray]")
		.addEventListener("change", updateCheckbox("gray"));
	document
		.querySelector("input[name=strictness]")
		.addEventListener("change", updateStrictness);
	document
		.querySelector("input[name=unblurImages]")
		.addEventListener("change", updateCheckbox("unblurImages"));
	document
		.querySelector("input[name=unblurVideos]")
		.addEventListener("change", updateCheckbox("unblurVideos"));

	refreshMessage = document.querySelector("#refresh-message");
	container = document.querySelector("#container");
}

function updateStatus() {
	settings.status = document.querySelector("input[name=status]").checked;
	chrome.storage.sync.set({ "hb-settings": settings });
	toggleAllInputs();
	sendUpdatedSettings("status");
}

function updateBlurAmount() {
	settings.blurAmount = document.querySelector(
		"input[name=blurAmount]"
	).value;
	document.querySelector("span[id=blur-amount-value]").innerHTML =
		settings.blurAmount + "px";
	chrome.storage.sync.set({ "hb-settings": settings });
	sendUpdatedSettings("blurAmount");
}

function updateStrictness() {
	settings.strictness = document.querySelector(
		"input[name=strictness]"
	).value;

	document.querySelector("span[id=strictness-value]").innerHTML =
		+settings.strictness * 100 + "%";

	chrome.storage.sync.set({ "hb-settings": settings });
	sendUpdatedSettings("strictness");
}

function updateCheckbox(key) {
	return function () {
		settings[key] = document.querySelector(
			"input[name=" + key + "]"
		).checked;
		chrome.storage.sync.set({ "hb-settings": settings });
		sendUpdatedSettings(key);
	};
}

/* sendUpdatedSettings - Send updated settings object to tab.js to modify active tab blur CSS */
function sendUpdatedSettings(key) {
	const message = {
		type: "updateSettings",
		newSetting: {
			key: key,
			value: settings[key],
		},
	};

	chrome.runtime.sendMessage(message);
	chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
		var activeTab = tabs[0];
		chrome.tabs.sendMessage(activeTab.id, message);

		if (refreshableSettings.includes(key)) {
			refreshMessage.classList.remove("hidden");
		}
	});
}
