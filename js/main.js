/*automatisation de la date*/ 

$( document ).ready(function() {

    date = new Date();
    year = date.getFullYear();
    month = date.getMonth() + 1;
    day = date.getDate();
    document.getElementById("current_date").innerHTML = day + "/" + month + "/" + year;
    
    console.log( "ready!" );
});

/*localisation des parkings en france*/ 

function chargeparking(myparking){
    let requestURL = 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=mobilityref-france-base-nationale-des-lieux-de-stationnement&rows=10000&exclude.user_type=abonn%C3%A9s&exclude.user_type=payant_reserve_abonnes&sort=max_height&q=address=' + myparking;
    fetch(requestURL)  
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);        
            let html = '';
            for(let i=0; i<data.records.length; i++){
                html += '<p>' + data.records[i].fields.name + '</p>';
                html += '<p>' + data.records[i].fields.address + '</p>';             
                html += '<p>' + 'Hauteur Max (en cm) : ' + '<strong>' + data.records[i].fields.max_height + '</strong>' + '</p>'; 
                html += '<p>' + 'Accessibilité : ' +'<em>' + data.records[i].fields.user_type + '</em>' + '</p>'; 
                html += '<p>' + 'Nombre de places : ' + data.records[i].fields.space_count + '</p>';
                html += '<p class="underline">' + 'Prix : ' + '<br>' + '</p>'
                     + '<p>' 
                     + data.records[i].fields.cost_1h + '\u20ac' + ' (1h) ' + '<br>'
                     + data.records[i].fields.cost_2h + '\u20ac' + ' (2h) ' + '<br>'
                     + data.records[i].fields.cost_3h + '\u20ac' + ' (3h) ' + '<br>'
                     + data.records[i].fields.cost_4h + '\u20ac' + ' (4h) ' + '<br>'
                     + data.records[i].fields.cost_24h + '\u20ac' + ' (24h) ' + '<br>'
                     + '</p>';
                html += '<p class="underline">' + '+ d\'infos : ' + '<br>' + '</p>'
                     + '<p>'
                     + data.records[i].fields.info 
                     + '</p>';
                html += '<p>' + 'Site Web : ' + '<a href=" ' + data.records[i].fields.url + ' " target="_blank"> ' + 'Visiter '
                     + '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" fill="currentColor" class="bi bi-box-arrow-up-right" viewBox="0 0 12 18">' 
                     + '<path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>' 
                     + '<path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>' 
                     + '</svg>' 
                     + '</a>' 
                     + '</p>'; 
            $('#resultParking').html(html);
                html += '<hr>';
            };
        })
        .catch(function(error) {
            console.log(error);
        });
    };

    $(document).ready(function(){

        $('#inputParking').on('input',function(e){
            let myparking = $(this).val();
            console.log(myparking);
            chargeparking(myparking);

            console.log( "ready!" );
        });
    });

/*localisation places paris*/ 

function chargeplace(myplace){
    let requestURL = 'https://opendata.paris.fr/api/records/1.0/search/?dataset=stationnement-voie-publique-emplacements&rows=10000&exclude.regpri=AUTOCAR&sort=-numvoie&q=nomvoie=' + myplace;
    fetch(requestURL)  
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);        
            let html = '';
            for(let i=0; i<data.records.length; i++){
                /*voir facet*/
                html += '<p>' + data.records[i].fields.numvoie + ' ' + data.records[i].fields.typevoie + ' ' + data.records[i].fields.nomvoie + '</p>';
                html += '<p>' + '750' + data.records[i].fields.arrond + ' Paris' + ' (' + data.records[i].fields.arrond + '<sup>ème</sup> arr.)' + '</p>';
                html += '<p>' + 'Nombre de place : ' + data.records[i].fields.placal + '</p>';
                html += '<p>' + 'Usage : ' + data.records[i].fields.regpri + ' (' + data.records[i].fields.regpar + ')' +'</p>';
                html += '<p>' + 'Emplacement : ' + data.records[i].fields.locsta + '</p>';
                html += '<p>' + 'Type : ' + data.records[i].fields.typsta + '</p>';
                html += '<p class="underline">' + '+ d\'infos : ' + '<br>' + '</p>'
                        + '<p>'
                        + data.records[i].fields.compnumvoie + '<br>'
                        + '</p>';
                html += '<p>' + 'Site Web : ' + '<a href=" ' + data.records[i].fields.url + ' " target="_blank"> ' + 'Visiter '
                        + '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" fill="currentColor" class="bi bi-box-arrow-up-right" viewBox="0 0 12 18">' 
                        + '<path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>' 
                        + '<path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>' 
                        + '</svg>' 
                        + '</a>' 
                        + '</p>';
            $('#resultPlace').html(html);
                html += '<hr>';
            };
        })
        .catch(function(error) {
            console.log(error);
        });
    };

    $(document).ready(function(){

        $('#inputPlace').on('input',function(e){
            let myplace = $(this).val();
            console.log(myplace);
            chargeplace(myplace);

            console.log( "ready!" );
        });
    });

/*localisation des bornes electrique paris*/

function chargeplug(myplug){
    
    let requestURL = 'https://opendata.paris.fr/api/records/1.0/search/?dataset=belib-points-de-recharge-pour-vehicules-electriques-disponibilite-temps-reel&rows=10000&sort=id_pdc&refine.statut_pdc=Disponible&q=adresse_station=' + myplug;
    fetch(requestURL)  
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);        
            let html = '';
            for(let i=0; i<data.records.length; i++){
                html += '<p>' + data.records[i].fields.statut_pdc + '</p>';
                html += '<p>' + data.records[i].fields.adresse_station + '</p>';
                html += '<p>' + 'Identifiant : ' + data.records[i].fields.id_pdc + '</p>';
                html += '<p>' + 'Coordonnees GPS : ' + data.records[i].fields.coordonneesxy + '</p>';
            $('#resultPlug').html(html);
                html += '<hr>';
            };
        });

    /*let requestURL = 'https://opendata.paris.fr/api/records/1.0/search/?dataset=belib-points-de-recharge-pour-vehicules-electriques-donnees-statiques&rows=10000&refine.statut_pdc=En+service&q=adresse_station=' + myplug;
    fetch(requestURL)  
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);        
            let html = '';
            for(let i=0; i<data.records.length; i++){
                html += '<p>' + data.records[i].fields.adresse_station + '</p>';
                html += '<p>' + data.records[i].fields.condition_acces + ' - ' + data.records[i].fields.horaires + '</p>';
                html += '<p class="underline">' + '+ d\'infos : ' + '<br>' + '</p>'
                        + '<p>'
                        + 'Nombre de points de charge : ' + data.records[i].fields.nbre_pdc + '<br>'
                        + 'Type 2 : ' + data.records[i].fields.prise_type_2 + '<br>'
                        + 'Type 3 : ' + data.records[i].fields.prise_type_3 + '<br>'
                        + 'Type EF : ' + data.records[i].fields.prise_type_ef + '<br>'
                        + 'Type CHADEMO : ' + data.records[i].fields.prise_type_chademo + '<br>'
                        + 'Type COMBO CCS : ' + data.records[i].fields.prise_type_combo_ccs + '<br>'
                        + '</p>';
                html += '<p>' + 'Site Web : ' + '<a href=" ' + data.records[i].fields.tarification + ' " target="_blank"> ' + 'Visiter '
                        + '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" fill="currentColor" class="bi bi-box-arrow-up-right" viewBox="0 0 12 18">' 
                        + '<path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>' 
                        + '<path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>' 
                        + '</svg>' 
                        + '</a>' 
                        + '</p>';
            $('#resultPlug').html(html);
                html += '<hr>';
            };
        })
        .catch(function(error) {
            console.log(error);
        });*/
    };

    $(document).ready(function(){

        $('#inputPlug').on('input',function(e){
            let myplug = $(this).val();
            console.log(myplug);
            chargeplug(myplug);

            console.log( "ready!" );
        });
    });
