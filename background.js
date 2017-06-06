// chrome.browserAction.onClicked.addListener(function (tab) {
// 	chrome.tabs.insertCSS(tab.id, {
//             file: "styles.css"
//     });
// 	chrome.tabs.executeScript(tab.ib, {
// 		file: 'inject.js'
// 	});
// });

chrome.tabs.onUpdated.addListener(function () {
	chrome.tabs.insertCSS(null, {
		file: "styles.css"
	});
	chrome.tabs.executeScript(null, { file: "inject.js" }, function () {
	});
});