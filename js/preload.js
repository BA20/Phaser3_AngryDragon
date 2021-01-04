//Carregamento de imagens e sons

class PreloadScene extends Phaser.Scene {
    
    constructor() {
        super( { key: 'PreloadScene'} );
    }

    preload() {

        //Imagens e Spritesheets
        this.load.image("background", "assets/background.jpg");
        this.load.image("playbtn","assets/play.png");
        this.load.image("guiabtn","assets/guia.png");
        this.load.image("voltarbtn","assets/voltar.png");
        this.load.image("gamebck","assets/gamebackground.jpg");
        this.load.image("fireball","assets/fireball.png");
        this.load.image("disparoboss","assets/balaboss.png");
        this.load.image("enemy","assets/enemy.png");
        this.load.image("vida","assets/vida.png");
        this.load.image("semvida","assets/semvida.png");
        this.load.image("fimjogo","assets/fim.png");
        this.load.image("barra5","assets/barra5.png");
        this.load.image("barra4","assets/barra4.png");
        this.load.image("barra3","assets/barra3.png");
        this.load.image("barra2","assets/barra2.png");
        this.load.image("barra1","assets/barra1.png");
        this.load.image("bossface","assets/bossface.png");
        this.load.image("ecranwin","assets/ecranwin.png");
        this.load.image("menuguia","assets/menuguia.png");
        this.load.spritesheet("character", "assets/character_w.png", {frameWidth: 147, frameHeight: 128});
        this.load.spritesheet("boss", "assets/boss.png", {frameWidth: 170, frameHeight: 169});

        //Audio
        this.load.audio("begin","assets/audio/begin.mp3");
        this.load.audio("theme","assets/audio/theme.mp3");
        this.load.audio("canon","assets/audio/canon.mp3");
        this.load.audio("over","assets/audio/gameover.mp3");
        this.load.audio("win","assets/audio/gamewon.mp3");
        this.load.audio("explode","assets/audio/explode.wav");
        this.load.audio("shoot","assets/audio/shoot.mp3");
        this.load.audio("points","assets/audio/points.mp3");
        this.load.audio("bossspawn","assets/audio/bossspawn.mp3");
        this.load.audio("hurt","assets/audio/hurt.wav");
        this.load.audio("bosshurt","assets/audio/bosshurt.mp3");
        this.load.audio("bossdie","assets/audio/bossdie.mp3");
    }

    create() {
        // Iniciar Menu Principal
        this.scene.start('MainMenu');
    }
}