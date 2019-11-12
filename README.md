
                         *****************************      DEPLOYEMENT PROCESS     ************************************
                         
                         
It is .net core version 2.2.7 application with latest version angular 8 project (Single page application).
There are 4 projects in this application. 
i) AngApi (Web API project) 
ii) AngApi.BLL (Business Logic Layer) 
iii) AngApi.DAL (Data Access Layer)
iv) Angular (Angular Frontend Project)

Deployment process:

1.) Database Setup: 
   _______________
   
   
   Open appsettings.json file from (AngApi project) and edit IdentityConnection parameter with your own (sql server name)
   then save it. (Cautious): In order to build the solution, right click on Angular (Frontend Project) -> unload project, then you can
   build the solution.
   
   ( Either follow step A or step B )
   
   Step A (Recommended): 
   
   Let's open SQL server Management Studio and log in.
   As the application furnished with Code First Approach, open package manager console in visual studio if you are already opened this
   project in Visual studio. In console just type 'update-database'. The database will automatically be created with your given name
   and all the necessary tables as well. Once the database with all the tables is ready, do one more thing - In AspnetRoles table
   add atleast 1 role named with Admin. 
   
   Step B:
   
   Let's open SQL server Management Studio, create database name it AngularApi. Inside our AngApi project ->
   -> DB SCRIPT BACKUP(Folder), you will be found (AngularApi) SQL Script file. Open this sql file with notepad and copy the
   content. Then go back to sql server management studio and right click on created
   AngularApi database and choose new query. Here you paste the content you copied and execute it.
   Once the database with all the tables is ready, do one more thing - In AspnetRoles table
   add atleast 1 role named with Admin. 


2.) Run application:
   ________________
   
   i) Run backend project: Among these 4 projects, AngApi is our startup project. Let's run the project from visual studio. 
  ii) Run frontend project: Among these 4 projects, Angular is our frontend prject. From visual studio, look at the devramp
      folder which is located inside this Angular project. Just right click on devramp folder and choose open folder in 
      file explorer. Then click on the address bar of this file explorer and write cmd then press enter. Here you just write
      ng serve --open and hit enter. 

			*********************************   DONE   *****************************************
 
