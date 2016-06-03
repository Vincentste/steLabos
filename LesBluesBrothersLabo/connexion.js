$(function(){
    
getFormulaireConnexion();
$('.contenu').on("click",".envoi",valideMotDePasse);
$('.contenu').on('input','#champTexte',rechercheParTexte);


function valideMotDePasse(e){
     $.getJSON("dispatcher.php",{op:"controleConnexion",nom:$('#nom').val(),mdp:$('#mdp').val()},function(data){
        
         if(data.authorisation == "oui"){
    		$("body>.contenu").load("dispatcher.php","op=template_tshirt",function(){
    			$.getJSON("dispatcher.php","op=data_recherche",function(data){

                    var categories=data['categories'];
                    for(var i=0;i < categories.length;i++){
                        var option=$('<option/>');
                        option.text(categories[i].cat_nom);
                        option.appendTo('#selectCat');
                        
                    }
                    
                    var createurs=data['createurs'];
                    for(var i=0;i < createurs.length;i++){
                        var option=$('<option/>');
                        option.text(createurs[i].cre_nom);
                        option.appendTo('#selectCre');
                        
                    }
                    
                   var matieres=data['matieres'];
                    for(var i=0;i < matieres.length;i++){
                        var option=$('<option/>');
                        option.text(matieres[i].mat_nom);
                        option.appendTo('#selectMat');
                        
                    }     
         	});	
    		});     	
         	
         }else{
         	$("body>.contenu").load("dispatcher.php","op=connexion&msg=oui");
         }

    }); 
}
function rechercheParTexte(){
   $.getJSON("dispatcher.php",{op:"rechercheParTexte",chaine:$('#champTexte').val()},function(data){
       
   });
        
}

function getFormulaireConnexion($ou){
	$ou = $ou?$ou:$("body>.contenu");
	$("body>.contenu").load("dispatcher.php","op=connexion");
    
}
    
})/*

       $("<option/>").text($(this).text())
                .appendTo("#monPremierFormulaire")
                .attr("nomFormation",$(this).text());
               
            })*/