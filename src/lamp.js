export class Lamp extends Phaser.Physics.Arcade.Image {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key)
        this.name = config.name
        this.health = 150
    }

    create() {
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.debugShowBody = false
        this.debugShowVelocity = false
        this.setSize(150, 150)
        this.setScale(1)
        this.setCollideWorldBounds(true)
        this.body.onWorldBounds = true
        this.freeze = false

        this.scene.physics.add.collider(this, this.scene.player, (c, t) => {
            if (t.trues.length == 0) c.body.setVelocity(0, 0)
            else if (c.body.touching.right) c.body.setVelocityX(200)
            else if (c.body.touching.left) c.body.setVelocityX(-200)
            else if (c.body.touching.down) c.body.setVelocityY(200)
            else if (c.body.touching.up) c.body.setVelocityY(-200)
        }, null, this.scene)

        this.scene.enemies.push(this)
    }

    onBounds() {
        return
    }

    movement() {
        if (this.body.touching.none) this.setVelocity(0, 0)
    }

    takeDamage(cause) {
        this.x = 100 + (Math.random() * 1720)
        this.y = 100 + (Math.random() * 880)
        this.health -= cause.damage

        this.setTintFill(0xffffff)
        setTimeout(() => {
            this.clearTint()
        }, 200)

        cause.spentOn.push(this.name)

        if (this.health <= 0) {
            let genie = this.scene.enemies.find((e) => {
                return e.name === "genie1"
            })
            genie.enraged = true
            genie.x = 1920 - genie.width
            genie.y = 1080 / 2
            this.x = 200
            this.y = 1080 / 2
            this.scene.player.x = 0
            this.scene.player.y = 1080 / 2

            this.scene.physics.add.overlap(this, genie, () => {
                genie.die(), this.destroy()
            }, null, this.scene)
        }
        setTimeout(() => {
            cause.spentOn = cause.spentOn.filter((element) => {
                element !== this.name
            })
        }, cause.swingTimer)
    }
}