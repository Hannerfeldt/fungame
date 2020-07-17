import { Snake } from "./snake"

export class Genie extends Phaser.Physics.Arcade.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key)
        this.name = config.name
        this.health = 150
        this.stunned = false
        this.canAttack = true
        this.swingTimer = 1000
        this.speed = 1000
        this.aggroRange = 500
        this.idle = true
        this.random = Math.round(Math.random()*10)
        this.drop = this.random == 8 ? "speed" : this.random == 9 ? "health" : this.random == 10 ? "xp" : ""
        this.idleTimer
        this.scene.physics.add.overlap(this, this.scene.player, (c,t) => {
            if (!this.scene.player.immune) { 
                this.scene.player.takeDamage(c,t)
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
        this.setScale(1)
        this.play('genie0')
        this.setCollideWorldBounds(true)
        this.body.onWorldBounds = true
        this.freeze = true
        
    }

    onBounds(){
        this.setVelocity(0,0)
    }
    
    movement() {
        if (this.canAttack) {
            this.canAttack=false
            this.attack()
            setTimeout(()=> {
                this.canAttack = true
            }, 2000 )
            
        }
        if(this.idle)  {
            this.idle = false 
            let tx = 50+(1820*Math.random())
            let ty = 50+(980*Math.random())
            let sum = (tx - this.x)/(ty - this.y)
            let yDir = Math.atan(sum)
            
            yDir = Math.cos(yDir)
            if((ty - this.y)<0) yDir = -yDir
            yDir = yDir * this.speed
            
            let xDir = Math.atan(sum)
            xDir = Math.sin(xDir)
            if((ty - this.y)<0) xDir = -xDir
            xDir = xDir * this.speed
            this.setVelocityY(yDir)
            this.setVelocityX(xDir)
            this.idleTimer = setTimeout(()=>{
                this.idle = true
            }, 4000)
        }
    }

    attack() {
        let x = 1920*Math.round(Math.random())
        let y = 25+(1030*Math.random())
        let notes = this.scene.add.sprite(x == 0 ? x+100 : x-100, y, "notes").play("notes0")
        setTimeout(()=>{
            let snake = new Snake({scene:this.scene, x:(x == 0 ? x+70 : x-70), y:y, key: "snake", name:"snake"})
            snake.create()
            snake.movement()
            notes.destroy()
        }, 1000)        
    }

    takeDamage(cause) {
        
        this.health -= cause.damage
        if (this.health == 50) {
            this.duplicate()
        }
        else {
            this.setTintFill(0xffffff)
            setTimeout(()=> {
                this.clearTint()
            }, 200)
        }
        cause.spentOn.push(this.name)
        if (this.health <= 0 ) {
            if(this.drop) this.scene.drop(this.x,this.y, this.drop)
            this.destroy()
        }
        setTimeout(() => {
            cause.spentOn = cause.spentOn.filter( (element) => {
                element !== this.name
            })
        }, cause.swingTimer)
    }

    duplicate() {
        let o =  new SnakeCharmer({scene:this.scene, x:1920/2, y:1080/2, key:"snakecharmer", name:"snakecharmer2"})
        o.health = 50
        o.create()
        o.freeze = false
        o.idle = false
        o.setTint(0xff00ff)
        
        this.scene.enemies.push(o)
        this.scene.add.sprite(1920/2, 1080/2, "smoke").play("smoke0")

        this.x = 1920/2
        this.y = 1080/2

        this.idle = false
        clearTimeout(this.idleTimer)
        this.setTint(0xff00ff)

        setTimeout(()=>{
            this.idle = true
            o.idle = true
            this.clearTint()
            o.clearTint()
        },1000)
    }
}