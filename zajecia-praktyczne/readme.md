pipeline gitlab/github
CI/CD
Jenkins
Docker


https://devcenter.heroku.com/articles/heroku-cli

heroku login
heroku logs
heroku logs --tail


to deploy

If you haven't already, log in to your Heroku account and follow the prompts to create a new SSH public key.

$ heroku login
Create a new Git repository
Initialize a git repository in a new or existing directory

$ cd my-project/
$ git init
$ heroku git:remote -a node-course-3-fe
Deploy your application
Commit your code to the repository and deploy it to Heroku using Git.

$ git add .
$ git commit -am "make it better"
$ git push heroku master

heroku ps:exec

heroku -> app -> settings -> domain
https://devcenter.heroku.com/articles/custom-domains

https://node-course-3-fe.herokuapp.com/
https://node-course-3-be.herokuapp.com/

heroku
digital ocean
cloudways
mydevil.net

serverless
https://aws.amazon.com/lambda/


pm2
process manager 2

npm install pm2 -g

pm2 start npm --name "fe" -- start
pm2 start npm --name "be" -- start

pm2 stop 0
pm2 delete 0

pm2 list

pm2 logs 0

pm2 restart 0

pm2 save
# then
pm2 resurrect


ssh root@123.421.24.12

albo user+password
albo ssh key