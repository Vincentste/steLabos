$(function(){
    
getFormulaireConnexion();
$('.contenu').on("click",".envoi",valideMotDePasse);
$('.contenu').on('keyup','#champTexte',rechercheParTexte);
$('.contenu').on('click','#buttonAjout',voletAjoutTshirt);


function valideMotDePasse(e){
     $.getJSON("dispatcher.php",{"op":"controleConnexion","nom":$('#nom').val(),"mdp":$('#mdp').val()},function(data){
        
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
         	
         }

    }); 
}


function getFormulaireConnexion($ou){
    $ou = $ou?$ou:$("body>.contenu");
    $("body>.contenu").load("dispatcher.php","op=connexion");
    
}

function rechercheParTexte(e){
    $("#recherche").remove(); 
    $.getJSON("dispatcher.php",{"op":"rechercheParTexte","lettre":$('#champTexte').val()},function(data){
    $ul = $("<ul id='recherche'/>").insertAfter("#divAjout");
    for (var i=0; i<data.length; i++){
        var tshirt = data[i].prod_nom;
        $li = $("<li id=tshirt"+i+"/>").text(tshirt).appendTo($ul);
        $("<ul id=tshirt"+i+"/>").prepend('<li class=ajouter>ajouter</li>').prepend('<li class=modif>modifier</li>').prepend('<li class=supprimer>supprimer</li>').appendTo($li);
    }
      
    $('.contenu').on('click','.supprimer', function supprimerTshirt(){
        alert("ok");
    });


    });
}


function voletAjoutTshirt(e){
    // $.getJSON("dispatcher.php",{"op":"voletAjoutTshirt"},function(data){
  
    // });
    $("#voletAjout").load("dispatcher.php","op=voletAjoutTshirt"); 
    
    $.getJSON("dispatcher.php","op=data_recherche",function(data){

                    var categories=data['categories'];
                    for(var i=0;i < categories.length;i++){
                        var option=$('<option/>');
                        option.text(categories[i].cat_nom);
                        option.appendTo('#prodCat');    
                    }
                    
                    var createurs=data['createurs'];
                    for(var i=0;i < createurs.length;i++){
                        var option=$('<option/>');
                        option.text(createurs[i].cre_nom);
                        option.appendTo('#prodCre');   
                    }
                    
                   var matieres=data['matieres'];
                    for(var i=0;i < matieres.length;i++){
                        var option=$('<option/>');
                        option.text(matieres[i].mat_nom);
                        option.appendTo('#prodMat');    
                    }     
    }); 
    
     
}

    
});