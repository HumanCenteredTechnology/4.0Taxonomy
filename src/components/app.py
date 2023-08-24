from functools import wraps
import time
from turtle import pd
from flask import Flask, send_from_directory, request, render_template, jsonify
from flask_cors import CORS
from autocomplete import Autocomplete
import tagme
import secrets
import jwt
import datetime
import csv
import sqlite3

tagme.GCUBE_TOKEN = "cbaed484-466a-44cd-a27d-610036404f01-843339462"

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
autocomplete = Autocomplete()
# Chiave segreta per firmare e verificare i token
SECRET_KEY = "TAXONOMY"
users = []

def generate_token(username):
    payload = {
        "username": username,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(days=1)
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
    return token

def verify_token(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.headers.get('Authorization')

        if not token:
            return jsonify({'message': 'Token mancante'}), 401

        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            # Esegui altre verifiche del payload se necessario
            # Ad esempio, verifica il ruolo dell'utente

            return f(*args, **kwargs)
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token scaduto'}), 401
        except jwt.DecodeError:
            return jsonify({'message': 'Token non valido'}), 401

    return decorated_function

@app.route('/', methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']

    if username in users and users[username]['password'] == password:
        token = generate_token(username)
        return jsonify({'message': 'Login effettuato con successo', 'token': token}), 200
    else:
        return jsonify({'message': 'Username o password non validi'}), 401

@app.route('/', methods=['POST'])
def logout():
    data = request.get_json()
    username = data['username']

    if username in users:
        # Invalida o cancella il token memorizzato nell'oggetto utente
        users[username]['token'] = None

        return jsonify({'message': 'Logout effettuato con successo'}), 200
    else:
        return jsonify({'message': 'Utente non trovato'}), 404


@app.route('/', methods=["GET"])
def template_search():
    return send_from_directory('templates', 'home.html')


@app.route("/", methods=["POST"])
def search_api():
   _input = request.form.get('search-input')
   _results = search(_input)
   return jsonify(_results)


@app.route("/article/<article_id>", methods=["GET"])
def get_article_by_id(article_id):
    con = sqlite3.connect('taxonomy.db')
    df = pd.read_sql_query(
        f"SELECT * FROM articles WHERE id={article_id}", con)
    if(df["authors"].iloc[0] is not None):
        df["authors"].iloc[0] = df["authors"].iloc[0].split(",")
    con.close()
    return jsonify(df.iloc[0].to_json())

@app.route("/not_json_add_article", methods = ["POST"])
def add_article_template():
   _title = request.form.get('title')
   _link = request.form.get('link')
   _sourceType = request.form.get('_source type')
   _journal = request.form.get('journal')
   _authors = request.form.get('authors')
   _doi = request.form.get('doi')
   _publicationDate = request.form.get('publicationDate')
   _abstract = request.form.get('abstract')
   _annotations = list(tagme.annotate(_title).get_annotations(0.1))+list(tagme.annotate(_link).get_annotations(0.1))+list(tagme.annotate(_sourceType).get_annotations(0.1))+list(tagme.annotate(
       _journal).get_annotations(0.1))+list(tagme.annotate(_authors).get_annotations(0.1))+list(tagme.annotate(
       _doi).get_annotations(0.1))+list(tagme.annotate(_publicationDate).get_annotations(0.1))+list(tagme.annotate(_abstract).get_annotations(0.1))
   left_side, right_side = search_annotations_on_taxonomy(_annotations)
   return render_template('add_article_results.html', results = {"founded_elements": left_side, "not_founded_elements": right_side})


@app.route("/form", methods = ["POST"])
def add_article_json():
   _title = request.form.get('title')
   _link = request.form.get('link')
   _sourceType = request.form.get('_source type')
   _journal = request.form.get('journal')
   _authors = request.form.get('authors')
   _doi = request.form.get('doi')
   _publicationDate = request.form.get('publicationDate')
   _abstract = request.form.get('abstract')
   _annotations = list(tagme.annotate(_title).get_annotations(0.1))+list(tagme.annotate(_link).get_annotations(0.1))+list(tagme.annotate(_sourceType).get_annotations(0.1))+list(tagme.annotate(
       _journal).get_annotations(0.1))+list(tagme.annotate(_authors).get_annotations(0.1))+list(tagme.annotate(
       _doi).get_annotations(0.1))+list(tagme.annotate(_publicationDate).get_annotations(0.1))+list(tagme.annotate(_abstract).get_annotations(0.1))
   left_side, right_side = search_annotations_on_taxonomy(_annotations)
   return jsonify({"founded_elements": left_side, "not_founded_elements": right_side})


@app.route("/add_article", methods=["GET"])
def add_article_form_template():
    return render_template('add_article.html')

def controlla_nuove_righe(topic, articles, i):
    con = sqlite3.connect('taxonomy.db')
    cursor = sqlite3.connect.cursor()
    ultimo_id = 0

    while True:
        # Ottenere l'ID massimo corrente nella tabella
        cursor.execute(f"SELECT MAX(id) FROM articles")
        result = cursor.fetchone()
        nuovo_id = result[0] if result[0] else 0

        if nuovo_id > ultimo_id:
            # Ci sono nuove righe nella tabella
            cursor.execute(f"SELECT * FROM articles WHERE id > ?", (ultimo_id,))
            nuove_righe = cursor.fetchall()
            # Elabora le nuove righe come desiderato
            for riga in nuove_righe:
            # Aggiorna l'ultimo ID
                ultimo_id = nuovo_id
        time.sleep(i)
    conn.close()
    return {"nuove_righe": nuove_righe}


@app.route("/not_json", methods=["POST"])
def search_api_template():
   _input = request.form.get('search-input')
   _results = search(_input)
   return render_template('results.html', results=_results)


def search(_input):
    _mentions = tagme_api(_input)
    if (len(_mentions) == 0):
        return {}
    else:
       _topics = search_into_taxonomy(_mentions)
       if (len(_topics) == 0):
           return {}
       else:
        _use_cases = find_use_cases(_topics)
        # _use_cases_unrelated = unrelated_use_cases(_use_cases, _topics[0][1])
        # _use_cases_unrelated = retrieve_link_use_cases(_use_cases_unrelated)
        _use_cases_related = retrieve_link_use_cases(_use_cases)
        _result_list = prepare_result_list(_use_cases_related)
        _filter_topics = prepare_filter_topics(_topics)
        _info_snippet = prepare_info_snippet(_topics[0][0])
        return {"filter_topics": _filter_topics, "result_list": _result_list, "_info_snippet": _info_snippet}

def get_children_topic(topic):
    con = sqlite3.connect('taxonomy.db')
    _childrens = pd.read_sql_query(
        f"SELECT name FROM relations WHERE parent LIKE '%{topic}%'",con)
    con.close()
    return _childrens["name"].tolist()


def prepare_info_snippet(topic):
    con = sqlite3.connect('taxonomy.db')
    _info = pd.read_sql_query(
        f"SELECT * FROM taxonomy WHERE name='{topic}'",con)
    _relation = pd.read_sql_query(
        f"SELECT * FROM relations WHERE name='{topic}'",con)
    _parent_topic = _relation["parent"].iloc[0]
    _info = {
        "snippet_title": _info["name"].iloc[0],
        "snippet_description": _info["link"].iloc[0],
        "parent_topic": _parent_topic,
        "children_topics": get_children_topic(topic),
        "related_topics": {}
    }
    con.close()
    return _info


def prepare_result_list(_use_cases_related):
    result_list = []
    for _use_case in _use_cases_related:
        _articles = _use_case[3]
        for _article in _articles:
            result_list.append(_article[0])
    return result_list


def prepare_filter_topics(_topics):
    _filter_topics = {"needs": [], "tech": []}
    for _topic in _topics:
        if (_topic[1] == "Technology"):
            _filter_topics["tech"].append(_topic[0])
        elif (_topic[1] == "Problems"):
            _filter_topics["needs"].append(_topic[0])
    return _filter_topics


def unrelated_use_cases(_use_cases, _category):
    _category = get_opposite_category(_category)
    con = sqlite3.connect('taxonomy.db')
    cur = con.cursor()
    _problems = []
    for _use_case in _use_cases:
        _articles = _use_case[3].split(",")
        for _article in _articles:
            _problems = _problems + \
                list(cur.execute(
                    f"SELECT DISTINCT * FROM relations WHERE (articles LIKE '%,{_article}%' OR articles LIKE '%{_article},%') AND category='{_category}' ").fetchall())
    con.close()
    _parsed_problems = []
    for _problem in _problems:
        if (_problem not in _parsed_problems):
            _parsed_problems.append(
                {"elem": _problem, "count": _problems.count(_problem)})
    _problems = list(set(_problems))
    for _problem in range(0, len(_problems)):
        _problems[_problem] = list(_problems[_problem])
    return _problems


@app.route("/search", methods=["GET"])
def suggestion():
    word = request.args['word']
    return jsonify({"word": autocomplete.search(word)})


def get_opposite_category(_category):
    if (_category == "Problems"):
        return "Technology"
    else:
        return "Problems"


def retrieve_link_use_cases(_old_use_cases):
    con = sqlite3.connect('taxonomy.db')
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    _new_use_cases = list(_old_use_cases)
    for i in range(0, len(_old_use_cases)):
        if (len(_old_use_cases[i][3]) > 0):
            _articles_id = _old_use_cases[i][3].split(",")
            _articles_response = []
            for _article_id in _articles_id:
                if(_article_id.strip() != ""):
                    _article = cur.execute(
                        f"SELECT * FROM articles WHERE id={_article_id}").fetchone()
                    if (_article is not None):
                        _article = [{k: str(_article[k]) for k in _article.keys()}]
                        _article[0]["authors"] = _article[0]["authors"].split(",")
                        entities = retrieve_entities(_article[0]["id"])
                        _article[0]["tax_keywords"] = entities
                        _articles_response.append(_article)
            _new_use_cases[i][3] = _articles_response
    con.close()
    return _new_use_cases


def retrieve_entities(id):
    con = sqlite3.connect('taxonomy.db')
    _needs = []
    _tech = []
    df = pd.read_sql_query(
        f"SELECT DISTINCT * FROM relations WHERE (articles LIKE '%,{id}%' OR articles LIKE '%{id},%') ", con)
    
    if df.empty != True:
        for index, row in df.iterrows():
            if row["category"] == "Problems":
                _needs.append(row["name"])
            else:
                _tech.append(row["name"])
    con.close()
    return {"needs": _needs, "tech": _tech}


def find_use_cases(_topics):
    con = sqlite3.connect('taxonomy.db')
    cur = con.cursor()
    _use_cases = []
    for _topic in _topics:
        _topic = _topic[0].strip()
        query = f"SELECT * FROM relations WHERE name LIKE '%{_topic}%' ; "
        rows = cur.execute(query).fetchall()
        for row in rows:
            if (row[2] != ""):
                _use_cases.append(list(row))
    con.close()
    return _use_cases


def search_into_taxonomy(_mentions):
    _results = []
    con = sqlite3.connect('taxonomy.db')
    cur = con.cursor()
    for _mention in _mentions:
        _words_mention = _mention.split(" ")
        for _word in _words_mention:
            for row in cur.execute(f"SELECT * FROM taxonomy WHERE name LIKE '%{_word}%'"):
                if (row not in _results):
                    _results.append(row)
    con.close()
    return _results


def search_annotations_on_taxonomy(_annotations):
    left_side = []
    right_side = []
    for _annotation in _annotations:
        if (len(search_into_taxonomy([_annotation.entity_title])) > 0):
            for _entity in search_into_taxonomy([_annotation.entity_title]):
                if (_entity not in left_side):
                    left_side.append(_entity)
        else:
            if (_annotation.entity_title not in right_side):
                right_side.append(_annotation.entity_title)
    return [left_side, right_side]

def controlla_nuove_righe(db_file, tabella, intervallo):
    conn = sqlite3.connect('taxonomy.db')
    cursor = conn.cursor()

    ultimo_id = 0

    while True:
        # Ottenere l'ID massimo corrente nella tabella
        cursor.execute(f"SELECT MAX(id) FROM {'articles'}")
        result = cursor.fetchone()
        nuovo_id = result[0] if result[0] else 0

        if nuovo_id > ultimo_id:
            # Ci sono nuove righe nella tabella
            cursor.execute(f"SELECT * FROM {'articles'} WHERE id > ?", (ultimo_id,))
            nuove_righe = cursor.fetchall()

            # Elabora le nuove righe come desiderato
            for riga in nuove_righe:
                # Esempio: stampa l'intera riga
                print(riga)

            # Aggiorna l'ultimo ID
            ultimo_id = nuovo_id

        time.sleep(intervallo)

    conn.close()

def tagme_api(_input):
    _mentions = tagme.mentions(_input)
    results = []
    #linkprob
    for mention in _mentions.mentions:
	    results.append(mention.mention)
        return results


@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('js', path)


@app.route('/css/<path:path>')
def send_css(path):
    return send_from_directory('css', path)

