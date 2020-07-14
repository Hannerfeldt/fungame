export class AttackBox extends Phaser.Physics.Arcade.Sprite {
    constructor(config) {
        super(config.scene, config.x-100, config.y-100, config.key)
        config.scene.add.existing(this)
        config.scene.physics.add.existing(this)
        this.setOrigin(0.5,0.5)
        this.setSize(100, 100)
        this.play('swinging')
        this.rotation = config.r
        this.spentOn = []
        this.debugShowBody = false
        this.damage = 50
        this.swingTimer = 800
    }
}