# 🎵 music-commit

`music-commit` is a CLI tool that **automatically adds the song you're listening to** in your Git commit messages.

[NPM Package Link](https://www.npmjs.com/package/music-commit)

## **Installation**

Install globally using npm:

```sh
npm install -g music-commit
```

## **Usage**

Run `music-commit` just like `git commit`, but with music!

```sh
music-commit "Fixed a bug {{ADD MUSIC}}"
```

If a song is playing, `{{ADD MUSIC}}` will be replaced with:

```
Fixed a bug 🎵 Daft Punk - Harder, Better, Faster, Stronger
```

## **Features**

✅ Automatically appends music to commit messages  
✅ Works like a normal `git commit`  
✅ (Upcoming) Spotify integration

## **Commands**

```sh
music-commit --help     # Show usage instructions
music-commit --version  # Show version number
music-commit auth       # (Coming Soon) Authenticate with Spotify
```

## **Roadmap / Shit to figure out**

- 🔜 **Spotify integration** – Pull real music instead
- 🔜 **Support for Apple Music / YouTube Music** (Maybe lol)
