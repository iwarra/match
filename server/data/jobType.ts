export interface Root {
	id: string;
	external_id: any;
	original_id: any;
	webpage_url: string;
	logo_url: string;
	headline: string;
	application_deadline: string;
	number_of_vacancies: number;
	description: Description;
	employment_type: EmploymentType;
	salary_type: SalaryType;
	salary_description: any;
	duration: Duration;
	working_hours_type: WorkingHoursType;
	scope_of_work: ScopeOfWork;
	access: any;
	employer: Employer;
	application_details: ApplicationDetails;
	experience_required: boolean;
	access_to_own_car: boolean;
	driving_license_required: boolean;
	driving_license: any;
	occupation: Occupation;
	occupation_group: OccupationGroup;
	occupation_field: OccupationField;
	workplace_address: WorkplaceAddress;
	must_have: MustHave;
	nice_to_have: NiceToHave;
	application_contacts: any[];
	publication_date: string;
	last_publication_date: string;
	removed: boolean;
	removed_date: any;
	source_type: string;
	timestamp: number;
}

export interface Description {
	text: string;
	text_formatted: string;
	company_information: any;
	needs: any;
	requirements: any;
	conditions: any;
}

export interface EmploymentType {
	concept_id: string;
	label: string;
	legacy_ams_taxonomy_id: string;
}

export interface SalaryType {
	concept_id: string;
	label: string;
	legacy_ams_taxonomy_id: string;
}

export interface Duration {
	concept_id: string;
	label: string;
	legacy_ams_taxonomy_id: string;
}

export interface WorkingHoursType {
	concept_id: string;
	label: string;
	legacy_ams_taxonomy_id: string;
}

export interface ScopeOfWork {
	min: number;
	max: number;
}

export interface Employer {
	phone_number: any;
	email: any;
	url: any;
	organization_number: string;
	name: string;
	workplace: string;
}

export interface ApplicationDetails {
	information: any;
	reference: any;
	email: any;
	via_af: boolean;
	url: string;
	other: any;
}

export interface Occupation {
	concept_id: string;
	label: string;
	legacy_ams_taxonomy_id: string;
}

export interface MustHave {
	skills: any[];
	languages: any[];
	work_experiences: any[];
	education: any[];
	education_level: any[];
}

export interface NiceToHave {
	skills: any[];
	languages: any[];
	work_experiences: any[];
	education: any[];
	education_level: any[];
}

export interface OccupationGroup {
	concept_id: string;
	label: string;
	legacy_ams_taxonomy_id: string;
}

export interface OccupationField {
	concept_id: string;
	label: string;
	legacy_ams_taxonomy_id: string;
}

export interface WorkplaceAddress {
	municipality: string;
	municipality_code: string;
	municipality_concept_id: string;
	region: string;
	region_code: string;
	region_concept_id: string;
	country: string;
	country_code: string;
	country_concept_id: string;
	street_address: string;
	postcode: string;
	city: string;
	coordinates: number[];
}
