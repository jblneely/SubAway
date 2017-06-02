# SubAway App

Taskminder uses graphs to compare your daily achievement against a baseline goal.  The Taskboard displays tasks available to all users.  When a user marks a task as completed that task is removed from the taskboard and linked to the user.  Then the user's graph increments to reflect the user's completion of the task.

Built by Bowman Neely and Steven Keiser.  Our approach was to build the backend first, then populate the database sparsely, connect the graphs to the backend data, and then style the site.  The reflecting pond on the front end is supposed to induce relaxation, the water on the subsequent pages indicates the fluid nature of life and tasks.

![pasted image at 2017_05_22 11_51 am](https://cloud.githubusercontent.com/assets/26267926/26595439/420f824c-4520-11e7-912b-03afc7b287c7.png)



The value Taskminder provides is a fleixble visual interface available to many users to complete a series of tasks.
We intentionaly made the front end simple, and included a loop video to visually reference the fluid nature of tasks.

Taskminder is a full-stack application by using MONGO backend and ANGULAR, EXPRESS, and NODE JS on the front-end

Taskminder has multiple relationships and CRUD functionality for two models, "USERS" and "TASKS". 

USER STORIES:  
1. A family to track chores for children (and parents) over time to allocate allowance related to the number of tasks completed.
2. A team working to complete a series of tasks on a project.

Taskminder is hosted on HEROKU.
![screen shot 2017-05-30 at 10 03 35 am](https://cloud.githubusercontent.com/assets/26267926/26595191/6a0c32b4-451f-11e7-8c34-c32ab267c441.png)


You will need to install an .ENV file with JWT_SECRET.
