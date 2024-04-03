# BCS_Darts
#### Create an app for a dart league with scalability for additional leagues, teams and people.
# Technologies
#### React
#### Mongoose
#### MongoDB
#### AtlasDB
# Planning
### BackEnd
##### mkdir controllers, models and seed
##### touch Leagues.js, Teams.js, Players.js, Users.js, Scoresheet.js and Sublist.js in all folders.
##### Reference current paper scoresheets and BCS.com website to build and create models. Scoresheet model will have a GameSchema in it above the scoresheet in the model to account for the different games played in a given night.
##### Seed the current leagues that exsist. Seed a test team, test players, test user, test sublist and test scoresheet.
##### In controllers create full CRUD for each model so on the front end we can do full CRUD as well since teams, players, users, and sublist will change often especially for scoresheets since those will change weekly. 
### FrontEnd
##### Have the option for an AuthUser for admins and none admins.
##### Create the logic to run full CRUD for all of my models.
##### Create forms for the scoresheets. Stick with 1 league for now to make sure all logic works before moving on to other leagues. 
##### Will need to take what is created from the forms in the scoresheet page and do math for statistics and retain that information until the next week where it will be updated but include the weeks prior to it.
## ScoreSheets
##### Drop downs for available teams for that season
##### Drop downs for team members that are a part of that team 
## ERD
![Alt text](ERD-with-mongoDB.png?raw=true "MongoDB"),
![Alt text](ERD-with-react.png?raw=true "React")
## Figma
![Alt text](Figma-homepage.png?raw=true "Home Page"),
![Alt text](Figma-scoresheet.png?raw=true "Scoresheet")