import { TaksStatus } from "../tasks.model";
import { IsOptional, IsIn, IsNotEmpty } from "class-validator";

export class GetTaskFilterDto {
    @IsOptional()
    @IsIn([TaksStatus.OPEN, TaksStatus.IN_PROGRESS, TaksStatus.DONE])
    status: TaksStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string;   
}