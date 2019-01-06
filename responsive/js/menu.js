$(".menu-abrir").click(function(){
	$("html").addClass("menu-ativo");
});

$(".menu-fechar").click(function(){
	$("html").removeClass("menu-ativo");
});

$("html").click(function(event){
	if (event.target === document.documentElement){
		$("html").removeClass("menu-ativo");
	} 
});