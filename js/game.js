//Classe de jogo
class Game extends Phaser.Scene {

    constructor() {
        super({ key: 'Game' });
    }


    create() {

        //Som de fundo
        this.theme = this.sound.add("theme");
        this.theme.play();
        //Permitir que a música de jogo nunca pare
        this.theme.setLoop(true);


        //Sons de jogo

        //Disparo de inimigos
        this.canon = this.sound.add("canon");
        //Fim de Jogo
        this.end = this.sound.add("over");
        //Jogo concluído
        this.win = this.sound.add("win");
        //Colisão com player
        this.explode = this.sound.add("explode");
        //Disparo de balas
        this.fire = this.sound.add("shoot");
        //Notificação de pontos
        this.points = this.sound.add("points");
        //Spawn do boss
        this.bossentry = this.sound.add("bossspawn");
        //Boss colide com dragao
        this.hurt = this.sound.add("hurt");
        //Quando atinge o boss
        this.bosshurt = this.sound.add("bosshurt");
        //Quando mata o boss
        this.bossdie = this.sound.add("bossdie");


        //Fonte de Texto
        this.fonte = { font: "30px Bowlby One", fill: "#FF0000", style: "bold" };

        //Variáveis
        this.lastfireball = 0; //Tracking da ultima bala dispara pelo character
        this.lastbossbullet = 0; //Tracking da ultima bala dispara pelo boss
        this.lastbullet = 0; //Tracking do último inimigo 
        this.lastpoint = 0; //Tracking dos pontos
        this.velocidadedabala = -230; //Velocidade inicial dos inimigos
        this.tempospawn = 3500; //Tempo de spawn dos inimigos
        this.pontuacao = 0; //Pontuação
        this.numVidas = 3; //Vidas do personagem
        this.numVidasBoss = 5; //Vidas do boss



        //Background
        this.bck = this.add.tileSprite(0, 0, this.sys.game.config.width, this.sys.game.config.height, 'gamebck');
        this.bck.setOrigin(0, 0);

        //Setup das keys necessárias
        this.cursors = this.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            shift: Phaser.Input.Keyboard.KeyCodes.SHIFT,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE
        });

        //Adicionar character
        this.character = this.physics.add.sprite(100, 100, "character");


        //Colisões com paredes
        this.character.setCollideWorldBounds(true);


        //Animação do character
        this.anims.create({
            key: 'space',
            frames: this.anims.generateFrameNumbers('character', { start: 2, end: 3 }),
            frameRate: 7,
            repeat: -1
        });

        //Animação do boss
        this.anims.create({
            key: 'boss',
            frames: this.anims.generateFrameNumbers('boss', { start: 0, end: 2 }),
            frameRate: 8,
            repeat: -1
        });

        //Texto
        this.textoPontuacao = this.add.text(10, 10, "Pontuação: " + this.pontuacao, this.fonte);




        //A cada 150 pontos um boss é introduzido no jogo
        //No inicío adicionamos-o e estabelecemos a spritesheet como invísivel
        this.boss = this.physics.add.sprite(400, 90, "boss");
        this.boss.anims.play('boss', true);
        this.boss.setVisible(false);


        //Movimento do boss
        this.tweens.add({
            targets: this.boss,
            props: {
                x: {
                    value: 870,
                    duration: 2000
                },
                y: {
                    value: 480,
                    duration: 3000
                },
            },
            repeat: -1,
            yoyo: true,
            ease: 'Stepped.easeOut',
        })
    }


    update(time) {

        //Scrolling do background
        this.bck.tilePositionX += 2.5;

        //Spawn de inimigos
        if (time > this.lastbullet) {
            this.spawn();
            this.velocidadebala(this.velocidadedabala);
            this.lastbullet = time + this.tempospawn;
        }

        //Gravidade do character
        this.character.body.setVelocityY(200);

        //Update da Pontuação
        this.textoPontuacao.setText("Pontuação: " + this.pontuacao);


        //Contador de pontuação
        if (time > this.lastpoint) {
            this.pontuacao++;
            this.lastpoint = time + 500;
        }


        //Controlos do character e animações

        //Andar para trás e para a frente
        if (this.cursors.left.isDown) {
            this.character.body.setVelocityX(-200);

        }
        else if (this.cursors.right.isDown) {
            this.character.body.setVelocityX(200);
        }

        else {
            this.character.body.setVelocityX(0);

        }

        //Saltar
        if (this.cursors.space.isDown) {
            this.character.body.setVelocityY(-200);
            this.character.anims.play('space', true);

        }

        else if (this.cursors.space.isUp) {
            this.character.anims.play('space', false);

        }

        //Disparar
        if (this.cursors.shift.isDown && time > this.lastfireball) {
            this.disparo();
            this.lastfireball = time + 600;
        }



        //Colisão com o character
        this.physics.add.collider(this.character, this.enemy, this.colisao, null, this);

        //Colisão das balas do boss com o character
        this.physics.add.collider(this.character, this.balaboss, this.colisaobalaboss, null, this);

        if (this.pontuacao > 150) {
            this.physics.add.collider(this.bala, this.boss, this.bossatinngido, null, this);
        }


        //Mostrar vidas
        this.mostraVidas();



        //Aumentar velocidade das balas consoante a pontuação
        if (this.pontuacao % 5 == 0) {
            this.velocidadedabala -= 0.3;
        }

        //Notificação de pontuação apresentada a cada 50 pontos
        if (this.pontuacao % 50 == 0) {
            this.points.play();
        }


        //Inicicializar boss aos 150 pontos

        //Som de inicialização
        if (this.pontuacao == 145) {
            this.bossentry.play();
        }

        //Estabelcemos o boss como visível
        if (this.pontuacao == 150) {
            this.boss.setVisible(true);
        }

        if (this.pontuacao > 150 && time > this.lastbossbullet) {
            //Método de disparo para o boss
            this.disparoboss();
            //Método para atualizar barra de vida do Boss
            this.atualizaVidaBoss();
            this.lastbossbullet = time + 1300;
        }
    }


    //Disparo do character
    disparo() {
        this.bala = this.physics.add.sprite(this.character.x + 50, this.character.y, "fireball");
        //Velocidade das balas
        this.bala.body.setVelocityX(400);
        //Som de disparo
        this.fire.play();



        //Colisão com as balas
        this.physics.add.collider(this.bala, this.enemy, function (bala, enemy) {
            //Eliminamos a bala e o inimigo
            enemy.destroy();
            bala.destroy();
        });


        //Colisão com as balas do boss
        this.physics.add.collider(this.bala, this.balaboss, function (bala, balaboss) {
            //Eliminamos a bala e o inimigo
            bala.destroy();
            balaboss.destroy();
        });

    }

    //Disparo do boss
    disparoboss() {
        this.balaboss = this.physics.add.sprite(this.boss.x - 100, this.boss.y + 10, "disparoboss");
        //Velocidade das balas do boss
        this.balaboss.body.setVelocityX(-400);

    }



    //Função para spawn de inimigos
    spawn() {
        this.enemy = this.physics.add.sprite(1050, Phaser.Math.Between(50, 450), "enemy");
        //Som de spawn
        this.canon.play();

    }

    //Função para atribuir velocidade aos inimigos
    velocidadebala(velocidade) {
        this.enemy.body.setVelocityX(velocidade);
    }


    //Função para mostrar as vidas do character
    mostraVidas() {
        var x = 920;
        for (let i = 0; i < this.numVidas; i++) {
            var vidas = this.physics.add.sprite(x, 40, 'vida');
            x -= 70;
        }

        for (let i = 0; i < (3 - this.numVidas); i++) {
            var vidas = this.physics.add.sprite(x, 40, 'semvida');
            x -= 70;
        }

    }


    //Método para remover vidas do character
    removeVida() {
        this.numVidas--;
        if (this.numVidas == 0) {
            this.fimJogo();
        }
    }

    //Método para remover vidas do Boss
    removeVidaBoss() {
        this.numVidasBoss--;
        //Se este não possuir vidas o jogador é redirecionado para o menu de vitória e é apresentado um som de vitória.
        if (this.numVidasBoss == 0) {
            this.theme.stop();
            this.bosshurt.stop();
            this.bossdie.play();
            this.win.play();
            this.scene.start('GameWin');
        }
    }


    //Método para inserir a barra de vida do boss e atualizá-la sempre que o mesmo for atingido

    atualizaVidaBoss() {

        this.bossface = this.add.sprite(500, 50, "bossface");

        if (this.numVidasBoss == 5) {
            this.barra5 = this.add.sprite(this.bossface.x, this.bossface.y + 50, 'barra5');
        }
        else if (this.numVidasBoss == 4) {
            this.barra4 = this.add.sprite(this.bossface.x, this.bossface.y + 50, 'barra4');
        }
        else if (this.numVidasBoss == 3) {
            this.barra3 = this.add.sprite(this.bossface.x, this.bossface.y + 50, 'barra3');
        }
        else if (this.numVidasBoss == 2) {
            this.barra2 = this.add.sprite(this.bossface.x, this.bossface.y + 50, 'barra2');
        }
        else {
            this.barra1 = this.add.sprite(this.bossface.x, this.bossface.y + 50, 'barra1');
        }
    }


    //Método colisão que vai remover os inimigos que baterem na personagem e usar o método remove vida para lhe retirar uma vida.
    colisao(character, enemy) {
        enemy.destroy();
        this.removeVida();
        this.explode.play();
        this.hurt.play();
    }


    //Método colisão que vai remover o disparo feito pelo boss que baterem na personagem e usar o método remove vida para lhe retirar uma vida.
    colisaobalaboss(character, balaboss) {
        balaboss.destroy();
        this.removeVida();
        this.explode.play();
        this.hurt.play();
    }



    //Método de colisão das balas do character com o boss
    bossatinngido(bala, boss) {
        this.removeVidaBoss();
        bala.destroy();
        this.bosshurt.play();
    }

    //Método de fim de jogo
    fimJogo() {
        //Scene de fim do jogo com a respetiva pontuação
        var data = {
            'pontuacao': this.pontuacao
        }
        this.scene.start('GameOver', data);
        //Paramos os sons corrente e iniciamos o som de fim de jogo
        this.theme.stop();
        this.bosshurt.stop();
        this.canon.stop();
        this.explode.stop();
        this.end.play();

    }
}