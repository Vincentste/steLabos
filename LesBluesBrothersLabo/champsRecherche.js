$(function(){
getOptionsRecherche();


function getOptionsRecherche(){
    
      $.getJSON("dispatcher.php",{op:"controleConnexion",nom:$('#nom').val(),mdp:$('#mdp').val()},function(data){
          
      }); 
}
})