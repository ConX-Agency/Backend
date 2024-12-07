import { Clients, Clients_Location } from '@prisma/client';

export class ClientsData {
    public static readonly MAX_LENGTH = 500;
    public readonly client_id: number;
    public readonly company_name: string;
    public readonly person_in_charge_name: string;
    public readonly company_email: string;
    public readonly contact_number: string;
    public readonly additional_contact_number: string;
    public readonly industry: string;
    public readonly category: string;

    public constructor(entity: Clients) {
        this.client_id = entity.client_id;
        this.company_name = entity.company_name;
        this.person_in_charge_name = entity.person_in_charge_name;
        this.company_email = entity.company_email;
        this.contact_number = entity.contact_number;
        this.additional_contact_number = entity.additional_contact_number;
        this.industry = entity.industry;
        this.category = entity.category;
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
