from crypt import methods
from flask import Blueprint, request, jsonify
from flask_login import login_required
from app.models import db, Store, User, Snack
from flask_login import current_user
from ..forms.store_form import StoreForm
from ..forms.snack_form import SnackForm

def validation_form_errors(validation_errors):
  errors = []
  for field in validation_errors:
    for err in validation_errors[field]:
      errors.append(f'{field}:{err}')
  return errors

store_routes = Blueprint('stores', __name__)

## CREATE A STORE
@store_routes.route("/new", methods=["POST"])
@login_required
def create_store():
  form = StoreForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():

    store = Store(
      name = form.name.data,
      description = form.description.data,
      header = form.header.data,
      user_id = current_user.id
    )

    db.session.add(store)
    db.session.commit()

    new_store = store.to_dict()
    return new_store

  return {"errors": validation_form_errors(form.errors), "statusCode":401}

# CREATE A SNACK FOR A STORE VIA ID
@store_routes.route('/<int:id>/snacks', methods=["POST"])
@login_required ## must be logged in to create a snack
def create_review(id):
  store = Store.query.get(id)

  ##ERROR HANDLING NON-EXISTING STORE
  if not store:
    return {"message": "store couldn't be found.", "statusCode":404}

  form = SnackForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():

    snack = Snack(
      name = form.name.data,
      description = form.description.data,
      price = form.price.data,
      img = form.img.data,
      store_id = id,
      user_id = current_user.id
    )

    db.session.add(snack)
    db.session.commit()

    return snack.to_dict()
  return {"errors": validation_form_errors(form.errors), "statusCode":401}

## GET ALL STORES
@store_routes.route("/", methods=["GET"])
def get_all_stores():
  stores = Store.query.all()
  store_list = []

  for store in stores:
    owner = (Store.query.filter(User.id == store.user_id).one()).to_dict()
    stores_dict = store.to_dict()
    stores_dict['owner'] = owner
    store_list.append(stores_dict)

  return {"stores": [store for store in store_list]}

## GET CURRENT USERS STORE
@store_routes.route("/current", methods=["GET"])
def get_stores_of_user():
  stores = Store.query.filter(current_user.id == Store.user_id).all()
  return {"stores": [store.to_dict() for store in stores]}

## UPDATE STORE
@store_routes.route("/<int:id>", methods=["PUT"])
@login_required
def edit_post(id):

  store = Store.query.get(id)

  if not store:
    return {"message":"Store could not be found", "statusCode":404}

  if current_user.id != store.user_id:
    return {"message":"Forbidden", "statusCode":403}

  form = StoreForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    store.name = form.name.data
    store.description = form.description.data
    store.header = form.header.data

    db.session.commit()

    return store.to_dict()
  return {"errors": validation_form_errors(form.errors), "statusCode":401}

## DELETE STORE
@store_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_store(id):
  store = Store.query.get(id)

  if not store:
    return {"message": "Store couldn't be found", "statusCode":404}

  if current_user.id != store.user_id:
    return {"message":"Forbidden", "statusCode":403}
  db.session.delete(store)
  db.session.commit()

  return {"message":"Successfully deleted", "statusCode":200}
