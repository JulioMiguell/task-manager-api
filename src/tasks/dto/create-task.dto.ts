import {IsNotEmpty, IsOptional} from 'class-validator'
import { UploadedFile } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;  

    @IsOptional()
    // @ApiProperty({ type: 'string', format: 'binary' })
    attachmentTask : any;
}