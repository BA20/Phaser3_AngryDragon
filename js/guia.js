
//Guia de jogo

class Guia extends Phaser.Scene {

  constructor() {
    super({ key: 'Guia' });
  }

  create() {
    //background do guia que vai conter uma introdução ao jogo, créditos e controlos
    this.guia = this.add.sprite(0, 0, 'menuguia');
    this.guia.setOrigin(0, 0);

    //Botão voltar para nos redirecionar de volta ao menu inicial
    var voltar = this.add.image(100, 500, "voltarbtn")
      .setInteractive()
      .on('pointerdown', () => this.return());

  }


  //Função para nos redirecionar para o menu incial
  return() {
    this.scene.start('MainMenu');
  }
}