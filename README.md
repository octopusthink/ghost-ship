# Ghost Ship Gatsby Starter

Create a Gatsby site that includes blog posts, Markdown pages, and [Nautilus](https://nautilus.octopusthink.com/).

## 🚀 Quick start

1.  **Create a Gatsby site.**

    Use the Gatsby CLI to create a new site, specifying the `ghost-ship` as your starter:

    ```bash
    # Create a new Gatsby site using the ghost-ship starter.
    npx gatsby new my-site https://github.com/octopusthink/ghost-ship
    ```

2.  **Start the development server.**

    Navigate into your new site’s directory, install the dependencies, and start the development server:

    ```bash
    cd my-site/
    yarn start # or `npm start` if you use `npm`.
    ```

3.  **Open the source code and start editing!**

    Your site is now running at [`http://localhost:8000/`](http://localhost:8000/)! 


## Build your site

Here are a few things we recommend starting with:

### Configure your settings.

Set your site's configurations by editing your `data/SiteConfig.js` file.

When you make changes, you'll need to restart the server to see these changes reflected.

### Add logos and favicons.

### Create a custom theme.

To add a custom theme, first create a [Nautilus](https://nautilus.octopusthink.com/) theme file. (Documentation for themeing is coming soon, but for now copying the [default theme](https://github.com/octopusthink/nautilus/blob/master/src/themes/nautilus/index.js) file will do the trick, and modify values as needed.) You can put it anywhere you like, but we recommend `data/theme.js`. 

Then, open up `components/NautilusWrapper`, import the theme, and pass it as a prop to Nautilus:

```jsx
import theme from 'data/theme';

<Nautilus theme={theme}>
```



### Configure content types.

### Add some content.

### Modify your CSS.

### Launch your site!

## License

This project is licensed under the MIT License - see the [LICENSE.txt](LICENSE.txt) file for details.
