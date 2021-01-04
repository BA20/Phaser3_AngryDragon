
//Ecran de Vitoria

class GameWin extends Phaser.Scene {
    
    constructor() {
        super( { key: 'GameWin'} );
    }

    create(){
      //Exibição de ecran de vitória
      this.gamewin = this.add.sprite(0,0, 'ecranwin');
      this.gamewin.setOrigin(0, 0);
        //Setup da key para dar restart
        this.cursors = this.input.keyboard.addKeys({
            enter: Phaser.Input.Keyboard.KeyCodes.ENTER
        });
    }
    update(){

        if (this.cursors.enter.isDown) {
            this.scene.start('MainMenu');
        }

    }
}
