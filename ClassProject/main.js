$(window).load(function(){
	$('#preloader').fadeOut('slow',function(){$(this).remove();});
});

  window.onresize = function(){
	  if(window.innerWidth > 600){
		document.querySelector(".nav-links").style.display = "block";
	  }else{
		document.querySelector(".nav-links").style.display = "none";
	  }
  }