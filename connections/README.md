# Connections

The game served at https://www.bobbaothebuilder.com/connections/

`index.html` here is a build output — the whole game in one self-contained file,
no dependencies and no build step at serve time.

The source lives in the private repo `BobBaoTheBuilder/Connections-birthday-game`
(puzzles in `puzzles.json`, terminal version in `connections.py`). To change the
puzzles: edit `puzzles.json` there, run `python3 build_site.py`, then copy the
regenerated `index.html` over this one. The page is password-gated: the puzzles are AES-256-GCM ciphertext, decrypted in
the browser with a key derived from the password (PBKDF2-HMAC-SHA256). Without
the password the page holds nothing readable. Rebuild it with
`python3 build_site.py --password <password>`; the password is never stored in
either repo. Since the ciphertext is public, a short password can be attacked
offline — this is a party door, not a lock.

## The celebration media

| File | What it is |
| --- | --- |
| `cats.jpg` | the still shown while the candles burn |
| `cats-blow.mp4` | the video played when the cake is tapped |
| `cats-after.jpg` | the still shown afterwards, candles out |

The two stills are the video's own first and last frames, so the cut between
photo and video is invisible. All three are optional — without them the page
falls back to a drawn cake that blows its own candles out.

These are ordinary static files. The puzzle itself is encrypted behind the
password, but anyone who knows these URLs can fetch the media directly.
