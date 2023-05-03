const getRandomValue = (min, max) => {
    return math.floor(math.random() * (max - min )) + min;
}
const app = vue.createApp(
    {
        data (){
          return{
            warriorHealth: 100,
            dragonHealth: 100,
            numOfSpecial: 3,
            numOfHeal: 3,
            winner:null,
            battleLogMessage : [],
            swoldslash: new Audio('../sounds/swold_slash.mp3'),
            dragonBreath: new Audio('../sounds/dragon_breath.mp3'),
            healEffect: new Audio('../sounds/heal_effect.mp3'),
            specialAttackEffect: new Audio('../sounds/specialAttack.mp3'),
          }
        },
        watch: {
            warriorHealth(value) {
                if(value <= 0 && this.dragonHealth <= 0){
                    this.winner = 'draw';
                }else if(value <= 0 ) {
                    
                }else if(value <= 0 ) {
                this.winner = 'warrior';
                }
            },
        },
        computed: {
            warriorHealthBar (){
                if(this.warriorHealth < 0 ){
                    return{
                        width: '0%'};
                }else{
                    if(this.warriorHealth <= 50){
                        return{ width: this.warriorHealth + '%', background: 'red'};
                    }else{
                    return{width: this.warriorHealth + '%'};    
                    }
                }
            },
            warriorHealthBar (){
                if(this.warriorHealth < 0 ){
                    return{
                        width: '0%'};
                }else{
                    if(this.warriorHealth <= 50){
                        return{ width: this.warriorHealth + '%', background: 'red'};
                    }else{
                    return{width: this.warriorHealth + '%'};    
                    }
                }
            },
        },
        method: {
            startFight() {
                this.warriorHealth = 100,
                this.dragonHealth = 100,
                this.numOfSpecial = 3,
                this.numOfHeal = 3,
                this.winner =null,
                this.battleLogMessage = [];
            },
            attackDragon () {
                const attackDamage = getRandomValue(6,15);
            }
        }
    }
)