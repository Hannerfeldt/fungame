export class Arrow extends Phaser.Physics.Arcade.Image {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key)
        this.name = config.name
        config.scene.add.existing(this)
        config.scene.physics.add.existing(this)
        this.setScale(0.75, 0.75)
        this.setSize(50, 50)
        this.setOrigin(0.5, 0.5)
        this.rotation = 0
        this.speed = 1000
        this.debugShowBody = false
        this.debugShowVelocity = false
        this.body.onWorldBounds = true
        this.scene.physics.add.overlap(this, this.scene.player, (c, t) => {
            if (!this.scene.player.immune) {
                this.scene.player.takeDamage(c, t)
                this.scene.bloodEffect(t)
            }
        }, null, this.scene)
    }

    movement() {
        let xDir
        let yDir
        let sum = (this.scene.player.x - this.x) / (this.scene.player.y - this.y)
        yDir = Math.atan(sum)

        this.rotation = (this.scene.player.y - this.y) < 0 ? -yDir - Math.PI : -yDir
        yDir = Math.cos(yDir)
        if ((this.scene.player.y - this.y) < 0) yDir = -yDir
        yDir = yDir * this.speed

        xDir = Math.atan(sum)
        xDir = Math.sin(xDir)
        if ((this.scene.player.y - this.y) < 0) xDir = -xDir
        xDir = xDir * this.speed
        
        this.setVelocityY(yDir)
        this.setVelocityX(xDir)
    }
}