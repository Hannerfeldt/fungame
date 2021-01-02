import Phaser from "phaser";
import { GameStartScene } from "./GameStartScene";
import { GameScene } from "./GameScene";
import { GameOverScene } from "./GameOverScene";


let config = {
  type: Phaser.Auto,
  width: 1920,
  height: 1080,
  // width:window.innerWidth,
  // height:window.innerHeight,
  backgroundColor: 0x000000,
  physics: {
    default: 'arcade',
    arcade: { debug: true }
  },
  scene: [GameStartScene, GameScene, GameOverScene]
}

function loadFont(name, url) {
  var newFont = new FontFace(name, `url(${url})`);
  newFont.load().then(function (loaded) {
      document.fonts.add(loaded);
      let game = new Phaser.Game(config);
  }).catch(function (error) {
      return error;
  });
}

loadFont('pixel','/src/font/Pixellari.ttf')


