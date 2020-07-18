export class Snake extends Phaser.Physics.Arcade.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key)
        this.name = config.name
        this.health = 1000
        this.stunned = false
        this.canAttack = true
        this.swingTimer = 100
        this.speed = 700
        this.drop = ""
        this.scene.physics.add.overlap(this, this.scene.player, (c, t) => {
            if (!this.scene.player.immune) {
                this.scene.player.takeDamage(c, t)
                this.scene.bloodEffect(t)
            }
        }, null, this.scene)
    }
    onBounds() {
        this.destroy()
    }
    create() {
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.debugShowBody = false
        this.debugShowVelocity = false
        this.setSize(125, 50)
        this.setScale(1)
        this.play('snake0')
        this.rotation = this.x > 100 ? Math.PI / 2 : -Math.PI / 2
        this.setCollideWorldBounds(true)
        this.body.onWorldBounds = true
    }

    movement() {
        if (this.x - 960 < 0) this.setVelocityX(this.speed)
        else this.setVelocityX(-this.speed)
    }
}