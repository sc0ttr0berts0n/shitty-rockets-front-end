# Shitty Rockets
A physics driven smash-like platform fighter. Currently very work in progress.

## Setup
Setup is simple, run `npm install` or `yarn install` to get necessary packages, and then run `npm start` to launch the server. After that, navigate to `localhost:3000` to see the game.

## Gameplay

### Objective
The object of Shitty Rockets is to force your opponent to fall off the bottom of the screen.

### The Attractor
<img src="https://imgur.com/xBMeSZC.png">
To keep you rocket from falling off the platform, you can use the `Thrust at Attractor` key. Doing so draws you towards the attractor overhead.

### The Platform
<img src="https://imgur.com/RE7aL1c.png">
The platform is all you have standing between yourself and the bottomless pit. Be careful to keep yourself on its top side, once you fall below, it is tough to get back up.

### The Opponent
<img src="https://imgur.com/MahryeQ.png">

#### Assignment
Each player pursues one other player, and each player has one player pursuing them. Depending on the number of players, you will not necessarily be chasing the person chasing you.

#### Collisions
To defeat your opponent, you must knock him off the screen. When two players collide, the player with greater speed imparts a hit on the player with lower speed. So fly at them as fast and you can with the `Thrust at Opponent` Key to send them flying.

## Controls
- `UP ARROW` Thurst to the Attractor.
- `DOWN ARROW` Thrust to your Opponent.

## Screenshot
<img src="https://imgur.com/pN2XB3z.png" width="300">
