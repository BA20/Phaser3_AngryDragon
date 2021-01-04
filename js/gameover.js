
//Ecran de jogo perdido

class GameOver extends Phaser.Scene {
    
    constructor() {
        super( { key: 'GameOver'} );
    }

    create(data){

        //Fonte para pontos
        this.fonte = { font: "20px Lemon", fill: "#FFF", style: "bold" };


          //Ecran final de jogo com a respetiva pontuação do jogador
          this.bck = this.add.sprite(270,50, 'fimjogo');
          this.bck.setOrigin(0, 0);
          this.add.text(430,280,"Pontuacao: "+data.pontuacao,this.fonte);

          //Setup da key para dar restart
         this.cursors = this.input.keyboard.addKeys({
            enter: Phaser.Input.Keyboard.KeyCodes.ENTER
        });
    }

    //Método que permite reniciar o jogo caso o jogador prima a tecla enter
    update(){

        if (this.cursors.enter.isDown) {
            this.scene.start('MainMenu');
        }

    }
    

}