$(function(){
    
getFormulaireConnexion();
$('.contenu').on("click",".envoi",valideMotDePasse);



function valideMotDePasse(e){
     $.getJSON("dispatcher.php",{op:"controleConnexion",nom:$('#nom').val(),mdp:$('#mdp').val()},function(data){
        
         if(data.authorisation == "oui"){
    		$("body>.contenu").load("dispatcher.php","op=template_tshirt",function(){
    			$.getJSON("dispatcher.php","op=data_recherche",function(data){
         			console.log(data)

         	});	
    		});     	
         	
         }else{
         	
         }

    }); 
}

function getFormulaireConnexion($ou){
	$ou = $ou?$ou:$("body>.contenu");
	$("body>.contenu").load("dispatcher.php","op=connexion");
    
}
    
})