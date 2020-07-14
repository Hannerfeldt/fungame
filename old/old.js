 // playerCreate() {
    //     this.player = this.physics.add.sprite(500, 500, "player", 0)
    //     this.player.setOrigin(this.player.halfWidth, this.player.halfheight)
    //     this.player.keyboard = this.input.keyboard.addKeys("W, A, S, D, SPACE")
    //     // this.player.setImmovable(true)
    //     this.player.setScale(1)
    //     this.player.speed = 300
    //     this.player.swingTimer = 800
    //     this.player.swingIsReady = true
    //     this.player.facings = {
    //         TOP:'top',
    //         TOPRIGHT:'top_right',
    //         TOPLEFT:'top_left',
    //         LEFT:'left',
    //         RIGHT:'right',
    //         BOTTOM:'bottom',
    //         BOTTOMLEFT:'bottom_left',
    //         BOTTOMRIGHT:'bottom_right'
    //     }
    //     this.player.facing = this.player.facings.TOP
    //     this.player.debugShowBody = false
    //     this.player.setSize(100,175)
    //     this.player.stunned = false
    //     this.player.health = 1000
    //     this.player.immune = false
    //     this.player.damage = 50
    //     this.player.name = "Jonathan"
    // }
     // playerMovement() {
        
    //     if(!this.player.stunned) {
    //         if(this.player.keyboard.W.isDown && !this.player.keyboard.S.isDown && !this.player.keyboard.A.isDown && !this.player.keyboard.D.isDown ) this.player.anims.play('player16', true), this.player.setVelocityY(-this.player.speed), this.player.facing = this.player.facings.TOP
    //         if(!this.player.keyboard.W.isDown && this.player.keyboard.S.isDown && !this.player.keyboard.A.isDown && !this.player.keyboard.D.isDown ) this.player.anims.play('player0', true), this.player.setVelocityY(this.player.speed), this.player.facing = this.player.facings.BOTTOM 
    //         if(!this.player.keyboard.W.isDown && !this.player.keyboard.S.isDown && this.player.keyboard.A.isDown && !this.player.keyboard.D.isDown ) this.player.anims.play('player24', true), this.player.setVelocityX(-this.player.speed), this.player.facing = this.player.facings.LEFT
    //         if(!this.player.keyboard.W.isDown && !this.player.keyboard.S.isDown && !this.player.keyboard.A.isDown && this.player.keyboard.D.isDown ) this.player.anims.play('player8', true), this.player.setVelocityX(this.player.speed), this.player.facing = this.player.facings.RIGHT
            
    //         if(this.player.keyboard.W.isDown && this.player.keyboard.A.isDown) this.player.facing = this.player.facings.TOPLEFT, this.player.anims.play('player20', true), this.player.setVelocity(-(this.player.speed*1.4)/2,-(this.player.speed*1.4)/2)
    //         if(this.player.keyboard.W.isDown && this.player.keyboard.D.isDown) this.player.facing = this.player.facings.TOPRIGHT, this.player.anims.play('player12', true), this.player.setVelocity((this.player.speed*1.4)/2,-(this.player.speed*1.4)/2)
    //         if(this.player.keyboard.S.isDown && this.player.keyboard.A.isDown) this.player.facing = this.player.facings.BOTTOMLEFT, this.player.anims.play('player28', true), this.player.setVelocity(-(this.player.speed*1.4)/2,(this.player.speed*1.4)/2)
    //         if(this.player.keyboard.S.isDown && this.player.keyboard.D.isDown) this.player.facing = this.player.facings.BOTTOMRIGHT, this.player.anims.play('player4', true), this.player.setVelocity((this.player.speed*1.4)/2,(this.player.speed*1.4)/2)
    //     } else {
    //         this.player.setFrame(0)
    //     }
            
    //     if (!this.player.keyboard.W.isDown && !this.player.keyboard.S.isDown) this.player.setVelocityY(0)
    //     if (!this.player.keyboard.A.isDown && !this.player.keyboard.D.isDown) this.player.setVelocityX(0)
    //     if (!this.player.keyboard.W.isDown && !this.player.keyboard.S.isDown && !this.player.keyboard.A.isDown && !this.player.keyboard.D.isDown && !this.player.keyboard.SPACE.isDown && this.player.anims.currentAnim) {
    //         //this.player.anims.pause(this.player.anims.currentAnim.frames[0])
    //         this.player.anims.pause(this.player.anims.currentAnim.frames[0])
    //         // switch(this.player.facing){

    //         //     case this.player.facing.TOP:
    //         //         this.player.anims.stop(this.player.anims.currentAnim.frames[0])
    //         //         break;
    //         //     case this.player.facing.TOPLEFT:
    //         //         this.player.anims.stop(this.player.anims.currentAnim.frames[0])
    //         //         break;
    //         //     case this.player.facing.TOPRIGHT:
    //         //         this.player.anims.stop(this.player.anims.currentAnim.frames[0])
    //         //         break;
    //         //     case this.player.facing.LEFT:
    //         //         this.player.anims.stop(this.player.anims.currentAnim.frames[0])
    //         //         break;
    //         //     case this.player.facing.RIGHT:
    //         //         this.player.anims.stop(this.player.anims.currentAnim.frames[0])
    //         //         break;
    //         //     case this.player.facing.BOTTOMLEFT:
    //         //         this.player.anims.stop(this.player.anims.currentAnim.frames[0])
    //         //         break;
    //         //     case this.player.facing.BOTTOM:
    //         //         this.player.anims.stop(this.player.anims.currentAnim.frames[0])
    //         //         break;
    //         //     case this.player.facing.BOTTOMRIGHT:
    //         //         this.player.anims.stop(this.player.anims.currentAnim.frames[0])
    //         //         break;
    //         // }
    //     }
    //     if (this.player.keyboard.SPACE.isDown && this.player.swingIsReady) this.playerAttack(), this.player.anims.play('attack', true)
    // }

    // playerAttack() {
    //     this.player.swingIsReady = false
    //     this.player.setVelocity(0,0)
    //     this.player.stunned = true 
    //     let attackX = 0;
    //     let attackY = 0;
    //     let attackR = 0;
        
    //     switch (this.player.facing) {
    //         case this.player.facings.TOP:
    //             attackY = 0;
    //             attackX = this.player.width/2
    //             break;
    //         case this.player.facings.TOPLEFT:
    //             attackX = 0
    //             attackY = 0
    //             attackR = Math.PI+(Math.PI-Math.PI/3)
    //             break;
    //         case this.player.facings.TOPRIGHT:
    //             attackX = this.player.width
    //             attackY = 0;
    //             attackR = Math.PI/3
    //             break;
    //         case this.player.facings.LEFT:
    //             attackX = 0
    //             attackY = this.player.height/2
    //             attackR = Math.PI+(Math.PI/2)
    //             break;
    //         case this.player.facings.RIGHT:
    //             attackY = this.player.height/2
    //             attackX = this.player.width
    //             attackR = Math.PI/2
    //             break;
    //         case this.player.facings.BOTTOM:
    //             attackX = this.player.width/2
    //             attackY = this.player.height;
    //             attackR = Math.PI
    //             break;
    //         case this.player.facings.BOTTOMLEFT:
    //             attackX = 0
    //             attackY = this.player.height;
    //             attackR = Math.PI+(Math.PI/3);
    //             break;
    //         case this.player.facings.BOTTOMRIGHT:
    //             attackX = this.player.width
    //             attackY = this.player.height;
    //             attackR = Math.PI-(Math.PI/3)
    //             break;
    //     }
    //     this.player.attackBox = this.physics.add.sprite(this.player.x+attackX, this.player.y+attackY, "swing", 0).setOrigin(0.5,0.5)
    //     this.player.attackBox.rotation = attackR
    //     this.player.attackBox.setSize(100, 100)
    //     this.player.attackBox.play('swinging')
    //     this.player.attackBox.debugShowBody = false
    //     this.player.attackBox.damage = this.player.damage
    //     this.player.attackBox.spentOn = []
    //     this.physics.add.overlap(this.player.attackBox, this.enemies, this.takeDamage, null, this)
        
    //     setTimeout(()=>{
    //         this.player.stunned = false
    //         this.player.attackBox.destroy()
    //     }, this.player.swingTimer/3)
        
    //     setTimeout(()=>{
    //         this.player.swingIsReady = true
    //     },this.player.swingTimer)
        
    // }

    // this.enemies = this.physics.add.group({
    //     key:'spider',
    //     repeat: 0,
    //     setXY: { x:100, y: 10000, stepX:250 }
    // })
    // this.enemies.children.iterate( (child,index) => {
    //     child.name = "spider"+index
    //     child.health = 100;
    //     child.debugShowBody = false
    //     child.stunned = false
    //     child.damage = 50
    //     child.canAttack = true
    //     child.swingTimer = 1000
    //     child.setSize(100, 100)
    //     child.play('spider0')
    //     this.physics.world.addCollider(child, this.pla, this.pla.takeDamage, null, this)
    // })

    // takeDamage(cause, target) {
        
    //     target.takeDamage(cause, target)
    //     // if (cause.spentOn.find((element)=> element === target.name)) return
    //     // else {
    //     //     //target.stunned = true
    //     //     this.bloodEffect(target)
    //     //     target.health -= cause.damage
    //     //     cause.spentOn.push(target.name)
    //     //     this.healthbarUpdate()
    //     //     if (target.health <= 0 ) {
    //     //         this.die(target)
    //     //     }
    //     //     setTimeout(() => {
    //     //         cause.spentOn = cause.spentOn.filter( (element) => {
    //     //             element !== target.name
    //     //         })
    //     //         //target.stunned = false
    //     //     }, this.player.swingTimer)
    //     // }
    // }
    // enemyMovement(child) {
    //     if( !child.stunned) {

    //         child.xDir = (this.pla.x - child.x)/(this.pla.y - child.y)
    //         child.xDir = Math.atan(child.xDir) * (180/Math.PI)
    //         child.xDir = Math.abs(child.xDir/90)
    //         child.yDir = 1 - child.xDir; 
            
    //         if(this.pla.x - child.x < 0) child.xDir = -Math.abs(child.xDir)
    //         if(this.pla.y - child.y < 0) child.yDir = -Math.abs(child.yDir)
            
    //         child.setVelocityX(100*child.xDir)
    //         child.setVelocityY(100*child.yDir)
    //     }
    //     // if ( -125 < (this.child.x - this.player.x) && (this.enemy.x - this.player.x) < 125 && -125 < (this.enemy.y - this.player.y) && (this.enemy.y - this.player.y) < 125 ) {
    //     //     if (this.enReady) this.enemyAttack(n, s)
    //     // }
    // }   
    // for (let i = 0; i < inputs.length; i++) {
   //     if ( inputs[i] ) {
   //         if( i % 2 == 0 ) this.setVelocityY(i == 0 && !inputs[2] ? trues.length == 1 ? -this.speed : (-this.speed*1.4)/2 : i == 2 && !inputs[0] ? trues.length == 1 ? this.speed : (this.speed*1.4)/2 : 0)
   //         if( i % 2 == 1 )  this.setVelocityX(i == 1 && !inputs[3] ? trues.length == 1 ? -this.speed : (-this.speed*1.4)/2 : i == 3 && !inputs[1] ? trues.length == 1 ? this.speed : (this.speed*1.4)/2 : 0)
   //     }
   // }
   // for ( let i=0; i < this.player.health; i++ ){
   //     this.add.image(50+(75*i), 1080-50,"heart").setScale(0.5, 0.5)

   // }
    //     this.graphics.destroy()
    //     this.graphics1.destroy()

    //     let healthPercent = this.player.health/1000
       
    //     this.rect.width = healthPercent*200
    //     this.rect.x = this.player.x-100
    //     this.rect.y = this.player.y-120 
        
    //     this.rect1.y = this.player.y-120 
    //     this.rect1.x = this.player.x-100
    //     this.rect1.width = 200
    //     this.graphics1 = this.add.graphics({ fillStyle: { color: 0xffffff } })

    //     if ( healthPercent > 0.65 ) this.graphics = this.add.graphics({ fillStyle: { color: 0x00ff00 } })
    //     else if ( healthPercent > 0.35 ) this.graphics = this.add.graphics({ fillStyle: { color: 0xddff00 } })
    //     else  this.graphics = this.add.graphics({ fillStyle: { color: 0xff0000 } })
        
        
    //     this.graphics1.fillRectShape(this.rect1)
    //     this.graphics.fillRectShape(this.rect)

        // this.rect = new Phaser.Geom.Rectangle(this.player.x-100, this.player.y-120, 200, 15)
        // this.rect1 = new Phaser.Geom.Rectangle(this.player.x-100, this.player.y-120, 200, 15)
        // this.graphics1 = this.add.graphics({ fillStyle: { color: 0x000000 } })
        // this.graphics1.fillRectShape(this.rect)
        // this.graphics = this.add.graphics({ fillStyle: { color: 0x00ff00 } })
        // this.graphics.fillRectShape(this.rect)