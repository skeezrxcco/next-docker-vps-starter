import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const saltRounds = 10
  const hashedPassword = await bcrypt.hash('password123', saltRounds)

  const users = [
    {
      email: 'john@example.com',
      name: 'John Doe',
      password: hashedPassword,
    },
    {
      email: 'jane@example.com',
      name: 'Jane Smith',
      password: hashedPassword,
    },
  ]

  for (const user of users) {
    await prisma.user.create({
      data: user,
    })
  }

  console.log('Seed data created successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
