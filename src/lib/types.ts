type Laureate = {
	id: string;
	firstname: string;
	surname?: string; // surname is optional because some entries do not have it
	motivation: string;
	share: string;
};

export type Prize = {
	year: string;
	category: string;
	laureates?: Laureate[]; // laureates is optional, as it may not be present for some prizes
	overallMotivation?: string; // overallMotivation is optional for cases where no prize was awarded
};
