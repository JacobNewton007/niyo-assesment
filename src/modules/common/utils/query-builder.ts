export default class QueryBuilder {
  private selectClause: string[] = [];
  private fromClause = '';
  private joinClauses: string[] = [];
  private whereClauses: string[] = [];
  private params: { [key: string]: any } = {};
  private limitValue: number | undefined = undefined;
  private offsetValue: number | undefined = undefined;
  private groupByClause: string[] = [];
  private orderByClauses: string[] = [];

  select(...columns: string[]): this {
    this.selectClause = columns;
    return this;
  }

  from(table: string): this {
    this.fromClause = table;
    return this;
  }

  leftJoin(table: string, onCondition: string): this {
    this.joinClauses.push(`LEFT JOIN ${table} ON ${onCondition}`);
    return this;
  }

  where(condition: string, values: { [key: string]: any }): this {
    this.whereClauses.push(condition);
    Object.assign(this.params, values);
    return this;
  }

  selectSubquery(subquery: string, values: { [key: string]: any }): this {
    this.selectClause.push(`${subquery}`);
    Object.assign(this.params, values);
    return this;
  }

  groupBy(...columns: string[]): this {
    this.groupByClause = columns;
    return this;
  }

  orderBy(column: string, direction: string): this {
    this.orderByClauses.push(`${column} ${direction}`);
    return this;
  }

  limit(limit: number): this {
    this.limitValue = limit;
    return this;
  }

  offset(offset: number): this {
    this.offsetValue = offset;
    return this;
  }

  build(): string {
    const query = `
      SELECT ${this.selectClause.join(', ')}
      FROM ${this.fromClause}
      ${this.joinClauses.join(' ')}
      ${
        this.whereClauses.length > 0
          ? `WHERE ${this.whereClauses.join(' AND ')}`
          : ''
      }
      ${
        this.groupByClause.length > 0
          ? `GROUP BY ${this.groupByClause.join(', ')}`
          : ''
      }
      ${
        this.orderByClauses.length > 0
          ? `ORDER BY ${this.orderByClauses.join(', ')}`
          : ''
      }
      ${this.limitValue !== undefined ? `LIMIT ${this.limitValue}` : ''}
      ${this.offsetValue !== undefined ? `OFFSET ${this.offsetValue}` : ''}
  `.replace(/^\s+/gm, '');
    return query;
  }

  getParams(): { [key: string]: any } {
    return this.params;
  }
}
