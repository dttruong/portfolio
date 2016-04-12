# Description
This is a starter template with KoaJS, PostgreSQL, Materialize, Font-Awesome, and Gulp

# Getting Started

### App
1. Install Node.js and Node Package Manager (NPM)
2. Download and install PostgreSQL database locally (http://www.postgresql.org/download/)
3. In terminal, clone the repo using `` git clone [url] ``
4. Add a file to the root directory of teevo-starter-template named .env
5. Install all libraries listed inside of package.json. Run ``npm install``
7. Install the pg module globally by running ``npm install pg -g`` ??????????
7. Install the gulp module globally by running ``npm install -g gulp``
8. We need Knex (http://knexjs.org/) to help KOA talk to the database. Run ``npm install -g knex``
9. Run ``gulp``
10. Run ``npm start`` to start the application
11. If error messages occur, run ``node --harmony init.js`` to get more concise error messages

### Environment Variables
1. At the root of the project create a file named <b>.env</b>
2. This file stores your local environment variables.
3. Add to it the following:

> PORT=3000
>
> APP_SECRET_KEY=abc123xyz
>
> SSL_OFF=1

### Database Setup
1. Launch pgAdmin, a database GUI that comes installed with PostgreSQL
2. Let's add a new database. In pgAdmin, drill down to <b>Databases</b>, right-click on <b>Databases</b>, hit <b>New Database...</b>, name it <b>teevo_koa_starter_template</b>, and hit <b>OK</b>
3. Let's add a new database user. In pgAdmin, drill down to <b>Login Roles</b>, right-click on <b>Login Roles</b>, hit <b>New Login Role...</b>
  - Under <b>Properties -> Role name</b>, enter <b>root</b> as the value
  - Under <b>Definition -> Password</b>, enter <b>password</b> as the password
  - Hit <b>OK</b>
4. Drill down to <b>Login Roles</b> and right-click to edit properties of the user <b>root</b>. Click <b>Role Privileges</b> and make root a superuser then hit <b>OK</b>
5. At the root of the project, open the <b>.env</b> file, and paste (append) in the following:

> DB_NAME=teevo_koa_starter_template
<br>
> DB_USER=root
<br>
> DB_USER_PASSWORD=password
<br>
> DB_HOST=localhost

### Run Migrations
We can tell Knex to setup database tables for us by providing it with database migrations files located under the <b>migrations</b> folder. Knex does this by executing the <b>up</b> functions located inside the migrations files
  - Run ``knex migrate:latest`` to make Knex CLI create tables from the migrations file

We can also tell Knex to automatically remove tables for us, which is handy when we want to reset the schema (and data) when coding and testing. Knex does this by executing the <b>down</b> functions located inside the migrations files
  - Run ``knex migrate:rollback`` to make Knex CLI undo migrations
  
### Seed the Database
We can tell Knex to insert data into the database by using seed files under the <b>seeders</b> folder. Knex does this by executing the <b>up</b> functions located inside the seeder files
  - Run ``knex seed:run`` to make Knex CLI create tables from the migrations file
  
### Deploy the App to Heroku
1. Sign up for Heroku
2. Install Heroku: https://toolbelt.heroku.com/
3. Start a new command prompt, then type ``heroku`` and press enter. If a list of Heroku commands pop up, then you successfully installed Heroku
4. Log in to heroku using ``heroku login``
5. In the command prompt, navigate to the root of the project 
6. Type ``heroku git:remote -a teevokoastartertemplatedev`` to tell our locally installed Heroku client that we want to deploy to the <b>teevokoastartertemplatedev</b> instance on Heroku
7. In the Git web site for our project, perform a merge request to merge any changes into master. Master should be the target branch.
8. Back in command prompt, type ``git checkout master`` and ``git pull`` to pull the latest version of master to your computer
9. Run ``git push heroku master`` to push the master branch to mauvsadev
10. Visit http://teevokoastartertemplatedev.herokuapp.com to verify that changes have been deployed
11. All good? Now to get these changes to our production server (http://teevokoastartertemplate.herokuapp.com), go on the Heroku web site's dashboard and click on <b>Personal apps</b> then <b>teevokoastartertemplatepipeline</b>.
12. You will see a pipeline. This is how our app gets from our dev environment (http://teevokoastartertemplatedev.herokuapp.com) to our staging environment (http://teevokoastartertemplatestaging.herokuapp.com) and finally to production (http://teevokoastartertemplate.herokuapp.com).
13. Click <b>Promote to staging...</b> to push what is in dev to staging. Verify changes at http://teevokoastartertemplatestaging.herokuapp.com.
14. Click <b>Promote to production...</b> to push what is in staging to production. Verify changes at http://teevokoastartertemplate.herokuapp.com

# Design

### Cookies
All requests pass through a custom-built KOA middleware that sets a cookie if no cookie is detected from the request. This middleware does not validate the cookie's authenticity, and only ensures that all requests sent to the server have a cookie set.