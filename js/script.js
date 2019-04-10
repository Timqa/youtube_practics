window.addEventListener('load', function(e) {
  const switcher = document.querySelector('#cbx'),
        addFiles  = document.querySelector('.more'),
        modal = document.querySelector('.modal'),
        videos = document.querySelectorAll('.videos__item');
  let player;

  function slideToggleMenu(trigger, boxes, content, openClass) {
    let button = {
      'element': document.querySelector(trigger),
      'active': false
    };
    const box = document.querySelector(boxes),
          boxContent = document.querySelector(content)
    
    button.element.addEventListener('click', () => {
      if (!(button['active'])) { // проверка кнопки на активность
        button['active'] = true;
        box.style.height = boxContent.clientHeight + 'px';
        box.classList.add(openClass);
      } else {
        button['active'] = false;
        box.style.height = 0 + 'px';
        box.classList.remove(openClass);
      }
    });
  }

  slideToggleMenu('.hamburger','[data-slide="nav"]','.header__menu', 'slide-active'); // классу slide-active не просписываем точку, протому, что вызываем через classList

  function switchToggle() {
    if (!night) {
      night = true;
      document.body.classList.add('night');
      document.querySelectorAll('.hamburger > line').forEach(item => {
        item.style.stroke = '#fff';
      });
      document.querySelectorAll('.videos__item-descr').forEach(item => {
        item.style.color = '#fff';
      });
      document.querySelectorAll('.videos__item-views').forEach(item => {
        item.style.color = '#fff';
      });
      document.querySelector('.header__item-descr').style.color = '#fff';
      document.querySelector('.logo > img').src = 'logo/youtube_night.svg';
    } else {
      night = false;
      document.body.classList.remove('night');
      document.querySelectorAll('.hamburger > line').forEach(item => {
        item.style.stroke = '#000';
      });
      document.querySelectorAll('.videos__item-descr').forEach(item => {
        item.style.color = '#000';
      });
      document.querySelectorAll('.videos__item-views').forEach(item => {
        item.style.color = '#000';
      });
      document.querySelector('.header__item-descr').style.color = '#000';
      document.querySelector('.logo > img').src = 'logo/youtube.svg';
    }
  }

  let night = false;
  switcher.addEventListener('change', () => {
    switchToggle();
  });

  const data = [
    ['img/thumb_3.webp', 'img/thumb_4.webp', 'img/thumb_5.webp'],
    ['#3 Верстка на flexbox CSS | Блок преимущества и галерея | Марафон верстки | Артем Исламов',
       '#2 Установка spikmi и работа с ветками на Github | Марафон вёрстки Урок 2',
       '#1 Верстка реального заказа landing page | Марафон верстки | Артем Исламов'],
    ['3,6 тыс. просмотров', '4,2 тыс. просмотров', '28 тыс. просмотров'],
    ['X9SmcY3lM-U', '7BvHoh0BrMw', 'mC8JW_aG2EM']
  ];

  addFiles.addEventListener('click', () => {
    const videoContent = document.querySelector('.videos__wrapper');
    addFiles.remove();

    for (i = 0; i < data[0].length; i++) {
      let cardLink = document.createElement('a');
      cardLink.classList.add('videos__item', 'videos__item-active');
      cardLink.setAttribute('data-url', data[3][i]);
      cardLink.innerHTML = `
        <img src="${data[0][i]}" alt="thumb">
        <div class="videos__item-descr">
          ${data[1][i]}
        </div>
        <div class="videos__item-views">
          ${data[2][i]}
        </div>
      `;
      videoContent.appendChild(cardLink);
      setTimeout(() => {
        cardLink.classList.remove('videos__item-active');
      }, 10);
      bindNewModal(cardLink);
    }
    sliceTitle('.videos__item-descr', 80);  // вызываем функцию в динамических картточках
  });

  function sliceTitle(selector, num) {
    document.querySelectorAll(selector).forEach(item => {
      item.textContent.trim();

      if (item.textContent.length < num) {
        return;
      } else {
        const str = item.textContent.slice(0, num + 1) + '...';
        item.textContent = str;
      }
    });
  }
  sliceTitle('.videos__item-descr', 80);

  function openModal() {
    modal.style.display = 'block';
  }

  function closeModal() {
    modal.style.display = 'none';
    player.stopVideo();
  }

  function bindModal(cards) {
    cards.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const id = item.getAttribute('data-url');
        loadVideo(id);
        openModal();
      });
    });
  }
  bindModal(videos);

  function bindNewModal(cards) {
    cards.addEventListener('click', (e) => {
      e.preventDefault();
      const cards = item.getAttribute('data-url');
      loadVideo(cards);
      openModal();
    });
  }

  modal.addEventListener('click', (e) => {
    if (!e.target.classList.contains('modal__body')) {
      closeModal();
    }
  });

  function createVideo() {
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    setTimeout(() => {
      player = new YT.Player('frame', {
        height: '100%',
        width: '100%',
        videoId: 'M7lc1UVf-VE'
      });
    }, 300);
  }
  createVideo();

  function loadVideo(id) {
    player.loadVideoById({'videoId': `${id}`});
  }
});