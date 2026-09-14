# Build Order

How we're tackling this project. Some files have to exist before others can be built, so we're working in waves. Everything in a wave can happen at the same time. Don't start the next wave until the current one is merged.

## Wave 1 — Get the project running

Stuff that needs to exist before anyone can do anything.

- `api/database.json` — the seed data
- `index.html` — the shell, has the root container main.js writes into
- `styles/main.css` — can be empty, just needs to exist so the browser doesn't 404 on it

One person handles this on day one. Everyone else works on tickets, the ERD, or the README in the meantime. Don't try to parallelize this — there's nothing to parallelize.

## Wave 2 — Plumbing

- `TransientState.js` — holds the current governor/facility/mineral selections, fires `stateChanged`
- `main.js` — calls every module, listens for events, re-renders on `stateChanged`

These two are tightly connected. main.js imports TransientState, TransientState dispatches events main.js listens for. Should be done by one person or two people pairing.

By the end of Wave 2, the page should load and show nothing but the h1 and empty containers. That's the goal — empty page that doesn't error.

## Wave 3 — Display modules (parallel)

Three people can work on these at the same time. None of them import from each other.

- `Governors.js` — fetches active governors, renders the dropdown
- `Facilities.js` — fetches facilities, renders the dropdown (disabled until a governor is picked)
- `ColonyInventory.js` — reads governor from state, fetches that colony's minerals, displays them

Build Governors first within this wave if possible — nothing else can really be tested until you can put a governor into state.

By the end of Wave 3 you should be able to pick a governor, see the inventory show up, and see the facility dropdown become enabled.

## Wave 4 — Selection flow

- `FacilityMinerals.js` — reads facility from state, shows minerals with radio buttons (only for quantity > 0)
- `SpaceCart.js` — reads selected mineral from state, shows it with the Purchase button

SpaceCart needs FacilityMinerals to be working first, otherwise you have no way to put a mineral into state to test it.

By end of Wave 4 the whole read-only flow works. Pick a governor, pick a facility, pick a mineral, see the Purchase button. Button doesn't do anything yet.

## Wave 5 — Purchase

- `Purchase.js` — handles the PUT requests when Purchase Mineral is clicked

This goes last because it depends on everything else. It's also the trickiest one — it mutates two tables. Whoever takes this should probably pair on it. If it breaks, it can mess up the seed data, so commit before testing.

## Why this order

We're building bottom up. Foundation, then plumbing, then features that depend on the plumbing. This way when someone opens a PR, the stuff it depends on is already merged and you can actually test it.

If two of us are editing the same file in the same wave, something's wrong — go back and re-check whose ticket that file belongs to.

## Schedule

Rough idea, adjust as needed:

- Day 1: Wave 1 + Wave 2. One person on the code, everyone else on planning docs and tickets.
- Day 2-3: Wave 3, three of us in parallel. Fourth person can start FacilityMinerals once Facilities is merged.
- Day 4: Finish Wave 4, start Purchase.js with a pair.
- Day 5: Bug fixes, README, demo prep.
