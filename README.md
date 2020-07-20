# Ghost Ship Gatsby Starter

Create a Gatsby site that includes blog posts, Markdown pages, and [Nautilus](https://nautilus.octopusthink.com/).

## 🚀 Quick start

1. **Create a Gatsby site.**

    Use the Gatsby CLI to create a new site, specifying the `ghost-ship` as your starter:

    ```bash
    # Create a new Gatsby site using the ghost-ship starter.
    npx gatsby new my-site https://github.com/octopusthink/ghost-ship
    ```

2. **Start the development server.**

    Navigate into your new site’s directory, install the dependencies, and start the development server:

    ```bash
    cd my-site/
    yarn start # or `npm start` if you use `npm`.
    ```

3. **Open the source code and start editing!**

    Your site is now running at [`http://localhost:8000/`](http://localhost:8000/)!

## 🚧 Build your site

Here are a few things we recommend starting with:

### Configure your settings

Set your site's configurations by editing your `data/SiteConfig.js` file.

When you make changes, you'll need to restart the server to see these changes reflected.

### Add logos and favicons

Most of your images should go in the `/src/images` folder. Images in this folder will be processed by Gatbsy to lazy-load and generally be optimised for fast-and-friendly loading. If you have issues with images used, try moving them to the `/static` folder!

Ghost Ship is already set up for a favicon. Just make a favicon.png and save it to './static/favicon.png'. The recommended size for the file is 1500x1500px.

### Create a custom theme

To add a custom theme, first create a [Nautilus](https://nautilus.octopusthink.com/) theme file. (Documentation for themeing is coming soon, but for now copying the [default theme](https://github.com/octopusthink/nautilus/blob/master/src/themes/nautilus/index.js) file will do the trick, and modify values as needed.) You can put it anywhere you like, but we recommend `data/theme.js`.

Then, open up `components/NautilusWrapper`, import the theme, and pass it as a prop to Nautilus:

```jsx
import theme from 'data/theme';

<Nautilus theme={theme}>
```

### Configure content types

### Add some content

### Modify your CSS

### Launch your site

## ✨What's next

### Using the design system

To get up and running faster, Ghost Ship uses the [Nautilus](https://nautilus.octopusthink.com) design system. Since Nautilus is still very much in its infancy, it's pulling from the latest changes made to the `master` GitHub branch, rather than the published version.

To pull the latest changes, uninstall and reinstall the Nautilus dependency:

```bash
npm uninstall nautilus && npm install --save octopusthink/nautilus
```

## SEO

### Page frontmatter

There are a few SEO-specific properties you can set for any page or other content type:

`metaDescription:` For setting the meta description.
`thumbnail`: For setting a thumbnail image to appear when shared on social media.
`canonical`: For setting the canonical url.

These are all optional—don't use them if you don't need them!

### Thumbnail images

For each page, you can set a custom thumbnail that will be used when sharing on Twitter, Facebook, etc. If no thumbnail is set, the page will use the fallback thumbnail, as defined in your `SiteConfig.js`.

We recommend using the size 630x1200 for maximum compatibility. These images should be stored in the `static/` directory.

## License

This project is licensed under the MIT License - see the [LICENSE.txt](LICENSE.txt) file for details.
