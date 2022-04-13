export declare class CreateLeaveDto {
    name: string;
    description: string;
    from: Date;
    leaveTypeId: number;
    readonly currentBalance: number;
    readonly remainBalance: number;
    to: Date;
    employeeId: number;
}
