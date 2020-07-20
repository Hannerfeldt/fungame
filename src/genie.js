import {
    Lamp
} from "./lamp"

export class Genie extends Phaser.Physics.Arcade.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key)
        this.name = config.name

        this.stunned = false
        this.canAttack = true
        this.swingTimer = 1000
        this.speed = 1000
        this.aggroRange = 500
        this.idle = true
        this.attackDir = true
        this.enraged = false
        this.random = Math.round(Math.random() * 10)
        this.drop = this.random == 8 ? "speed" : this.random == 9 ? "health" : this.random == 10 ? "xp" : ""
        this.idleTimer
        this.overlap = this.scene.physics.add.overlap(this, this.scene.player, (c, t) => {
            if (!this.scene.player.immune) {
                this.scene.player.takeDamage(c, t)
                this.scene.bloodEffect(t)
            }
        }, null, this.scene)
    }

    create() {
        this.o = true
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.debugShowBody = false
        this.debugShowVelocity = false
        this.setSize(80, 160)
        this.setScale(2)
        this.play('genie0')
        this.setCollideWorldBounds(true)
        this.body.onWorldBounds = true
        this.freeze = true
        this.lamp = new Lamp({
            scene: this.scene,
            x: 500,
            y: 600,
            key: "lamp",
            name: "lamp1"
        })
        this.lamp.create()

    }

    onBounds() {
        this.setVelocity(0, 0)
    }

    movement() {
        if (!this.enraged) {
            if (this.idle) {
                this.idle = false
                let xpos = this.scene.player.x
                let ypos = this.scene.player.y
                let c = this.scene.add.sprite(xpos, ypos, "circle")
                c.play('circle0')
                c.once("animationcomplete", ()=> c.destroy())
                setTimeout(() => {
                    this.x = xpos
                    this.y = ypos
                    let s = this.scene.add.sprite(xpos, ypos, "smoke")
                    s.play("smoke0")
                    s.setScale(3)
                    s.setTint(0x5500bb)
                    s.once("animationcomplete", () => s.destroy())
                }, 1000)

                this.attackInterval = setInterval(() => {
                    this.attack()
                }, 1000)

                this.idleTimer = setTimeout(() => {
                    clearInterval(this.attackInterval)
                    this.play("genie0")
                    this.idle = true
                }, 5100)
            }
        } else {
            if (this.o) {
                clearTimeout(this.idleTimer)
                clearInterval(this.attackInterval)
                this.play("genie8", true)
                this.attackInterval = setInterval(() => {
                    this.enragedAttack()
                }, 1000)
                this.o = false
            }
        }
    }

    die() {
        clearInterval(this.attackInterval)
        this.overlap.destroy()
        this.play("geniedeath0", true)
        this.once("animationcomplete", () => this.destroy())
    }

    attack() {
        this.play("genie4")
        for (let i = 0; i < 4; i++) {
            let w = this.scene.physics.add.sprite(this.x, this.y, "whirlwind").play("whirlwind0").setScale(1.5)
            w.setSize(50, 100)
            w.debugShowBody = false
            w.debugShowVelocity = false
            w.collider = this.scene.physics.add.overlap(w, this.scene.player, (c, t) => {
                if (!this.scene.player.immune) {
                    this.scene.player.takeDamage(c, t)
                    this.scene.bloodEffect(t)
                }
            }, null, this.scene)
            w.setCollideWorldBounds(true)
            w.body.onWorldBounds = true
            w.onBounds = function () {
                this.collider.destroy()
                this.destroy()
            }
            if (this.attackDir)
                w.setVelocity(i % 2 == 0 ? i == 0 ? this.speed : -this.speed : 0, i % 2 == 1 ? i == 1 ? this.speed : -this.speed : 0)
            else
                w.setVelocity(i % 2 == 0 ? (this.speed * 1.4) / 2 : -(this.speed * 1.4) / 2, i < 2 ? (this.speed * 1.4) / 2 : -(this.speed * 1.4) / 2)

        }
        if (this.attackDir) this.attackDir = false
        else this.attackDir = true
    }
    enragedAttack() {

        let w = this.scene.physics.add.sprite(this.x - (50 * Math.random()), 100 + (880 * Math.random()), "whirlwind").play("whirlwind0").setScale(2)
        w.setSize(50, 100)
        w.debugShowBody = false
        w.debugShowVelocity = false
        w.speed = this.speed
        this.scene.physics.add.overlap(w, this.scene.player, (c, t) => {
            if (!this.scene.player.immune) {
                this.scene.player.takeDamage(c, t)
                this.scene.bloodEffect(t)
            }
        }, null, this.scene)
        w.setCollideWorldBounds(true)
        w.body.onWorldBounds = true
        w.onBounds = function () {
            if (this.attackDir) this.setVelocity(-(this.speed * 1.4) / 2, (this.speed * 1.4) / 2), w.attackDir = false
            else w.setVelocity(-(this.speed * 1.4) / 2, -(this.speed * 1.4) / 2), w.attackDir = true
            if (this.x < 75) this.destroy()
        }
        if (this.attackDir)
            w.setVelocity(-(this.speed * 1.4) / 2, -(this.speed * 1.4) / 2),
            w.attackDir = true
        else
            w.setVelocity(-(this.speed * 1.4) / 2, (this.speed * 1.4) / 2),
            w.attackDir = false

        if (this.attackDir) this.attackDir = false
        else this.attackDir = true

    }
    takeDamage(cause) {

        this.alpha = 0.2
        setTimeout(() => {
            this.alpha = 1
        }, 200)

        cause.spentOn.push(this.name)

        setTimeout(() => {
            cause.spentOn = cause.spentOn.filter((element) => {
                element !== this.name
            })
        }, cause.swingTimer)
    }
}