import { Optional } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity } from "@src/modules/common/utils/base-entity";
import { IsBoolean, IsBooleanString, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class TaskDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  userId?: string;

  @IsBoolean()
  @IsOptional()
  status?: boolean;
};


export class FilterTaskDto  {
  @IsOptional()
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @IsDate()
  endDate?: Date;

  @IsNumber()
  @IsOptional()
  limit?: number;

  @IsNumber()
  @IsOptional()
  page?: number;

  @IsString()
  @IsOptional()
  userId?: string;

  @IsBooleanString()
  @IsOptional()
  status?: boolean;
}

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  id?: string;

  @ApiProperty({ required: false, type: String })
  title?: string;

  @ApiProperty({ required: false, type: String })
  description?: string;
};

export class IdParamDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}


