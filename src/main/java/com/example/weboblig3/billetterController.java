package com.example.weboblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class billetterController {

    @Autowired
    billetterRepository billettRepo;
    @PostMapping("/lagre")
    public void lagre(billetter billett) {billettRepo.lagreBilletter(billett);}

    @GetMapping("/hentBilletter")
    public List<billetter> hentBilletter() {return billettRepo.hentAlleBilletter();
    }
    @GetMapping("/hentBillettet")
    public billetter hentBillettet(Integer id){return billettRepo.hentBillettet(id);
    }
    @PostMapping("/endre")
    public void endre(billetter billett){billettRepo.endreBillett(billett);
    }
    @GetMapping("/slettBillettet")
    public void slettBillettet(Integer id){billettRepo.slettBillettet(id);
    }
    @DeleteMapping("/slettBilletter") public void slettBilletter(){billettRepo.slettAlleBilletter();
    }

}

