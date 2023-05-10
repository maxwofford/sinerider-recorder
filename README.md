# Sinerider recorder

This is a tech demo of using browserless.io to run the sinerider scoring server!

## Setup everything!

1. `yarn install`
2. `cp example.env .env`
3. Replace the value in your new .env! I'm using the free plan of browserless.io that doesn't require a credit card.

## Getting score

To run the test of the scoring, you can run this: `node score.js`.

It'll score the array of level URLs `levels`, which I pulled from the sinerider submissions airtable manually. It will run with a couple of different values for `ticks per second` and `draw modulo` settings so you can see a sample of how quick it takes to render a result with given settings.

**Results**

I found that with the provided test level I reached diminishing returns at 1000 ticks per second and a draw modulo of 5. I didn't end up pushing much further, but I think it could run even faster. At this speed it took 7.6 seconds to score a 25.07 second solution, so it's already doing pretty well.

I noticed the page started to break once I reached 50 draw modulo with 90 ticks per second, so we should be careful of raising this too much further.

<details>
<summary>Click for full output</summary>
```sh
node score.js
Getting score...
{ scoreTime: '25.07 seconds', scoreLength: '29 characters' }
Total time: 32.93 seconds at 60 ticks per second and 5 draw modulo
Getting score...
{ scoreTime: '25.07 seconds', scoreLength: '29 characters' }
Total time: 24.228 seconds at 90 ticks per second and 5 draw modulo
Getting score...
{ scoreTime: '25.07 seconds', scoreLength: '29 characters' }
Total time: 21.172 seconds at 120 ticks per second and 5 draw modulo
Getting score...
{ scoreTime: '25.07 seconds', scoreLength: '29 characters' }
Total time: 16.616 seconds at 240 ticks per second and 5 draw modulo
Getting score...
{ scoreTime: '25.07 seconds', scoreLength: '29 characters' }
Total time: 31.796 seconds at 60 ticks per second and 3 draw modulo
Getting score...
{ scoreTime: '25.07 seconds', scoreLength: '29 characters' }
Total time: 27.593 seconds at 90 ticks per second and 3 draw modulo
Getting score...
{ scoreTime: '25.07 seconds', scoreLength: '29 characters' }
Total time: 24.889 seconds at 120 ticks per second and 3 draw modulo
Getting score...
{ scoreTime: '25.07 seconds', scoreLength: '29 characters' }
Total time: 20.688 seconds at 240 ticks per second and 3 draw modulo
Getting score...
{ scoreTime: '25.07 seconds', scoreLength: '29 characters' }
Total time: 43.693 seconds at 60 ticks per second and 1 draw modulo
Getting score...
{ scoreTime: '25.07 seconds', scoreLength: '29 characters' }
Total time: 44.285 seconds at 90 ticks per second and 1 draw modulo
Getting score...
{ scoreTime: '25.07 seconds', scoreLength: '29 characters' }
Total time: 43.361 seconds at 120 ticks per second and 1 draw modulo
Getting score...
{ scoreTime: '25.07 seconds', scoreLength: '29 characters' }
Total time: 44.077 seconds at 240 ticks per second and 1 draw modulo
```
</details>

## Getting video

To run the test of recordings, you can run this: `node record.js`. Let it fully run and you'll have a list of mp4 files added to `/output` that include their rendering settings (ie. `video_chaos_fps_30_width_1024_height_768_modulo_1.mp4`).

The levels range from simple solutions to hard-to-renders that really tax the physics simulation.

_Warning: I ran into an issue where video files wouldn't record correctly if I opened them while the script was still writing to them. If you do that, just delete the file and try downloading again._

**Results**

I found the best consistent renderings at 60 fps with a draw modulo of 2. Complex solutions looked good at a draw modulo of 3, but simple renderings looked better at modulo 1.
