import { IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AttachTaskDto {
    @IsOptional()
    @ApiProperty({ type: 'string', format: 'binary' })
    attachmentTask : any;
}