//! Real
document.addEventListener('DOMContentLoaded', function () {

	let loader = document.querySelector('.preloader-real')
        loaderPercent = loader.querySelector('.preloader-num')
        loaderProgress = loader.querySelector('.preloader-progress')

        resType = 'img, video, iframe'
        resourcesToLoad = document.querySelectorAll(resType)

        loadedResources = 0;

	//! temp
	let info = document.querySelector('.info')
	let info_1 = info.querySelector('.info-1')
	let info_2 = info.querySelector('.info-2')
    // !temp

    function updateProgress() {
        let percent = Math.round((loadedResources / resourcesToLoad.length) * 100);

        loaderPercent.textContent = percent + '%';
		loaderProgress.style = `--load: ${percent}%`

        // !temp
        info_1.textContent = loadedResources
		info_2.textContent = resourcesToLoad.length
        // !temp
    }

    function loadResource(resource, callback) {
        if (resource.tagName == 'VIDEO') {
            resource.onloadeddata = function() {
                console.log('video load')
                callback()
            }
        } else if (resource.tagName == 'IFRAME') {
            resource.onload = function() {
                console.log('iframe load')
                callback()
            }
        } else {
            resource.onload = function() {
                console.log('img load')
                callback()
            }
        }
    }

    resourcesToLoad.forEach(function (resource) {
        loadResource(resource, function () {
            loadedResources++;
            updateProgress();
            if (loadedResources === resourcesToLoad.length) {
            // Все ресурсы загружены, скрываем прелоадер и отображаем контент
			setTimeout(() => {
				loader.style.opacity = '0'
				loader.addEventListener('transitionend', hide)

				function hide() {
					loader.style.display = 'none'
				}
			}, 500);
            }
        });
    });

})

// ! Emulator
document.addEventListener('DOMContentLoaded', ()=>{
    let loader = document.querySelector('.preloader-emu');
    let loaderPercent = loader.querySelector('.preloader-num');
    let loaderProgress = loader.querySelector('.preloader-progress');
    
    document.addEventListener('readystatechange', function(event) {
        if (document.readyState === 'interactive') {
            loader.style.display = 'block';
        } else if (document.readyState === 'complete') {
            updatePercent(100);
        }
    });

    function updatePercent(percent) {
        var currentPercent = 0;
        var interval = setInterval(function() {
            if (currentPercent < percent) {
                currentPercent++;
                loaderPercent.textContent = currentPercent + '%';
                loaderProgress.style = `--load: ${currentPercent}%`
                
                if (loaderPercent.textContent === '100%') {
					setTimeout(() => {
						loader.style.opacity = '0'
						loader.addEventListener('transitionend', hide)

						function hide() {
							loader.style.display = 'none'
						}
					}, 500);
                }
            } else {
                clearInterval(interval);
            }
        }, 40);
    }
});

