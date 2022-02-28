import { AttendancesService } from './attendances.service';
import { CreateDto } from './dto/create.dto';
export declare class AttendancesController {
    private readonly attendancesService;
    constructor(attendancesService: AttendancesService);
    findAll(req: any): Promise<any>;
    create(attendance: CreateDto, req: any): Promise<any>;
}
