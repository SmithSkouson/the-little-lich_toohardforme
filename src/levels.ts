import { LIVING } from "./tags";
import {
  Archer,
  Bandit,
  Champion,
  Monk,
  Piper,
  RageKnight,
  Rat,
  RoyalGuard,
  ShellKnight,
  TheKing,
  Villager,
  Wizard,
} from "./objects";
import { randomInt } from "./helpers";
import { GameObject } from "./game";

// Signals (positive signals are spawn counters)
const END_OF_LEVEL = 99;
const END_OF_WAVE = 98;

// Spawn IDs
const VILLAGER = 0;
const ARCHER = 1;
const MONK = 2;
const CHAMPION = 3;
const PIPER = 4;
const RAGE_KNIGHT = 5;
const ROYAL_GUARD = 6;
const SHELL_KNIGHT = 7;
const WIZARD = 8;
const THE_KING = 9;
const RAT = 10;
const MOB = 11;
const BANDIT = 12;

type Spawn = () => GameObject;

const LOOKUP: Spawn[] = [
  Villager,
  Archer,
  Monk,
  Champion,
  Piper,
  RageKnight,
  RoyalGuard,
  ShellKnight,
  Wizard,
  TheKing,
  Rat,
  Villager,
  Bandit,
];

const DELAYS: Record<string | number, () => number> = {
  [RAT]: () => randomInt(500),
  [VILLAGER]: () => randomInt(200),
  [BANDIT]: () => randomInt(200),
  [MOB]: () => -randomInt(500),
};

const LEVELS = [
  // Difficulty level is - Challenging :) !!

  // Tested with both the +1 Hp (ie making use of the "Pain Focus" trait) and +1 Mana path till level 3 (inclusive) :P.  (can't test raise dead path till its setup)
  // Level 1
  2, VILLAGER, END_OF_WAVE,
  4, VILLAGER, END_OF_WAVE,
  2, VILLAGER, 1, ARCHER, END_OF_WAVE,
  2, VILLAGER, 1, ARCHER, 4, VILLAGER, END_OF_LEVEL,

  // Level 1.5
  3, VILLAGER, END_OF_WAVE,
  4, VILLAGER, 1, ARCHER, END_OF_WAVE,
  2, VILLAGER, 2, ARCHER, END_OF_WAVE,
  6, VILLAGER, 1, ARCHER, END_OF_LEVEL,

  // Level 2
  2, ARCHER, 4, VILLAGER, END_OF_WAVE,
  3, ARCHER, 4, VILLAGER, END_OF_WAVE,
  8, VILLAGER, 2, ARCHER, END_OF_WAVE,
  3, VILLAGER, 1, CHAMPION, 1, VILLAGER, END_OF_LEVEL, // added a small "retinue" to make the champion a little less easy, and a bit more interesting.

  // Level 3
  1, MONK, END_OF_WAVE,
  4, BANDIT, END_OF_WAVE,
  2, BANDIT, 1, MONK, END_OF_WAVE,
  2, ARCHER, 1, MONK, END_OF_WAVE,
  4, VILLAGER, 2, BANDIT, 2, ARCHER, 1, MONK, END_OF_LEVEL,
  
  // Level 3.5
  8, MONK, 8, MONK, END_OF_WAVE,
  40, MOB, END_OF_WAVE,
  80, MOB, END_OF_LEVEL,
  
  // Level 4
  1, SHELL_KNIGHT, END_OF_WAVE,
  4, VILLAGER, 3, BANDIT, END_OF_WAVE,
  1, SHELL_KNIGHT, 1, MONK, 1, END_OF_WAVE,
  2, ARCHER, 1, MONK, 1, SHELL_KNIGHT, END_OF_WAVE,
  8, VILLAGER, END_OF_WAVE,
  1, SHELL_KNIGHT, 1, CHAMPION, 1, SHELL_KNIGHT, END_OF_LEVEL,


  // Level 5 - Pied Piper (Miniboss)
  1, RAT, END_OF_WAVE,
  3, RAT, END_OF_WAVE,
  3, RAT, 1, PIPER, END_OF_LEVEL,

  // Level 6
  4, BANDIT, END_OF_WAVE,
  1, RAGE_KNIGHT, END_OF_WAVE,
  4, BANDIT, 1, CHAMPION, 2, ARCHER, END_OF_WAVE,
  4, BANDIT, 1, RAGE_KNIGHT, END_OF_WAVE,
  2, RAGE_KNIGHT, 1, MONK, END_OF_WAVE,
  1, WIZARD, END_OF_LEVEL,

  // Level 7 - Angry Mob
  30, MOB, 3, RAGE_KNIGHT, 20, MOB, 1, RAGE_KNIGHT, 20, MOB, 4, CHAMPION, END_OF_WAVE,
  30, MOB, 4, RAGE_KNIGHT, 20, MOB, 4, RAGE_KNIGHT, 20, MOB, 3, SHELL_KNIGHT, END_OF_WAVE,
  7, CHAMPION, END_OF_LEVEL,

  // Level 8
  10, BANDIT, 1, MONK, 10, BANDIT, 1, MONK, END_OF_WAVE,
  10, BANDIT, 1, WIZARD, 1, SHELL_KNIGHT, END_OF_WAVE,
  5, BANDIT, 3, ARCHER, 3, RAGE_KNIGHT, END_OF_WAVE,
  1, CHAMPION, 1, WIZARD, 1, CHAMPION, END_OF_LEVEL,

  // Level 9 - Guards Approaching
  1, VILLAGER, END_OF_WAVE,
  2, ROYAL_GUARD, END_OF_WAVE,
  2, ARCHER, END_OF_WAVE,
  10, ROYAL_GUARD, END_OF_WAVE,
  10, ROYAL_GUARD, 2, MONK, 10, ROYAL_GUARD, END_OF_WAVE,
  2, ROYAL_GUARD, 1, SHELL_KNIGHT, 1, CHAMPION, 1, MONK, END_OF_WAVE,
  2, ROYAL_GUARD, 1, SHELL_KNIGHT, 1, CHAMPION, 1, WIZARD, END_OF_LEVEL,

  // Level 10 - The King (Boss Fight)
  1, THE_KING, END_OF_LEVEL,

];

let timer = 0;
let cursor = 0;

export function isLevelFinished() {
  return LEVELS[cursor] === END_OF_LEVEL && isCleared();
}

export function isComplete() {
  return cursor >= LEVELS.length - 1;
}

export let nextLevel = () => {
  cursor++;
  game.level++;
  game.onLevelStart();
};

export function updateLevel(dt: number) {
  let cmd = LEVELS[cursor];
  if ((timer -= dt) > 0) {}
  else if (cmd === END_OF_WAVE) isCleared() && cursor++;
  else if (cmd === END_OF_LEVEL) {}
  else if (cmd) {
    LEVELS[cursor]--; // Decrement quantity
    let id = LEVELS[cursor + 1];
    let unit = LOOKUP[id]();
    game.spawn(unit);
    timer = unit.updateSpeed + (DELAYS[id]?.() || 0);
  } else {
    cursor += 2;
  }
}

function isCleared() {
  return !game.objects.some(object => object.is(LIVING));
}
