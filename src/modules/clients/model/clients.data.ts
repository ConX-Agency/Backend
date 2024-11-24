import { Clients } from '@prisma/client';

export class ClientsData {
    public static readonly MAX_LENGTH = 500;
    public readonly client_id: number;
    public readonly company_name: string;
    public readonly person_in_charge_name: string;
    public readonly company_email: string | null;
    public readonly pic_email: string;
    public readonly contact_number: string;
    public readonly additional_contact_number: string | null;
    public readonly industry: string | null;
    public readonly category: string | null;
    public readonly package: string;
    public readonly country: string;
    public readonly city: string | null;
    public readonly state: string;
    public readonly postcode: string | null;
    public readonly address: string;
    public readonly is_halal: boolean;

    public constructor(entity: Clients) {
        this.client_id = entity.client_id;
        this.company_name = entity.company_name;
        this.person_in_charge_name = entity.person_in_charge_name;
        this.company_email = entity.company_email ?? null;
        this.pic_email = entity.pic_email;
        this.contact_number = entity.contact_number;
        this.additional_contact_number = entity.additional_contact_number ?? null;
        this.industry = entity.industry ?? null;
        this.category = entity.category ?? null;
        this.package = entity.package;
        this.country = entity.country;
        this.city = entity.city ?? null;
        this.state = entity.state;
        this.postcode = entity.postcode ?? null;
        this.address = entity.address;
        this.is_halal = entity.is_halal;
    }
}
