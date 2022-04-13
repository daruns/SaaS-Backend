export declare class UpdateTaskDto {
    id: number;
    name: string;
    description: string;
    priority: string;
    actualStartDate: Date;
    actualdEndDate: Date;
    plannedStartDate: Date;
    plannedEndDate: Date;
    boardId: number;
    status: string;
    deleted: number;
    members: number[];
}
export declare class ChangeBoardDto {
    id: number;
    boardId: number;
}
