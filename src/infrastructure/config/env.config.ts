
export const EnvConfiguration = () => ({
    environment: process.env.NODE_ENV || 'dev',
    MONGODB_DAC_PORTAL: process.env.MONGODB_DAC_PORTAL,
    MONGODB_PERMISSIONS_API: process.env.MONGODB_PERMISSIONS_API,
    port: process.env.PORT || 9090,
    defaultLimit: +process.env.DEFAULT_LIMIT || 7,
});

export const configToken = Symbol("CONFIG");
