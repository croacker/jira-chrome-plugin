chrome.tabs.onUpdated.addListener(function () {
	chrome.tabs.insertCSS(null, {
		file: "styles.css"
	});
	chrome.tabs.executeScript(null, {
		 file: "inject.js" }, 
		 function () {
	});
});