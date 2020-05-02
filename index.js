const imagesBlock = document.getElementById('container');

let pageNumber = 1;
let fetching = false;
//let fetchUrl = 'https://api.unsplash.com/photos?page=' + pageNumber + '&per_page=30&order_by=latest&client_id=QJEroXPJ75ZX2RDjUvYso5gU7lq-nQZLWL4fqNLFnuA';
//aa

showPhotos();

async function getPhotos(url) {
	fetching = true;
	const response = await fetch(url);
	const data = await response.json();
	return data;
}

async function showPhotos() {
	const images = await getPhotos('https://api.unsplash.com/photos?page=' + pageNumber + '&per_page=30&order_by=latest&client_id=QJEroXPJ75ZX2RDjUvYso5gU7lq-nQZLWL4fqNLFnuA');
	images.map((image, index) => {
		imagesBlock.innerHTML += `<img data-src=${image.urls.regular} class="lazy" style="visibility: hidden" >`;
		fetching = false;
		lazyLoad();

	});
}

window.addEventListener('scroll', ()=> {
	if ((window.innerHeight + window.scrollY >= document.body.offsetHeight - 300) && fetching === false) {
		pageNumber++;
		showPhotos();
	}
});

function lazyLoad() {
	lazyLoadImages = document.querySelectorAll(".lazy");
	    const imageObserver = new IntersectionObserver((entries, imgObserver) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const lazyImage = entry.target;
                lazyImage.src = lazyImage.dataset.src;
                lazyImage.classList.remove("lazy");
                lazyImage.removeAttribute("data-src");
                lazyImage.style.visibility = 'visible';
                imgObserver.unobserve(lazyImage);
            }
        })
	})	
	    lazyLoadImages.forEach(image => imageObserver.observe(image));
}