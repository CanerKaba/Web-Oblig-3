$(function (){
    hentAlle();
});
function regBillett(){

    $("#feilFilm").html(" ");
    $("#feilAntall").html(" ");
    $("#feilFornavn").html(" ");
    $("#feilEtternavn").html(" ");
    $("#feilEpost").html(" ");
    $("#feilTelefonNr").html(" ");

    const film = $("#film").val();
    const antall = parseInt($("#antall").val());
    const fornavn = $("#fornavn").val();
    const etternavn = $("#etternavn").val();
    const epost = $("#epost").val();
    const sjekkMail = /^[\w\.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    const telefonNr = $("#telefonNr").val();

    if(film === ""){
        $("#feilFilm").html("Ugyldig input")
        return;
    }
    if (isNaN(antall)){
        $("#feilAntall").html("Ugyldig valg")
        return;
    }
    if (fornavn.trim()==="" || /^\d+$/.test(fornavn)){
        $("#feilFornavn").html("Ugyldig input")
        return;
    }
    if (etternavn.trim()==="" || /^\d+$/.test(etternavn)){
        $("#feilEtternavn").html("Ugyldig input")
        return;
    }
    if (isNaN(telefonNr) || Number.isFinite(telefonNr)){
        $("#feilTelefonNr").html("Ugyldig input")
        return;
    }
    if(!sjekkMail.test(epost)){
        $("#feilEpost").html("Ugyldig input")
        return;
    }


    const Billett = {
        film : film,
        antall : antall,
        fornavn : fornavn,
        etternavn : etternavn,
        epost : epost,
        telefonNr : telefonNr
    }

    $.post("/lagre",Billett, function (){
        hentAlle();
    });

    $("#film").val("");
    $("#antall").val("");
    $("#fornavn").val("");
    $("#etternavn").val("");
    $("#epost").val("");
    $("#telefonNr").val("");

}

function hentAlle(){
    $.get("/hentalle", function (billetter){
        formaterData(billetter);
    }).fail(function (error){
        console.log("Error", error);
    });
}

function slettallebilletter(){
    $.ajax({
        type: "DELETE",
        url: "/slettalle",
        success: function () {
            $("#billetter").html("");
            $("#film").val("");
            $("#seter").val("");
            $("#fornavn").val("");
            $("#etternavn").val("");
            $("#mail").val("");
            $("#tlf").val("");
        }
    });
}

function formaterData(billetter){
    var ut = "<table class='table table-striped'>" +
        "<tr>" +
        "<th>Film</th><th>Antall</th><th>Fornavn</th><th>Etternavn</th><th>TelefonNr</th><th>E-post</th><th></th><th></th>" +
        "</tr>";
    for(let b of billetter){
        ut +="<tr>" +
            "<td>"+b.film +"</td><td>"+b.antall +"</td><td>"+b.fornavn +"</td><td>"+b.etternavn +"</td><td>"+b.telefon +"</td><td>"+b.epost +"</td>"+
            "<td><a class='btn btn-primary' href='endring.html?id= "  + b.id + "'>Endre</a> </td>"+
            "<td><button class='btn btn-danger' onclick='slettEn(" + b.id + ")'>Slett</button></td>"+
            "</tr>";
    }
    $("#billetter").html(ut);
}

function slettEn(id) {
    const url = "/slettEn?id="+id;
    $.get(url, function () {
        hentAlle();
    });
}
