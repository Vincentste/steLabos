$(function(){
    


getFormulaireConnexion();
$('.contenu').on("click",".envoi",valideMotDePasse);



function valideMotDePasse(e){
     $.getJSON("dispatcher.php",{op:"controleConnexion",nom:$('#nom').val(),mdp:$('#mdp').val()},function(data){
         ///
         console.log(data.authorisation);
    }); 
    console.log("passe ici");
}

function getFormulaireConnexion($ou){
	$ou = $ou?$ou:$("body>.contenu");
	$("body>.contenu").load("dispatcher.php","op=connexion");
    
}
    
})