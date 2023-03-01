import { Prisma } from '@prisma/client'
import { prisma } from '../src/utils/prisma'

async function main() {
  const dishes: Prisma.DishCreateInput[] = [
    {
      category: 'Пицца',
      icon: 'arriva-pizza.png',
      name: 'Аррива',
      price: 560.0,
      version: '1',
    },
    {
      category: 'Пицца',
      icon: 'four-seasons-pizza.png',
      name: 'Четыре сезона',
      price: 620.0,
      version: '1',
    },
    {
      category: 'Закуски',
      icon: 'wings-pizza.png',
      name: 'Крылышки',
      price: 250.0,
      version: '1.1',
    },
    {
      category: 'Закуски',
      icon: 'fries-pizza.png',
      name: 'Картошка фри',
      price: 150.0,
      version: '1.2',
    },
  ]

  const users: Prisma.UserCreateInput[] = [
    {
      email: 'danblok@gmail.com',
      fullname: 'Tokmakov Daniil Sergeevich',
      password: 'danblok124',
      phone: '+7 (988)-777-66-55',
    },
    {
      email: 'dotty@yahoo.com',
      fullname: 'Dotty Dan Blok',
      password: 'dotty124',
      phone: '+7 (955)-666-77-88',
    },
  ]

  await Promise.all([
    ...dishes.map(async (dish) => {
      await prisma.dish.create({
        data: dish,
      })
    }),
    ...users.map(async (user) => {
      await prisma.user.create({
        data: user,
      })
    }),
  ])
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
