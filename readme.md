# Budget Better

- Budgeting is important and super useful, but also repetitive and painful to do manually
- Budget Better takes the pain out of keeping track of your day-to-day spending, and gives you an overview of your savings, so you can see everything in one place!

[Video walkthrough](https://youtu.be/rXsxRk8N7XY)

Rails API Github [here](https://github.com/samgorick/better-budgeting-backend)

## Features

- Simple data visualizations track how much user has spent this month, how much they have remaining, and where their money has gone
- 1-click 'add budget' - automatically generated based on a user's income, and then fully customizable
- 2-step new user setup process to create a quality new user experience
- Savings tracks longer-term savings with value updated over time, and a full portfolio view

## Technologies

- Built with React Native front-end, for deployment on both iOS and Android. It was important for me to ensure the app was built on a mobile platform so users can check spending on the move
- AsyncStorage manages user credentials once logged in between sessions, and Bcrypt manages user authentication
- Lightweight Ruby on Rails API back-end with a SQL Postgres database

## Next steps

- Carrying over spending (over-spend, under-spend) from month to month
- Anonymized comparisons of spending by category
- Real-time stocks and shares data

## Screenshots

Budget Better homepage:

<img src="https://user-images.githubusercontent.com/33881692/89080794-7ceceb00-d34f-11ea-8f63-5bc24449d44e.png" alt="better-budget-homepage" width="240" height="500">

<img src="https://user-images.githubusercontent.com/33881692/89080813-88401680-d34f-11ea-95f6-48e57df7b45e.png" alt="better-budget-homepage" width="240" height="500">

Transactions:

<img src="https://user-images.githubusercontent.com/33881692/89080818-8b3b0700-d34f-11ea-8249-87789d485344.png" alt="transactions" width="240" height="500">

Savings:

<img src="https://user-images.githubusercontent.com/33881692/89080826-8fffbb00-d34f-11ea-9fe9-843ab87a7ba6.png" alt="savings" width="240" height="500">

New User Set-Up:

<img src="https://user-images.githubusercontent.com/33881692/89080831-93934200-d34f-11ea-91d4-fc6ff3273616.png" alt="new-user-setup" width="240" height="500">
