import { AttackBox } from './attackbox'
import { Player } from './player'
import { Snake } from './snake'
import { Wasp } from './wasp'
import { Drop } from './drop'
import { Enemy } from './enemy'
import { Projectile } from './projectile'

import swing from './assets/swing.png'
import blood from './assets/bloodeffect.png'
import spider from './assets/spider.png'
import player from './assets/player.png'
import attack from './assets/attack.png'
import snake from './assets/snake.png'
import wasp from './assets/wasp.png'
import waspstunned from './assets/waspstunned.png'
import gust from './assets/gust.png'
import web from './assets/web.png'
import webprojectile from './assets/web_projectile.png'

import bg from './assets/grass_background.png'
import heart from './assets/heart.png'
import health from './assets/health_icon.png'
import xp from './assets/xp_icon.png'
import speed from './assets/speed_icon.png'

export class GameScene extends Phaser.Scene {   
    constructor() {
        super({key:"GameScene"})
        this.player
        this.inputArray = [false, false, false, false]
        this.loots = []
        this.waves = [
            {key: "spider", amount:5}, 
            {key: "snake", amount:3}, 
            {key: "wasp", amount:1}, 
        ]
    }
    
    preload() {
        this.keyboard = this.input.keyboard.addKeys("W, A, S, D, SPACE, SHIFT")
        
        this.load.spritesheet('swing', swing, {frameWidth: 200, frameHeight: 200})
        this.load.spritesheet('blood', blood, {frameWidth: 200, frameHeight: 200})
        this.load.spritesheet('spider', spider, {frameWidth: 200, frameHeight: 200})
        this.load.spritesheet('player', player, {frameWidth: 200, frameHeight: 200})
        //this.load.spritesheet('jump', './src/assets/jump.png', {frameWidth:200, frameHeight:200})
        this.load.spritesheet('attack', attack, {frameWidth: 200, frameHeight: 200})
        this.load.spritesheet('snake', snake, {frameWidth: 200, frameHeight: 200})
        this.load.spritesheet('wasp', wasp, {frameWidth: 200, frameHeight: 200})
        this.load.spritesheet('waspstunned', waspstunned, {frameWidth: 200, frameHeight: 200})
        this.load.spritesheet('gust', gust, {frameWidth: 200, frameHeight: 200})
        this.load.spritesheet('webprojectile', webprojectile, {frameWidth: 200, frameHeight: 200})
        
        this.load.image('web', web)
        this.load.image("bg", bg)
        this.load.image("health", health)
        this.load.image("xp", xp)
        this.load.image("speed", speed)
        this.load.image("heart", heart)
        this.load.image("web2", web2)
        this.animArray = []
    }
        
    create() {    
        this.physics.world.setBounds(0, 0, 1920, 1080, true, true, true, true);
       
        for (let i = 0; i < 8; i++) {
            let d = {skin:'player', key:[]}
            for (let j = i*4; j < (i*4)+4; j++){
                d.key.push(j)
            }
            this.animArray.push(d)
        }
        for (let i = 0; i < 8; i++) {
            let a = {skin:'jump', key:[]}
            for (let j = i*9; j < (i*9)+10; j++){
                a.key.push(j)
            }
            this.animArray.push(a)
        }
        
        this.animArray.push({skin:'spider', key:[0,1,2,3]})
        this.animArray.push({skin:'snake', key:[0,1,2,3,4,5,6,7,8,9]})
        //this.animArray.push({skin:'wasp', key:[0,1,2,3,4,5,6,7]})
        //this.animArray.push({skin:'waspstunned', key:[0,1,2,3,4,5,6,7]})
        

        this.add.image(1920/2, 1080/2,"bg")

        this.anims.create({
            key:'swinging',
            repeat: 0,
            frameRate: 600,
            frames: this.anims.generateFrameNames('swing', {start:0, end: 8})
        })
        this.anims.create({
            key:'wasp0',
            repeat: -1,
            frameRate: 24,
            frames: this.anims.generateFrameNames('wasp', {start:0, end: 7})
        })
        this.anims.create({
            key:'waspstunned0',
            repeat: -1,
            frameRate: 24,
            frames: this.anims.generateFrameNames('waspstunned', {start:0, end: 7})
        })
        this.anims.create({
            key:'webprojectile',
            repeat: -1,
            frameRate: 12,
            frames: this.anims.generateFrameNames('webprojectile', {start:0, end: 3})
        })
        
        this.anims.create({
            key:'bloodeffect',
            repeat: 0,
            frameRate: 600,
            frames: this.anims.generateFrameNames('blood', {start:0, end: 8})
        })
        
        this.anims.create({
            key:'attack',
            repeat:0,
            frameRate: 20,
            frames: this.anims.generateFrameNames('attack', {start:0, end: 5})
        })

        this.anims.create({
            key:'gusteffect',
            repeat:0,
            frameRate: 50,
            frames: this.anims.generateFrameNames('gust', {start:0, end:13})
        })
        
        this.animArray.forEach((e)=>{
            this.animationsCreate(e.skin, e.key)
        })
        this.player = new Player(this)
        
        this.enemyCreate(this.waves[0].key, this.waves[0].amount)
        this.healthbarCreate()

        this.player.setCollideWorldBounds(true);
        this.player.body.onWorldBounds = true;
        
        this.physics.world.addCollider(this.enemies, this.enemies, ()=>{})

        this.physics.world.on('worldbounds', function(body){
            body.setVelocity(0,0);
        },this);
    }
    
    update() {
        if (this.enemies.every(e => e.active === false)) {
            this.waves.shift()
            if ( this.waves.length  != 0) this.enemyCreate(this.waves[0].key, this.waves[0].amount)
        }
        this.enemies.forEach((e, i, a)=>{
            e.active ? e.movement(this.player.x, this.player.y) : a.splice(i,1)
        })


        //this.healthbarUpdate()
        this.checksInput()
    }

    checksInput() {
        this.inputArray[0] = this.keyboard.W.isDown
        this.inputArray[1] = this.keyboard.A.isDown
        this.inputArray[2] = this.keyboard.S.isDown
        this.inputArray[3] = this.keyboard.D.isDown
        
        if (this.player.active) this.player.movement(this.inputArray)
        if (this.player.active && this.keyboard.SHIFT.isDown) this.player.dash()
        
        if (this.keyboard.SPACE.isDown && this.player.swingIsReady) {
            this.player.attack()
            this.attack = new AttackBox(this.player.attackConfig)

            this.physics.add.overlap(this.attack, this.enemies, (cause, target) => { 
                if (cause.spentOn.find((element) => element === target.name)) return 
                target.takeDamage(cause) 
                this.bloodEffect(target) 
            } , null, this)

            setTimeout(()=>{
                this.attack.destroy()
                this.physics.world.colliders._active.find(a=> a.object1.constructor.name === "AttackBox").destroy()
            }, this.player.swingTimer/3)
        }
        
    }

    animationsCreate(skin, key) {
        
        this.anims.create({
            key: skin+key[0],
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames(skin, {frames: key})
        })
    }

    healthbarCreate() {
        this.hearts = []
        for ( let i=0; i < this.player.health; i++ ){
            this.hearts.push(this.add.image(50+(75*i), 1080-50,"heart").setScale(0.5, 0.5))

        }
    }

    removeHeart() {
        this.hearts[this.hearts.length-1].destroy()
        this.hearts.pop()
    }

    addHeart() {
        this.hearts.push(this.add.image(50+(75*this.hearts.length) ,1080-50,"heart").setScale(0.5, 0.5))
    }



    enemyCreate(key, amount) {
        this.enemies = []
        if ( key == 'spider') {
            for (let index = 0; index < amount; index++) {
                let enemy = new Enemy({scene: this, x: ((1920/5)*index)+100, y: 800, key: "spider"})    
                enemy.name = "spider"+index
                enemy.health = 100
        
                enemy.play('spider0')
                enemy.speed = 100
                enemy.setCollideWorldBounds(true);
                enemy.onWorldBounds = true;
                enemy.aggroRange = 500
                enemy.debugShowVelocity = false
                let o = Math.round(Math.random()*10)
                // let o = 9
                o == 8 ?  enemy.drop = "speed" : o == 9 ? enemy.drop = "health" : o == 10 ? enemy.drop = "xp" : enemy.drop = ""
                
                this.physics.add.overlap(enemy, this.player, (c,t) => {
                    if (!this.player.immune) { 
                        this.player.takeDamage(c,t)
                        this.bloodEffect(t)
                         
                    }
                }, null, this)
                this.enemies.push(enemy)
            }
        }

        if( key == 'snake') {

            for (let index = 0; index < amount; index++) {
                let enemy = new Snake({scene: this, x: 1200*(index+1), y: 500, key: "snake"})    
                enemy.name = "snake"+index
                enemy.aggroRange = 500
                enemy.health = 100
                enemy.damage = 50
                enemy.play('snake0')
                enemy.anims.msPerFrame = 100
                enemy.speed = 300
                enemy.setCollideWorldBounds(true);
                enemy.onWorldBounds = true;
                enemy.debugShowVelocity = false
                let o = Math.round(Math.random()*10)
                //let o = 7
                o == 8 ?  enemy.drop = "speed" : o == 9 ? enemy.drop = "health" : o == 10 ? enemy.drop = "xp" :  enemy.drop = ""
                
                this.physics.world.addCollider(enemy, this.player, (c,t) => {
                    if (c.canAttack && !this.player.immune) this.player.takeDamage(c,t), this.bloodEffect(t)
                }, null, this)
                this.enemies.push(enemy)
            }
        }

        if( key == 'wasp'){
            for (let index = 0; index < amount; index++) {
                let enemy = new Wasp({scene: this, x: 1000*(index+1), y: 800, key: "wasp"})    
                enemy.name = "wasp"+index
                enemy.aggroRange = 300
                enemy.health = 500
                enemy.damage = 200
                enemy.play('wasp0')
                
                enemy.anims.msPerFrame = 50
                enemy.speed = 1500
                enemy.body.setCollideWorldBounds(true);
                enemy.body.onWorldBounds = true;
                enemy.debugShowVelocity = false
                
                enemy.stunned = true
                setTimeout(()=>{
                    enemy.stunned = false
                }, 3000)
                let o = Math.round(Math.random()*10)
                //let o = 7
                o == 7 ?  enemy.drop = "speed" : o == 9 ? enemy.drop = "health" : o == 10 ? enemy.drop = "xp" :  enemy.drop = ""
                
                this.physics.add.overlap(enemy, this.player, (c,t) => {
                    if (c.canAttack && !this.player.immune) this.player.takeDamage(c,t), this.bloodEffect(t)
                }, null, this)
                this.enemies.push(enemy)
            }
        }
    }

    bloodEffect(target) {
        let blood = this.physics.add.sprite(target.x, target.y, "blood", 0).setOrigin(0.5, 0.5)
        blood.play('bloodeffect')
        blood.debugShowBody = false
        setTimeout(()=>{
            blood.destroy()
        }, 200)
    }

    gustEffect(target) {
        let gust = this.physics.add.sprite(target.x, target.y, "gust", 0).setScale(1).setSize(100, 100)
        switch (target.facing) {
            case 'top':
                gust.rotation = 0
                gust.flipX = true
                gust.flipY = false
                break;
            case 'left':
                gust.rotation = Math.PI/2
                gust.flipX = false
                gust.flipY = true
                break;
            case 'right':
                gust.rotation = Math.PI/2
                gust.flipX = true
                gust.flipY = false
                break;
            case 'bottom':
                gust.rotation = 0
                gust.flipX = false
                gust.flipY = true
                break;
            case 'top_right':
                gust.rotation = Math.PI/4
                gust.flipX = false
                gust.flipY = false
                break;
            case 'top_left':
                gust.rotation = -Math.PI/4
                gust.flipX = false
                gust.flipY = false
                break;
            case 'bottom_left':
                gust.rotation = Math.PI/4
                gust.flipX = false
                gust.flipY = true
                break;
            case 'bottom_right':
                gust.rotation = -Math.PI/4
                gust.flipX = false
                gust.flipY = true
                break;
        }

        gust.setOrigin(0.5,0.5)
        gust.play('gusteffect')

        gust.debugShowBody = false
        setTimeout(()=>{
            gust.destroy()
        }, 300)
    }

    drop(x, y, key) {
        
        let loot = new Drop({scene: this, x:x, y:y, key:key})
        loot.debugShowBody = false
        loot.setOrigin(0.5, 0.5)
        this.loots.push(loot)
        this.physics.add.overlap(this.player, loot, ()=> {loot.effect()} , null, this)

    }
} 