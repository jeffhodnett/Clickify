Clickify
========

*A web analytics aggregator in javascript*

Tracking data on your site nowadays is more than just Google Analytics. There are lots of other analytics providers so plugging in their apis can become time consuming. This is a simple javascript library to do it all for you.


## Usage

Initialise 

```javascript
// Setup clickify
clickify.init({
    google: { key: "12345678", domain: "mydomain.com" }, 
    mixpanel: { key: "12345678" }, 
});
```

Click capture 

```javascript
// Track click
clickify.click({ link: "link", category: "category", action: "action", label: "label", redirect: false });
```

## Contributing

If you would like to enhance the library etc. you are more than welcome to submit your pull requests.