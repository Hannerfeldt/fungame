export class Wasp extends Phaser.Physics.Arcade.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key)
        this.name = config.name
        this.health = 50
        this.stunned = false
        this.canAttack = true
        this.swingTimer = 1000
        this.speed = 1500
        this.aggroRange 
        this.idle = true
        this.drop 
        this.scene.physics.add.overlap(this, this.scene.player, (c,t) => {
            if (this.canAttack && !this.scene.player.immune) this.scene.player.takeDamage(c,t), this.scene.bloodEffect(t)
        }, null, this.scene)
    }
    create() {
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.body.onWorldBounds = true;
        this.debugShowBody = false
        this.debugShowVelocity = false
        this.setSize(100, 100)
        this.setScale(1)
        this.play('wasp0')
        this.setCollideWorldBounds(true)
        this.freeze = true
    }
    onBounds() {
        this.setVelocity(0,0)
    }
    movement(tx, ty) {
        if(this.stunned) { 
            if(this.anims.currentAnim.key == "waspstunned0") return
            this.play('waspstunned0') 
        }
        else { 
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
        console.log(cause)
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