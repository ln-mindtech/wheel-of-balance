import ReactPixel from 'react-facebook-pixel';

const AppReactPixel = {
    options: {
        autoConfig: true,
        debug: false,
    },
    init: () => {
        ReactPixel.init('864132741827121', null, AppReactPixel.options);
    },
    trackPageView: () => {
        ReactPixel.pageView(); // For tracking page views
    },
    trackCustomEvent: (eventName, data) => {
        ReactPixel.trackCustom(eventName, data);
    },
    trackEvent: (eventName, data) => {
        ReactPixel.track(eventName, data);
    }
}

export default AppReactPixel;