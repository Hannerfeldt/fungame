export class Projectile extends Phaser.Physics.Arcade.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key)
        config.scene.add.existing(this)
        config.scene.physics.add.existing(this)
        this.setScale(0.75, 0.75)
        this.setSize(50, 50)
        this.setOrigin(0.5, 0.5)
        this.rotation = 0
        this.debugShowBody = false
        this.debugShowVelocity = false
        this.play('webprojectile0')
        this.scene.physics.add.overlap(this, this.scene.player, this.onImpact, () => this.destroy(), this.scene)
    }

    onImpact(c, t) {
        if (t.stunned) return
        if (t.diminishingReturns) return
        t.getStunned(1000)

        let web = this.add.image(t.x, (t.y + 50), "web")
        setTimeout(() => {
            web.destroy()
        }, 1000)
    }
}