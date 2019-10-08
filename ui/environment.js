import Constants from 'expo-constants';

const ENV = {
    dev: {
        wsUrl: 'ws://192.168.1.7:8080',
        usersUrl: 'http://192.168.1.7:8080/api/users'
    },
    staging: {
        wsUrl: 'ws://192.168.1.3:8080',
        usersUrl: 'http://192.168.1.7:8080/api/users'
    },
    prod: {
        wsUrl: 'ws://192.168.1.3:8080',
        usersUrl: 'http://192.168.1.7:8080/api/users'
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