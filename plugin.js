chrome.tabs.onUpdated.addListener(function(tabId , info) {
    if (info.status == "complete") {
    document.addEventListener('DOMContentLoaded', function() {
            var quickSearchQuery = document.getElementById("quick-search-query");
        alert(quickSearchQuery);
        if(!quickSearchQuery){
            alert('Not found!');
        }else{
            alert(quickSearchQuery.innerHTML);
        }
    });

    
    }
});