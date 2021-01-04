
//Menu de Jogo

class MainMenu extends Phaser.Scene {


  constructor() {
    super({ key: 'MainMenu' });
  }



  init() {
//Fundo do menu inicial
    //Resize da imagem e posicionamento
    this.fundo = this.add.image(0, 0, "background");
    this.fundo.setOrigin(0, 0);
    this.fundo.setScale(0.55);

    //Iniciar jogo após o botão ser primido
    var play = this.add.image(749, 235, "playbtn")
      .setInteractive()
      .on('pointerdown', () => this.play());

    //Mostrar guia após o botão ser primido
    var guia = this.add.image(750, 380, "guiabtn")
    .setInteractive()
    .on('pointerdown', () => this.guia());




  }

  //Método para iniciar jogo
  play() {
    //Som de inicio de jogo e troca de scene
    this.begin = this.sound.add("begin");
    this.begin.play();
    //Ajustar volume
    this.begin.setVolume(0.7);
    this.scene.start('Game');
  }

  //Método para exibir guia
  guia() {
    this.scene.start('Guia');
  }

}