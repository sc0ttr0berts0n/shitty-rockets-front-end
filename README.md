# shitty-rockets
A physics driven smash-like platform fighter. Currently very work in progress.

## Setup
Setup is simple, run `npm install` or `yarn install` to get necessary packages, and then run `node index` to launch the server. After that, navigate to `localhost:3000` to see the game.

## Controls
Currently, controls are split for the Player and the Bot. Player is always the first rocket. Bot is `n` rockets after the Player.

### Player Controls
White Rocket && `game.rockets[0]`
- `SPACE` Thurst to the Attractor.
- `S` Thrust to your Opponent.

### Bot Controls
Grey Rocket || `game.rockets[n>0]`
- `UP ARROW` Thurst to the Attractor.
- `DOWN ARROW` Thrust to your Opponent.

## Screenshot
<img src="https://imgur.com/pN2XB3z.png" width="300">
