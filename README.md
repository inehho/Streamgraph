# Streamgraph
This is a repository for Project 2. Team work with Evan Ouimet, Leon Tan and Erik Jakubowski  

# Running the Application  
Its hosted on a Flask server  
Navigate to the /Project/PythonFiles/ dir and run $python app.py  
Then view the index.html webpage at http://localhost:5000/web  

# Instructions to loading the datasets into MySQL
***WARNING***:
This method is only for those that have practiced using MySQL database. IF not, please refer to online installation guide and follow the guides listed below. 

**Explanation**:
We used MySQL as our main database to load the .csv files so that we could load it in JSON format. We then pull the information with JS codes, then plot GeoJSON and plotly graphs. If you want to try to loading the graphs onto your computer or localhost:5000, please follow the following instructions. 

1. After cloning/downloaded the repository, create a database and import "kaggle_income.csv" and "mergeddata.csv" as tables into the database you just created. The files can be found in (Streamgraph/Resources/Data/Original Data). 
![](Resources/Images/MySQL.PNG)
2. Keep clicking on NEXT until the table is fully imported.
3. Once the .csv files are imported, refresh the table and run the SQL below. 
![](Resources/Images/Import.PNG)
4. Next, we would "Alter" both tables and set the "Primary Key" to column "Rank". (Have to repeat twice since it is two different files)<br>
![](Resources/Images/AlterTable.PNG)
![](Resources/Images/PrimaryKey.PNG)
5. Click on APPLY until the pop-up windows closes. 
6. Open app.py using Visual Code (Streamgraph/Project/PythonFiles/app.py) and change your password. 
![](Resources/Images/Password.PNG)
7. Now you should be able to run "python app.py" in your console. Feel free to change the directory for different informations. 

## Paths (Example: localhost/map)
/main - Main page of our project, from here, you can alter which path you want to go to. 
<br>
/census - JSON format of city, median income, cost index, rent index, grocerries index, etc. 
<br>
/income - largest datasets of (/census) and also contains Latitude and Longtitude. 
<br>
/web - Plotly graph of purchasing power by City.
<br>
/canvasgraph - Chart graph of median income, purchasing power and cost index by City.
<br>
/map - GeoMap graph that contains data from (/income).





