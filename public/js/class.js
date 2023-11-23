class Boss {
    constructor(nom, pv, pa){
        this.nom = nom;
        this.pv = pv;
        this.pa = pa;
    }
}

class Hero {
    constructor(nom, pv, pa){
        this.nom = nom;
        this.pv = pv;
        this.pa = pa;
    }
}

// A Savoir sur le War 
// Tous les tours le guerrier gagne 1 point de rage au bout de 4 points ,le guerrier gagne 25% ( * 1.25 ) d'attaque supplémentaire durant 1 tours puis retombe à 0 de rage et perd ce bonus.

class War extends Hero {
    constructor(nom, pv, pa){
        super(nom, pv, pa);
        this.rage = rage;
    }
    attack(boss){
        if this.rage > 4){
    };
    defense(boss){};
}

class Hunt extends Hero {
    constructor(nom, pv, pa){
        super(nom, pv, pa);
        this.arc = Math.floor(Math.random() * 5) + 7;
    }
    attack(boss){
        if (this.arc > 1){
            this.arc -= 2;
            boss.pv -= 2;
            console.log(`Le Hunt ${this.nom} attaque ${boss.nom} avec ${this.arc} points`);
            console.log(`Une fleche recuperer lors l'attaque reussi`);
            this.arc += 1;
        }
        else{
            console.log(`Le Hunt ${this.nom} n'a pas assez de flèche pour attaquer`);
            this.arc = 6;
        }
    };
    defense(boss){};
}

class Mage extends Hero {
    constructor(nom, pv, pa){
        super(nom, pv, pa);
        let manaTab = [7,9,11];
        this.mana = manaTab[Math.floor(Math.random() * manaTab.length)];
    }
    attack(boss){};
    defense(boss){};
}