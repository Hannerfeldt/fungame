export class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, 100, 100, "player")
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.speed = 300
        this.modSpeed = (this.baseSpeed*1.4)/2
        this.attacking = false
        this.stunned = false
        this.diminishingReturns = false
        this.facings = {
            TOP:'top',
            TOPRIGHT:'top_right',
            TOPLEFT:'top_left',
            LEFT:'left',
            RIGHT:'right',
            BOTTOM:'bottom',
            BOTTOMLEFT:'bottom_left',
            BOTTOMRIGHT:'bottom_right'
        }
        this.facing = this.facings.TOP
        this.maxHealth = 5
        this.health = 5
        this.immune = false 
        this.damage = 50
        this.xp = 0
        this.armour = 0
        this.debugShowBody = false
        this.debugShowVelocity = false
        this.swingTimer = 800
        this.name = "Jonathan"
        this.dashIsReady = true
        this.attackConfig = {
            scene: scene,
            x: this.x,
            y: this.y,
            r: 0,
            key: 'swing'
        }
        this.swingIsReady = true
        this.setOrigin(this.halfWidth, this.halfHeight)
        this.setScale(1)
        this.setSize(75,160)
        this.setImmovable = true
    }
    
    movement(inputs) {
        this.setVelocity(0,0)
        let trues = []
        trues = inputs.filter( e => { if(e) return e })
        if (this.stunned) return this.play("stunned0", true)
        if (!this.attacking) {
            if (trues.length < 3) {
                if (inputs[0]) {
                    if (inputs[1]) {
                        this.play('player20', true)
                        this.facing = this.facings.TOPLEFT
                        this.attackConfig.x = this.x
                        this.attackConfig.y = this.y
                        this.attackConfig.r = Math.PI+(Math.PI-Math.PI/3)
                        this.scene.keyboard.SPACE.isDown ? (this.setVelocity(0,0), this.anims.pause(this.anims.currentAnim.frames[0])) : this.setVelocity((-this.speed*1.4)/2, (-this.speed*1.4)/2)
                    }
                    else if (inputs[3]) {
                        this.play('player12', true)
                        this.facing = this.facings.TOPRIGHT
                        this.attackConfig.x = (this.x + this.width)
                        this.attackConfig.y = this.y
                        this.attackConfig.r = Math.PI/3
                        this.scene.keyboard.SPACE.isDown ? (this.setVelocity(0,0), this.anims.pause(this.anims.currentAnim.frames[0])) : this.setVelocity((this.speed*1.4)/2, (-this.speed*1.4)/2)
                    }
                    else {
                        this.play('player16', true)
                        this.facing = this.facings.TOP
                        this.attackConfig.x = (this.x + this.width/2)
                        this.attackConfig.y = this.y
                        this.attackConfig.r = 0
                        this.scene.keyboard.SPACE.isDown ? (this.setVelocity(0,0), this.anims.pause(this.anims.currentAnim.frames[0])) : this.setVelocity(0, -this.speed)
                    }
                }
                else if (inputs[2]) {
                    if (inputs[1]) {
                        this.play('player28', true)
                        this.facing = this.facings.BOTTOMLEFT
                        this.attackConfig.x = this.x 
                        this.attackConfig.y = (this.y + this.height)
                        this.attackConfig.r = Math.PI+(Math.PI/3)
                        this.scene.keyboard.SPACE.isDown ? (this.setVelocity(0,0), this.anims.pause(this.anims.currentAnim.frames[0])) : this.setVelocity((-this.speed*1.4)/2, (this.speed*1.4)/2)
                    }
                    else if (inputs[3]) {
                        this.play('player4', true)
                        this.facing = this.facings.BOTTOMRIGHT
                        this.attackConfig.x = (this.x + this.width)
                        this.attackConfig.y = (this.y + this.height)
                        this.attackConfig.r = Math.PI-(Math.PI/3)
                        this.scene.keyboard.SPACE.isDown ? (this.setVelocity(0,0), this.anims.pause(this.anims.currentAnim.frames[0])) : this.setVelocity((this.speed*1.4)/2, (this.speed*1.4)/2)
                    }
                    else {
                        this.facing = this.facings.BOTTOM
                        this.play('player0', true)
                        this.attackConfig.x = (this.x + this.width/2)
                        this.attackConfig.y = (this.y + this.height)
                        this.attackConfig.r = Math.PI
                        this.scene.keyboard.SPACE.isDown ? (this.setVelocity(0,0), this.anims.pause(this.anims.currentAnim.frames[0])) : this.setVelocity(0, this.speed)
                    }
                }
                else if (inputs[1]) {
                    this.play('player24', true)
                    this.facing = this.facings.LEFT
                    this.attackConfig.x = this.x 
                    this.attackConfig.y = (this.y + this.height/2)
                    this.attackConfig.r = Math.PI+(Math.PI/2)
                    this.scene.keyboard.SPACE.isDown ? (this.setVelocity(0,0), this.anims.pause(this.anims.currentAnim.frames[0])) : this.setVelocity(-this.speed, 0)
                }
                else if (inputs[3]) {
                    this.facing = this.facings.RIGHT
                    this.play('player8', true)
                    this.attackConfig.x = (this.x + this.width)
                    this.attackConfig.y = (this.y + this.height/2)
                    this.attackConfig.r = Math.PI/2
                    this.scene.keyboard.SPACE.isDown ? (this.setVelocity(0,0), this.anims.pause(this.anims.currentAnim.frames[0])) : this.setVelocity(this.speed, 0 ) 
                }
                else {
                    // this.setFrame(0)
                    this.anims.currentAnim ? this.anims.pause(this.anims.currentAnim.frames[0]) : this.setFrame(0)
                }
            }
            else {
                // this.setFrame(0)
                //this.anims.currentAnim ? this.anims.pause(this.anims.currentAnim.frames[0]) : this.setFrame(0)
            }
        }     
    }

    dash() {
        if( this.dashIsReady ) {
            if(!this.immune) this.getImmune(100)
            this.dashIsReady = false
            this.setTint(0x000000)
            this.alpha = 0.2
            this.speed = this.speed*10
            this.scene.gustEffect(this)
            setTimeout(()=>{
                this.clearTint()
                this.alpha = 1
                this.speed = 300
            }, 100)
            setTimeout(()=>{
                this.dashIsReady = true
            }, 1000)
        }
        
    }

    getImmune(time) {
        this.immune = true
        setTimeout(()=> {
            this.immune = false
        }, time)
    }

    attack() {
        this.swingIsReady = false
        this.attacking = true
        // this.anims.pause(this.anims.currentAnim.frames[0])
        this.play('attack0', true)
        
        setTimeout(()=>{
            this.attacking = false
        }, this.swingTimer/3)
        
        setTimeout(()=>{
            this.swingIsReady = true
        }, this.swingTimer)
    }
    
    getStunned(time) {
        this.stunned = true
        setTimeout(()=>{
            this.stunned = false
            this.diminishingReturns = true
            setTimeout(()=>{
                this.diminishingReturns = false
            }, time)
        }, time)
    }
    onBounds() {

    }
    takeDamage(cause, target) {
        if (this.immune) return
        this.getImmune(1500)
        this.setTint(0xff0000)
        setTimeout(()=>{
            this.clearTint()
        }, 100)
        
        for( let i = 0; i < 5; i++ ) {
            setTimeout(()=>{
                this.setTintFill(0xffffff)
                this.alpha = 0.7
            }, 100+(200*i))
            setTimeout(()=>{
                this.alpha = 1
                this.clearTint()
            }, 200+(200*i))
        }


        this.scene.removeHeart()
        this.health--
        if(this.health <= 0) this.destroy()
    }
}