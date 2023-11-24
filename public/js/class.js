class Sort {
    constructor(nom) {
        this.nom = nom;
    }
}

class FrappeHeroique extends Sort {
    constructor() {
        super("🗡️🗡️ Frappe héroïque 🗡️🗡️");
    }
}

class EmbrasementSupreme extends Sort {
    constructor() {
        super("☄️☄️ Embrasement suprême ☄️☄️");
    }
}

class TirMortel extends Sort {
    constructor() {
        super("🏹🏹 Tir mortel 🏹🏹");
    }
}

class Boss {
    constructor(nom, pv, pa) {
        this.nom = nom;
        this.pv = pv;
        this.pvInitial = pv;
        this.pa = pa;
        this.enigmes = [
            { question: "Comment s'appelle le frère de Sasuke?", reponse: "itachi" },
            { question: "Qui est Tobi de l'Akatsuki?", reponse: "obito" },
            { question: "Comment s'appelle Kyubi?", reponse: "kurama" }
        ];
    }

    attaquer(hero) {
        hero.recevoirDegats(this.pa);
        console.log(`${this.nom} attaque ${hero.nom} avec 👾Ombreflamme👾 et inflige ${this.pa} points de dégâts d'ombre!.`);
        console.log(`PV de ${hero.nom} après l'attaque : ${hero.pv}`);
    }

    choisirCible(heroes) {
        const ciblesPossibles = heroes.filter(hero => hero.pv > 0);
        if (ciblesPossibles.length > 0) {
            const ciblePrioritaire = ciblesPossibles.reduce((prioritaire, hero) => {
                return hero.aggro > prioritaire.aggro ? hero : prioritaire;
            });
            return ciblePrioritaire;
        } else {
            return null;
        }
    }

    attaquerCible(hero) {
        this.attaquer(hero);
        if (this.pv <= 0.2 * this.pvInitial) {
            this.poserEnigme(hero);
        }
    }

    poserEnigme(hero) {
        const enigme = this.enigmes[Math.floor(Math.random() * this.enigmes.length)];
        const reponseAttendue = enigme.reponse;

        for (let i = 0; i < 3; i++) {
            const reponseUtilisateur = prompt(`${enigme.question}`).toLowerCase().replace(/\s/g, '');

            if (reponseUtilisateur === reponseAttendue) {
                console.log("🎉 Bravo ! Vous avez résolu l'énigme. Le boss est affaibli ! 🎉");
                this.pv -= 50;
                return;
            } else {
                console.log("❌❌❌ Mauvaise réponse. Essayez encore ! ❌❌❌");
            }
        }

        console.log("💀💀💀 Trop d'erreurs ! L'énigme a eu raison de vous. 💀💀💀");
        hero.pv = 0;
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
        this.sort = new Sort("Attaque normale");
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
        }, 1500);
    }

    remettreAZeroBonus() {
        this.attaqueBonus = 0;
        this.pointsDeRage = 0;
    }

    recevoirDegats(degats) {
        this.pv -= degats;
        console.log(`${this.nom} a subi 🩸 ${degats} points de dégâts🩸. 🔋PV restants : ${this.pv}`);
    }

    attaquer(boss) {
        let degats = this.pa;

        if (this.posture === "defense") {
            degats *= 0.5;
            this.pv *= 2.5;
            this.aggro += 50;
        } else if (this.posture === "attack") {
            degats *= 1.4;
            degats += this.attaqueBonus;
            this.pv *= 0.75;
        }

        boss.pv -= degats;
        console.log(`${this.nom} attaque ${boss.nom} avec ${this.sort.nom} et inflige ${degats} points de dégâts.`);
        console.log(`🔋PV du boss après l'attaque : ${boss.pv}🔋`);

        if (boss.pv <= 0.2 * boss.pvInitial) {
            boss.poserEnigme(this);
        }
    }

    defense() {
        this.posture = "defense";
    }

    attaque() {
        this.posture = "attack";
    }
}

class Mage extends Hero {
    constructor(nom, pv, pa, aggro) {
        super(nom, pv, pa, aggro);
        this.sort = new EmbrasementSupreme();
        this.mana = 5; 
    }

    attaquer(boss) {
        super.attaquer(boss);
        this.gererMana();
    }

    gererMana() {
        if (this.pv > 0) {
            this.mana -= 2;

            if (this.mana <= 0) {
                console.log(`${this.nom} n'a plus de mana 💧. Il passe un tour sans attaquer.`);
                this.mana = 0;
                setTimeout(() => {
                    this.recupererMana();
                }, 1500);
            }
        }
    }

    recupererMana() {
        console.log(`💧 ${this.nom} récupère 7 points de mana 💧.`);
        this.mana += 7;
    }
}

class War extends Hero {
    constructor(nom, pv, pa, aggro) {
        super(nom, pv, pa, aggro);
        this.rage = 0;
        this.sort = new FrappeHeroique();
    }

    attaquer(boss) {
        super.attaquer(boss);
        this.regenererRage();

        if (this.posture === "attack" && this.attaqueBonus > 0) {
            this.gagnerPointDeRage();
        }
    }

    regenererRage() {
        if (this.rage < 4) {
            this.rage += 1;
            console.log(`⚡${this.nom} a régénéré 1 point de rage⚡. Total de rage : ${this.rage}`);
        }
    }

    gagnerPointDeRage() {
        super.gagnerPointDeRage
        if (this.pointsDeRage === 4) {
            this.gagnerBonusAttaqueWar();
        }
    }

    gagnerBonusAttaqueWar() {
        this.attaqueBonus = pa * 1.25;

        setTimeout(() => {
            this.remettreAZeroBonus();
        }, 1000);
    }
}

class Hunt extends Hero {
    constructor(nom, pv, pa, aggro) {
        super(nom, pv, pa, aggro);
        this.sort = new TirMortel();
        this.nbFleches = 6;
    }

    attaquer(boss) {
        if (this.nbFleches >= 2) {
            super.attaquer(boss);
            this.nbFleches -= 2;
        } else {
            console.log(`${this.nom} n'a plus de flèches 🏹. Il passe un tour.`);
            this.nbFleches += 6;
        }
    }
}

function afficherMessageBienvenue() {
    console.log("              🕹️🕹️🕹️🕹️ Bienvenue dans l'Arène des Héros! Vous êtes sur le point d'entreprendre une quête épique, affrontant des boss redoutables et des défis surprenants. Voici les règles du jeu :🕹️🕹️🕹️🕹️");
    console.log("-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
    console.log("                        ✨✨1. Choisissez vos héros : Formez une équipe de héros intrépides parmi trois classes uniques - le puissant War, le mystique Mage, et le rusé Hunt.✨✨");
    console.log("-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
    console.log("✨✨2. Personnalisez vos héros : Chaque héros peut choisir entre trois postures - l'attaque, la défense, et la normale. Chacune offre des avantages distincts, mais choisissez judicieusement selon les défis qui se présentent.✨✨");
    console.log("-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
    console.log("               ✨✨3. Affrontez les Boss : Partez à l'assaut de monstres légendaires comme Sauron, Chronos et Lilith. Utilisez vos compétences, votre stratégie et vos bonus spéciaux pour les vaincre.✨✨");
    console.log("-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
    console.log("               ✨✨4. Gagnez des Points de Rage : Les guerriers gagnent des Points de Rage à chaque tour. Lorsqu'ils atteignent 4 points, ils déclenchent une attaque féroce avec un bonus de puissance.✨✨");
    console.log("-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
    console.log("                  ✨✨5. Survivez et Progressez : Surmontez chaque défi, gagnez des points d'expérience, améliorez vos héros et découvrez de nouvelles capacités pour devenir le champion ultime.✨✨");
    console.log("-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
    console.log("----------------------------------------------------------------------------🪓🪓🪓Préparez-vous, Héros, l'aventure commence maintenant !🪓🪓🪓------------------------------------------------------------------------------------");
}

function creerHero(typeHero, welcomeMessage) {
    if (welcomeMessage) {
        afficherMessageBienvenue();
    }

    const nom = prompt(`Entrez un prénom pour votre ${typeHero} :`);
    let pv, pa, aggro, mana;

    switch (typeHero.toLowerCase()) {
        case "war":
            pv = 850;
            pa = 43;
            aggro = 100;
            break;
        case "hunt":
            pv = 750;
            pa = 29;
            aggro = 100;
            break;
        case "mage":
            pv = 950;
            pa = 29;
            mana = 5; 
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
    }

    switch (typeHero.toLowerCase()) {
        case "war":
            return new War(nom, pv, pa, aggro);
        case "hunt":
            return new Hunt(nom, pv, pa, aggro);
        case "mage":
            return new Mage(nom, pv, pa, aggro, mana); 
        default:
            return new Hero(nom, pv, pa, aggro);
    }
}


const bossList = [
    new Boss("Sauron", 550, 23),
    new Boss("Chronos", 750, 19),
    new Boss("Lilith", 750, 20)
];

const heroList = [
    creerHero("war", true),
    creerHero("mage", false),
    creerHero("hunt", false),
];

function effectuerTour() {
    for (const hero of heroList) {
        setTimeout(() => {
            hero.gagnerPointDeRage();
            hero.attaquer(bossList[0]);
            console.log(`PV du boss après l'attaque : ${bossList[0].pv}`);
        }, 1000);
    }

    setTimeout(() => {
        for (const hero of heroList) {
            if (hero.pv > 0) {
                bossList[0].attaquer(hero);
            }
        }
    }, 1500);
}

function simulerPartie() {
    const intervalId = setInterval(() => {
        if (heroList.some(hero => hero.pv > 0) && bossList[0].pv > 0) {
            effectuerTour();
        } else {
            clearInterval(intervalId);

            if (bossList[0].pv <= 0) {
                console.log("🙌Félicitations ! Vous avez vaincu le boss et remporté la victoire !🙌");
                console.log(`"Tu viens de gagner 🎯 ${Math.floor(Math.random() * 100)} d'XP`);
                console.log(`"L'equipe de héros viennent de gagner un équpiment d'armure ainsi que 🪙 ${Math.floor(Math.random() * 100)} pièce d'or`);
            } else {
                console.log("💀Oh non ! Les héros ont été vaincus. Le boss a triomphé en cette sombre journée.💀");
            }
        }
    }, 3000);
}

simulerPartie();
