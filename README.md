# Personal Portfolio Website

This is a beginner-friendly personal portfolio and social profile website built with HTML, CSS, and JavaScript.

## Folder Structure

```text
portfolio/
├── index.html
├── style.css
├── script.js
├── config.js
├── README.md
└── images/
    ├── profile/
    │   ├── current/
    │   │   └── profile.jpg
    │   ├── logos/
    │   │   └── logo.png
    │   └── backups/
    └── gallery/
        ├── photo1.jpg
        ├── photo2.png
        └── photo3.webp
```

## Change Your Hero Profile Picture

1. Open `images/profile/current/`.
2. Replace `profile.jpg` with your new profile photo.
3. Keep the file name exactly `profile.jpg`.
4. Refresh the website.

No HTML, CSS, or JavaScript changes are needed.

Recommended size: `1200 x 1200 px`.

If `profile.jpg` is missing, the website shows a modern avatar placeholder.

## Change Your Navbar Logo

1. Open `images/profile/logos/`.
2. Replace `logo.png` with your new logo image.
3. Keep the file name exactly `logo.png`.
4. Refresh the website.

Recommended size: `512 x 512 px`.

If `logo.png` is missing, the navbar automatically falls back to the text-only `KR` logo.

## Store Old Profile Pictures

Use this folder for old photos:

`images/profile/backups/`

You can copy old profile pictures there before replacing the current one.

## Supported Image Formats

The website supports:

- `jpg`
- `jpeg`
- `png`
- `webp`

For the main hero profile picture, the default file path is:

`images/profile/current/profile.jpg`

For the navbar logo, the default file path is:

`images/profile/logos/logo.png`

## Add Gallery Photos

Open `images/gallery/` and add photos using numbered names:

- `photo1.jpg`
- `photo2.jpg`
- `photo3.png`
- `photo4.webp`

Refresh the website and the photos will appear automatically. You can add up to 40 photos by default. To allow more, change `galleryMaxPhotos` in `config.js`.

Important: browsers cannot list random folder contents directly in a plain static website, so use the `photo1`, `photo2`, `photo3` naming style for automatic discovery.

Recommended gallery image size: `1200 x 1200 px` or larger.

## Update Your Profile Details

Open `config.js` and edit the values:

```js
const profile = {
  name: "Your Name",
  instagramUsername: "your_instagram_username",
  instagramUrl: "https://www.instagram.com/your_instagram_username/",
  whatsappNumber: "+911234567890",
  linkedinUrl: "https://www.linkedin.com/in/your-profile/",
  bio: "Write your short bio here.",
  profileImage: "images/profile/current/profile.jpg",
  logoImage: "images/profile/logos/logo.png"
};
```

Save the file and refresh the website.

## Social Links

### Instagram

Edit these in `config.js`:

```js
instagramUsername: "kundann_rajoriya",
instagramUrl: "https://www.instagram.com/kundann_rajoriya/"
```

### WhatsApp

Edit this in `config.js`:

```js
whatsappNumber: "+916376334498"
```

The website automatically creates the WhatsApp chat link using `https://wa.me/`.

### LinkedIn

Edit this in `config.js`:

```js
linkedinUrl: "https://www.linkedin.com/in/kundan-rajoriya/"
```

## Open the Website

Double-click `index.html` to open it in your browser. For best results, use Chrome, Edge, or Firefox.
