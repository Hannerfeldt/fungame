import { Arrow } from './arrow'
export class Nomad extends Phaser.Physics.Arcade.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key)
        this.name = config.name
        this.health = 100
        this.stunned = false
        this.canAttack = true
        this.swingTimer = 1250
        this.speed = 500
        this.idle = true
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
        this.setSize(120, 160)
        this.setScale(1.5)
        this.play('nomad0')
        this.setCollideWorldBounds(true)
        this.body.onWorldBounds = true
        this.freeze = true
    }
    movement() {
        if(this.idle) {
            this.idle = false
            this.setVelocity(
                ((Math.random()-0.5)+(this.scene.game.config.width/2-this.x)/(this.scene.game.config.width/2))*this.speed,
                ((Math.random()-0.5)+(this.scene.game.config.height/2-this.y)/(this.scene.game.config.height/2))*this.speed
            )
            console.log((this.scene.game.config.width/2-this.x)/(this.scene.game.config.width/2))
            setTimeout(()=>{
                this.idle = true
            },1000)
        }
        if(this.canAttack) {
            this.canAttack = false
            const p = new Arrow({
                scene: this.scene,
                x: this.x,
                y: this.y,
                key: "arrow",
                name: "arrow"
            })
            p.movement()  
            setTimeout(()=>{
                this.canAttack = true
            }, this.swingTimer)
        }
    }
    takeDamage(){

    }
    onBounds() {
        return
    }
}