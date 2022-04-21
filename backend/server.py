import csv
from unittest import result
from urllib import response
from flask import Flask, request
from flask_restful import Resource, Api, reqparse
import pandas as pd
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
api = CORS(app)

data = []
with open('massive_data.tsv') as file_obj:
            heading = next(file_obj)
            reader_obj = csv.reader(file_obj, delimiter='\t')
            for row in reader_obj:
                data.append({'variant': row[0], 'gene': row[1], 'classification': row[2], 'frequency': row[3]})

def condition(variant, gene, classification):
    if variant is not None:
        filter1 = [x for x in data if variant in x['variant']]
    else:
        filter1 = data
    if gene is not None:
        filter2 = [x for x in filter1 if gene in x['gene']]
    else:
        filter2 = filter1
    if classification is not None:
        result = [x for x in filter2 if classification == x['classification']]
    else:
        result = filter2
    return result


class Massive_Data(Resource):
    @app.route("/")
    def get():
        variant = request.args.get('variant')
        gene = request.args.get('gene')
        classification = request.args.get('classification')
        limit = request.args.get('limit')
        offset = request.args.get('offSet')
        result = condition(variant, gene, classification)
        result = result[((int(offset) - 1) * int(limit)): (int(offset) * int(limit))]
        return {'data': result}, 200,

    

if __name__ == '__main__':
    app.run(host='localhost', port=5001)  
