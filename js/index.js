'use strict';
const documentReady = () => {

  const root = document.getElementById('root');
  const headerNavThemeIconContainer = document.getElementById('headerNavThemeIconContainer');

  let i = 1;
  let page = 1;
  const limit = 6;

  const renderLoremPicsum = async () => {
    try {
      const response = await axios.get(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`);
      const data = response.data;
      data.forEach((element) => {
        const { author, download_url, url } = element;

        root.innerHTML += `
          <div class="gallery__card">
            <figure class="gallery__card-image-container">
              <img
                src="${download_url}"
                alt="${author}" class="gallery__card-image">
            </figure>
            <div class="gallery__card-button-container">
              <a href="${download_url}" target="_blank" class="gallery__card-button gallery__card-button--active">Descargar</a>
              <a href="${url}" target="_blank" class="gallery__card-button">Ver Imágen</a>
            </div>
          </div>
        `;
        i++;
      });
      page++;
      setObserver();
    } catch (error) {
      console.error(error);
    }
  };

  const setObserver = () => {
    const options = {
      threshold: 0.5
    }

    const callBack = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          renderLoremPicsum();
        }
      });
    }

    const intersectionObserver = new IntersectionObserver(callBack, options);
    intersectionObserver.observe(root.lastElementChild);
  };

  const toggleTheme = () => {
    const body = document.querySelector('.body');
    body.classList.toggle('body--light');
    headerNavThemeIconContainer.classList.toggle('header-nav__theme-icon-container--active');

    if (body.classList.contains('body--light')) {
      localStorage.setItem('darkMode', 'false');
    } else {
      localStorage.setItem('darkMode', 'true');
    }
  };

  if (localStorage.getItem('darkMode') === 'true') {
    document.querySelector('.body').classList.remove('body--light');
    headerNavThemeIconContainer.classList.remove('header-nav__theme-icon-container--active');
  } else {
    document.querySelector('.body').classList.add('body--light');
    headerNavThemeIconContainer.classList.add('header-nav__theme-icon-container--active');
  }

  headerNavThemeIconContainer.addEventListener('click', toggleTheme);

  renderLoremPicsum();
};

document.addEventListener('DOMContentLoaded', documentReady);