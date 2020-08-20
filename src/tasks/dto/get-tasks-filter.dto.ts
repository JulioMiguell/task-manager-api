import { TaksStatus } from "../tasks.model";

export class GetTaskFilterDto {
    status: TaksStatus;
    search: string;   
}