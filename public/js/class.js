class Boss {
    constructor(nom, pv, pa) {
        this.nom = nom;
        this.pv = pv;
        this.pa = pa;
    }
}

class Hero {
    constructor(nom, pv, pa, aggro) {
        this.nom = nom;
        this.pv = pv;
        this.pa = pa;
        this.aggro = aggro;
        this.pointsDeRage = 0;
        this.attaqueBonus = 0;
        this.posture = "normal"; 
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

    recevoirDegats(degats) {
        this.pv -= degats;
        console.log(`${this.nom} a subi ${degats} points de dégâts. PV restants : ${this.pv}`);
    }

    attaquer(boss) {
        let degats = this.pa;

        if (this.posture === "defense") {
            degats *= 0.5; 
            this.pv *= 2.5;
            this.aggro += 2; 
        } else if (this.posture === "attack") {
            degats *= 1.4; 
            this.pv *= 0.75; 
        }

        boss.pv -= degats;
        console.log(`${this.nom} attaque ${boss.nom} avec ${degats} points de dégâts.`);
        console.log(`PV du boss après l'attaque : ${boss.pv}`);
    }

    defense() {
        this.posture = "defense";
    }

    attaque() {
        this.posture = "attack";
    }
}

class War extends Hero {
    constructor(nom, pv, pa, aggro) {
        super(nom, pv, pa, aggro);
        this.rage = 0;
    }
}

class Hunt extends Hero {
    constructor(nom, pv, pa, aggro) {
        super(nom, pv, pa, aggro);
        this.arc = Math.floor(Math.random() * 5) + 7;
    }

    attaquer(boss) {
        if (this.arc > 1) {
            this.arc -= 2;
            boss.pv -= this.pa;
            console.log(`Le Hunt ${this.nom} attaque ${boss.nom} avec ${this.arc} points.`);
            console.log(`Une flèche récupérée lors de l'attaque réussie.`);
            this.arc += 1;
        } else {
            console.log(`Le Hunt ${this.nom} n'a pas assez de flèches pour attaquer.`);
            this.arc = 6;
        }
    }
}

class Mage extends Hero {
    constructor(nom, pv, pa, aggro) {
        super(nom, pv, pa, aggro);
        let manaTab = [7, 9, 11];
        this.mana = manaTab[Math.floor(Math.random() * manaTab.length)];
    }

    attaquer(boss) {
        if (this.mana > 2) {
            this.mana -= 2;
            boss.pv -= this.pa;
            console.log(`Le Mage ${this.nom} attaque ${boss.nom} avec ${this.pa} points de dégâts.`);
        } else {
            console.log(`Le Mage ${this.nom} manque de mana !`);
            this.mana += 7;
        }
    }
}

function creerHero() {
    const typeHero = prompt("Choisissez le type de héros (war, hunt, mage) :");
    const nom = prompt("Entrez le nom du héros :");

    let pv, pa, aggro;

    switch (typeHero.toLowerCase()) {
        case "war":
            pv = 250;
            pa = 43;
            aggro = 100;
            break;
        case "hunt":
            pv = 190;
            pa = 29;
            aggro = 100;
            break;
        case "mage":
            pv = 150;      
            pa = 29;
            aggro = 100;
            break;
        default:
            console.log("Type de héros invalide. Les valeurs par défaut seront utilisées.");
            pv = 1000;
            pa = 30;
            aggro = 100;
            break;
    }

    const posture = prompt("Choisissez la posture du héros (attack, defense, normal) :");
    if (posture.toLowerCase() === "defense") {
        aggro *= 1.5;
        pa /= 2;
        pv *= 2.5;
    }

    return new Hero(nom, pv, pa, aggro);
}

const bossList = [
    new Boss("Sauron", 450, 23),
    new Boss("Chronos", 550, 19),
    new Boss("Lilith", 750, 20),
];

const heroList = [
    creerHero(),
    creerHero(),
    creerHero(),
];

for (let i = 0; i < 6; i++) {
    for (const hero of heroList) {
        hero.gagnerPointDeRage();
        hero.attaquer(bossList[0]); 
        console.log(`PV du boss après l'attaque : ${bossList[0].pv}`);
    }
}
