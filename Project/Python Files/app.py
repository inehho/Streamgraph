from flask import Flask, jsonify, render_template, Response, json
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


#https://stackoverflow.com/questions/11622020/d3-json-request-getting-xmlhttprequest-error-origin-null-is-not-allowed-by-acce
#https://stackoverflow.com/questions/13081532/return-json-response-from-flask-view

# engine = create_engine('mysql+pymysql://localhost:3306/streamgraph?user=root', echo=True)
engine = create_engine("mysql+pymysql://root:passwordhere@localhost/streamgraph?host=localhost?port=3306", echo=True)
Base = declarative_base(engine)


class NonOrmTable(Base):
    """
    eg. fields: id, title
    """
    __tablename__ = 'mergeddata'
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
      
    for x in range(25):
        dic = {"city": res[x].City, "state":res[x].State, "cost_of_living": str(res[x].CostofLivingIndex),
              "rent_index": str(res[x].RentIndex), "groceries_index": str(res[x].GroceriesIndex),
              "purchasing_power": str(res[x].LocalPurchasingPowerIndex),"mean": str(res[x].Mean), "median":str(res[x].Median), "standard_deviation":str(res[x].Stdev)}
        li.append(dic)        
        
    return (li)




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


@app.route("/")
def welcome():
    return (
        f"Welcome to the SteamGraph API!<br/>"
    )

@app.route('/web')
def webprint():
    return render_template('index.html') 



if __name__ == "__main__":
    app.run(debug=True)
