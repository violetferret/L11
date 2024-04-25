class Movement extends Phaser.Scene {
    constructor() {
        super('movementScene');

        // Create an object to hold sprite bindings
        this.my = {sprite: {}};

        this.wizardX = 400;
        this.wizardY = 500;

        this.staffX = this.wizardX + 28;
        this.staffY = this.wizardY + 10;

        this.aKey = null;
        this.dKey = null;
        this.spaceKey = null;
    }

    preload() {
        // Assets from Kenny Assets pack "Shape Characters"
        // https://kenney.nl/assets/shape-characters
        this.load.setPath("./assets/");
        // wizard
        this.load.image("wizard", "kenney_tiny-dungeon/Tiles/tile_0084.png");

        // staff
        this.load.image("staff", "kenney_tiny-dungeon/Tiles/tile_0128.png");

        // magic blast
        this.load.image("magic", "kenney_pixel-shmup/Tiles/tile_0000.png");

    }
    create(){
        let my = this.my;

        my.sprite.wizard = this.add.sprite(this.wizardX, this.wizardY, "wizard");
        my.sprite.wizard.setScale(4);

        my.sprite.staff = this.add.sprite(this.staffX, this.staffY, "staff");
        my.sprite.staff.setScale(3);
        my.sprite.staff.visible = false;

        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.input.keyboard.on('keydown', (event) => {
            if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.SPACE) {
                my.sprite.staff.visible = true;
                my.sprite.magic = this.add.sprite(my.sprite.staff.x, my.sprite.staff.y, "magic");
                my.sprite.magic.setScale(2);
            }
        });
    }
    update(){
        let my = this.my;
        if (this.aKey.isDown) {
            if (my.sprite.wizard.x > 25) {
                my.sprite.wizard.flipX = true;
                my.sprite.wizard.setX(my.sprite.wizard.x - 5);
                my.sprite.staff.setX(my.sprite.staff.x - 5);
            }
        }
        if (this.dKey.isDown) {
            if (my.sprite.wizard.x < 775) {
                my.sprite.wizard.flipX = false;
                my.sprite.wizard.setX(my.sprite.wizard.x + 5);
                my.sprite.staff.setX(my.sprite.staff.x + 5);
            }
        }
        if (this.spaceKey.JustDown) {
            
        }

        if (my.sprite.magic) {
            if (my.sprite.magic.y > 0) {
                my.sprite.magic.setY(my.sprite.magic.y - 10);
            } else {
                my.sprite.magic.destroy(true);
                my.sprite.staff.visible = false;
            }
        }
    }
}