import { Snake } from "./snake"

export class SnakeCharmer extends Phaser.Physics.Arcade.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key)
        this.name = config.name
        this.health = 100
        this.stunned = false
        this.canAttack = true
        this.swingTimer = 1000
        this.speed = 1000
        this.aggroRange = 500
        this.idle = true
        this.random = Math.round(Math.random()*10)
        this.drop = this.random == 8 ? "speed" : this.random == 9 ? "health" : this.random == 10 ? "xp" : ""
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
        this.setSize(120, 170)
        this.setScale(1)
        this.play('snakecharmer0')
        this.setCollideWorldBounds(true)
        this.body.onWorldBounds = true
        this.freeze = true
    }

    movement(tx, ty) {
        
        if (this.canAttack) {
            this.canAttack=false
            this.attack()
            setTimeout(()=> {
                this.canAttack = true
            }, 1000 )
            
        }
        if(this.idle)  {
            this.idle = false 
            let tx = 1920*Math.random()
            let ty = 1080*Math.random()
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
            setTimeout(()=>{
                this.idle = true
            }, 4000)
        }
        
      
    }

    attack() {
        // let snake = new Snake({scene:this.scene, x:1920*Math.round(Math.random()), y:1080*Math.random(), key: "snake", name:"snake"})
        let snake = new Snake({scene:this.scene, x:1920*Math.round(Math.random()), y:1080*Math.random(), key: "snake", name:"snake"})
        snake.create()
        snake.movement()
        setTimeout(()=>{
            snake.destroy()
        }, 5000)
    }

    takeDamage(cause) {
        
        this.health -= cause.damage
        if (this.health == 20) this.duplicate()
        this.setTintFill(0xffffff)
        setTimeout(()=> {
            this.clearTint()
        }, 200)
        cause.spentOn.push(this.name)
        if (this.health <= 0 ) {
            if(this.drop) this.scene.drop(this.x,this.y, this.drop)
            this.scene.enemies.forEach(element => {
                element.destroy()
            });
            this.destroy()
        }
        setTimeout(() => {
            cause.spentOn = cause.spentOn.filter( (element) => {
                element !== this.name
            })
        }, cause.swingTimer)
    }

    duplicate() {
        let o =  new SnakeCharmer({scene:this.scene, x:this.x, y:this.y, key:"snakecharmer", name:"snakecharmer2"})
        o.health = 1000;
        o.create()
        o.freeze = false
        console.log(this.scene.enemies)
        this.scene.enemies.push(o)
    }
}