# Connections

The game served at https://www.bobbaothebuilder.com/connections/

`index.html` here is a build output — the whole game in one self-contained file,
no dependencies and no build step at serve time.

The source lives in the private repo `BobBaoTheBuilder/Connections-birthday-game`
(puzzles in `puzzles.json`, terminal version in `connections.py`). To change the
puzzles: edit `puzzles.json` there, run `python3 build_site.py`, then copy the
regenerated `index.html` over this one. The puzzle answers are base64-encoded in
the page so they aren't sitting in plain sight in View Source; the readable
puzzle file stays in the private repo.
