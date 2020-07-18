import {
    Projectile
} from "./projectile"

export class Spider extends Phaser.Physics.Arcade.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key)
        this.name = config.name
        this.health = 10
        this.stunned = false
        this.canAttack = true
        this.swingTimer = 1000
        this.speed = 100
        this.aggroRange = 500
        this.idle = true
        this.random = Math.round(Math.random() * 10)
        this.drop = this.random == 8 ? "speed" : this.random == 9 ? "health" : this.random == 10 ? "xp" : ""
        this.scene.physics.add.overlap(this, this.scene.player, (c, t) => {
            if (!this.scene.player.immune) {
                this.scene.player.takeDamage(c, t)
                this.scene.bloodEffect(t)
            }
        }, null, this.scene)
    }

    create() {

        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.debugShowBody = false
        this.debugShowVelocity = false
        this.setSize(100, 100)
        this.setScale(0.75)
        this.play('spider0')
        this.setCollideWorldBounds(true)
        this.body.onWorldBounds = true
        this.freeze = true
    }

    movement(tx, ty) {
        if (this.stunned) return
        else if (tx - this.x > this.aggroRange || tx - this.x < -this.aggroRange || ty - this.y > this.aggroRange || ty - this.y < -this.aggroRange) {
            if (this.idle) {
                this.idle = false
                this.rotation = 0
                this.setVelocity((Math.random() * this.speed / 2) - this.speed / 4, (Math.random() * this.speed / 2) - this.speed / 4)
                setTimeout(() => {
                    this.idle = true
                }, 2000)
            }
        } else {
            this.anims.resume()
            let xDir
            let yDir
            let sum = (tx - this.x) / (ty - this.y)
            yDir = Math.atan(sum)

            this.rotation = (ty - this.y) < 0 ? -yDir - Math.PI : -yDir
            yDir = Math.cos(yDir)
            if ((ty - this.y) < 0) yDir = -yDir
            yDir = yDir * this.speed

            xDir = Math.atan(sum)
            xDir = Math.sin(xDir)
            if ((ty - this.y) < 0) xDir = -xDir
            xDir = xDir * this.speed

            this.setVelocityY(yDir)
            this.setVelocityX(xDir)

            if (this.canAttack) {
                this.canAttack = false
                this.attack(xDir, yDir)
                setTimeout(() => {
                    this.canAttack = true
                }, 3000)
            }
        }
    }

    attack(x, y) {
        let webProjectile = new Projectile({
            scene: this.scene,
            x: this.x,
            y: this.y,
            key: "webprojectile"
        })
        webProjectile.setVelocity(x * 3, y * 3)
    }
    onBounds() {
        this.setVelocity(0, 0)
    }
    takeDamage(cause) {
        this.setVelocity(0, 0)
        this.health -= cause.damage
        cause.spentOn.push(this.name)
        if (this.health <= 0) {
            if (this.drop) this.scene.drop(this.x, this.y, this.drop)
            this.destroy()
        }
        setTimeout(() => {
            cause.spentOn = cause.spentOn.filter((element) => {
                element !== this.name
            })
        }, cause.swingTimer)
    }


}