import { AttendancesService } from './attendances.service';
export declare class AttendancesController {
    private readonly attendancesService;
    constructor(attendancesService: AttendancesService);
    findAll(req: any): Promise<import("./attendances.service").ResponseData>;
    create(req: any): Promise<import("./attendances.service").ResponseData>;
}
