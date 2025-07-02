### ORPC H3 tanstack start example with turborepo

- After you run:  bun i , H3 is not installed correctly for some reason. I Think its a turborepo issue
- create a .env file with the values from both .env-example file in server and app folder
- Run: cd apps/server , then bun i h3@beta
- In apps/server run: bun db:push to create a local db
- in root, run bun dev



On the index page you shuold see connected, this is the healthcvheck orpc endpoint. Also when you go to /private after you pressed create auth user , you should see the success status of a protected route

- Issue: When trying to press create auth user, you get a CORS issue but the user is created correctly, you can see the logged session

Something I didn't configure yet right for protected routes I believe

H3 is in the /apps/server/index.ts file
