import Phaser from "phaser";
import {
  GameScene
} from "./GameScene";

let config = {
  type: Phaser.Auto,
  width: 1920,
  height: 1080,
  // width:window.innerWidth,
  // height:window.innerHeight,
  backgroundColor: 0x000000,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  },
  scene: [GameScene]
}


let game = new Phaser.Game(config);