export declare class CreateProjectDto {
    name: string;
    plannedStartDate: Date;
    plannedEndDate: Date;
    actualStartDate: Date;
    actualdEndDate: Date;
    rate: number;
    status: string;
    rateType: string;
    priority: string;
    description: string;
    clientId: number;
    leaders: number[];
    members: number[];
}
