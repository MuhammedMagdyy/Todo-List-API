export const DB_COLUMNS = {
  PROJECT: {
    UUID: 'uuid',
    NAME: 'name',
    DESCRIPTION: 'description',
    DUE_DATE: 'dueDate',
    COLOR: 'color',
    CREATED_AT: 'createdAt',
    UPDATED_AT: 'updatedAt',
    STATUS_UUID: 'statusUuid',
  },
  TASK: {
    UUID: 'uuid',
    NAME: 'name',
    DESCRIPTION: 'description',
    DUE_DATE: 'dueDate',
    CREATED_AT: 'createdAt',
    UPDATED_AT: 'updatedAt',
    PROJECT_UUID: 'projectUuid',
    TAG_UUID: 'tagUuid',
    STATUS_UUID: 'statusUuid',
  },
  TAG: {
    UUID: 'uuid',
    NAME: 'name',
    COLOR: 'color',
    CREATED_AT: 'createdAt',
    UPDATED_AT: 'updatedAt',
  },
  STATUS: {
    UUID: 'uuid',
    NAME: 'name',
    COLOR: 'color',
    CREATED_AT: 'createdAt',
    UPDATED_AT: 'updatedAt',
  },
};
export const SERVER = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  TRUST_PROXY: 'trust proxy',
  DEFAULT_PORT_NUMBER: 8080,
  LOCALHOST_URLS: ['http://localhost:3000', 'http://localhost:5174'],
};
export const MAGIC_NUMBERS = {
  ONE_DAY: 24 * 60 * 60 * 1000,
  SEVEN_DAYS: 7 * 24 * 60 * 60 * 1000,
};
