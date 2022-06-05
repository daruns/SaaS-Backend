import { CanService } from './can.service';
import { CanActivateDto } from './dto/can-activate.dto';
export declare class CanController {
    private readonly canService;
    constructor(canService: CanService);
    canActivate(payload: CanActivateDto, req: any): Promise<boolean | string>;
}
