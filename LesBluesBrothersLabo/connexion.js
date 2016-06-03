$(function(){
    
getFormulaireConnexion();
$('.contenu').on("click",".envoi",valideMotDePasse);



function valideMotDePasse(e){
     $.getJSON("dispatcher.php",{op:"controleConnexion",nom:$('#nom').val(),mdp:$('#mdp').val()},function(data){
        
         if(data.authorisation == "oui"){
         	$("body>.contenu").load("dispatcher.php","op=template_tshirt");
         }else{
         	$("body>.contenu").load("dispatcher.php","op=connexion&msg=oui");
         }

    }); 
}

function getFormulaireConnexion($ou){
	$ou = $ou?$ou:$("body>.contenu");
	$("body>.contenu").load("dispatcher.php","op=connexion");
    
}
    
})