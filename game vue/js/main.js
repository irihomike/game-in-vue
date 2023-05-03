const getRandomValue = (min, max) => {
    return Math.floor(math.random() * (max - min)) + min;
}

const app = vue.creatApp({
    data() {
        return{
            warriorHealth: 100,
            dragonHealth: 100,
            numOfSpecailAttack: 3,
            numOfHeal: 3,
            winner: null,
            battlelogMessage: [],
            swordslash: new Audio('../sounds/sword_slash.mp3'),
            dragonBreath: new Audio('../sounds/dragon_breath.mp3'),
            healEffect: new Audio('../sounds/heal_effect.mp3'),
            specialAttackEffect: new Audio('../sounds/specialAttack.mp3'), 
        }
    },
    watch: {
        dragonHealth(value) {
            if(value <= 0 && this.warriorHealth <= 0){
                //draw
                this.winner = 'draw';
            } else if(value <= 0) {
                this.winner = 'warrior';
            }
        },
    },
    computed: {
        dragonHealthBar() {
            if(this.dragonHealth < 0){
                return { width: '0%'};
            }else{
                if(this.warriorHealth <= 50){
                    return {width: this.dragonHealth + '%',background: 'red'};
                }else{
                    return {width: this.dragonHealth + '%'};
                }
            }
        },
    },
    methods: {
        startFight() {
            this.warriorHealth= 100;
            this.dragonHealth= 100;
            this.numOfSpecailAttack= 3;
            this.numOfHeal= 3;
            this.winner= null;
            this.battlelogMessage= [];
        },
        attackDragon(){
        const AttackDamage = getRandomValue(6,15);
        if(this.dragonHealth - AttackDamage < 0){
            this.dragonHealth = 0;
        }else {
            this.dragonHealth -= attackDamage
        }
        this.swordslash.play();
        this.addBattlelog('warrior','attack',attackDamage);
        this.attackwarrior();
        },
        attackwarrior() {
            const AttackDamage = getRandomValue(8,20);
            if(this.warriorHealth - AttackDamage < 0){
                this.warriorHealth = 0;
            }else {
                this.warriorHealth -= attackDamage
            }
            setTimeout(() => {
                this.dragonBreath.play();
                setTimeout(()=>{
                    this.dragonBreath.pause();
                }, 2000)
            }, 0);

        this.addBattlelog('dragon', 'attack', 'attackDamage');

        },
        specialAttack() {
            this.numOfSpecailAttack --;
            const AttackDamage = getRandomValue(10,25);
            if(this.dragonHealth - attackDamage < 0){
                 this.dragonHealth = 0
            }else{
                this.specialAttackEffect.play();
                this.dragonHealth -= attackDamage;
            }
            this.addBattlelog('warrior', 'special-attack', attackDamage);
            this.attackwarrior();
        },
        heal() {
            this.numOfHeal --;
            const healValue = getRandomValue(10,25);
            if(this.warriorHealth + healValue > 100){
                 this.warriorHealth = 100;
            }else{
                this.warriorHealth += healValue;
            }
            this.healEffect.play();
            this.addBattlelog('warrior', 'heal', healValue);
            this.attackwarrior();
    },
    forfeit() {
        this.winner = 'dragon'
    },
    addBattlelog(who, what, value){
        this.battlelogMessage.unshift({
            attacker : who,
            actionType: what,
            actionValue: value,
        });
    }
}
})

app.mount('#game')