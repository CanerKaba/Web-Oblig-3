$(function (){
    hentAlle();
});
function kjopBillett(){

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
    const kontEpost = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const telefonNr = $("#telefonNr").val();

    if(film === ""){
        $("#feilFilm").html("Ugyldig")
        return;
    }
    if (isNaN(antall)){
        $("#feilAntall").html("Ugyldig")
        return;
    }
    if (fornavn.trim()==="" || /^\d+$/.test(fornavn)){
        $("#feilFornavn").html("Må skriv noe inn i fornavn")
        return;
    }
    if (etternavn.trim()==="" || /^\d+$/.test(etternavn)){
        $("#feilEtternavn").html("Må skriv noe inn i etternavn")
        return;
    }
    if (isNaN(telefonNr) || Number.isFinite(telefonNr)){
        $("#feilTelefonNr").html("Må skriv noe inn i telefonnr")
        return;
    }
    if(!kontEpost.test(epost)){
        $("#feilEpost").html("Må skriv noe inn i epost")
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
    $.get("/hentBilletter", function (billetter){
        formaterData(billetter);
    }).fail(function (error){
        console.log("Error", error);
    });
}

function slettallebillettene(){
    $.ajax({
        type: "DELETE",
        url: "/slettBilletter",
        success: function () {
            $("#billetter").html("");
            $("#film").val("");
            $("#antall").val("");
            $("#fornavn").val("");
            $("#etternavn").val("");
            $("#epost").val("");
            $("#telefonNr").val("");
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
            "<td>"+b.film +"</td><td>"+b.antall +"</td><td>"+b.fornavn +"</td><td>"+b.etternavn +"</td><td>"+b.telefonNr +"</td><td>"+b.epost +"</td>"+
            "<td><a class='btn btn-primary' href='endring.html?id= "  + b.id + "'>Endre</a> </td>"+
            "<td><button class='btn btn-danger' onclick='slettEn(" + b.id + ")'>Slett</button></td>"+
            "</tr>";
    }
    $("#billetter").html(ut);
}

function slettEn(id) {
    const url = "/slettBillettet?id="+id;
    $.get(url, function () {
        hentAlle();
    });
}
