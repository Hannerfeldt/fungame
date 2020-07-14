export class Drop extends Phaser.Physics.Arcade.Image {
    constructor(config){
        super(config.scene, config.x, config.y, config.key)
        
        config.scene.add.existing(this)
        config.scene.physics.add.existing(this)
        this.name = config.key
        this.thing = config.scene
        this.setScale(0.5)
        this.setSize(100, 100)
        this.setOrigin(-0.5,-0.5)
    } 
    effect() { 
        switch (this.name) {
            case "health":
                if (this.thing.player.health == this.thing.player.maxHealth) return
                else  this.thing.player.health++, this.thing.addHeart(), this.destroy()
               break;
            case "xp":
                this.thing.player.xp += 100
                this.destroy()
                break;
            case "speed":
                this.thing.player.speed += 100
                this.destroy()
                break;
        }
    }
}