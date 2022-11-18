Readme
===========
For the original Games Readme, see https://github.com/SeanScherer/the-little-lich/blob/main/JS13k-2022_Devlog.md

Description
---------------
First attempt at an overhaul of the game. The game "Norman the Necromancer" by Dan Prince that is (developed for the JS13k 2022 GameJam - 3rd Place actually :P).

Overhaul (and this Readme) by Sean Scherer.

(My) Issues with the original
-------------------------------

I really love the [original game](https://github.com/danprince/norman-the-necromancer) (else I wouldn't be messing with it here :P).

However, there are some things I disliked, and those were the first I changed here:

* The streak trait meant I was paying a lot of attention to not missing any shots / maxing out the souls I got. I felt I was happier playing before I understood the mechanism (Dan Prince makes a similar point in his GameJam Devlog).
* After playing a while, the game was too easy - both in the early levels, and later with some of the High-powered rituals.
* This meant often all the mobs would be dieing at the edge of the screen (or even slightly outside it, if I was sending skeleton Armies across).
* I hate waiting to "Raise Dead", even with Impatient its long for me :P.

For now, see the commit log for some of the changes I made to address these points. (I may write up a better description and reasoning later on).


# Dev builds and Building

Hacking around on the game is pretty easy. A little setup will be necessary.

I actually have little to no idea about Web-tech, so a lot of this is built on guesswork and just trying. Ie - your mileage may vary...

## If you have experience with web technologies (unlike me)

This project runs with Vite. Should run out of the box.

## If you don't have experience with web technologies

### If you're on Windows, 
Then running a dev build should be easy:
* First install the Node Package Manager (aka npm). This is a serious piece of software, and wants to / may update your Windows version as it installs itself... 
* Next step is easy. Run "npm install vite" from the console. When that's done, set the working directory to that of the game's folder, then run "npx vite" , which will then serve a live version of the game at http://localhost:5173/ (with the current version of Vite as of the 16th November, 2022).
* This server will then auto-update whenever you edit (and save) a file within the game's directory.

(For building a deployable/production version, check the instructions at Vitejs.dev: https://vitejs.dev/guide/build.html - Though I've not been able to get it to output a working static version yet :/ ! (I assume) This requires more setup than just serving the dev version... It'd probably help if I had an idea of what I'm doing :P.

### If you're on a Linux,
Then I have no idea how much trouble installing npm is... 
* But if you've got that set the rest should be just as easy as on Windows
* Install Vite, just like in Windows: enter "npm install vite" on you're console of choice. When that's done, again, set the working directory (of the console) to that of the game's folder, then run "npx vite" , which will then serve a live version of the game at http://localhost:5173/ .
* This server should then auto-update whenever you edit (and save) a file within the game's directory.

(See above for building. Possibly you may actually have more luck under Linux (since that seems to be the original devs build environment?).
