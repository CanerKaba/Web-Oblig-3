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

    public void lagreBilletter(billetter billett) {
        String sql = "INSERT INTO billettere (film, antall, fornavn, etternavn, epost, telefonNr) values(?,?,?,?,?,?)";
        db.update(sql, billett.getFilm(), billett.getAntall(), billett.getFornavn(),
                billett.getEtternavn(), billett.getEpost(), billett.getTelefonNr());
    }

    public List<billetter> hentAlleBilletter() {
        String sql = "SELECT * FROM billettere ORDER BY etternavn";
        List<billetter> alleBilletter = db.query(sql, new BeanPropertyRowMapper(billetter.class));
        return alleBilletter;
    }
    public billetter hentBillettet(Integer id) {
        String sql = "SELECT * FROM billettere WHERE id=?";
        Object[] param = new Object[]{id};
        List<billetter> enBillett = db.query(sql, param, BeanPropertyRowMapper.newInstance(billetter.class));
        if (enBillett.isEmpty()) {
            return null;
        } else {
            return enBillett.get(0);
        }
    }

    public void endreBillett(billetter b){
        String sql = "UPDATE billettere Set film=?, antall=?, fornavn=?, etternavn=?, epost=?, telefonNr=? WHERE id=?";
        db.update(sql, b.getFilm(), b.getAntall(), b.getFornavn(), b.getEtternavn(), b.getEpost(), b.getTelefonNr(), b.getId());

    }

    public void slettBillettet(Integer id) {
        String sql = "DELETE FROM billettere WHERE id=?";
        db.update(sql, id);
    }
    public void slettAlleBilletter() {
        String sql = "DELETE FROM billettere";
        db.update(sql);
    }
}
