import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Injectable()
export class GenresService {
  constructor(private prisma: PrismaService) {}

  async create(createGenreDto: CreateGenreDto) {
    try {
      return await this.prisma.genre.create({ data: createGenreDto });
    } catch (error) {
      this.handleDuplicate(error);
      throw error;
    }
  }

  findAll() {
    return this.prisma.genre.findMany();
  }

  findOne(id: number) {
    return this.prisma.genre.findUnique({ where: { id } });
  }

  async update(id: number, updateGenreDto: UpdateGenreDto) {
    await this.prisma.genre.findUniqueOrThrow({ where: { id } });
    try {
      return await this.prisma.genre.update({ where: { id }, data: updateGenreDto });
    } catch (error) {
      this.handleDuplicate(error);
      throw error;
    }
  }

  async remove(id: number) {
    await this.prisma.genre.findUniqueOrThrow({ where: { id } });
    return this.prisma.genre.delete({ where: { id } });
  }

  private handleDuplicate(error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      throw new ConflictException('A genre with this name already exists');
    }
  }
}