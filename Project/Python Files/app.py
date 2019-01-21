from flask import Flask, jsonify, render_template, Response, json
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker 

#https://stackoverflow.com/questions/11622020/d3-json-request-getting-xmlhttprequest-error-origin-null-is-not-allowed-by-acce
#https://stackoverflow.com/questions/13081532/return-json-response-from-flask-view


engine = create_engine("mysql+pymysql://root:19931201Zestor@localhost/streamgraph?host=localhost?port=3306", echo=True)
Base = declarative_base(engine)


class NonOrmTable(Base):
    """
    eg. fields: id, title
    """
    __tablename__ = 'mergeddata'
    __table_args__ = {'autoload': True}

class Income(Base):
    """
    eg. fields: id, title
    """
    __tablename__ = 'kaggle_income'
    __table_args__ = {'autoload': True}

def loadSession():
    """"""
    metadata = Base.metadata
    Session = sessionmaker(bind=engine)
    session = Session()
    return session


def getData():
    session = loadSession()
    #res = session.query(NonOrmTable).all()
    res = (session.query(NonOrmTable)
    .filter(NonOrmTable.Country == ' United States')
    .all())

    li = []

    for x in range(57):
            dic = {
                "city": res[x].City,
                # "county":res[x].County, 
                "state":res[x].State,
                "cost_index": float(res[x].CostofLivingIndex),
                "rent_index": float(res[x].RentIndex), 
                "cost_rent": float(res[x].CostofLivingPlusRentIndex),
                "groceries_index": float(res[x].GroceriesIndex),
                "restaurant_index": float(res[x].RestaurantPriceIndex),
                "purchasing_power": float(res[x].LocalPurchasingPowerIndex),
                "mean":float(res[x].Mean), 
                "median":float(res[x].Median), 
                "stdev":float(res[x].Stdev)
                # "Lat": float(res[x].Lat), 
                # "Lng": float(res[x].Lng),
            }
            li.append(dic)        
    return (li)

def getIncome():
    sess = loadSession()
    kal = (sess.query(Income)
    .filter(Income.Country == 'United States')
    .all())

    li2 = []
    
    for x in range(18600):
            dic = {
                "city": kal[x].City,
                "county":kal[x].County, 
                "state":kal[x].State,
                "cost_index": float(kal[x].CostofLivingIndex),
                "rent_index": float(kal[x].RentIndex), 
                "groceries_index": float(kal[x].GroceriesIndex),
                "purchasing_power": float(kal[x].LocalPurchasingPowerIndex),
                "mean":float(kal[x].Mean), 
                "median":float(kal[x].Median), 
                "stdev":float(kal[x].Stdev), 
                "Lat": float(kal[x].Lat), 
                "Lng": float(kal[x].Lng),
            }
            li2.append(dic)        
    return (li2)
    


#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################


# @app.route('/summary')
# def summary():
#     data = living_cost
#     response = app.response_class(
#         response=json.dumps(data),
#         status=200,
#         mimetype='application/json'
#     )
#     return response

@app.route('/census')
def census_ep():
    data = getData()
    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response

@app.route('/canvas')
def canvas():
    data = getData()
    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response

@app.route('/income')
def census_income():
    data = getIncome()
    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response

@app.route("/")
def welcome():
    return (
        f"Welcome to the SteamGraph API!<br/>"
    )

@app.route('/web')
def webprint():
    return render_template('index.html') 

@app.route('/canvasgraph')
def canvasprint():
    return render_template('canvas.html')

@app.route('/map')
def geomap():
    return render_template('map.html') 

@app.route('/main')
def boot():
    return render_template('bootstrapp.html') 

@app.route('/boot')
def strap():
    return render_template('bootstrapp.html') 

if __name__ == "__main__":
    app.run(debug=True)