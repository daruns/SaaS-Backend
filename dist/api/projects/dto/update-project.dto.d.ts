export declare class UpdateProjectDto {
    id: number;
    name: string;
    plannedStartDate: Date;
    plannedEndDate: Date;
    actualStartDate: Date;
    actualdEndDate: Date;
    rate: number;
    rateType: string;
    priority: string;
    description: string;
    status: string;
    deleted: number;
    clientId: number;
    members: number[];
    leaders: number[];
}
