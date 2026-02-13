// Code Practice: Slime World
// Name: Saurav Shah    
// Date: 02/11/2026

let config = {
    type: Phaser.AUTO,
    render: {
        pixelArt: true
    },
    width: 320,
    height: 240,
    physics: {
        default: "arcade",
        arcade: {
            debug: true,
            gravity: {y: 0}     // Test for gravity less movement for top-down movement
        }
    },
    zoom: 2,
    scene: [ Overworld ]
}

const game = new Phaser.Game(config)