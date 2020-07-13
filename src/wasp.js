export class Wasp extends Phaser.Physics.Arcade.Sprite {
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
        this.setScale(1)
        this.speed
        this.aggroRange
        this.idle = true
        this.drop 
    }
    movement(tx, ty) {
        if(this.stunned) { 
            console.log(this.anims)
            if(this.anims.currentAnim.key == "waspstunned0") return
            this.play('waspstunned0') 
        }
        else { 
            console.log("not stunned")
            if(this.idle)  {
                this.play('wasp0')
                this.idle = false 
                this.rotation = 0
                let xDir 
                let yDir 
                let sum = (tx - this.x)/(ty - this.y)
                yDir = Math.atan(sum)
                
                yDir = Math.cos(yDir)
                if((ty - this.y)<0) yDir = -yDir
                yDir = yDir * this.speed
                
                xDir = Math.atan(sum)
                xDir = Math.sin(xDir)
                if((ty - this.y)<0) xDir = -xDir
                xDir = xDir * this.speed
                this.setVelocityY(yDir)
                this.setVelocityX(xDir)
                //this.setVelocity((Math.random()*this.speed)-this.speed/2,(Math.random()*this.speed)-this.speed/2)
                setTimeout(()=>{
                    this.setVelocity(0,0)
                    this.idle = true
                }, 3000)
            }
            
        }
        
    }

    takeDamage(cause) {

        this.setVelocity(0,0)
        this.stunned = true
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
            this.stunned = false
        }, cause.swingTimer)
    }

   
}