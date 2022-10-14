import { mapStorableToTask } from '../mappers/mapStorableToTask';
import { QuickSqliteClient } from '../QuickSqliteClient';
import { createSelectQuery } from '../sqlite-utils/createSelectQuery';

export const getPendingTasks = () => {
  const query = createSelectQuery(
    'pendingTasks',
    ['*'],
    {},
    {
      createdAt: 1,
    },
  );

  const result = QuickSqliteClient.executeSql.apply(null, query);

  return result.map((r) => mapStorableToTask(r));
};
