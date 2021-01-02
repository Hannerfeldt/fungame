export class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: "GameOverScene" })
    }
    preload(){
        
    }
    create(){
        this.add.text(this.game.config.width/2, this.game.config.height/2, 'Game Over', {fontSize:'150px', fontFamily:'pixel'}).setOrigin(0.5);
        let restart = this.add.text(this.game.config.width/2, this.game.config.height/2+150, 'Restart', {fontSize:'100px', fontFamily:'pixel'}).setOrigin(0.5).setInteractive();
        restart.on('pointerdown', (event) => this.scene.start('GameScene'))
        restart.on('pointerover', (event) => restart.setTint(0xfff00f))
        restart.on('pointerout', (event) => restart.setTint(0xffffff))
    }
    update(){

    }

}