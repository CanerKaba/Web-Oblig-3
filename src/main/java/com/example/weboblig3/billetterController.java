package com.example.weboblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class billetterController {

    @Autowired
    billetterRepository rep;
    @PostMapping("/lagre")
    public void Lagre(billetter billett) {
        rep.lagreBilletter(billett);
    }

    @GetMapping("/hentalle")
    public List<billetter> hentalle() {
        return rep.hentAlleBilletter();
    }
    @GetMapping("/hentEnBillett")
    public billetter hentEnBillett(Integer id){
        return rep.hentEnBillett(id);
    }
    @PostMapping("/endreEnKunde")
    public void endreEnKunde(billetter billett){
        rep.endreEnBillett(billett);
    }

    @GetMapping("/slettEn")
    public void slettEn(Integer id){
        rep.slettEn(id);
    }

    @DeleteMapping("/slettalle")
    public void slettalle(){
        rep.slettAlleBilletter();
    }

}

