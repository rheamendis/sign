/*
 Rhea dont you dare copy this code, this is only for your learning! :P
 */

(function(){
    "use strict";

    /**
     * Common JS for
     */

    $(document).ready(function(){
        /**
         * Caching selectors in variables
         */
        var $nestClosePopUp = $('.nest-close-pop-up'),
            $nestPopUp = $('.nest-pop-up'),
            $nestPopUpContainer = $('#nest-pop-up-container'),
            $nestFormInput = $('.nest-validation input'),

        // nestopia config
            config = {
                validations: {
                    full_name: "^[A-Za-z\\s]{1,}[\\.]{0,1}[A-Za-z\\s]{0,}$",
                    mobile: "^[0-9]{10}$",
                    email: "^[-a-z0-9~!$%^&*_=+}{\'?]+(\\.[-a-z0-9~!$%^&*_=+}{\\'?]+)*@([a-z0-9_][-a-z0-9_]*(\\.[-a-z0-9_]+)*\\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}))(:[0-9]{1,5})?$",
                    password: "^[a-zA-Z0-9_.-]{8,}$"
                },
                API: {
                    login: {
                        link: "/auth/token",
                        el: ".nest-login"
                    },
                    reset: {
                        link: "/password/email",
                        el: ".nest-reset"
                    },
                    registration: {
                        link: "/registration",
                        el: ".nest-register"
                    },
                    concerns: {
                        link: "/client/dashboard/store-concerns",
                        el: ".nest-concerns"
                    }
                }
            };
        /**
         * Nest slider
         */


        //LEFT: 37,
        //    UP: 38,
        //    RIGHT: 39,
        //    DOWN: 40,

        /**
         * Event handlers
         */

        /**
         * Body events
         */




        /**
         * Fade in .pop-up-container
         */
        //$nestPopUp.click(function(){
        //    $nestPopUpContainer.fadeIn();
        //});



        /**
         *  ------------------------------------------------
         *                  Validations
         *  ------------------------------------------------
         */

        $nestFormInput.on('blur',function(){
            var $this = $(this),
                value = $this.val(),
                $data = $this.data(),
                name = $this.attr('name'),
                pattern = new RegExp(config.validations[name]),
                state = pattern.test(value);
            $('#'+$data.id).find('.main-error').html('');
            $this.data('state',state);
            if(!(state)){
                $this.css('border-bottom','1px solid red');
                $this.prev('.error-msg').html("<div>"+$data.msg+"</div>");
            }
            else{
                $this.prev('.error-msg').html('');
                $this.css('border-bottom','1px solid green')
            }
        });


        /**
         * -------------------------------------------------
         *                 jQuery extensions
         * -------------------------------------------------
         */

        jQuery.fn.extend({
            slider: function(idName){
                var id = document.getElementById(idName),
                    slider = id.querySelector('.nest-slider-vb'),
                    sliderInner = id.querySelector('.nest-slider-inner'),
                    data = slider.getBoundingClientRect(),
                    slides = id.querySelectorAll('.nest-slider .slide'),
                    length = slides.length,
                    count = 0,
                    title = id.querySelector('.title');
                if(title){
                    title.innerHTML = slides[count].dataset.title;
                }
                var opaqueAll = function(){
                    for( var i = 0; i< length; i++){
                        slides[i].style.opacity = 0.2;
                    }
                };


                opaqueAll();
                sliderInner.style.width = (data.width*length) +"px";
                sliderInner.style.marginLeft = "0px";

                slides[count].style.opacity = 1;


                $("#"+idName+" .next").click(function(){
                    if(count < length-1){
                        $("#"+idName+" .prev").show();
                        count++;
                        opaqueAll();
                        slides[count].style.opacity = 1;
                        var currentMargin = parseFloat(sliderInner.style.marginLeft);
                        sliderInner.style.marginLeft = (currentMargin - data.width) +"px";
                        if(title){
                            title.innerHTML = slides[count].dataset.title;
                        }
                    }
                    else {
                        $(this).hide();
                    }

                });

                $("#"+idName+" .prev").click(function(){
                    if(count>0){
                        $("#"+idName+" .next").show();
                        count--;
                        opaqueAll();
                        slides[count].style.opacity = 1;
                        var currentMargin = parseFloat(sliderInner.style.marginLeft);
                        sliderInner.style.marginLeft = (currentMargin + data.width) +"px";
                        if(title){
                            title.innerHTML = slides[count].dataset.title;
                        }
                    }
                    else {
                        $(this).hide();
                    }

                });

                (function(){
                    $("#"+idName+" .prev").show();
                    count++;
                    opaqueAll();
                    slides[count].style.opacity = 1;
                    var currentMargin = parseFloat(sliderInner.style.marginLeft);
                    sliderInner.style.marginLeft = (currentMargin - data.width) +"px";
                    if(title){
                        title.innerHTML = slides[count].dataset.title;
                    }
                }());


            },
            popUp: function($el){
                $nestPopUp.click(function(){
                    $nestPopUpContainer.fadeIn();
                    $el.fadeIn();
                });
            },
            closePopUp: function($el){
                $nestClosePopUp.click(function(){
                    $el.fadeOut();
                    $nestPopUpContainer.fadeOut();

                });
                $nestPopUpContainer.click(function(){
                    $el.fadeOut();
                    $(this).fadeOut();

                });
                $(document).keyup(function(e) {
                    // On pressing escape key
                    if (e.keyCode == 27) {
                        //fadeout pop up screen
                        $nestPopUpContainer.fadeOut();
                        $el.fadeOut();
                    }
                });
            },
            ajax: function(linkName,fn,fn2){
                // linkName is the key from config data under the parent key API
                var link = config.API[linkName].link,
                    el = config.API[linkName].el,
                    $el = $(el),
                    ajaxObject = {};
                $el.on("submit", function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var $this = $(this),
                        data = $this.serialize(),
                        name = $el.attr("name");
                    $this.find('input[type=submit]').prop('disabled', true);
                    ajaxObject = (function(){
                        var Obj = {
                            type: "POST",
                            url: link,
                            data: data,
                            dataType: 'json'
                        };
                        switch (el){

                            // In case of sign up
                            case '.nest-register':
                                Obj.success = function(jqXHR){
                                    $this.find('input[type=submit]').prop('disabled', false);
                                    // tracking for fb
                                    fbq('track', 'Lead');


                                    $('#regResponse').html('').removeClass('alert-danger').addClass('alert-success').css('padding', '7px').css('color', '#3c763d').html('<p>' + jqXHR.message + '</p>').show();

                                    // form name is required to know exactly from where we get leads
                                    if(typeof name !== "undefined"){
                                        // GTM tracking
                                        dataLayer.push({'event': 'formSubmitted', 'formName': name });
                                    }
                                    $("#job_id").val(jqXHR.responseData["job_id"]);
                                    // call back function
                                    if(fn && typeof fn == "function"){
                                        fn().done(function(data){
                                            if(fn2 && typeof fn2 == "function"){
                                                fn2();
                                            }
                                            else {
                                                window.location.href = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/client/dashboard';
                                            }
                                        });
                                    }
                                    else {
                                        window.location.href = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/client/dashboard';
                                    }

                                };
                                Obj.error = function(data){
                                    var errors = data.responseJSON.errors;
                                    switch (el){
                                        case '.nest-registration':
                                    }
                                    for( var key in errors){
                                        if (typeof errors[key] != 'undefined'){
                                            $(el+" input[name='"+key+"']").prev('.error-msg').html("<div>" + errors[key][0] + "</div>");
                                        }
                                    }
                                    $this.find('input[type=submit]').prop('disabled', false);
                                };

                                break;

                            // In case of login form
                            case '.nest-login':
                                Obj.success = function(jqXHR){
                                    //localStorage["token"] = jqXHR.token;
                                    $('#msglogin').html('').removeClass('alert-danger');


                                    if(fn && typeof fn == "function"){
                                        fn().done(function(data){
                                            window.location.href = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/client/dashboard';
                                        }).fail(function(data){
                                            alert('it came here');
                                        });
                                    }
                                    else {
                                        window.location.href = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/client/dashboard';
                                    }
                                };
                                Obj.error = function(jqXHR, textStatus, errorThrown) {
                                    $this.find('input[type=submit]').prop('disabled', false);
                                    $('#msglogin').html('').addClass('alert alert-danger').css('color','#a94442').html(jqXHR.responseJSON.msg).show();
                                };
                                break;

                            // In case of reset form
                            case '.nest-reset':
                                Obj.success = function(jqXHR){
                                    $('#reset-error').html('').removeClass('alert-danger').addClass('alert-success').html('<p>'+jqXHR.msg+'</p>').show();
                                };
                                Obj.error = function(jqXHR, textStatus, errorThrown){
                                    $this.find('input[type=submit]').prop('disabled', false);
                                    $('#reset-error').html('').addClass('alert-danger').html('<p>'+jqXHR.responseJSON.msg+'</p>').show();
                                };
                                break;

                            // In case of concerns form
                            case '.nest-concerns':
                                Obj.success = function(jqXHR){
                                    var url = '/client/dashboard';
                                    location.href = url;
                                };
                                Obj.error = function(jqXHR){
                                    $this.find('input[type=submit]').prop('disabled', false);
                                    $this.find('.error').hide();
                                    var errors = jqXHR.responseJSON.errors;
                                    for (var key in errors){
                                        if(typeof errors[key] != 'undefined'){
                                            $("#"+key+"_error").html(errors[key][0]).show();
                                        }
                                    }

                                };
                                break;

                        };
                        return Obj;
                    }());

                    $.ajax(ajaxObject);

                });
            }
        });

    });

}());


//# sourceMappingURL=nest.common.js.map
