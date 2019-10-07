import Constants from 'expo-constants';

const ENV = {
    dev: {
        wsUrl: 'ws://192.168.1.3:8080'
    },
    staging: {
        wsUrl: 'ws://192.168.1.3:8080'
    },
    prod: {
        wsUrl: 'ws://192.168.1.3:8080'
    }
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
    if (__DEV__) {
        return ENV.dev;
    } else if (env === 'staging') {
        return ENV.staging;
    } else if (env === 'prod') {
        return ENV.prod;
    }
};

export default getEnvVars