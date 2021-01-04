//Configuração do jogo

var config = {
    type: Phaser.AUTO,
    width: 960,
    height: 560,
    scale: {
        // Fit to window
        mode: Phaser.Scale.FIT,
        // Center vertically and horizontally
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: {
                y: 0
            }
        }
    },
    scene: [
        PreloadScene,
        MainMenu,
        Game,
        GameOver,
        GameWin,
        Guia
    ]
};

//Iniciar novo jogo
var game = new Phaser.Game(config);