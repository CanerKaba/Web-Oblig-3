package com.example.weboblig3;

public class billetter {

    private String film;
    private int antall;
    private String fornavn;
    private String etternavn;
    private String telefonNr;
    private String epost;
    private Integer id;

    public billetter(){}
    public billetter(String film, int antall, String fornavn, String etternavn, String telefonNr, String epost, Integer id) {
        this.film = film;
        this.antall = antall;
        this.fornavn = fornavn;
        this.etternavn = etternavn;
        this.telefonNr = telefonNr;
        this.epost = epost;
        this.id=id;
    }

    public String getFilm() {
        return film;
    }

    public void setFilm(String film) {
        this.film = film;
    }

    public int getAntall() {
        return antall;
    }

    public void setAntall(int antall) {
        this.antall = antall;
    }

    public String getFornavn() {
        return fornavn;
    }

    public void setFornavn(String fornavn) {
        this.fornavn = fornavn;
    }

    public String getEtternavn() {
        return etternavn;
    }

    public void setEtternavn(String etternavn) {
        this.etternavn = etternavn;
    }

    public String getTelefonNr() {
        return telefonNr;
    }

    public void setTelefonNr(String telefonNr) {
        this.telefonNr = telefonNr;
    }

    public String getEpost() {
        return epost;
    }

    public void setEpost(String epost) {
        this.epost = epost;
    }

    public int getId() {return id;}

    public void setId(Integer id) {this.id = id;}
}
