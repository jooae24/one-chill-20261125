// one-chill-20261125 — my entry for make.fun's "One Line, One Chill"
// bounty ($5 USDC, under 200 characters, exactly one sentence).
//
// The scare works because it never explains itself: the phone took a photo
// on its own, and the photo shows someone — or something — standing behind
// you. One breath, one sentence, and the reader is the one in the picture.
//
// Try it locally (the grader points MAKEFUN_OUTPUT_DIR at /output):
//   MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE = "I woke to my phone's flashlight on, my own face on the screen, and a second pair of eyes blinking behind me in the photo it had just taken.";
const MAX = 200;

function assertFits(value) {
  const size = Array.from(value).length;
  if (value.trim().length === 0) {
    throw new Error("refusing to write a blank entry");
  }
  if (size >= MAX) {
    throw new Error(`entry runs ${size} chars, must stay under the ${MAX} cap`);
  }
  if (value.indexOf("\n") !== -1) {
    throw new Error("entry must fit on one line");
  }
  if (/\s{2}/.test(value)) {
    throw new Error("entry must not contain double spaces");
  }
}

function assertOneSentence(value) {
  const stops = (value.match(/\./g) || []).length;
  if (stops !== 1) {
    throw new Error("entry must be exactly one sentence");
  }
}

function run() {
  assertFits(LINE);
  assertOneSentence(LINE);
  const folder = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(folder, { recursive: true });
  writeFileSync(join(folder, "entry.txt"), LINE + "\n");
}

run();
