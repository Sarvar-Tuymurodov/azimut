(function modalComponent() {
    let body = document.querySelector('body');
    let buttons = document.querySelectorAll('[data-modal-target]');

    buttons.forEach((btn) => {
        let targetModal = document.querySelector(`${btn.dataset.modalTarget}`);
        targetModal.style.scale = 0;

        btn.addEventListener('click', function (e) {
            targetModal.style.zIndex = 200;
            targetModal.style.scale = 1;
            targetModal.classList.add('show');
            body.classList.add('lock');
        });

        targetModal
            .querySelector('.modal__close')
            .addEventListener('click', function () {
                targetModal.classList.remove('show');
                body.classList.remove('lock');
                setTimeout(function () {
                    targetModal.style.scale = 0;
                    targetModal.style.zIndex = -1;
                }, 300);
            });
    });
})();

let swiper = new Swiper('.mySwiper', {
    autoplay: {
        delay: 4000,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

new WOW().init();

let gallerySlide;
let init = false;

//TODO : Swiper
function initSwiper() {
    gallerySlide = new Swiper('#gallerySlide', {
        autoplay: {
            delay: 4000,
        },
        slidesPerView: 'auto',
    });
}

function gallerySwiperInit() {
    if (window.innerWidth < 767 && !init) {
        initSwiper();
        init = true;
        return;
    }

    if (window.innerWidth > 767 && init) {
        gallerySlide.destroy();
        init = false;
    }
}

window.addEventListener('resize', () => {
    gallerySwiperInit();
});

document.addEventListener('readystatechange', () => {
    gallerySwiperInit();
});

const contactFormInputPhone = document.getElementById('contactFormInputPhone');

if (contactFormInputPhone) {
    var phoneMask = IMask(contactFormInputPhone, {
        mask: '+{998} (00) 000-00-00',
        // lazy: false,
        placeholderChar: '*',
    });
}

const submitForm = document.getElementById('contactFormSubmit');
const formContact = document.getElementById('contactForm');

const swalAlert = function () {
    new swal('Ваша заявка принята!', 'Спасибо за выбор!', 'success', {
        buttons: false,
        timer: 1500,
    });
};

let url = '';
let clientName = document.getElementById('contactFormInputName'),
    clientPhone = document.getElementById('contactFormInputPhone');
let sendingArray = [];
let newObj = {};

formContact.addEventListener('submit', function (e) {
    e.preventDefault();
    newObj['name'] = clientName.value;
    newObj['phone'] = clientPhone.value;

    sendingArray.push(newObj);
    fetch(url, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(sendingArray),
    })
        .then((response) => {
            clientName.value = '';
            clientPhone.value = '';
        })
        .catch((error) => console.log('error', error));
});
