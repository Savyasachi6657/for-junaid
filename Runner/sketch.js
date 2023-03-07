//VARIABLES
var coin,coinIMG,coingroup
var rock,rockIMG,rockgroup
var bg,bgIMG
var laser,laserIMG,lasergroup
var runner,runner_jumping,runner_running_right,runner_running_left
var gameover
var gameend
var restart
var platform,platformIMG,platformgroup
var gem,gemIMG,gemgroup
var invisgroundbottom,invisgroundup
var gameState="play"
var score=0
var lives=3
//FUNCTIONS
function preload() {
    bgIMG=loadImage("assets/bg2.png")
    runner_running_right=loadAnimation("assets/chr1.png","assets/chr2.png","assets/chr3.png","assets/chr4.png")
    runner_running_left=loadAnimation("assets/chl1.png","assets/chl2.png","assets/chl3.png","assets/chl4.png")
    runner_jumping=loadImage("assets/chr2.png")
    platformIMG=loadImage("assets/platform.png")
    coinIMG=loadAnimation("assets/coin1.png","assets/coin2.png","assets/coin3.png","assets/coin4.png","assets/coin5.png","assets/coin6.png")
    laserIMG=loadImage("assets/laser.png")
    gemIMG=loadImage("assets/gem.png")
    rockIMG=loadImage("assets/rock.png")
}
function setup() {
    createCanvas(1542,700)
    bg=createSprite(500,250,1000,500)
    bg.addImage("bg",bgIMG)
    runner=createSprite(80,470,60,60)
    runner.addAnimation("running_right",runner_running_right)
    runner.addAnimation("running_left",runner_running_left)
    runner.addImage("runner_jump",runner_jumping)
    runner.scale=0.4
    invisgroundbottom=createSprite(20,580,30000,20)
    invisgroundbottom.visible=false
    coingroup=new Group()
    rockgroup=new Group()
    lasergroup=new Group()
    gemgroup=new Group()
    platformgroup=new Group()
}
function draw() {
    background(0)
    drawSprites()
    if(gameState==="play") {
        bg.velocityX=-2
        camera.position.x=runner.x
        camera.position.y=runner.y
        if(runner.position.x<=0) {
            runner.position.x=0
        }
        if(keyDown("up")) {
            runner.velocityY=-10
            runner.changeImage("runner_jump")
        }
        runner.velocityY+=0.8
        if(keyDown("down")) {
            runner.y+=10
            runner.changeAnimation("running_right")
        }
        if(keyDown("right")) {
            runner.x+=5
            runner.changeAnimation("running_right")
        }
        if(keyDown("left")) {
            runner.x-=5
            runner.changeAnimation("running_left")
        }
        if(platformgroup.isTouching(runner)) {
            runner.velocityY=0
            runner.collide(platformgroup)
        }
    }
    if(gameState==="end") {   
    }
    runner.collide(invisgroundbottom)
    if(bg.x<0) {
        bg.x=1000
    }
    spawnPlatforms()
    spawnGems()
    spawnRocks()
    spawnLasers()
}
function spawnPlatforms() {
    if(frameCount%100===0) {
        platform=createSprite(runner.x+300,250,60,60)
        platform.y=Math.round(random(100,450))
        platform.addImage("platform",platformIMG)
        platform.scale=0.6
        platform.velocityX=-2
        platform.lifetime=400
        runner.depth=platform.depth
        runner.depth+=1
        coin=createSprite(platform.x,platform.y-50,40,40)
        coin.addAnimation("coin",coinIMG)
        coin.scale=0.15
        coin.x=platform.x
        coin.lifetime=400
        coin.velocityX=-2
        coingroup.add(coin)
        platformgroup.add(platform)
    }
}
function spawnGems() {
    if(frameCount%500===0) {
        gem=createSprite(runner.x+600,Math.round(random(100,400)),60,60)
        gem.addImage("gem",gemIMG)
        gem.scale=0.1
        gem.velocityX=-2
        gem.lifetime=400
        gemgroup.collide(platformgroup)
        gemgroup.add(gem)
    }
}
function spawnRocks() {
    if(frameCount%300===0) {
        rock=createSprite(runner.x+600,Math.round(random(100,400)),60,60)
        rock.addImage("rock",rockIMG)
        rock.scale=0.3
        rock.velocityX=-4
        rock.lifetime=400
        rockgroup.add(rock)
    }
}
function spawnLasers() {
    if(frameCount%200===0) {
        laser=createSprite(runner.x+600,Math.round(random(100,400)),60,60)
        laser.addImage("laser",laserIMG)
        laser.scale=0.1
        laser.velocityX=-6
        laser.lifetime=400
    }
}