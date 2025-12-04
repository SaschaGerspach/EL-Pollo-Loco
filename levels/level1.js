let level1;

function initLevel(){
level1 = new Level(
    [
        new Endboss(),
        new Chicken(), 
        new Chicken(), 
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new ChickenSmall(),
        new ChickenSmall(),
        new ChickenSmall(),
    ],
    [
        new Cloud(),
        new Cloud(),
        new Cloud()
        
    ],
    [
        new BackgroundObject("img/5_background/layers/air.png", -719),
        new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -719),
        new BackgroundObject("img/5_background/layers/2_second_layer/2.png", -719),
        new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -719),
        new BackgroundObject("img/5_background/layers/air.png", 0),
        new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
        new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
        new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),
        new BackgroundObject("img/5_background/layers/air.png", 719),
        new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719),
        new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719),
        new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719),
        new BackgroundObject("img/5_background/layers/air.png", 719*2),
        new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 719*2),
        new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 719*2),
        new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 719*2),
        new BackgroundObject("img/5_background/layers/air.png", 719*3),
        new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719*3),
        new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719*3),
        new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719*3),
        new BackgroundObject("img/5_background/layers/air.png", 719*4),
        new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 719*4),
        new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 719*4),
        new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 719*4)
    ],
    [
        new Bottles('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 200),
        new Bottles('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 345),
        new Bottles('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 935),
        new Bottles('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 1548),
        new Bottles('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 1935)
    ],
    [
        new Coins('img/8_coin/coin_1.png', 200),
        new Coins('img/8_coin/coin_1.png', 500),
        new Coins('img/8_coin/coin_1.png', 900),
        new Coins('img/8_coin/coin_1.png', 1200),
        new Coins('img/8_coin/coin_1.png', 1500),
        new Coins('img/8_coin/coin_1.png', 1900)

    ]
);
};