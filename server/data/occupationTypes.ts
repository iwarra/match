export interface Concept {
	id: string;
	narrower: Narrower[];
	preferred_label: string;
	ssyk_code_2012: string;
	type: string;
}

export interface Narrower {
	id: string;
	narrower: Narrower2[];
	preferred_label: string;
	ssyk_code_2012: string;
	type: string;
}

export interface Narrower2 {
	id: string;
	narrower: Narrower3[];
	preferred_label: string;
	ssyk_code_2012: string;
	type: string;
}

export interface Narrower3 {
	definition: string;
	id: string;
	narrower: Narrower4[];
	preferred_label: string;
	ssyk_code_2012: string;
	type: string;
}

export interface Narrower4 {
	id: string;
	preferred_label: string;
	type: string;
}
