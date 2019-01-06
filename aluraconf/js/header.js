function scrollSuave(clicado) {

    $(clicado).click(function(event){
        event.preventDefault();

        var target = $(this).attr('href');

        $('html, body').animate({
            scrollTop: $(target).offset().top
        }, 1000);  
    });
}

scrollSuave("#link-sobre");
scrollSuave("#link-palestrantes");
scrollSuave("#link-form");