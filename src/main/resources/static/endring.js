$(function (){
    const id = window.location.search.substring(1);
    const url = "/hentBillettet?"+id;
    $.get(url, function (billett){
        $("#id").val(billett.id),
            $("#film").val(billett.film),
            $("#antall").val(billett.antall),
            $("#fornavn").val(billett.fornavn),
            $("#etternavn").val(billett.etternavn),
            $("#epost").val(billett.epost),
            $("#telefonNr").val(billett.telefonNr);
    });
});

function endreBillettet(){

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

    const billett = {
        id : $("#id").val(),
        film : $("#film").val(),
        antall : $("#antall").val(),
        fornavn : $("#fornavn").val(),
        etternavn : $("#etternavn").val(),
        epost : $("#epost").val(),
        telefonNr : $("#telefonNr").val()
    }
    $.post("/endre", billett, function (){
    });
    window.location.href = 'index.html';
}