export interface User {
	id: string;
	email: string;
	first_name?: string;
	last_name?: string;
	created_at: string;
	updated_at: string;
	clerk_id: string;
}

export interface UserSettings {
	id: string;
	user_id: string;
	theme: 'light' | 'dark' | 'system';
	language: string;
	timezone: string;
	email_notifications: boolean;
	sms_notifications: boolean;
	created_at: string;
	updated_at: string;
}

export interface Patient {
	id: string;
	user_id: string;
	first_name: string;
	last_name: string;
	email?: string;
	phone?: string;
	date_of_birth: string;
	gender: 'male' | 'female' | 'other' | 'prefer_not_to_say';
	address?: string;
	city?: string;
	state?: string;
	zip_code?: string;
	country?: string;
	emergency_contact_name?: string;
	emergency_contact_phone?: string;
	medical_history?: string;
	allergies?: string;
	medications?: string;
	notes?: string;
	created_at: string;
	updated_at: string;
}

export interface PatientViewSettings {
	id: string;
	user_id: string;
	visible_columns: string[];
	column_order: string[];
	sort_column: string;
	sort_direction: 'asc' | 'desc';
	filters: Record<string, any>;
	page_size: number;
	created_at: string;
	updated_at: string;
}

export type DatabaseTables = {
	users: User;
	users_settings: UserSettings;
	patients: Patient;
	patients_view_settings: PatientViewSettings;
};