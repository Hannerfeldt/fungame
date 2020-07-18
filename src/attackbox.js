export class AttackBox extends Phaser.Physics.Arcade.Sprite {
    constructor(config) {
        super(config.scene, config.x-100, config.y-100, config.key)
        config.scene.add.existing(this)
        config.scene.physics.add.existing(this)
        this.setOrigin(0.5,0.5)
        this.setSize(125, 125)
        this.play('swing0')
        this.rotation = config.r
        this.spentOn = []
        this.debugShowBody = false
        this.damage = 10
        this.swingTimer = 800
    }
}