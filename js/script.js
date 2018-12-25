'use strict';
var citySearch = document.querySelector('.city_search');
var search = document.querySelector('.search');
var mas = [];

var overallDiv = document.querySelector('.overall_div');
var option = document.querySelectorAll('option');
var imgSearch = document.querySelector('.img_search');
var plates = document.querySelector('.plates');
var countrys = document.querySelector('.countrys');
var backModal = document.querySelector('.back_modal');
var modal = document.querySelector('.modal');
var modalImg = document.querySelector('.modal_img');
var modalText = document.querySelector('.modal_text');
var modalMap = document.querySelector('.modal_map');
var modalBathroom = document.querySelector('.modal_bathroom');
var modalBedroom = document.querySelector('.modal_bedroom');
var modalType = document.querySelector('.modal_type');
var modalPrice = document.querySelector('.modal_price');
var close = document.querySelector('.close');
var favouritesBlock = document.querySelector('.favourites_block');
var fav_block = document.querySelector('.plate_favourites');
if (option[0].value === 'UK') {
    window.temp = Countrys.UK;
    window.tempTwo = 'api.nestoria.co.uk';
}

function country(evt) {
    overallDiv.innerHTML = '';
    citySearch.value = '';
    switch (evt.target.value) {
        case 'Australia':
            window.temp = Countrys.AUSTRALIA;
            window.tempTwo = 'api.nestoria.com.au';
            break;
        case 'Brazil':
            window.temp = Countrys.BRAZIL;
            window.tempTwo = 'api.nestoria.com.br';
            break;
        case 'Deutschland':
            window.temp = Countrys.GERMANY;
            window.tempTwo = 'api.nestoria.de';
            break;
        case 'Spain':
            window.temp = Countrys.SPAIN;
            window.tempTwo = 'api.nestoria.es';
            break;
        case 'France':
            window.temp = Countrys.FRANCE;
            window.tempTwo = 'api.nestoria.fr';
            break;
        case 'Italy':
            window.temp = Countrys.ITALY;
            window.tempTwo = 'api.nestoria.it';
            break;
        case 'Mexico':
            window.temp = Countrys.MEXICO;
            window.tempTwo = 'api.nestoria.mx';
            break;
        case 'UK':
            window.temp = Countrys.UK;
            window.tempTwo = 'api.nestoria.co.uk';
            break;
    }
}

function autocomplete() {
    overallDiv.innerHTML = '';
    for (var i = 0; i < window.temp.length; i++) {
        if (window.temp[i].toLowerCase().indexOf(citySearch.value) >= 0 || window.temp[i].toUpperCase().indexOf(citySearch.value) >= 0) {
            mas.push(window.temp[i]);
        }
    }
    for (var j = 0; j < mas.length; j++) {
        var autoDiv = document.createElement('div');
        autoDiv.className = 'auto_div';
        autoDiv.style.top = 60 * [j] + 'px';
        autoDiv.style.marginBottom = 10 + 'px';
        autoDiv.innerHTML = mas[j];
        overallDiv.appendChild(autoDiv);
    }
    mas = [];
    var autoDiv = document.querySelectorAll('.auto_div');
    for (var k = 0; k < autoDiv.length; k++) {
        autoDiv[k].addEventListener('click', function (evt) {
            citySearch.value = evt.currentTarget.innerHTML;
        });
    }

}


function dataLoad() {
    if (citySearch.value < 1) {
        alert('Введите значение в поле поиска');
    }
    var price = document.querySelectorAll('.price input');
    var priceMin = price[0].value;
    var priceMax = price[1].value;
    var rooms = document.querySelectorAll('.rooms input');
    var roomsMin = rooms[0].value;
    var roomsMax = rooms[1].value;
    var bedrooms = document.querySelectorAll('.bedrooms input');
    var bedroomsMin = bedrooms[0].value;
    var bedroomsMax = bedrooms[1].value;
    var bathroom = document.querySelectorAll('.bathroom input');
    var bathroomMin = bathroom[0].value;
    var bathroomMax = bathroom[1].value;
    var radioBuy = document.querySelector('.radio_buy').checked;
    var radioRent = document.querySelector('.radio_rent').checked;
    var radioBuyVal = document.querySelector('.radio_buy').value;
    var radioRentVal = document.querySelector('.radio_rent').value;
    var citySearchTwo = document.querySelector('.city_search').value.toLowerCase();
    if (radioBuy) {
        addScript("https://" + window.tempTwo + "/api?encoding=json&pretty=1&action=search_listings&listing_type=" + radioBuyVal + "&price_min=" + priceMin + "&price_max=" + priceMax + "&room_min=" + roomsMin + "&room_max=" + roomsMax + "&bathroom_min=" + bathroomMin + "&bathroom_max=" + bathroomMax + "&bedroom_min=" + bedroomsMin + "&bedroom_max=" + bedroomsMax + "&place_name=" + citySearchTwo + "&south_west&north_east&callback=createElement");
    } else {
        addScript("https://" + window.tempTwo + "/api?encoding=json&pretty=1&action=search_listings&listing_type=" + radioRentVal + "&price_min=" + priceMin + "&price_max=" + priceMax + "&room_min=" + roomsMin + "&room_max=" + roomsMax + "&bathroom_min=" + bathroomMin + "&bathroom_max=" + bathroomMax + "&bedroom_min=" + bedroomsMin + "&bedroom_max=" + bedroomsMax + "&place_name=" + citySearchTwo + "&south_west&north_east&callback=createElement");
    }

}

function addScript(src) {
    var wrap = document.body.querySelector('.wrapper');
    var script = document.createElement('SCRIPT');
    script.src = src;
    document.head.appendChild(script);

};

function createPlates(obj) {
    var plateBlock = document.createElement('div');
    plateBlock.className = 'plate';

    var plateImg = document.createElement('img');
    plateImg.src = obj.img_url;
    plateImg.style.paddingBottom = '-40px';
    plateBlock.appendChild(plateImg);

    var plateText = document.createElement('div');
    plateText.className = 'plate_text';
    var platePrice = document.createElement('span');
    platePrice.className = 'plate_price';
    platePrice.innerHTML = obj.price_formatted;

    var plateTitle = document.createElement('span');
    plateTitle.className = 'title';
    plateTitle.innerHTML = obj.title;

    var plateDescription = document.createElement('span');
    plateDescription.className = 'plate_description';
    plateDescription.innerHTML = obj.summary;

    plateText.appendChild(platePrice);
    plateText.appendChild(plateTitle);
    plateText.appendChild(plateDescription);
    plateBlock.appendChild(plateText);
    plates.appendChild(plateBlock);

}

function createElement(result) {
    console.log(result);
    plates.innerHTML = '';

    for (var i = 0; i < result.response.listings.length; i++) {
        createPlates(result.response.listings[i]);
    }
    var plateMass = document.querySelectorAll('.plate');
    for (var k = 0; k < plateMass.length; k++) {
        plateMass[k].addEventListener('click', function (evt) {
            for (var j = 0; j < result.response.listings.length; j++) {
                /**/
                if (evt.currentTarget.childNodes[1].childNodes[1].innerHTML === result.response.listings[j].title) {
                    backModal.style.display = 'block';
                    modal.style.display = 'flex';
                    var modalTitle = document.querySelector('.modal_title');
                    modalTitle.innerHTML = result.response.listings[j].title;
                    var plateFavourites = document.createElement('img');
                    plateFavourites.classList.add('plate_favourites', i);
                    plateFavourites.src = 'img/favourites.png';
                    plateFavourites.style.width = '25' + 'px';
                    plateFavourites.style.height = '25' + 'px';
                    plateFavourites.alt = 'Добавить в избранное';
                    fav_block.innerHTML = '';
                    fav_block.appendChild(plateFavourites);
                    modalImg.src = result.response.listings[j].img_url;
                    modalBathroom.innerHTML = result.response.listings[j].bathroom_number;
                    modalBedroom.innerHTML = result.response.listings[j].bedroom_number;
                    modalType.innerHTML = result.response.listings[j].property_type;
                    modalPrice.innerHTML = result.response.listings[j].price_formatted;


                    /*modalMap.innerHTML = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.6650339018315!2d'+ result.response.listings[j].longitude +'!3d' + result.response.listings[j].latitude + '!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDMxJzA5LjciTiAwwrAwOSc1OC4zIlc!5e0!3m2!1sru!2sby!4v1545571380485" width="580" height="215" frameborder="0" style="border:0" allowfullscreen></iframe>';
                     */
                    //пытался через фрейм добавить карту,но карта не меняется. Сделал так ,как ниже ,но тут надо покупать доступ. Ибо бесплатный просмотр только первый.
                    var centerLatLng = new google.maps.LatLng(result.response.listings[j].latitude, result.response.listings[j].longitude);
                    var mapOptions = {
                        center: centerLatLng,
                        zoom: 18
                    };
                    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

                }
            }
            close.addEventListener('click', function () {
                backModal.style.display = 'none';
                modal.style.display = 'none';

            });
        });
    }
    var plateFavouritess = document.querySelectorAll('.plate_favourites');
    for (var n = 0; n < plateFavouritess.length; n++) {
        plateFavouritess[n].addEventListener('click', function (evt) {
            for (var k = 0; k < result.response.listings.length; k++) {

                if (evt.currentTarget.parentNode.childNodes[9].childNodes[1].innerHTML === result.response.listings[k].title) {
                    localStorage.setItem(result.response.listings[k].title, JSON.stringify(result.response.listings[k]));
                    alert('Добавлено в избранное');
                }
            }
        })
    }
}

function loadStorage() {
    if (localStorage.length > 0) {
        plates.innerHTML = '';
        for (var i = 0; i < localStorage.length; i++) {
            createPlates(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
        var btnClear = document.createElement('button');
        var btnExit = document.createElement('button');
        btnClear.innerHTML = 'Очистить избранное';
        btnClear.style.position = 'absolute';
        btnClear.style.top = '37' + 'px';
        btnClear.style.right = '-149' + 'px';
        btnExit.innerHTML = 'Выйти из избранного';
        btnExit.style.position = 'absolute';
        btnExit.style.top = '10' + 'px';
        btnExit.style.right = '-150' + 'px';
        search.appendChild(btnExit);
        search.appendChild(btnClear);

        btnExit.addEventListener('click', function () {
            plates.innerHTML = '';
            btnExit.remove();
            btnClear.remove();
        })

        btnClear.addEventListener('click', function () {
            plates.innerHTML = '';
            localStorage.clear();
            btnClear.remove();
            btnExit.remove();
            alert('Избранное очищено');
        })
        var plateMass = document.querySelectorAll('.plate')

        for (var k = 0; k < plateMass.length; k++) {
            plateMass[k].addEventListener('click', function (evt) {
                for (var j = 0; j < localStorage.length; j++) {
                    console.log(JSON.parse(localStorage.getItem(localStorage.key(j))));
                    if (evt.currentTarget.childNodes[1].childNodes[1].innerHTML === JSON.parse(localStorage.getItem(localStorage.key(j))).title) {
                        backModal.style.display = 'block';
                        modal.style.display = 'flex';
                        var modalTitle = document.querySelector('.modal_title');
                        modalTitle.innerHTML = JSON.parse(localStorage.getItem(localStorage.key(j))).title;
                        modalImg.src = JSON.parse(localStorage.getItem(localStorage.key(j))).img_url;
                        fav_block.innerHTML = '';
                        modalBathroom.innerHTML = JSON.parse(localStorage.getItem(localStorage.key(j))).bathroom_number;
                        modalBedroom.innerHTML = JSON.parse(localStorage.getItem(localStorage.key(j))).bedroom_number;
                        modalType.innerHTML = JSON.parse(localStorage.getItem(localStorage.key(j))).property_type;
                        modalPrice.innerHTML = JSON.parse(localStorage.getItem(localStorage.key(j))).price_formatted;


                        /*/!*modalMap.innerHTML = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.6650339018315!2d'+ result.response.listings[j].longitude +'!3d' + result.response.listings[j].latitude + '!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDMxJzA5LjciTiAwwrAwOSc1OC4zIlc!5e0!3m2!1sru!2sby!4v1545571380485" width="580" height="215" frameborder="0" style="border:0" allowfullscreen></iframe>';
                         *!/*/
                        //пытался через фрейм добавить карту,но карта не меняется. Сделал так ,как ниже ,но тут надо покупать доступ. Ибо бесплатный просмотр только первый.
                        var centerLatLng = new google.maps.LatLng(JSON.parse(localStorage.getItem(localStorage.key(j))).latitude, JSON.parse(localStorage.getItem(localStorage.key(j))).longitude);
                        var mapOptions = {
                            center: centerLatLng,
                            zoom: 18
                        };
                        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

                    }
                }
                close.addEventListener('click', function () {
                    backModal.style.display = 'none';
                    modal.style.display = 'none';

                });
            });
        }



    }
}

countrys.addEventListener('change', country);
citySearch.addEventListener('input', autocomplete);
imgSearch.addEventListener('click', dataLoad);
favouritesBlock.addEventListener('click', loadStorage);
