export declare class CreateTaskDto {
    name: string;
    description: string;
    priority: string;
    plannedStartDate: Date;
    plannedEndDate: Date;
    status: string;
    boardId: number;
    projectId: number;
    members: number[];
}
