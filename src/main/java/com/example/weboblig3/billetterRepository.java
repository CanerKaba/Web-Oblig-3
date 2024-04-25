package com.example.weboblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Objects;

@Repository
public class billetterRepository {

    @Autowired
    private JdbcTemplate db;

    public void lagreBilletter(billetter innBilletter) {
        String sql = "INSERT INTO billetter (film, antall, fornavn, etternavn, epost, telefonNr) values(?,?,?,?,?,?)";
        db.update(sql, innBilletter.getFilm(), innBilletter.getAntall(), innBilletter.getFornavn(),
                innBilletter.getEtternavn(), innBilletter.getEpost(), innBilletter.getTelefonNr());
    }

    public List<billetter> hentAlleBilletter() {
        String sql = "SELECT * FROM billetter ORDER BY etternavn";
        List<billetter> alleBilletter = db.query(sql, new BeanPropertyRowMapper(billetter.class));
        return alleBilletter;
    }
    public billetter hentEnBillett(Integer id) {
        String sql = "SELECT * FROM billetter WHERE id=?";
        Object[] param = new Object[]{id};
        List<billetter> resultater = db.query(sql, param, BeanPropertyRowMapper.newInstance(billetter.class));
        if (resultater.isEmpty()) {
            return null;
        } else {
            return resultater.get(0);
        }
    }

    public void endreEnBillett(billetter billett){
        String sql = "UPDATE billetter Set film=?, antall=?, fornavn=?, etternavn=?, epost=?, telefonNr=? WHERE id=?";
        db.update(sql, billett.getFilm(), billett.getAntall(), billett.getFornavn(), billett.getEtternavn(), billett.getEpost(), billett.getTelefonNr(), billett.getId());

    }

    public void slettEn(Integer id) {
        String sql = "DELETE FROM billetter WHERE id=?";
        db.update(sql, id);
    }
    public void slettAlleBilletter() {
        String sql = "DELETE FROM billetter";
        db.update(sql);
    }
}
