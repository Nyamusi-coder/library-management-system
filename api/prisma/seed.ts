import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 1. Create 4 Genres
  const fiction = await prisma.genre.upsert({
    where: { name: 'Fiction' },
    update: {},
    create: { name: 'Fiction', description: 'Literary works of imagination' },
  });

  const scifi = await prisma.genre.upsert({
    where: { name: 'Science Fiction' },
    update: {},
    create: { name: 'Science Fiction', description: 'Speculative fiction based on science' },
  });

  const history = await prisma.genre.upsert({
    where: { name: 'History' },
    update: {},
    create: { name: 'History', description: 'Non-fiction accounts of past events' },
  });

  const technology = await prisma.genre.upsert({
    where: { name: 'Technology' },
    update: {},
    create: { name: 'Technology', description: 'Books about tech and programming' },
  });

  // 2. Create 15+ Books distributed across genres
  await prisma.book.createMany({
    data: [
      // Fiction (4 books)
      { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '978-0743273565', totalCopies: 5, genreId: fiction.id },
      { title: '1984', author: 'George Orwell', isbn: '978-0451524935', totalCopies: 3, genreId: fiction.id },
      { title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '978-0060935467', totalCopies: 4, genreId: fiction.id },
      { title: 'Pride and Prejudice', author: 'Jane Austen', isbn: '978-0141439518', totalCopies: 2, genreId: fiction.id },
      
      // Science Fiction (4 books)
      { title: 'Dune', author: 'Frank Herbert', isbn: '978-0441172719', totalCopies: 3, genreId: scifi.id },
      { title: 'Foundation', author: 'Isaac Asimov', isbn: '978-0553293357', totalCopies: 2, genreId: scifi.id },
      { title: 'Neuromancer', author: 'William Gibson', isbn: '978-0441569595', totalCopies: 3, genreId: scifi.id },
      { title: 'The Martian', author: 'Andy Weir', isbn: '978-0553418026', totalCopies: 4, genreId: scifi.id },

      // History (4 books)
      { title: 'Sapiens', author: 'Yuval Noah Harari', isbn: '978-0062316097', totalCopies: 5, genreId: history.id },
      { title: 'The Diary of a Young Girl', author: 'Anne Frank', isbn: '978-0553296983', totalCopies: 3, genreId: history.id },
      { title: 'Guns, Germs, and Steel', author: 'Jared Diamond', isbn: '978-0393317558', totalCopies: 2, genreId: history.id },
      { title: 'A People\'s History of the United States', author: 'Howard Zinn', isbn: '978-0062397348', totalCopies: 3, genreId: history.id },

      // Technology (4 books)
      { title: 'Clean Code', author: 'Robert C. Martin', isbn: '978-0132350884', totalCopies: 4, genreId: technology.id },
      { title: 'The Pragmatic Programmer', author: 'Andrew Hunt', isbn: '978-0135957059', totalCopies: 3, genreId: technology.id },
      { title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann', isbn: '978-1449373320', totalCopies: 2, genreId: technology.id },
      { title: 'Eloquent JavaScript', author: 'Marijn Haverbeke', isbn: '978-1593279509', totalCopies: 3, genreId: technology.id },
    ],
  });

  console.log('✅ Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });