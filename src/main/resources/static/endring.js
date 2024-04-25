$(function (){
    const id = window.location.search.substring(1);
    const url = "/hentEnBillett?"+id;
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

function endreBillett(){

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

    const billett = {
        id : $("#id").val(),
        film : $("#film").val(),
        antall : $("#antall").val(),
        fornavn : $("#fornavn").val(),
        etternavn : $("#etternavn").val(),
        epost : $("#epost").val(),
        telefonNr : $("#telefonNr").val()
    }
    $.post("/endreEnKunde", billett, function (){
    });
    window.location.href = 'index.html';
}