import ReactGA from 'react-ga';

const AppReactGa = {
    init: () => {
        ReactGA.initialize('G-G859EBFK8T');
    },
    balanceWheelSphere: (sphereName) => {
        ReactGA.event({
            category: 'User',
            action: 'page_view',
            label: 'https://mindtech.health/balance/wheel/' + sphereName,
        });
    },
    balanceWheelNewSphere: (sphereName) => {
        ReactGA.event({
            category: 'User',
            action: 'page_view',
            label: 'https://mindtech.health/balance/wheel/new/' + sphereName
        });
    },
}

export default AppReactGa;
