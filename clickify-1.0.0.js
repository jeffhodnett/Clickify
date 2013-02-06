/* ===================================================
* Clickify v1.0.0
*
* A web analytics aggregator by Jeff Hodnett
*
* https://github.com/jeffhodnett/Clickify
*
*/

var clickify = (function () {

    // Setup the analytics providers
    function setupAnalyticsProviders(options) {
        // Google
        if (options.google) {
            setupGoogleAnalytics(options.google);
        }

        // Mixpanel
        if (options.mixpanel) {
            setupMixpanelAnalytics(options.mixpanel);
        }
    }

    // Google
    function setupGoogleAnalytics(options) {
        // Check for key
        if (!options.key) {
            return;
        }

        // Google  
        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', options.key]);
        _gaq.push(['_setDomainName', options.domain]);
        _gaq.push(['_trackPageview']);
        (function () {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        })();
    }

    // Mixpanel
    function setupMixpanelAnalytics(options) {
        // Mixpanel
        (function (c, a) {
            window.mixpanel = a; var b, d, h, e; b = c.createElement("script");
            b.type = "text/javascript"; b.async = !0; b.src = ("https:" === c.location.protocol ? "https:" : "http:") +
                  '//cdn.mxpnl.com/libs/mixpanel-2.2.min.js'; d = c.getElementsByTagName("script")[0];
            d.parentNode.insertBefore(b, d); a._i = []; a.init = function (b, c, f) {
                function d(a, b) {
                    var c = b.split("."); 2 == c.length && (a = a[c[0]], b = c[1]); a[b] = function () {
                        a.push([b].concat(
                      Array.prototype.slice.call(arguments, 0)))
                    }
                } var g = a; "undefined" !== typeof f ? g = a[f] = [] :
                          f = "mixpanel"; g.people = g.people || []; h = ['disable', 'track', 'track_pageview', 'track_links',
                              'track_forms', 'register', 'register_once', 'unregister', 'identify', 'alias', 'name_tag',
                              'set_config', 'people.set', 'people.increment', 'people.track_charge', 'people.append'];
                for (e = 0; e < h.length; e++) d(g, h[e]); a._i.push([b, c, f])
            }; a.__SV = 1.2;
        })(document, window.mixpanel || []);
        mixpanel.init(options.key);
        mixpanel.track('pageload');
    }

    return {
        init: function (options) {
            // Setup providers
            setupAnalyticsProviders(options);
        },
        click: function (param) {
            // Get params
            var link = param.link || "";
            var category = param.category || "";
            var action = param.action || "";
            var label = param.label || "";
            var redirect = param.redirect || false;

            // Google Analytics
            try {
                _gaq.push(['_trackEvent', category, action, label, link, 'false']);
            } catch (err) { }

            // Mixpanel
            try {
                mixpanel.track('outbound', { 'destination': label });
            } catch (err) { }

            // Redirect
            if (redirect) {
                // Seeya!
                setTimeout(function() {
                    document.location.href = link.href;
                }, 100);
            }
        }
    };

} ());