import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  create(createBookDto: CreateBookDto) {
  const { genreId, ...bookData } = createBookDto;
  return this.prisma.book.create({
    data: {
      ...bookData,
      genre: { connect: { id: genreId } },
    },
  });
}

  async findAll(genreId?: number, search?: string, page: string = '1', limit: string = '10') {
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    const where: any = {};
    if (genreId) where.genreId = Number(genreId);
    if (search) {
  where.OR = [
    { title: { contains: search, mode: 'insensitive' } },
    { author: { contains: search, mode: 'insensitive' } },
  ];
}

    const [data, total] = await Promise.all([
      this.prisma.book.findMany({
        where,
        skip,
        take: limitNum,
        include: { genre: true },
      }),
      this.prisma.book.count({ where }),
    ]);

    return {
      data,
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
    };
  }

  findOne(id: number) {
    return this.prisma.book.findUnique({
      where: { id },
      include: { genre: true },
    });
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    await this.prisma.book.findUniqueOrThrow({ where: { id } });
    const data: any = { ...updateBookDto };
    if (updateBookDto.genreId) {
      data.genre = { connect: { id: updateBookDto.genreId } };
      delete data.genreId;
    }
    return this.prisma.book.update({ where: { id }, data, include: { genre: true } });
  }

  async remove(id: number) {
    await this.prisma.book.findUniqueOrThrow({ where: { id } });
    return this.prisma.book.delete({ where: { id } });
  }
}