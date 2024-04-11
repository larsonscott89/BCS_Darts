# BCS_Darts
#### Create an app for a dart league with scalability for additional leagues, teams and people.
# Technologies used and installs
#### React
#### Mongoose
#### MongoDB
#### AtlasDB
#### dcrypt
#### JWT tokens
#### Session
#### REACT Icons
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
##### Team signup form should be able to create a team using the form and then update the database that will update on the frontend.
##### Create forms for the scoresheets. Stick with 1 league for now to make sure all logic works before moving on to other leagues. 
##### Will need to take what is created from the forms in the scoresheet page and do math for statistics and retain that information until the next week where it will be updated but include the weeks prior to it.
##### Create an upload button so teams can upload a photo of their physical scoresheet for retention.
##### Use JWT to create tokens for users specifically on the admin side. This will allow an admin to make changes on the front end but users that are not admins will only be able to read.
##### Create a break point for mobile views.
## ScoreSheets
##### Drop downs for available teams for that season in the Scoresheet
##### Drop downs for team members that are a part of that team in the Scoresheet
##### Clean form format
## ERD
![Alt text](ERD-with-mongoDB.png?raw=true "MongoDB"),
![Alt text](ERD-with-react.png?raw=true "React")
## Figma
![Alt text](Figma-homepage.png?raw=true "Home Page"),
![Alt text](Figma-scoresheet.png?raw=true "Scoresheet")

## Stretch Goals and continued development
##### Finish out all leagues with different statistics for each league. 
##### Try to implament the machine learning to read and automatically fill out the form from a picture.
##### Create a calendar that can be edited by an admin user.
##### Allow when someone submits a Scoresheet that the information sticks with the team members ID to be used for stats later.

### Cites
##### ChatGPT helped with Auth. Helped me with where 'localStorage.setItem('token', data.token)' and 'Authorization: `Bearer ${authToken}`' needed to go as well as some error messaging. 
##### Used portions of our Project 3 code. The initial functions for logging in and signing up I used from that.