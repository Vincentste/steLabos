$(function(){
    
getFormulaireConnexion();

$('.contenu').on("click",".envoi",valideMotDePasse);
$('.contenu').on('keyup','#champTexte',rechercheParTexte);
$('.contenu').on('click','#buttonAjout',voletAjoutTshirt);
$('.contenu').on('click','#boutSav',saveTshirt);
$('.contenu').on('click','.suppTailleAjout',suppTailleAjout)
$('.contenu').on('click','#ajoutTaille',AfficheAjouterTaille);
$('#myModalTaille').on('click','.ajouter',AjouterTaille),
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


//---------------------------------------------------------MOTEUR DE RECHERCHE---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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
//                                                           -----------------                                                                                                                                                                                                                                                                                                                                               ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------




/*-----------------------------------------------------------RECHERCHE PAR FILTRE-------------------------------------------------------------------------------------------------*/

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
//                                                             ---------------------



/*-------------------------------------------------------------------VOLET AJOUT----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

function recupData_affiche(){
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
                        
                        var tailles=data['taille'];
                        //ajout de la div qui va contenir les tailles 
                        $("<div id=taillesAj></div").insertAfter("#taillesAjout>h2")
                        //recup tt les tailles de la DB et les injectes
                        for(var i=0;i < tailles.length;i++){
                            $("<p id="+tailles[i].taille+"><label for=taille"+tailles[i].taille+">"+tailles[i].taille+" : </label><input type=text name=taille"+tailles[i].taille+" id=taille"+tailles[i].taille+"/> <span class='suppTailleAjout fa fa-trash'></span> <span class='fa fa-pencil'></span></p>").appendTo("#taillesAj"); 
                        } 
    });
}




function voletAjoutTshirt(e){
    //Ajoute ou enlève la class au clique sur le bouton ajout tshirt
    $("#voletAjout").toggleClass("open");

    //Ouvrire ou fermer le volet en fonction de la class "open"
    if($("#voletAjout").hasClass("open")){
        
        $("#voletAjout").load("dispatcher.php","op=voletAjoutTshirt"); 
            recupData_affiche();
    }else{
        $("#voletAjout").empty(); 
    }    
}


function suppTailleAjout(e){
    $(this).parents("p").remove();
}

//ouvre la fenêtre modal pour saisir la taille à ajouter 
function AfficheAjouterTaille(e){
    $("#myModalTaille").css('display','block');
    $(".modal-footer-taille >input").removeClass();
    $(".modal-footer-taille >input").attr("class","ajouter");
}
//confirmation
function AjouterTaille(e){
   var ValTaille = $(".valeur").val().toUpperCase();
   //$.getJSON("dispatcher.php",{"op":"AjoutTailleAjout","ValTaille":ValTaille},function(taille));

   $("<p id="+ValTaille+"><label for=taille"+ValTaille+">"+ValTaille+" : </label><input type=text name=taille"+ValTaille+" id=taille"+ValTaille+"/> <span class='suppTailleAjout fa fa-trash'></span> <span class='fa fa-pencil'></span></p>").appendTo("#taillesAj"); 
}

// ajoute un T-shirt dans la bd
function saveTshirt(e){

    //recup le stock des tailles
    var tab = new Object();
    $("#taillesAj").find("p").each(function(){
            var taille =($(this).attr("id"));
            var stock =($(this).find("input").val());
            tab[taille] = stock;
    });

    //recup autre champ
    var prodNom = $('#prodNomAjout').val();
    var prodPrix = $('#prodPrixAjout').val();
    var img_gd = "vide";
    var img_pt = "vide";
    var des = $('#prodDescAjout').val();
    var crea = $('#prodCreAjout').val();
    var mat = $('#prodMatAjout').val();
    var date_aj = $('#prodDateAjout').val();
    var cat = $('#prodCatAjout').val();

    $.getJSON("dispatcher.php",{"op":"save_tshirt","nom":prodNom,"prix":prodPrix,"img_gd":img_gd,"img_pt":img_pt,"desc":des,"crea":crea,"mat":mat,"date":date_aj,"cat":cat,"taille":tab}); 
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
            var boucle = (data["images"].length)-1;
            var nbrPage = Math.floor(nbrImage/4);
           
            for(var i=0;i < boucle;i++){

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
    


/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/




/*-----------------------------------------------------------VOLET MODIFIER Tshirt-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

// fonction qui affiche les tailles d un tshirt 
function recupTaille(idTshirt){
    $.getJSON("dispatcher.php",{"op":"tailleTshirt","idTshirt":idTshirt},function(a){
        $("<div id='tailleMod'></div>").insertAfter("#taillesModif>h2")
        for(var i=0; i < a.length; i++){
            $('<p id='+a[i].taille+'><label for=taille'+a[i].taille+'>'+a[i].taille+'</label><input name=taille'+a[i].taille+' id=ModifTaille'+a[i].taille+' value='+a[i].stock+' type=text/> <span data=ModifTaille'+a[i].taille+' name='+a[i].idTaille+' class="suppTaille fa fa-trash"></span> <span data="ModifTaille'+a[i].taille+'" class="UpdateTaille fa fa-pencil"></span></p>').appendTo("#tailleMod");   
        }   
    }); 
}


//ouverture du volet modifier + insertion ds les champs et sauvegarde de l update!
function modifTshirt(e){

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
           
           //insertion ds les champs 
           $("input#prodNom").val(nom);
           $("input#prodPrix").val(prix);
           $("input#prodDate").val(date);
           $("textarea#prodDesc").val(desc);
           $("#imgprew").attr("src","images/"+imgpew);
           $("#imglist").attr("src","images/"+imglist);
           

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
        // recup des tailles du tshirt et injection.
        recupTaille(idTshirt);
    }
    else{
        $("form.modifier").children().remove(); 
    }    
}



// click pour Update Tshirt dans la DB 
$('.contenu').on('click','#boutMod', function UpdateTshirt(e){
        //recup des Stocks des tailles
        var tab = new Object();
        $("#tailleMod").find("p").each(function(){
               var taille =($(this).attr("id"));
               var stock =($(this).find("input").val());
                tab[taille] = stock
        });
        //recup des val des champs
        var idTshirt = $(this).parents("li").find("h2").attr("data");
        var nom = $("input#prodNom").val();
        var prix = $("input#prodPrix").val();
        var date =  $("input#prodDate").val();
        var desc =  $("textarea#prodDesc").val();
        var crea = $('#prodCre').val();
        var mat = $('#prodMat').val();
        var cat = $('#prodCat').val();
    
         //change la valeur du h2 ds la recherche
        $("li#tshirt"+idTshirt+" >h2").replaceWith("<h2 data="+idTshirt+">"+nom+"</h2>");
        //update ds la DB
        $.getJSON("dispatcher.php",{"op":"UpdateTshirt","id":idTshirt,"prodNom":nom,"prodPrix":prix,"prodDate":date,"prodDesc":desc,"prodCre":crea,"prodMat":mat,"prodCat":cat,"StockTaille":tab});
        //feunêtre modal confirmation update
        var modal = $('#myModalModif');
        $("#myModal").find("h2").replaceWith("<h2>Le T-shirt a bien été mis à jour !</h2>");
        $('#myModal').fadeIn();
        $('#myModal').fadeOut(1000);
        
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
    $("#myModal").find("h2").replaceWith("<h2> Le T-shirt a bien été supprimé !</h2>");
    $('#myModal').fadeIn();
    $('#myModal').fadeOut(2000);
});
//confirmation -->non
$('.modal-body').on('click','.nonTshirt', function choixNonTshirt(e){
    $(".modalSupp").fadeOut(); 
});





//supprime la taille d'un tshirt ds la DB
$('.contenu').on('click','.suppTaille', function UpdateTaille(e){
    // affiche la F. modal de confirmation
    var idTshirt = $(this).parents("li").find("h2").attr("data");
    var modal = $('#myModalSupp');
    $('#myModalSupp').find('h2').replaceWith("<h2 id="+$(this).attr("name")+" class="+idTshirt+" data="+$(this).attr("data")+">Voulez vous supprimer le Stock de cette taille?</h2>");
    $(".modal-body").find("p").remove();
    $('<p class="ouiTaille">OUI</p><p class="nonTaille">NON</p>').appendTo(".modal-body");
    modal.css('display' ,"block");
});
//confirmation => oui 
$('.modal-body').on('click','.ouiTaille', function ChoixOuiTaille(e){
    $("#tailleMod").remove();
    var taille = $(".modal-content").find("h2").attr("data");
    var idTshirt = $(".modal-content").find("h2").attr("class");
    var idTaille = $(".modal-content").find("h2").attr("id");
    $("#"+taille+"").val('0');
    $.getJSON("dispatcher.php",{"op":"supprimerTaille","idTaille":idTaille,"idTshirt":idTshirt},function(e){
        
    });
    $(".modalSupp").fadeOut();
    $("#myModal").find("h2").replaceWith("<h2> Le stock à bien été mis à jour</h2>");
    recupTaille(idTshirt);
    $('#myModal').fadeIn();
    $('#myModal').fadeOut(2000);
});
//confirmation => non
$('.modal-body').on('click','.nonTaille', function ChoixNonTaille(e){
    $(".modalSupp").fadeOut(); 
});




//ajouter une taille 
$(".contenu").on("click","#ajoutTailleModif",function OuvreVoletTailleModif(e){
    var idTshirt = $(this).parents("li").find("h2").attr("data");
    $("#myModalTaille").css('display','block');
    $("#myModalTaille").find(".submit").attr("id",idTshirt);
    $(".modal-footer-taille >input").removeClass();
    $(".modal-footer-taille >input").attr("class","submit");
});
//valide l'ajout d'une taille
$("#myModalTaille").on("click",".submit",function AjouteTailleModif(e){
    $("#tailleMod").remove();
    var idTshirt = $(this).attr("id");
    var ValTaille = $(".valeur").val().toUpperCase();
    $("#myModalTaille").css('display','none');
    $.getJSON("dispatcher.php",{"op":"AjoutTaille","idTshirt":idTshirt,"ValTaille":ValTaille},function(z){
    
    });
    recupTaille(idTshirt);
});
//ferme la modal ajout d'une Taille
$(".close-taille").on("click",function close(){
        $("#myModalTaille").css('display','none');
});

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/



});