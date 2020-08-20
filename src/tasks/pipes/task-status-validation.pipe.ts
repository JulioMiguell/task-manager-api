import { PipeTransform, BadRequestException} from "@nestjs/common";
import { TaksStatus } from "../tasks.model";

export class TaskStatusValidatorPipe implements PipeTransform {
    readonly allowedStatuses = [
        TaksStatus.OPEN,
        TaksStatus.IN_PROGRESS,
        TaksStatus.DONE,
    ]

    transform(value: any) {
        value = value.toUpperCase();

        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`${value} is an invalid status`);
        }

        return value;
    }

    private isStatusValid(status: any) {
        const idx = this.allowedStatuses.indexOf(status);

        return idx !== -1;
    }
}