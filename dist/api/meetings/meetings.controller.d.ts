import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { MeetingsService } from './meetings.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';
export declare class MeetingsController {
    private readonly meetingsService;
    constructor(meetingsService: MeetingsService);
    findAll(req: any): Promise<import("./meetings.service").ResponseData>;
    findOne(id: number, req: any): Promise<import("./meetings.service").ResponseData>;
    create(meeting: CreateMeetingDto, req: any): Promise<import("./meetings.service").ResponseData>;
    update(payload: UpdateMeetingDto, req: any): Promise<import("./meetings.service").ResponseData>;
    deleteById(payload: any, req: any): Promise<import("./meetings.service").ResponseData>;
}
