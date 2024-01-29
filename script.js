//! Real
document.addEventListener('DOMContentLoaded', function () {

	let loader = document.querySelector('.preloader-real');
    let loaderPercent = loader.querySelector('.preloader-num');
    let loaderProgress = loader.querySelector('.preloader-progress');

    let resourcesToLoad = [];

    let img = document.querySelectorAll('img')
    // let video = document.querySelectorAll('source')

    // video.forEach(el => {
    //     // console.log(el.getAttribute('src'))
    //     resourcesToLoad.push(el.getAttribute('src'))
    // })

    img.forEach(el => {
        resourcesToLoad.push(el.getAttribute('src'))
    })

    let loadedResources = 0;

    function updateProgress() {
        var percent = Math.round((loadedResources / resourcesToLoad.length) * 100);
        loaderPercent.textContent = percent + '%';
		loaderProgress.style = `--load: ${percent}%`
    }

    // Загрузка ресурсов
    // resourcesToLoad.forEach(function (resource) {
    //     var img = new Image();
    //     img.src = resource;
    //     img.onload = function () {
    //         loadedResources++;
    //         updateProgress();
    //         if (loadedResources === resourcesToLoad.length) {
    //         // Все ресурсы загружены, скрываем прелоадер и отображаем контент
    //         //   showContent();
    //         }
    //     };
    // });

    function loadResource(resource, callback) {
        let extension = resource.split('.').pop().toLowerCase();

        if (extension === 'mp4') {
            let video = document.createElement('source');
            video.setAttribute('src', resource);
            video.setAttribute("type", "video/mp4");
            video.addEventListener("progress", callback());
        } else {
            let img = new Image();
            img.src = resource;
            img.onload = callback;

        // Handle other types of resources as needed
            // console.warn('Unsupported resource type:', resource);
            // callback();
        }
    }

    resourcesToLoad.forEach(function (resource) {
        loadResource(resource, function () {
            loadedResources++;
            updateProgress();
            if (loadedResources === resourcesToLoad.length) {
            // Все ресурсы загружены, скрываем прелоадер и отображаем контент
            // showContent();
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
