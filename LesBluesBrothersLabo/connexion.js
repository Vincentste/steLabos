$(function(){
    
getFormulaireConnexion();

$('.contenu').on("click",".envoi",valideMotDePasse);
$('.contenu').on('keyup','#champTexte',rechercheParTexte);
$('.contenu').on('click','#buttonAjout',voletAjoutTshirt);
$('.contenu').on('click','#boutSav',saveTshirt);
$('.contenu').on('click','#boutAnn',annuleTshirt);
$('.contenu').on('click','#boutChampRech',rechercheParFiltres);
$('.contenu').on('click','.modif',modifTshirt);
$('.contenu').on('click','#imageAjout',voletAjoutImages);
$('.contenu').on('click','.lienPg',voletAjoutImages);

function getFormulaireConnexion($ou){
    $.getJSON("dispatcher.php",{"op":"getSession"},function(data){
          if(data.authorisation == "oui"){
            $("body>.contenu").load("dispatcher.php","op=template_tshirt",function(){
                $.getJSON("dispatcher.php","op=data_recherche",function(data){

                    var categories=data['categories'];
                    var optionUne=$('<option/>');
                    optionUne.val('%');
                    optionUne.text('tous');
                    optionUne.appendTo('#selectCat');
                    for(var i=0;i < categories.length;i++){
                        var option=$('<option/>');
                        option.text(categories[i].cat_nom);
                        option.appendTo('#selectCat');    
                    }
                    
                    var createurs=data['createurs'];
                    var optionDeux=$('<option/>');
                    optionDeux.val('%');
                    optionDeux.text('tous');
                    optionDeux.appendTo('#selectCre');
                    for(var i=0;i < createurs.length;i++){
                        var option=$('<option/>');
                        option.text(createurs[i].cre_nom);
                        option.appendTo('#selectCre');   
                    }
                    
                   var matieres=data['matieres'];
                    var optionTrois=$('<option/>');
                    optionTrois.val('%');
                    optionTrois.text('tous');
                    optionTrois.appendTo('#selectMat');
                    for(var i=0;i < matieres.length;i++){
                        var option=$('<option/>');
                        option.text(matieres[i].mat_nom);
                        option.appendTo('#selectMat');    
                    }
                }); 
            });             
        }
    });
    $ou = $ou?$ou:$("body>.contenu");
    $("body>.contenu").load("dispatcher.php","op=connexion");
}

function valideMotDePasse(e){
     $.getJSON("dispatcher.php",{"op":"controleConnexion","nom":$('#nom').val(),"mdp":$('#mdp').val()},function(data){
        
         if(data.authorisation == "oui"){
    		$("body>.contenu").load("dispatcher.php","op=template_tshirt",function(){
    			$.getJSON("dispatcher.php","op=data_recherche",function(data){

                    var categories=data['categories'];
                    var optionUne=$('<option/>');
                    optionUne.val('%');
                    optionUne.text('tous');
                    optionUne.appendTo('#selectCat');
                    for(var i=0;i < categories.length;i++){
                        var option=$('<option/>');
                        option.text(categories[i].cat_nom);
                        option.appendTo('#selectCat');    
                    }
                    
                    var createurs=data['createurs'];
                    var optionDeux=$('<option/>');
                    optionDeux.val('%');
                    optionDeux.text('tous');
                    optionDeux.appendTo('#selectCre');
                    for(var i=0;i < createurs.length;i++){
                        var option=$('<option/>');
                        option.text(createurs[i].cre_nom);
                        option.appendTo('#selectCre');   
                    }
                    
                   var matieres=data['matieres'];
                    var optionTrois=$('<option/>');
                    optionTrois.val('%');
                    optionTrois.text('tous');
                    optionTrois.appendTo('#selectMat');
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


//--------------------------------------MOTEUR DE RECHERCHE---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// barre de recherche 
function rechercheParTexte(e){
    //vérifie si le champ est vide.
    if($(this).val().length == 0){
        $("#recherche").remove();
    }
    else{
        //efface les anciens ul de recherche
        $("#recherche").remove();
        $.getJSON("dispatcher.php",{"op":"rechercheParTexte","lettre":$('#champTexte').val()},function(data){
            $ul = $("<ul id='recherche'/>").insertAfter("#divAjout");
            //affiche tous les tshirt qui corresponde à la lettre tapée
                for (var i=0; i<data.length; i++){
                    var tshirt = data[i].prod_nom;
                    $li = $("<li id=tshirt"+data[i].prod_id+"/>").html("<h2 data="+data[i].prod_id+">"+tshirt+"</h2>").appendTo($ul);
                    // affichage de voir / supprimer / modifier
                    $("<ul class=tshirt/>").prepend('<li data='+data[i].prod_id+' class="supprimer"><i class="fa fa-trash"></i></li>').prepend('<li data='+data[i].prod_id+' class=modif ><i class="fa fa-pencil"></i></li>').prepend('<li class=voir><i class="fa fa-plus"></i></li>').appendTo($li);
                }
            //form qui va servir à la modification du tshirt.
            $("<form class='modifier'/>").insertAfter(".tshirt");
        });
    } 
}
//                                          -----------------                                                                                                                                                                                                                                                                                                                                               ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------




//recherche les noms des tshirt ds la DB
function rechercheParFiltres(e){
    $("#recherche").remove(); 
    $.getJSON("dispatcher.php",{"op":"rechercheParFiltre","cat":$('#selectCat').val(),"mat":$('#selectMat').val(),"cre":$('#selectCre').val()},function(data){
    $ul = $("<ul id='recherche'/>").insertAfter("#divAjout");
    //affiche les tshirt
        for (var i=0; i<data.length; i++){
            var tshirt = data[i].prod_nom;
            $li = $("<li id=tshirt"+data[i].prod_id+"/>").html("<h2 data='"+data[i].prod_id+"'>"+tshirt+"</h2>").appendTo($ul);
            $("<ul class=tshirt/>").prepend('<li data='+data[i].prod_id+' class="supprimer"><i class="fa fa-trash"></i></li>').prepend('<li data='+data[i].prod_id+' class=modif ><i class="fa fa-pencil"></i></li>').prepend('<li class=voir><i class="fa fa-plus"></i></li>').appendTo($li);
        }
         $("<form class='modifier'/>").insertAfter(".tshirt");
       
    });
}


function voletAjoutTshirt(e){
    //Ajoute ou enlève la class au clique sur le bouton ajout tshirt
    $("#voletAjout").toggleClass("open");

    //Ouvrire ou fermer le volet en fonction de la class "open"
    if($("#voletAjout").hasClass("open")){
        
        $("#voletAjout").load("dispatcher.php","op=voletAjoutTshirt"); 
        
        $.getJSON("dispatcher.php","op=data_recherche",function(data){

                        var categories=data['categories'];
                        for(var i=0;i < categories.length;i++){
                            var option=$('<option value="'+categories[i].cat_id+'"/>');
                            option.text(categories[i].cat_nom);
                            option.appendTo('#prodCatAjout');    
                        }
                        
                        var createurs=data['createurs'];
                        for(var i=0;i < createurs.length;i++){
                            var option=$('<option value="'+createurs[i].cre_id+'"/>');
                            option.text(createurs[i].cre_nom);
                            option.appendTo('#prodCreAjout');   
                        }
                        
                       var matieres=data['matieres'];
                        for(var i=0;i < matieres.length;i++){
                            var option=$('<option value="'+matieres[i].mat_id+'"/>');
                            option.text(matieres[i].mat_nom);
                            option.appendTo('#prodMatAjout');    
                        }     
        });

    }else{
        $("#voletAjout").empty(); 
    }    
}

function saveTshirt(){

    var prodNom = $('#prodNomAjout').val();
    var prodPrix = $('#prodPrixAjout').val();
    var img_gd = "vide";
    var img_pt = "vide";
    var des = $('#prodDescAjout').val();
    var crea = $('#prodCreAjout').val();
    var mat = $('#prodMatAjout').val();
    var date_aj = $('#prodDateAjout').val();
    var cat = $('#prodCatAjout').val();
    var tailleS = $('#tailleS').val();
    var tailleM = $('#tailleM').val();
    var tailleL = $('#tailleL').val();
    var tailleXL = $('#tailleXL').val();

    $("#voletAjout").load("dispatcher.php",
    "op=save_tshirt&nom="+prodNom+"&prix="+prodPrix+"&img_gd="+img_gd+"&img_pt="+img_pt+"&desc="+des+"&crea="+crea+"&mat="+mat+"&date="+date_aj+"&cat="+cat+"&tailleS="+tailleS+"&tailleM="+tailleM+"&tailleL="+tailleL+"&tailleXL="+tailleXL+""); 
}

function annuleTshirt(e){
    $('#prodNomAjout').val(""); 
    $('#prodPrixAjout').val(""); 
    $('#prodDescAjout').val("");
    $('#prodDateAjout').val("");
}

function voletAjoutImages(e){

    e.stopPropagation();
    $("#voletImageAjout").empty();

    var page = parseInt($(this).text());
    
    if(isNaN(page)){
        page = 1; 
        //Ajoute ou enlève la class au clique sur le bouton ajout tshirt
        $("#voletImageAjout").toggleClass("open");
    }else{
        page = $(this).text();
    }  

    //Ouvrire ou fermer le volet en fonction de la class "open"
    if($("#voletImageAjout").hasClass("open")){
      

        $.getJSON("dispatcher.php",{"op":"recherche_image","pg":page},function(data){             
            var src = "images/";
            var nbrImage = (data["nbrImg"].nbrImgs);
            console.log(data);
            var nbrPage = Math.round(nbrImage/4);
           
            for(var i=0;i < 2;i++){
                $("<img/>").appendTo("#voletImageAjout").attr("src",src+data["images"][i].prod_img_pt);
                $("<img/>").appendTo("#voletImageAjout").attr("src",src+data["images"][i].prod_img_gd);
            }

            $("<div/>").appendTo("#voletImageAjout").attr("id","paginationImg");
            
            for(var i=1;i <= nbrPage;i++){
                var em = $("<em/>").appendTo("#paginationImg").addClass("lienPg").text(i);
            }


        });

    }else{
        $("#voletImageAjout").empty(); 
    }    
}
    







//-----------------------------------------------------------modifier Tshirt----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//ouverture du volet modifier + insertion ds les champs et sauvegarde de l update!
function modifTshirt(){
    $("form.modifier").children().remove();
    //Ajoute ou enlève la class au clique sur le bouton modif tshirt
    $("form.modifier").toggleClass("open");

    //Ouvrire ou fermer le volet en fonction de la class "open"
    if($("form.modifier").hasClass("open")){
   
        //recup de l'id du tshirt à modifier
        var idTshirt = $(this).attr("data");
        
        //affiche le formulaire 
        $(this).parent().next().load("dispatcher.php","op=afficheModifierTshirt");
        

        //afficher les données ds les champs 
        $.getJSON("dispatcher.php",{"op":"ModifierTshirt","id":idTshirt},function(data){

           //recup des données du tshirt à modifier
           var nom = data[0].prod_nom;
           var prix = data[0].prod_prix;
           var date = data[0].prod_date;
           var desc = data[0].prod_desc;
           var imgpew = data[0].prod_img_pt;
           var imglist = data[0].prod_img_gd;
           var crea = data[0].cre_nom;
           var mat = data[0].mat_nom;
           var cat = data[0].cat_nom;
          
           var tailleS = data[0].exem_stock;
           var tailleM = data[1].exem_stock;
           var tailleL = data[2].exem_stock;
           var tailleXL = 0;
           
           //insertion ds les champs 
           $("input#prodNom").val(nom);
           $("input#prodPrix").val(prix);
           $("input#prodDate").val(date);
           $("textarea#prodDesc").val(desc);
           $("#imgprew").attr("src","images/"+imgpew);
           $("#imglist").attr("src","images/"+imglist);
           $("input#ModifTailleS").val(tailleS);
           $("input#ModifTailleM").val(tailleM);
           $("input#ModifTailleL").val(tailleL);
           $("input#ModifTailleXL").val(tailleXL);

            // recup et insertion ds les selects cat/crea/matiéres. 
            $.getJSON("dispatcher.php","op=data_recherche",function(d){
                            
                            var categories=d['categories'];
                            for(var i=0;i < categories.length;i++){
                                //met le selected sur la bonne catégorie
                                if(cat == categories[i].cat_nom){
                                    var option=$('<option value="'+categories[i].cat_id+'" selected/>');
                                    option.text(categories[i].cat_nom);
                                    option.appendTo('#prodCat'); 
                                }
                                else{
                                    var option=$('<option value="'+categories[i].cat_id+'"/>');
                                    option.text(categories[i].cat_nom);
                                    option.appendTo('#prodCat');    
                                }
                            }
                            
                            var createurs=d['createurs'];
                            for(var i=0;i < createurs.length;i++){
                                //met le selected sur le bon createur
                                if(crea == createurs[i].cre_nom){
                                    var option=$('<option value="'+createurs[i].cre_id+'" selected/>');
                                    option.text(createurs[i].cre_nom);
                                    option.appendTo('#prodCre'); 
                                }
                                else{
                                    var option=$('<option value="'+createurs[i].cre_id+'"/>');
                                    option.text(createurs[i].cre_nom);
                                    option.appendTo('#prodCre');   
                                }
                            }
                            
                           var matieres=d['matieres'];
                            for(var i=0;i < matieres.length;i++){
                                //met le selected sur la bonne matiére.
                                if(mat == matieres[i].mat_nom){
                                    var option=$('<option value="'+matieres[i].mat_id+'" selected/>');
                                    option.text(matieres[i].mat_nom);
                                    option.appendTo('#prodMat'); 
                                }
                                else{
                                    var option=$('<option value="'+matieres[i].mat_id+'"/>');
                                    option.text(matieres[i].mat_nom);
                                    option.appendTo('#prodMat');    
                                }
                            }     
            
            }); 
        });
    }else{
        $("form.modifier").children().remove(); 
    }    

}



// click pour Update Tshirt dans la DB 
$('.contenu').on('click','#boutMod', function UpdateTshirt(e){
        //recup des val des champs
        var idTshirt = $(this).parents("li").find("h2").attr("data");
        var nom = $("input#prodNom").val();
        var prix = $("input#prodPrix").val();
        var date =  $("input#prodDate").val();
        var desc =  $("textarea#prodDesc").val();
        var crea = $('#prodCre').val();
        var mat = $('#prodMat').val();
        var cat = $('#prodCat').val();
        var tailleS = $('#tailleS').val();
        var tailleM = $('#tailleM').val();
        var tailleL = $('#tailleL').val();
        var tailleXL = $('#tailleXL').val();
       
         //change la valeur du h2 ds la recherche
        $("li#tshirt"+idTshirt+" >h2").replaceWith("<h2 data="+idTshirt+">"+nom+"</h2>");
        //update ds la DB
        $.getJSON("dispatcher.php",{"op":"UpdateTshirt","id":idTshirt,"prodNom":nom,"prodPrix":prix,"prodDate":date,"prodDesc":desc,"prodCre":crea,"prodMat":mat,"prodCat":cat});
        //feunêtre modal confirmation update
        var modal = $('#myModalModif');
        modal.fadeIn();
        modal.fadeOut(3000);
        
});


//supprime le stock d'une taille d'un tshirt ds la DB
$('.contenu').on('click','.suppTaille', function UpdateTaille(e){
    // affiche la F. modal de confirmation
    var idTshirt = $(this).parents("li").find("h2").attr("data");
    var modal = $('#myModalSupp');
    $('#myModalSupp').find('h2').replaceWith("<h2 id="+$(this).attr("id")+" class="+idTshirt+" data="+$(this).attr("data")+">Voulez vous supprimer le Stock de cette taille?</h2>");
    $(".modal-body").find("p").remove();
    $('<p class="ouiTaille">OUI</p><p class="nonTaille">NON</p>').appendTo(".modal-body");
    modal.css('display' ,"block");
});

//confirmation => oui 
$('.modal-body').on('click','.ouiTaille', function choixOuiTaille(e){
    var taille = $(".modal-content").find("h2").attr("data");
    var idTshirt = $(".modal-content").find("h2").attr("class");
    var idTaille = $(".modal-content").find("h2").attr("id");
    $("#"+taille+"").val('0');
    $.getJSON("dispatcher.php",{"op":"supprimerStockTaille","idTaille":idTaille,"idTshirt":idTshirt});
    $(".modalSupp").fadeOut();
});
//confirmation => non
$('.modal-body').on('click','.nonTaille', function choixNonTaille(e){
    $(".modalSupp").fadeOut(); 
});


// supprime un tshirt ds la DB
$('.contenu').on('click','.supprimer', function supprimerTshirt(e){
    var idTshirt =($(this).attr("data"));
    //confirmation de la suppression
    var modal = $('#myModalSupp');
    $('#myModalSupp').find('h2').replaceWith("<h2 id="+idTshirt+">Voulez vous supprimer ce T-shirt?</h2>");
    $(".modal-body").find("p").remove();
    $('<p class="ouiTshirt">OUI</p><p class="nonTshirt">NON</p>').appendTo(".modal-body");
    modal.css('display' ,"block");
});

//confirmation --> oui
$('.modal-body').on('click','.ouiTshirt', function choixOuiTshirt(e){
    idTshirt = $(".modal-content").find("h2").attr("id");
    $.getJSON("dispatcher.php",{"op":"supprimerTshirt","id":idTshirt});
    //supprime le li du tshirt supprimé. 
    $('#tshirt'+idTshirt+'').remove();
    $(".modalSupp").fadeOut();
});
//confirmation -->non
$('.modal-body').on('click','.nonTshirt', function choixNonTshirt(e){
    $(".modalSupp").fadeOut(); 
});


//update une taille d'un t-shirt 
$(".contenu").on("click",".UpdateTaille",function UpdateTaille(e){
    var taille = $(this).attr("data");
    var valeurTaille = $("#"+taille+"").val();
    var idTshirt = $(this).parents("li").find("h2").attr("data");
    var idTaille = $(this).attr("id");
    alert(valeurTaille);
    $.getJSON("dispatcher.php",{"op":"UpdateTaille","idTaille":idTaille,"idTshirt":idTshirt,"valeur":valeurTaille});

})




/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

});