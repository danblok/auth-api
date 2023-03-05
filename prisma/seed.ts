import { Prisma } from '@prisma/client'
import { prisma } from '../src/utils/prisma'

async function main() {
  const dishes: Prisma.DishCreateInput[] = [
    {
      category: 'Foods',
      icon: 'https://static.takeaway.com/images/restaurants/bg/0PN53R11/products/ariva-pizza.png?timestamp=1676099849',
      name: 'Аррива',
      price: 560.0,
      version: '1',
    },
    {
      category: 'Foods',
      icon: 'https://img.freepik.com/premium-photo/fresh-italian-four-seasons-pizza-pizza-quattro-stagioni-wooden-kitchen-table_79762-3549.jpg?w=2000',
      name: 'Четыре сезона',
      price: 620.0,
      version: '1',
    },
    {
      category: 'Foods',
      icon: 'https://kitchenatics.com/wp-content/uploads/2020/09/Cheese-pizza-1.jpg',
      name: 'Четыре сыра',
      price: 490.0,
      version: '1.2',
    },
    {
      category: 'Foods',
      icon: 'https://www.tasteatlas.com/images/dishes/b05a0af72ad845f3a6abe16143d7853a.jpg',
      name: 'Пепперони',
      price: 500.0,
      version: '1.1',
    },
    {
      category: 'Snacks',
      icon: 'https://edenthestore.in/uploads/products/11012.jpg',
      name: 'Крылышки',
      price: 250.0,
      version: '1.1',
    },
    {
      category: 'Snacks',
      icon: 'https://images.saymedia-content.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:eco%2Cw_1200/MTc0NDI3NjY4OTcwNzQzMTQ0/healthy-snacks-home-made-french-fries-recipe.jpg',
      name: 'Картошка фри',
      price: 150.0,
      version: '1.2',
    },
    {
      category: 'Drinks',
      icon: 'https://d34nm4jmyicdxh.cloudfront.net/eyJidWNrZXQiOiJjaHJpc3N5LXR1eGVkby1ubzIiLCJrZXkiOiJyZWNpcGUtbWlsay1wdW5jaC1jb2NrdGFpbC1yZWNpcGUuanBnIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo2MDAsImhlaWdodCI6NjAwLCJmaXQiOiJjb3ZlciJ9fX0=',
      name: 'Коктель молочный',
      price: 180.0,
      version: '1.2',
    },
    {
      category: 'Drinks',
      icon: 'https://www.caffesociety.co.uk/assets/recipe-images/latte-small.jpg',
      name: 'Латте',
      price: 130.0,
      version: '1',
    },
    {
      category: 'Drinks',
      icon: 'https://www.thespruceeats.com/thmb/oUxhx54zsjVWfPlrgedJU0MZ-y0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/how-to-make-cappuccinos-766116-hero-01-a754d567739b4ee0b209305138ecb996.jpg',
      name: 'Капучино',
      price: 130.0,
      version: '1',
    },
    {
      category: 'Drinks',
      icon: 'https://gheespot.com/wp-content/uploads/2019/09/Mango-Shake.jpeg',
      name: 'Манго-шейк',
      price: 180.0,
      version: '1',
    },
    {
      category: 'Sauce',
      icon: 'https://bonpourtoi.ca/app/uploads/2021/11/sauce-bbq-barbecue-maison-1178px.jpg',
      name: 'Соус барбекю',
      price: 180.0,
      version: '1',
    },
    {
      category: 'Sauce',
      icon: 'https://assets.epicurious.com/photos/57c5bf23082060f11022b575/master/w_1000,h_667,c_limit/cheese-sauce.jpg',
      name: 'Соус сырный',
      price: 180.0,
      version: '1',
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
