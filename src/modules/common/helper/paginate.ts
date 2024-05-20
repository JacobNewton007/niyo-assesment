import QueryBuilder from '../utils/query-builder';
import { DAL } from '../internal/postgres/dal';
import { BaseEntity } from '../utils/base-entity';

export class PaginatorArgs extends BaseEntity<PaginatorArgs> {
  page: number;
  perPage: number;
  offset: number;
  totalEntriesSize: number;
  currentEntriesSize: number;
  totalPages: number;
}

export function NewPaginatorArgs(page: number, perPage: number) {
  const pg = new PaginatorArgs({ page, perPage });
  pg.offset = (page - 1) * pg.perPage;

  return pg;
}

/**
 * Paginate data from a database table.
 *
 * @param tableName - The name of the database table.
 * @param limit - The number of items per page.
 * @param page - The current page number.
 * @param queryBuilder - An instance of the QueryBuilder.
 * @param sqlQuest - An instance of the SQL execution tool.
 * @returns A PaginatorArgs object containing pagination information.
 */
export async function Paginate<T>(
  tableName: string,
  limit: number,
  page: number,
  QueryBuilder: QueryBuilder,
  sqlQuest: DAL,
  countSubQuery?: string,
): Promise<[T[], PaginatorArgs]> {
  // Create a new PaginatorArgs instance for pagination.
  const pg = NewPaginatorArgs(page, limit);
  const queryBuilder = QueryBuilder;

  // Build a subquery to get the total count of entries.
  if (countSubQuery) {
    queryBuilder.selectSubquery(countSubQuery, {});
  } else {
    queryBuilder.selectSubquery(
      `(SELECT COUNT(${tableName}.id) FROM ${tableName}) AS count`,
      {},
    );
  }
  // Apply limit and offset for the current page.
  queryBuilder.limit(pg.perPage).offset(pg.offset);

  // Build the SQL query.
  const query = queryBuilder.build();
  const params = queryBuilder.getParams();

  // Execute the query and retrieve the result.
  const result = await sqlQuest.manyOrNone(query, params);

  // Update pagination information.
  pg.totalEntriesSize = Number(result[0]?.count || 0);
  pg.currentEntriesSize = result.length;
  pg.totalPages = Math.ceil(pg.totalEntriesSize / pg.perPage);

  return [result, pg];
}