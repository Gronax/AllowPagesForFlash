
var url = 'http://your-page.com/*';

function settingChanged() {
  chrome.contentSettings.plugins.set({
		//"*://*.example.com/*"
		//primaryPattern: '<all_urls>',
        'primaryPattern': url,
        'setting': 'allow',
        'scope': 'regular'
	});  
	window.location.reload();
}

document.addEventListener('DOMContentLoaded', function () {	
	var currentSetting = '';
	var result = document.getElementById('lblResult');
	var button = document.getElementById('btnAllow');
	
	 chrome.contentSettings.plugins && chrome.contentSettings.plugins.get({
		'primaryUrl': url
		},
		function(details) {
			currentSetting = details.setting;
			
			if(currentSetting == 'allow') {
				result.classList.remove("active");
				result.classList.add("done");
				result.innerHTML = 'Flash için izin verilmiştir. İhale ekranını yenileyip ihaleyi takip edebilirsiniz.';
				button.value = 'İzin verildi';
				button.disabled = true;
			}
			else {
				result.classList.remove("done");
				result.classList.add("active");
				result.innerHTML = 'Flash için izin verilmemiştir. Aşağıdaki butona tıkladıktan sonra ihale ekranını yenileyip ihaleyi takip edebilirsiniz.';
				button.value = 'İzin ver';
				button.disabled = false;
			}			
		}
	);
    button.addEventListener('click', settingChanged);	
});

