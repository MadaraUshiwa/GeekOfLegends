class Boss {
    constructor(nom, pv, pa){
        this.nom = nom;
        this.pv = pv;
        this.degats = degats;
    }
}

class Hero {
    constructor(nom, pv, pa){
        this.nom = nom;
        this.pv = pv;
        this.pa = pa;
        this.aggro = 100;
        this.pointsDeRage = 0;
        this.attaqueBonus = 0;
    }
}


class War extends Hero {
    constructor(nom, pv, pa){
        super(nom, pv, pa, aggro);
        this.rage = 0;
    }
    attack(boss){
    }
    gagnerPointDeRage() {
        this.pointsDeRage += 1;

        if (this.pointsDeRage === 4) {
            this.gagnerBonusAttaque();
        }
    }

    gagnerBonusAttaque() {
        this.attaqueBonus = 0.25;

        setTimeout(() => {
            this.remettreAZeroBonus();
        }, 1000); 
    }

    remettreAZeroBonus() {
        this.attaqueBonus = 0;
        this.pointsDeRage = 0;
    }

    attaquer(cible) {
        const attaqueTotale = this.pa * (1 + this.attaqueBonus);

        console.log(`${this.nom} attaque ${cible.nom} avec une puissance de ${attaqueTotale}`);
        cible.recevoirDegats(attaqueTotale);
    }

    recevoirDegats(degats) {
        this.pv -= degats;
        console.log(`${this.nom} a subi ${degats} points de dégâts. PV restants : ${this.pv}`);
    }
    defense(boss){

    };
}


class Hunt extends Hero {
    constructor(nom, pv, pa){
        super(nom, pv, pa, aggro);
        this.arc = Math.floor(Math.random() * 5) + 7;
    }
    attack(boss){
        if (this.arc > 1){
            this.arc -= 2;
            boss.pv -= this.pa;
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
        super(nom, pv, pa, aggro);
        let manaTab = [7,9,11];
        this.mana = manaTab[Math.floor(Math.random() * manaTab.length)];
    }
    attack(boss){
        if (this.manaTab > 2){
            this.manaTab -= 2;
            boss.pv -= this.pa;
            console.log(`Le Mage ${this.nom} attaque ${boss.nom} avec ${this.pa} points`);
        }
        else{
            console.log(`Le Mage ${this.nom} manque de mana !`);
            this.manaTab += 7;
        }

    };
    defense(boss){};
}

const boss = [
    new Boss("Sauron", 1250, 23),
    new Boss("Chronos", 1450, 19),
    new Boss("Lilith", 1750, 20),
];

const hero = [
    new Hero("", 250, 43),
    new Hero("", 450, 39),
    new Hero("", 750, 30),
];
