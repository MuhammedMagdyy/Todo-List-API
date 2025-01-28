export const DB_COLUNMS = {
  PROJECT: {
    UUID: 'uuid',
    NAME: 'name',
    DESCRIPTION: 'description',
    DUE_DATE: 'due_date',
    COLOR: 'color',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
    STATUS_UUID: 'status_uuid',
  },
  TASK: {
    UUID: 'uuid',
    NAME: 'name',
    DESCRIPTION: 'description',
    DUE_DATE: 'due_date',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
    PROJECT_UUID: 'project_uuid',
    TAG_UUID: 'tag_uuid',
    STATUS_UUID: 'status_uuid',
  },
  TAG: {
    UUID: 'uuid',
    NAME: 'name',
    COLOR: 'color',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
  },
  STATUS: {
    UUID: 'uuid',
    NAME: 'name',
    COLOR: 'color',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
  },
};

export const ONE_DAY = 24 * 60 * 60 * 1000;
