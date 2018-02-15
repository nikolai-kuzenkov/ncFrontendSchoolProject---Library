(function($) {
    var Validation = {
        validate: {
            nameValidEvents: function(element,pattern){ //События с валидацией при вводе ФИО
                element.focus(function(){
                    element.css('border-color', 'steelblue');
                });
                element.blur(function(){
                    Validation.validate.nameValidation(element,pattern);
                });
            },
            nameValidation: function(element, pattern) { //Валидация полей ФИО
                if(element.val().length >= 2){
                    element.css('border-color', '');
                    if(element.val().search(pattern) == 0) {
                        element.css('border-color', '');
                    }
                    else {
                        element.css('border-color', 'red');
                    }
                }
                else{
                    if (element.val().length == 1) {
                        element.css('border-color', 'red');
                    }
                    else{
                        element.css('border-color', '');
                    }
                }
            },
            birthdayValidation: function (element) {//События с валидацией при вводе даты рождения
                element.focus(function(){
                    element.css('border-color', 'steelblue');
                });
                element.blur(function(){
                    if(!element.val()){
                        element.css('border-color', 'red');
                    }
                    else{
                        element.css('border-color', '');
                    }
                });
            },
            mailValidEvent: function (element,pattern) { //События с валидацией при вводе e-mail
                element.focus(function(){
                    element.css('border-color', 'steelblue');
                });
                element.blur(function(){
                    Validation.validate.mailValidation(element,pattern);
                });
            },
            mailValidation: function(element, pattern){ //Валидация e-mail
                if(element.val().length != 0) {
                    if (element.val().search(pattern) == 0) {
                        element.css('border-color', '');
                    }
                    else {
                        element.css('border-color', 'red');
                    }
                }
                else
                {
                    element.css('border-color', '');
                }
            },
            loginPassValidEvents: function(element,pattern){ //События с валидацией при вводе логина и пароля
                element.focus(function(){
                    element.css('border-color', 'steelblue');
                });
                element.blur(function(){
                    Validation.validate.loginPassValidation(element,pattern);
                });
            },
            loginPassValidation: function (element, pattern) { //Валидация логина и пароля
                if(element.val().search(pattern) == 0) {
                    element.css('border-color', '');
                }
                else {
                    element.css('border-color', 'red');
                }
            },
            doublePassValidation: function (pattern) { //Проверка поля для повторения пароля
                var pass1 = $('#password1');
                var pass2 = $('#password2');
                Validation.validate.loginPassValidEvents(pass2,pattern);
                pass2.blur(function(){
                    if(pass1.val() === pass2.val()) {
                        $('#coincidence_warn').css('display','none');
                    }
                    else{
                        $('#coincidence_warn').css('display','block');
                    }
                });
            },
            emptyFields: function () { //Провекрка на пустые поля. Выполняется последовательно
                if(!$('#name').val()){
                    Validation.validate.displayWarning($('#name'));
                }
                else {
                    $('#field_warn').css('display', 'none');
                    $('#name').css('border-color', '');
                    if (!$('#surname').val()) {
                        Validation.validate.displayWarning($('#surname'));
                    }
                    else {
                        $('#field_warn').css('display', 'none');
                        $('#surname').css('border-color', '');
                        if (!$('#birthdate').val()) {
                            Validation.validate.displayWarning($('#birthdate'));
                        }
                        else {
                            $('#field_warn').css('display', 'none');
                            $('#birthdate').css('border-color', '');
                            if (!$('#pseries').val()) {
                                Validation.validate.displayWarning($('#pseries'));
                            }
                            else {
                                $('#field_warn').css('display', 'none');
                                $('#pseries').css('border-color', '');
                                if (!$('#pnumber').val()) {
                                    Validation.validate.displayWarning($('#pnumber'));
                                }
                                else {
                                    $('#field_warn').css('display', 'none');
                                    $('#pnumber').css('border-color', '');
                                    if (!$('#email').val()) {
                                        Validation.validate.displayWarning($('#email'));
                                    }
                                    else {
                                        $('#field_warn').css('display', 'none');
                                        $('#email').css('border-color', '');
                                        if (!$('#username').val()) {
                                            Validation.validate.displayWarning($('#username'));
                                        }
                                        else {
                                            $('#field_warn').css('display', 'none');
                                            $('#username').css('border-color', '');
                                            if (!$('#password1').val()) {
                                                Validation.validate.displayWarning($('#password1'));
                                            }
                                            else {
                                                $('#field_warn').css('display', 'none');
                                                $('#password1').css('border-color', '');
                                                if (!$('#password2').val()) {
                                                    Validation.validate.displayWarning($('#password2'));
                                                }
                                                else
                                                {
                                                    $('#field_warn').css('display', 'none');
                                                    $('#password2').css('border-color', '');
                                                    return true;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            displayWarning: function(element){ //Показать предупреждение
                element.css('border-color', 'red');
                $('#field_warn').css('display','block');
                return false;
            }
        }

    };
    var AppView = { //Перерисовка контента
        init: function() {
            this.content = $("#main").find("#content");
        },
        redraw: function(redrawData) {
            var data = redrawData.data;
            var successCallback = redrawData.successCallback;
            var _this = this;
            this.content.fadeOut(function() {
                _this.content.html(data);
                _this.content.fadeIn(function() {
                    if(successCallback != undefined) {
                        successCallback(data);
                    }
                });
            });
        }
    };

    var Navigation = {
        init: function() {
            this.createHandlers();
            this.checkURL();
        },
        checkURL: function() {
            var resource = document.location.pathname;
            this.navigationStep.processRequest(resource, Navigation.wizard.getPageByResource(resource).redrawCallback, true);
        },
        createHandlers: function() {
            this.mainElement = $("#main");
            this.HeadLinkHandler();
            this.navigation = this.mainElement.find(".nav");
            this.navElements = this.navigation.find(".navigationButton");
            this.navElements.click(this.navigationStep.handleClick);
            this.browserStep();
        },
        //Обработка клика по ссылке в header без перезагрузки страницы
        HeadLinkHandler: function(){
            $("#MainPage").on('click',function(){
                var resource = $(this).attr("href");
                Navigation.navigationStep.processRequest(resource, Navigation.wizard.getPageByResource(resource).redrawCallback,false,true);
                return false;
            });
        },
        //Обработка клика по ссылке в разделе "Книги" без перезагрузки страницы
        LinkHandler: function(){
            $(".genrelink").on('click',function(){
                var resource = $(this).attr("href");
                alert("Данный раздел находится в разработке. Мы приносим свои извинения.");
                //Navigation.navigationStep.processRequest(resource, Navigation.wizard.getPageByResource(resource).redrawCallback,false,true);
                return false;
            });
        },
        browserStep:function(){// Добавляем обработчик события popstate,
        // происходящего при нажатии на кнопку назад/вперед в браузере
            window.addEventListener("popstate", function (e) {
                // Передаем текущий URL
                Navigation.navigationStep.processRequest(location.pathname, Navigation.wizard.getPageByResource(location.pathname).redrawCallback,false,false);
            });
        },
        navigationStep: {
            handleClick: function(event) {
                var resource = $(this).data("loadresourse");
                Navigation.navigationStep.processRequest(resource, Navigation.wizard.getPageByResource(resource).redrawCallback,false,true);
            },
            processRequest: function(resource, successCallback, isFirst, addEntry) {
                if (isFirst == true){//Для входа на сайт
                    $.ajax({
                        url: resource,
                        type: "post",
                        dataType: "html",
                        success: function(data) {
                            AppView.redraw({data: data, successCallback: successCallback});
                        },
                        error: function(xhr) {
                            alert("Not OK");
                        }
                    });
                }
                else
                {//Для перехода по страницам в приложении
                    $.ajax({
                        beforeSend: function () {
                            document.getElementById('page_loader').classList.remove("done");
                        },
                        url: resource,
                        type: "post",
                        dataType: "html",
                        success: function(data) {
                            setTimeout(function(){
                                setTimeout(function(){
                                    document.getElementById('page_loader').classList.add("done");
                                },600)
                                AppView.redraw({data: data, successCallback: successCallback});
                            },500);
                        },
                        error: function(xhr) {
                            alert("Not OK");
                        }
                    });
                    if (addEntry == true) {
                        // Добавляем запись в историю, используя pushState
                        history.pushState(null, null, resource);
                    }
                }
            }
        },
        wizard: {
            getPageByResource: function(resource) {
                var page;
                var pages = $.map(Navigation.wizard.pages, function(value, index) {
                    return [value];
                });
                pages.forEach(function(item, i) {
                    if(item.resource == resource)
                        page = item;
                });
                return page;
            },
            pages: {
                main: {
                    name: "Main",
                    resource: "/",
                    redrawCallback: function (data) {
                        $('title').text('Библиотека им. Пушкина');
                        //Собираем массив изображений для слайдера
                        var img1 = document.getElementById('1img');
                        var img2 = document.getElementById('2img');
                        var img3 = document.getElementById('3img');
                        var img4 = document.getElementById('4img');
                        var img5 = document.getElementById('5img');
                        var masImg = [img1, img2, img3, img4, img5];
                        //Собираем массив надписей для слайдера
                        var ins1 = document.getElementById('slide_inscript1');
                        var ins2 = document.getElementById('slide_inscript2');
                        var ins3 = document.getElementById('slide_inscript3');
                        var ins4 = document.getElementById('slide_inscript4');
                        var ins5 = document.getElementById('slide_inscript5');
                        var masIns = [ins1, ins2, ins3, ins4, ins5];
                        //Изначально скрываем все изображения и надписи
                        masImg.forEach(function (item) {
                            $(item).fadeOut(1);
                        });
                        masIns.forEach(function (item) {
                            $(item).fadeOut(1);
                        })
                        //Показываем первое изображение и надпись
                        $(masImg[0]).fadeIn();
                        $(masIns[0]).fadeIn();
                        //Заводим таймер и счётчик для слайдера
                        var timer;
                        var counter = 0;
                        //запускаем слайдер
                        autoSlider(timer, counter, masImg, masIns);
                    }
                },
                books:{
                    name: "books",
                    resource: "/books",
                    redrawCallback: function(data) {
                        $('title').text('Книги');
                        var genres = $("#genreselect");
                        Navigation.LinkHandler();
                    }
                },
                renewalBook:{
                    name: "renewalBook",
                    resource: "/renewalBook",
                    redrawCallback: function(data) {
                        $('title').text('Продление книг');
                        var renewalForm = $("#renewal");
                        renewalForm.find("input[type='submit']").click(function(event){
                            event.preventDefault();
                            alert("Сожалеем, но на данный момент продление недоступно");
                        });
                    }
                },
                reserveBook:{
                    name: "reserveBook",
                    resource: "/reserveBook",
                    redrawCallback: function(data) {
                        $('title').text('Бронирование книг');
                        var reserveForm = $("#reserve");
                        reserveForm.find("input[type='submit']").click(function(event){
                            event.preventDefault();
                            alert("Сожалеем, но на данный момент бронирование недоступно");
                        });
                    }
                },
                About:{
                    name: "about",
                    resource: "/about",
                    redrawCallback: function(data) {
                        $('title').text('О нас');
                    }
                },
                checkIn:{
                    name: "checkIn",
                    resource: "/checkIn",
                    redrawCallback: function(data) {
                        $('title').text('Регистрация');
                        //маски для некоторых полей
                        $("#phone").mask("+7(999) 999-9999");
                        $("#pseries").mask("99 99");
                        $("#pnumber").mask("999999");
                        //Паттерны для полей
                        var namePattern = /^[a-zA-Zа-яёА-ЯЁ\s\-]+$/u;
                        var mailPattern = /^[a-z0-9_.-]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i;
                        var loginPattern= /^[a-zA-Z0-9_-]{6,}$/i;
                        var passwodPattern = /^[a-zA-Z0-9-]{6,}$/i;
                        //Валидация полей при вводе
                        Validation.validate.nameValidEvents($('#name'),namePattern);
                        Validation.validate.nameValidEvents($('#surname'),namePattern);
                        Validation.validate.nameValidEvents($('#patronymic'),namePattern);
                        Validation.validate.birthdayValidation($('#birthdate'));
                        Validation.validate.mailValidEvent($('#email'),mailPattern);
                        Validation.validate.loginPassValidEvents($('#username'),loginPattern);
                        Validation.validate.loginPassValidEvents($('#password1'),passwodPattern);
                        Validation.validate.doublePassValidation(passwodPattern);

                        var registrationForm = $("#registration");
                        registrationForm.find("input[type='submit']").click(function(event){
                            var fullUrl =  location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
                            event.preventDefault();
                            var formData = $("#registration").serialize();
                            var flag = Validation.validate.emptyFields(); //Проверка на пустые поля, в случае их отсутствия отправляем данные формы
                            if (flag){
                                $.ajax({
                                    url: fullUrl+'/send',
                                    type: 'post',
                                    data: formData,
                                    success: function(result) {
                                        $("#message").empty().text(result);
                                        //Очистка формы после отправки
                                        $('#name').val("");
                                        $('#surname').val("");
                                        $('#patronymic').val("");
                                        $('#birthdate').val("");
                                        $('#pseries').val("");
                                        $('#pnumber').val("");
                                        $('#email').val("");
                                        $('#phone').val("");
                                        $('#username').val("");
                                        $('#password1').val("");
                                        $('#password2').val("");
                                    },
                                    error: function(e) {
                                        $("#message").empty().text("Сообщение не было отправленно, Error code:"+e.status +", Error message:"+e.statusText);
                                    },
                                    dataType: "html",
                                    timeout: 60000
                                });
                            }
                            else{
                                return false;
                            }
                        });
                    }
                }
            }
        }
    };

    $(document).ready(function() {
        AppView.init(); //Инициализация перерисовки контента
        Navigation.init(); //Инициализация навигации
        preloader(); //прелоадер
        LibraryOffer(); //Предложение о подписке
    });

    //Слайдер
    function autoSlider(timer, counter, masImg,masIns){
        timer = setTimeout(function(){
            if(counter === 5)
            {
                $(masImg[counter-1]).fadeOut();
                counter = 0;
                clearTimeout(timer);
            }
            if(counter === 0)
            {
                $(masImg[0]).fadeIn(800);
                inscriptionVis(counter,masIns);
                counter++;
                autoSlider(timer, counter, masImg,masIns);
            }
            else {
                $(masImg[counter - 1]).fadeOut();
                $(masImg[counter]).fadeIn(800);
                inscriptionVis(counter,masIns);
                counter++;
                autoSlider(timer, counter, masImg,masIns);
            }
        },6000);
    }

    //Надписи в слайдере
    function inscriptionVis(count, masIns){
        if(count !== 0){
            $(masIns[count-1]).fadeOut(600);
            setTimeout(function(){
                $(masIns[count]).fadeIn(800);
            },1000)
        }
        else{
            $(masIns[4]).fadeOut(600);
            setTimeout(function(){
                $(masIns[count]).fadeIn(800);
            },1000)
        }
    }

    //Прелоадер
    function preloader(){
        document.body.onload=function(){
            setTimeout(function () {
                var preloader=document.getElementById('page_loader');
                if(!preloader.classList.contains("done")){
                    preloader.classList.add("done");
                }
            },2000)
        }
    }

    //Добавление куки
    function getCookie(name, value, path, domain, secure) {
        {
            var cookie_string = name + "=" + escape(value);
                var expires = new Date(new Date().getTime() + 600 * 1000); //через 10 минут появится заново
                cookie_string += "; expires=" + expires.toUTCString();
            if ( path )
                cookie_string += "; path=" + escape ( path );

            if ( domain )
                cookie_string += "; domain=" + escape ( domain );

            if ( secure )
                cookie_string += "; secure";

            document.cookie = cookie_string;
        }
    }

    //Предложение о подписке с куки
    function LibraryOffer() {
        var offer = document.cookie;
        /*getCookie('offer',0);*/
        if (offer == undefined || offer == 'offer=0' || offer == "") {
            getCookie('offer',0);
            if (document.cookie == 'offer=0') {
                setTimeout(function () {
                    $('#special_offer').fadeIn(1000);
                    getCookie('offer', 1);
                }, 5 * 1000);
                $('#special_offer_off').click(function () {
                    $('#special_offer').fadeOut(1000);
                });
            }
            else if (document.cookie == 'offer=1') {
                $('#special_offer').css('display', 'none');
            }
        }
    }
})(jQuery);