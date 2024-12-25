import { Clients, Clients_Location } from '@prisma/client';

export class ClientsData {
    public static readonly MAX_LENGTH = 500;
    public readonly client_id: number;
    public readonly company_name: string;
    public readonly person_in_charge_name: string;
    public readonly person_in_charge_email: string;
    public readonly company_email: string;
    public readonly contact_number: string;
    public readonly alt_contact_number: string;
    public readonly industry: string;
    public readonly cuisine_type: string;
    public readonly tnc_consent: boolean;
    public readonly status: string;

    public constructor(entity: Clients) {
        this.client_id = entity.client_id;
        this.company_name = entity.company_name;
        this.person_in_charge_name = entity.person_in_charge_name;
        this.person_in_charge_email = entity.person_in_charge_email;
        this.company_email = entity.company_email;
        this.contact_number = entity.contact_number;
        this.alt_contact_number = entity.alt_contact_number;
        this.industry = entity.industry;
        this.cuisine_type = entity.cuisine_type;
        this.tnc_consent = entity.tnc_consent;
        this.status = entity.status;
    }
}

export class ClientsLocationData {
    public static readonly MAX_LENGTH = 500;
    public readonly client_location_id: number;
    public readonly client_id: number;
    public readonly country: string;
    public readonly city: string;
    public readonly state: string;
    public readonly postcode: string;
    public readonly address: string;

    public constructor(entity: Clients_Location) {
        this.client_location_id = entity.client_location_id;
        this.client_id = entity.client_id;
        this.country = entity.country;
        this.city = entity.city;
        this.state = entity.state;
        this.postcode = entity.postcode;
        this.address = entity.address;
    }
}
