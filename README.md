# 🎵 music-commit

`music-commit` is a CLI tool that **automatically adds the song you're listening to** in your Git commit messages.

🚀 **Enhance your commit history with music!**

## **📦 Installation**

Install globally using npm:

```sh
npm install -g music-commit
```

## **🎵 Usage**

Run `music-commit` just like `git commit`, but with music!

```sh
music-commit "Fixed a bug {{ADD MUSIC}}"
```

If a song is playing, `{{ADD MUSIC}}` will be replaced with:

```
Fixed a bug 🎵 Daft Punk - Harder, Better, Faster, Stronger
```

If no song is found, a random song will be added.

## **📌 Features**

✅ Automatically appends music to commit messages  
✅ Works like a normal `git commit`  
✅ Random song selection when no music is playing  
✅ (Upcoming) Spotify integration  

## **⚙️ Commands**

```sh
music-commit --help     # Show usage instructions
music-commit --version  # Show version number
music-commit auth       # (Coming Soon) Authenticate with Spotify
```

## **🛠️ Roadmap**

- 🔜 **Spotify integration** – Pull real music instead of random songs  
- 🔜 **Support for Apple Music / YouTube Music**  
- 🔜 **Custom song lists** – Users can define their own songs  

## **🌟 Contributing**

Pull requests are welcome! If you’d like to improve `music-commit`, feel free to fork the repo and submit PRs.

## **🐜 License**

MIT License

---

👉 Want new features? Open an issue or contribute! 🚀
