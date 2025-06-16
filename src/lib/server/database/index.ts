import { SUPABASE_ANON_KEY, SUPABASE_URL } from '$env/static/private';
import { createClient, PostgrestError, SupabaseClient } from '@supabase/supabase-js';

export enum Table {
	PATIENTS = 'patients',
	USERS = 'users',
	USERS_SETTINGS = 'users_settings',
	PATIENTS_VIEW_SETTINGS = 'patients_view_settings'
}

export interface DatabaseError {
	code: string;
	message: string;
	details?: unknown;
	hint?: string;
}

export interface DatabaseResult<T> {
	data: T | null;
	error: DatabaseError | null;
}

export interface DatabaseListResult<T> {
	data: T[] | null;
	error: DatabaseError | null;
	count?: number;
}

class DatabaseService {
	private client: SupabaseClient;
	private DEBUG = false;

	constructor() {
		this.client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
	}

	private handleError(error: PostgrestError): DatabaseError {
		return {
			code: error?.code || 'UNKNOWN_ERROR',
			message: error?.message || 'An unknown database error occurred',
			details: error?.details,
			hint: error?.hint
		};
	}

	private logOperation(operation: string, table: string, params?: unknown): void {
		if (!this.DEBUG) return;
		console.log(`DB Operation: ${operation} on ${table}`, params ? { params } : '');
	}

	private applyFilters(query: any, filters?: Record<string, unknown>): any {
		if (!filters) {
			return query;
		}

		Object.entries(filters).forEach(([key, value]) => {
			if (Array.isArray(value)) {
				query = query.in(key, value);
			} else if (typeof value === 'object' && value !== null) {
				const filterObj = value as { operator?: string; value?: unknown };
				if (filterObj.operator && filterObj.value !== undefined) {
					switch (filterObj.operator) {
						case 'gt':
							query = query.gt(key, filterObj.value);
							break;
						case 'gte':
							query = query.gte(key, filterObj.value);
							break;
						case 'lt':
							query = query.lt(key, filterObj.value);
							break;
						case 'lte':
							query = query.lte(key, filterObj.value);
							break;
						case 'like':
							query = query.like(key, filterObj.value);
							break;
						case 'ilike':
							query = query.ilike(key, filterObj.value);
							break;
						default:
							query = query.eq(key, filterObj.value);
					}
				}
			} else {
				query = query.eq(key, value);
			}
		});

		return query;
	}

	async select<T>(
		table: Table,
		columns = '*',
		filters?: Record<string, unknown>,
		options?: {
			orderBy?: { column: string; ascending?: boolean };
			limit?: number;
			offset?: number;
		}
	): Promise<DatabaseListResult<T>> {
		this.logOperation('SELECT', table, { columns, filters, options });

		try {
			let query = this.client.from(table).select(columns, { count: 'exact' });

			query = this.applyFilters(query, filters);

			if (options?.orderBy) {
				query = query.order(options.orderBy.column, {
					ascending: options.orderBy.ascending ?? true
				});
			}

			if (options?.limit) {
				query = query.limit(options.limit);
			}

			if (options?.offset) {
				query = query.range(options.offset, options.offset + (options.limit || 100) - 1);
			}

			const { data, error, count } = await query;

			if (error) {
				return { data: null, error: this.handleError(error), count: 0 };
			}

			return { data: data as T[], error: null, count: count || 0 };
		} catch (err) {
			return { data: null, error: this.handleError(err as PostgrestError), count: 0 };
		}
	}

	async selectOne<T>(
		table: Table,
		columns = '*',
		filters?: Record<string, unknown>
	): Promise<DatabaseResult<T>> {
		this.logOperation('SELECT_ONE', table, { columns, filters });

		try {
			let query = this.client.from(table).select(columns);

			query = this.applyFilters(query, filters);

			const { data, error } = await query.limit(1).single();

			if (error) {
				return { data: null, error: this.handleError(error) };
			}

			return { data: data as T, error: null };
		} catch (err) {
			return { data: null, error: this.handleError(err as PostgrestError) };
		}
	}

	async insert<T>(table: Table, data: Partial<T> | Partial<T>[]): Promise<DatabaseResult<T | T[]>> {
		this.logOperation('INSERT', table, { recordCount: Array.isArray(data) ? data.length : 1 });

		try {
			const { data: result, error } = await this.client.from(table).insert(data).select();

			if (error) {
				return { data: null, error: this.handleError(error) };
			}

			return { data: Array.isArray(data) ? (result as T[]) : (result[0] as T), error: null };
		} catch (err) {
			return { data: null, error: this.handleError(err as PostgrestError) };
		}
	}

	async update<T>(
		table: Table,
		data: Partial<T>,
		filters: Record<string, unknown>
	): Promise<DatabaseResult<T[]>> {
		this.logOperation('UPDATE', table, { data, filters });

		try {
			let query = this.client.from(table).update(data).select();

			query = this.applyFilters(query, filters);

			const { data: result, error } = await query;

			if (error) {
				return { data: null, error: this.handleError(error) };
			}

			return { data: result as T[], error: null };
		} catch (err) {
			return { data: null, error: this.handleError(err as PostgrestError) };
		}
	}

	async delete<T>(table: Table, filters: Record<string, unknown>): Promise<DatabaseResult<T[]>> {
		this.logOperation('DELETE', table, { filters });

		try {
			let query = this.client.from(table).delete().select();

			query = this.applyFilters(query, filters);

			const { data, error } = await query;

			if (error) {
				return { data: null, error: this.handleError(error) };
			}

			return { data: data as T[], error: null };
		} catch (err) {
			return { data: null, error: this.handleError(err as PostgrestError) };
		}
	}

	async upsert<T>(
		table: Table,
		data: Partial<T> | Partial<T>[],
		options?: { onConflict?: string }
	): Promise<DatabaseResult<T | T[]>> {
		this.logOperation('UPSERT', table, { recordCount: Array.isArray(data) ? data.length : 1 });

		try {
			const query = this.client
				.from(table)
				.upsert(data, {
					onConflict: options?.onConflict
				})
				.select();

			const { data: result, error } = await query;

			if (error) {
				return { data: null, error: this.handleError(error) };
			}

			return { data: Array.isArray(data) ? (result as T[]) : (result[0] as T), error: null };
		} catch (err) {
			return { data: null, error: this.handleError(err as PostgrestError) };
		}
	}

	getClient() {
		return this.client;
	}
}

export const db = new DatabaseService();
