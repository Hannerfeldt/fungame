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
   
    movement() {
        //this.setVelocity(this.scene.player.x, this.scene.player.y)

        this.xDir = (this.scene.player.x - this.x)/(this.scene.player.y - this.y)
        this.xDir = Math.atan(this.xDir) * (180/Math.PI)
        this.xDir = Math.abs(this.xDir/90)
        this.yDir = 1 - this.xDir; 
        if(this.scene.player.x - this.x < 0) this.xDir = -Math.abs(this.xDir)
        if(this.scene.player.y - this.y < 0) this.yDir = -Math.abs(this.yDir)
        this.setVelocityX(300*this.xDir)
        this.setVelocityY(300*this.yDir)
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