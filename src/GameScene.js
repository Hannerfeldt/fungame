import { AttackBox } from './attackbox'
import { Player } from './player'
import { Snake } from './snake'
import { Wasp } from './wasp'
import { Drop } from './drop'
import { Enemy, Spider } from './spider'
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
import web from './assets/spider_web.png'
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
        this.loadNextWave = true
        
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

        this.animArray = []

        
    }
        
    create() {    
        this.enemies = []
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

        this.waves = [
            [
                new Spider({scene:this, x:100, y:800, key:"spider", name: "spider1"}),
                new Spider({scene:this, x:250, y:800, key:"spider",  name: "spider2"}),
                new Spider({scene:this, x:400, y:800, key:"spider",  name: "spider3"}),
                new Spider({scene:this, x:550, y:800, key:"spider",  name: "spider4"}),
                new Spider({scene:this, x:700, y:800, key:"spider",  name: "spider5"})
            ],
            [
                new Wasp({scene:this, x:100, y:800, key:"wasp", name:"wasp1"}),
                new Spider({scene:this, x:900, y:800, key:"spider", name:"spider1"}),
            ],
            [
                new Wasp({scene:this, x:100, y:800, key:"wasp", name:"wasp1"})
            ]
        ]

        
        
        
        this.enemyCreate(this.waves[0])
        this.healthbarCreate()

        this.player.setCollideWorldBounds(true);
        this.player.body.onWorldBounds = true;
        
        this.physics.world.addCollider(this.enemies, this.enemies, ()=>{})

        this.physics.world.on('worldbounds', function(body){
            body.setVelocity(0,0);
        },this);
    }
    
    update() {
        if (this.enemies.length == 0 && this.loadNextWave) {
            this.loadNextWave = false
            this.waves.shift()
    
            if ( this.waves.length  != 0) {
                setTimeout(()=>{
                    this.enemyCreate(this.waves[0])
                    this.loadNextWave = true
                }, 5000)
            }
        }
        this.enemies.forEach((e, i, a) => {
            if (e.freeze) return
            e.active ? e.movement(this.player.x, this.player.y) : a.splice(i,1)
        })
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



    enemyCreate(w) {

        w.forEach(e => {
            e.create()
            setTimeout(()=> {
                e.freeze = false
            }, 4000)
            this.enemies.push(e)
        });
   
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