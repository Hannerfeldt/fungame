// Importing classes 
import { AttackBox } from './attackbox'
import { Player } from './player'
import { Drop } from './drop'
import { SnakeCharmer } from './snakecharmer'
import { Genie } from './genie'

// Importing spritesheets
import swing from './assets/swing.png'
import snakecharmer from './assets/snake_charmer.png'
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
import stunned from './assets/stunned.png'
import notes from './assets/notes.png'
import smoke from './assets/smoke.png'
import genie from './assets/genie.png'
import lazer from './assets/lazer.png'
import whirlwind from './assets/whirlwind.png'
import geniedeath from './assets/geniedeath.png'
import circle from './assets/circle.png'
import coin from './assets/coin.png'
import nomad from './assets/nomad.png'

// Importing images
import bg from './assets/grass_background.png'
import dbg from './assets/desert_background.png'
import heart from './assets/heart.png'
import blackheart from './assets/black_heart.png'
import health from './assets/health_icon.png'
import xp from './assets/xp_icon.png'
import speed from './assets/speed_icon.png'
import lamp from './assets/lamp.png'
import arrow from './assets/arrow.png'

// Importing audio
import level1 from './assets/level1.mp3'
import level2 from './assets/level2.mp3'
import { Nomad } from './nomad'

export class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: "GameScene" })
        this.player
        this.inputArray = [false, false, false, false]
        this.loots = []
        this.loadNextWave = false
        this.spritesheetArray = [
            {name:'swing',source:swing}, 
            {name:'blood',source:blood}, 
            {name:'spider',source:spider}, 
            {name:'attack',source:attack}, 
            {name:'player',source:player}, 
            {name:'snake',source:snake}, 
            {name:'wasp',source:wasp}, 
            {name:'waspstunned',source:waspstunned}, 
            {name:'gust',source:gust}, 
            {name:'webprojectile',source:webprojectile}, 
            {name:'stunned',source:stunned}, 
            {name:'snakecharmer',source:snakecharmer}, 
            {name:'notes',source:notes}, 
            {name:'smoke',source:smoke}, 
            {name:'genie',source:genie}, 
            {name:'lazer',source:lazer}, 
            {name:'geniedeath',source:geniedeath}, 
            {name:'whirlwind',source:whirlwind}, 
            {name:'circle',source:circle}, 
            {name:'coin',source:coin}, 
            {name:'nomad',source:nomad} 
        ]
        this.imageArray = [
            {name:'web',source:web},
            {name:'blackheart',source:blackheart},
            {name:'bg',source:bg},
            {name:'dbg',source:dbg},
            {name:'health',source:health},
            {name:'xp',source:xp},
            {name:'speed',source:speed},
            {name:'heart',source:heart},
            {name:'lamp',source:lamp},
            {name:'arrow',source:arrow},
        ]
    }

    init(data) {
        this.data.values = data
    }

    preload() {
        this.keyboard = this.input.keyboard.addKeys("W, A, S, D, SPACE, SHIFT")

        // load all the spritesheets 
        this.spritesheetArray.forEach(e=>{
            this.load.spritesheet(e.name, e.source, {
                frameWidth: 200,
                frameHeight: 200
            })
        })  
        
        // load all the images 
        this.imageArray.forEach(e=>this.load.image(e.name,e.source))
        
        // load all the audio 
        this.load.audio("level1", level1)
        this.load.audio("level2", level2)

        this.animArray = []
        this.enemies = []
    }

    create() {
        this.physics.world.setBounds(0, 0, 1920, 1080, true, true, true, true);

        for (let i = 0; i < 8; i++) {
            let d = {
                skin: 'player',
                key: [],
                repeat: -1,
                rate: 10
            }
            for (let j = i * 4; j < (i * 4) + 4; j++) {
                d.key.push(j)
            }
            this.animArray.push(d)
        }

        for (let i = 0; i < 8; i++) {
            let a = {
                skin: 'jump',
                key: [],
                repeat: -1,
                rate: 10
            }
            for (let j = i * 9; j < (i * 9) + 10; j++) {
                a.key.push(j)
            }
            this.animArray.push(a)
        }

        this.animArray.push({
            skin: 'spider',
            key: [0, 1, 2, 3],
            repeat: -1,
            rate: 10
        })
        this.animArray.push({
            skin: 'snake',
            key: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            repeat: -1,
            rate: 12
        })
        this.animArray.push({
            skin: 'stunned',
            key: [0, 1, 2, 3, 4],
            repeat: 0,
            rate: 24
        })
        this.animArray.push({
            skin: 'swing',
            key: [0, 1, 2, 3, 4, 5, 6, 7, 8],
            repeat: 0,
            rate: 600
        })
        this.animArray.push({
            skin: 'wasp',
            key: [0, 1, 2, 3, 4, 5, 6, 7],
            repeat: -1,
            rate: 24
        })
        this.animArray.push({
            skin: 'waspstunned',
            key: [0, 1, 2, 3, 4, 5, 6, 7],
            repeat: -1,
            rate: 24
        })
        this.animArray.push({
            skin: 'webprojectile',
            key: [0, 1, 2, 3],
            repeat: -1,
            rate: 12
        })
        this.animArray.push({
            skin: 'blood',
            key: [0, 1, 2, 3, 4, 5, 6, 7, 8],
            repeat: 0,
            rate: 600
        })
        this.animArray.push({
            skin: 'attack',
            key: [0, 1, 2, 3, 4, 5],
            repeat: 0,
            rate: 20
        })
        this.animArray.push({
            skin: 'gust',
            key: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
            repeat: 0,
            rate: 50
        })
        this.animArray.push({
            skin: 'snakecharmer',
            key: [0, 1, 2, 3, 4, 5],
            repeat: -1,
            rate: 6
        })
        this.animArray.push({
            skin: 'notes',
            key: [0, 1, 2, 3],
            repeat: -1,
            rate: 6
        })
        this.animArray.push({
            skin: 'smoke',
            key: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            repeat: 0,
            rate: 12
        })
        this.animArray.push({
            skin: 'genie',
            key: [0, 1, 2, 3],
            repeat: -1,
            rate: 6
        })
        this.animArray.push({
            skin: 'genie',
            key: [4, 5, 6, 7],
            repeat: -1,
            rate: 6
        })
        this.animArray.push({
            skin: 'genie',
            key: [8, 9, 10, 11],
            repeat: -1,
            rate: 6
        })
        this.animArray.push({
            skin: 'lazer',
            key: [0, 1, 2, 3, 4],
            repeat: -1,
            rate: 24
        })
        this.animArray.push({
            skin: 'whirlwind',
            key: [0, 1, 2, 3],
            repeat: -1,
            rate: 12
        })
        this.animArray.push({
            skin: 'geniedeath',
            key: [0, 1, 2, 3, 4, 5, 6],
            repeat: 0,
            rate: 6
        })
        this.animArray.push({
            skin: 'circle',
            key: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            repeat: 0,
            rate: 12
        })
        this.animArray.push({
            skin: 'coin',
            key: [0,1,2,3,4,5,6,7],
            repeat: -1,
            rate: 12
        })
        this.animArray.push({
            skin: 'nomad',
            key: [0,1,2,3],
            repeat: -1,
            rate: 12
        })
        this.animArray.push({
            skin: 'nomad',
            key: [4,5,6,7],
            repeat: -1,
            rate: 12
        })
        
        this.add.image(1920 / 2, 1080 / 2, "dbg")

        this.animArray.forEach(e => this.animationsCreate(e.skin, e.key, e.repeat, e.rate))

        this.player = new Player(this)

        this.levels = [
            new Nomad({
                scene: this,
                x: this.game.config.width/2,
                y: this.game.config.height/2,
                key: "nomad",
                name: "nomad1"
            }),
            new SnakeCharmer({
                scene: this,
                x: this.game.config.width/2,
                y: this.game.config.height/2,
                key: "snakecharmer",
                name: "snakecharmer1"
            }),
            new Genie({
                scene: this,
                x: this.game.config.width/2,
                y: this.game.config.height/2,
                key: "genie",
                name: "genie1"
            })
        ]

        this.enemyCreate(this.levels[0])
        this.player.healthbarCreate()

        this.player.setCollideWorldBounds(true);
        this.player.body.onWorldBounds = true;

        // this.physics.world.addCollider(this.enemies, this.enemies, ()=>{})

        this.physics.world.on('worldbounds', (body) => {
            body.gameObject.onBounds()
        }, this);

        this.music = [this.sound.add("level2", {volume: 0.1}),this.sound.add("level1", {volume: 0.1})]

        this.music[0].play()
    }
   
    update() {
        // load next wave?
        if (this.loadNextWave) {
            this.loadNextWave = false
            this.levels.shift()
            this.music[0].pause()
            this.music.shift()
            this.player.restoreFullHealth()
            if (this.levels.length != 0) {
                // loading next boss fight
                setTimeout(() => {
                    this.music[0].play()
                    this.enemyCreate(this.levels[0])
                }, 5000)
            }
        }

        this.enemies.forEach((e, i, a) => {
            if (e.freeze) return
            e.active ? e.movement() : a.splice(i, 1)
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

            let overlapObject = this.physics.add.overlap(this.attack, this.enemies, (cause, target) => {
                if (cause.spentOn.find((element) => element === target.name)) return
                target.takeDamage(cause)
                this.bloodEffect(target)
            }, null, this)
            this.attack.once("animationcomplete", () => {
                this.attack.destroy(), overlapObject.destroy()
            })
        }
    }

    animationsCreate(skin, key, repeat, rate) {
        this.anims.create({
            key: skin + key[0],
            repeat: repeat,
            frameRate: rate,
            frames: this.anims.generateFrameNames(skin, {
                frames: key
            })
        })
    }

    enemyCreate(enemy) {    
        if(Array.isArray(enemy)){
            enemy.forEach(e => {
                e.create()
                setTimeout(() => {
                    e.freeze = false
                }, 4000)
                this.enemies.push(e)
            });
        }
        else {
            enemy.create()
            setTimeout(() => {
                enemy.freeze = false
            }, 4000)
            this.enemies.push(enemy)
        }
    }

    bloodEffect(target) {
        let blood = this.physics.add.sprite(target.x, target.y, "blood", 0).setOrigin(0.5, 0.5)
        blood.play('blood0')
        blood.debugShowBody = false

        if (target.constructor.name == "Lamp") blood.setTintFill(0xffff66)
        if (target.constructor.name == "Genie") blood.alpha = 0
        setTimeout(() => {
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
                gust.rotation = Math.PI / 2
                gust.flipX = false
                gust.flipY = true
                break;
            case 'right':
                gust.rotation = Math.PI / 2
                gust.flipX = true
                gust.flipY = false
                break;
            case 'bottom':
                gust.rotation = 0
                gust.flipX = false
                gust.flipY = true
                break;
            case 'top_right':
                gust.rotation = Math.PI / 4
                gust.flipX = false
                gust.flipY = false
                break;
            case 'top_left':
                gust.rotation = -Math.PI / 4
                gust.flipX = false
                gust.flipY = false
                break;
            case 'bottom_left':
                gust.rotation = Math.PI / 4
                gust.flipX = false
                gust.flipY = true
                break;
            case 'bottom_right':
                gust.rotation = -Math.PI / 4
                gust.flipX = false
                gust.flipY = true
                break;
        }

        gust.setOrigin(0.5, 0.5)
        gust.play('gust0')

        gust.debugShowBody = false
        setTimeout(() => {
            gust.destroy()
        }, 300)
    }

    drop(x, y, key) {
        let loot = new Drop({
            scene: this,
            x: x,
            y: y,
            key: key
        })
        loot.debugShowBody = false
        loot.setOrigin(0.5, 0.5)
        this.loots.push(loot)
        this.physics.add.overlap(this.player, loot, () => {
            loot.effect()
        }, null, this)
    }
}