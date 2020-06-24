This is the another project I developed for my React Nanodegree Course by Udacity ysing ReactJs and Redux.
### Steps to run this project
1. Clone the Repository.
2. Run npm install to install the packages written in package.json.
3. Run npm start to run the project in the browser.
4.Enter localhost:3000 in url in browser.

### Information and functionality of the project :
1. I made this project using React and Redux
2. I have used a dummy API interface provided by Udacity for this project.
3. It has a way of impersonating/logging in as an existing user.  Once the user logs in, the home page is shown.
4. We always want to make sure we know who the logged in user is, so information about the logged in user appears on the page. If someone tries to navigate anywhere by entering the address in the address bar, the user is asked to sign in and then the requested page is shown. The application allows the user to log out and log back in.
5. Once the user logs in, the user is able to toggle between his/her answered and unanswered polls on the home page, which is located at the root. The polls in both categories are arranged from the most recently created (top) to the least recently created (bottom). The unanswered questions is shown by default.
6. Each polling question links to the details of that poll. The details of each poll available at questions/:question_id.
7. When a poll is clicked on the home page, the following is shown:
* Text “Would You Rather”;
* Two options.
8. For answered polls, each of the two options contains the following:
* Text of the option;
* Number of people who voted for that option; and
* Percentage of people who voted for that option.
* The option selected by the logged-in user clearly marked.
9. It shows a 404 page if the user is trying to access a poll that does not exist. 
10. Upon voting in a poll, all of the information of an answered poll is displayed. The user’s response is recorded and clearly visible on the poll details page.When the user comes back to the home page, the polling question appears in the “Answered” column.
11. The form for posting new polling questions available at the /add route. It show the text “Would You Rather” and have a form for creating two options. Upon submitting the form, a new poll id created, the user is  taken to the home page, and the new polling question appears in the correct category on the home page.
12. The application  have a leaderboard that’s available at the /leaderboard route. Each entry on the leaderboard should contain the following:
* User’s name;
* User’s picture;
* Number of questions the user asked; and
* Number of questions the user answered
* Users ordered in descending order based on the sum of the number of questions they’ve asked and the number of questions they’ve answered. The more questions you ask and answer, the higher up you move.


