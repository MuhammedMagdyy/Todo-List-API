export const DB_COLUNMS = {
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
export const ONE_DAY = 24 * 60 * 60 * 1000;
export const DEFAULT_PORT_NUMBER = 8080;
