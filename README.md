[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

<!-- ABOUT THE PROJECT -->

## About The Project

[![Airbnb][product-screenshot]](https://demo-airbnb-clone.vercel.app/)

This website is inspired by [Airbnb](https://www.airbnb.com.vn/) and has been created solely for educational purposes. I hope you find something valuable to study in my project ❤️. If you have any questions or need assistance, please feel free to ask. Good luck with your learning journey!

### Built With

[![Next][Next.js]][Next-url]
[![Tailwindcss][Tailwindcss]][Tailwindcss-url]
[![Typescript][Typescript.js]][Typescript-url]
[![MongoDB][MongoDB]][MongoDB-url]
[![Docker][Docker]][Docker-url]
[![Vercel][Vercel]][Vercel-url]
[![Prisma][Prisma]][Prisma-url]

<!-- GETTING STARTED -->

## Getting Started

Running follow these simple example steps below

### Prerequisites

- yarn

```sh
  npm i yarn -g
```

### Installation

1. Clone the repo

```sh
  git clone https://github.com/ngoc2003/airbnb-clone.git
```

2. Create `.env` file in main path
3. Copy your env values like `.env.example` file
4. Install packages

```sh
  yarn install
```

5. Set up prisma

```sh
  npx prisma db push
```

6. Run project

```sh
  yarn dev
```

7. Open website in [http://localhost:3000/](http://localhost:3000/)

<!-- USAGE EXAMPLES -->

## Note

If you add a new schema to the database or modifiy any fields in database, you must run this code below before rerunning the project.

```sh
  npx prisma db push
```

<!-- ROADMAP -->

## Roadmap

- [ ] Multi-language Support
  - [ ] English
  - [ ] Vietnamese
  - [ ] Japanese
- [x] Rich text editor
- [x] Infinity scroll page

<!-- FEATURES-->

## Features

- Tailwind design, animations and effects
- Responsive for all devices
- Credential authentication
- Google authentication
- Github authentication
- Image upload using Cloudinary CDN
- Client form validation and handling using react-hook-form
- Server error handling using react-toast
- Calendars with react-date-range
- Page loading state
- Page empty state
- Booking / Reservation system
- Guest reservation cancellation
- Owner reservation cancellation
- Creation and deletion of properties
- Pricing calculation
- Advanced search by category, date range, map location, number of guests, rooms and bathrooms
- Favorites system
- Shareable URL filters by categories
- Review system
- Rich text editor
- Infinity scroll data

<!-- Tools & Versions -->

#### Tools & Versions

| Tools | Versions |
| ----- | -------- |
| yarn  | 1.22.19  |

<!-- Tools & Versions -->

#### Packages

See full packages at [Package.json](/package.json)

<!-- CONTRIBUTING -->

## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request.
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

<!-- CONTACT -->

## Contact

Bui Ngoc - [Facebook](https://www.facebook.com/Bui.Ngoc.1302/)

[contributors-shield]: https://img.shields.io/github/contributors/ngoc2003/airbnb-clone.svg?style=for-the-badge
[contributors-url]: https://github.com/ngoc2003/airbnb-clone/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/ngoc2003/airbnb-clone.svg?style=for-the-badge
[forks-url]: https://github.com/ngoc2003/airbnb-clone/network/members
[stars-shield]: https://img.shields.io/github/stars/ngoc2003/airbnb-clone.svg?style=for-the-badge
[stars-url]: https://github.com/ngoc2003/airbnb-clone/stargazers
[issues-shield]: https://img.shields.io/github/issues/ngoc2003/airbnb-clone.svg?style=for-the-badge
[issues-url]: https://github.com/ngoc2003/airbnb-clone/issues
[product-screenshot]: public/images/demo.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[Typescript.js]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[Typescript-url]: https://www.typescriptlang.org/
[Tailwindcss]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwindcss-url]: https://tailwindcss.com/
[MongoDB]: https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://cloud.mongodb.com/
[Vercel]: https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white
[Vercel-url]: https://vercel.com/
[Prisma]: https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white
[Prisma-url]: https://www.prisma.io/
[Docker]: https://img.shields.io/badge/Docker-3982CE?style=for-the-badge&logo=Docker&logoColor=white
[Docker-url]: https://www.prisma.io/
