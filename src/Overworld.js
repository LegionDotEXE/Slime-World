class Overworld extends Phaser.Scene {
    constructor() {
        super('overworldScene')
    }

    init() {
        this.VEL = 100      // slime velocity constant

        this.score = 0;         // Added score
    }

    preload() {
        this.load.path = './assets/'
        this.load.spritesheet('slime', 'slime.png', {
            frameWidth: 16,
            frameHeight: 16
        })

        this.load.image('tiles', 'tiles.png')
        
        this.load.tilemapTiledJSON('map', 'map.json')
    }

    create() {
        // tilemap setup
        this.map = this.make.tilemap({ key: 'map' })
        const tileset = this.map.addTilesetImage('tiles', 'tiles')
        
        this.groundLayer = this.map.createLayer('ground', tileset, 0, 0)
        this.objectsLayer = this.map.createLayer('objects', tileset, 0, 0)
        this.objectsLayer.setCollisionByProperty({ collides: true })            // Enable collisions
        
        // add slime
        this.slime = this.physics.add.sprite(32, 32, 'slime', 0)
        this.slime.body.setCollideWorldBounds(true)
        this.physics.add.collider(this.slime, this.objectsLayer)

        // slime animation
        this.anims.create({
        key: 'slime-walk',
        frames: this.anims.generateFrameNumbers('slime', { start: 0, end: 3 }),
        frameRate: 10,  
        repeat: -1      
        })

        // input
        this.cursors = this.input.keyboard.createCursorKeys()
        this.add.text(10, 10, 'Press arrow keys to move', {
        fill: '#ffffff',
        fontSize: '11px'
        });

    }

    update() {
        // slime movement
        this.direction = new Phaser.Math.Vector2(0)
        if(this.cursors.left.isDown) {
            this.direction.x = -1
        } else if(this.cursors.right.isDown) {
            this.direction.x = 1
        }

        if(this.cursors.up.isDown) {
            this.direction.y = -1
        } else if(this.cursors.down.isDown) {
            this.direction.y = 1
        }

        if (this.direction.length() > 0) {
            this.direction.normalize()
            this.slime.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y)
        } else {
            this.slime.setVelocity(0, 0)
        }
    }
}