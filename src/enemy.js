import { Projectile } from "./projectile"

export class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key)
        
        config.scene.add.existing(this)
        config.scene.physics.add.existing(this)
        this.name
        this.health
        this.stunned = false
        this.debugShowBody = false
        this.damage
        this.canAttack = true
        this.swingTimer = 1000
        this.setSize(100, 100)
        this.setScale(0.75)
        this.speed
        this.aggroRange
        this.idle = true
        this.drop 
    }
    movement(tx, ty) {
        if(this.stunned) return
        else if(tx - this.x > this.aggroRange || tx - this.x < -this.aggroRange || ty - this.y > this.aggroRange || ty - this.y < -this.aggroRange ) { 
            if(this.idle)  {
                this.idle = false 
                this.rotation = 0
                this.setVelocity((Math.random()*this.speed/2)-this.speed/4,(Math.random()*this.speed/2)-this.speed/4)
                setTimeout(()=>{
                    this.idle = true
                }, 2000)
            }
        }
        else  {
            this.anims.resume()
            let xDir 
            let yDir 
            let sum = (tx - this.x)/(ty - this.y)
            yDir = Math.atan(sum)
            
            this.rotation = (ty - this.y)<0 ? -yDir-Math.PI : -yDir
            yDir = Math.cos(yDir)
            if((ty - this.y)<0) yDir = -yDir
            yDir = yDir * this.speed
            
            xDir = Math.atan(sum)
            xDir = Math.sin(xDir)
            if((ty - this.y)<0) xDir = -xDir
            xDir = xDir * this.speed
            
            this.setVelocityY(yDir)
            this.setVelocityX(xDir)
            
            if(this.canAttack) {
                this.canAttack = false
                this.attack(xDir, yDir)
                setTimeout(()=> {
                    this.canAttack = true
                }, 3000)
            }
        }
    }

    attack(x, y) {
        //let webProjectile = this.scene.physics.add.image(this.x, this.y, "web2").setVelocity(x*3,y*3).setScale(0.75, 0.75).setSize(50,50)
        
        let webProjectile = new Projectile({scene:this.scene, x:this.x, y:this.y, key: "webprojectile"})
        webProjectile.setVelocity(x*3,y*3)


    }

    takeDamage(cause) {

        this.setVelocity(0,0)
        // this.stunned = true
        this.health -= cause.damage
        cause.spentOn.push(this.name)
        // this.healthbarUpdate()
        if (this.health <= 0 ) {
            if(this.drop) this.scene.drop(this.x,this.y, this.drop)
            this.destroy()
        }
        setTimeout(() => {
            cause.spentOn = cause.spentOn.filter( (element) => {
                element !== this.name
            })
            // this.stunned = false
        }, cause.swingTimer)
    }

   
}