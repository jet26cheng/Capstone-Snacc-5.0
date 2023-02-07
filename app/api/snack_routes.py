from crypt import methods
from flask import Blueprint, request, jsonify
from flask_login import login_required
from app.models import db, Snack, User, Store, Cart
from flask_login import current_user
from ..forms.snack_form import SnackForm
from ..forms.cart_form import CartForm


def validation_form_errors(validation_errors):
    errors = []
    for field in validation_errors:
        for err in validation_errors[field]:
            errors.append(f'{field}:{err}')
    return errors


snack_routes = Blueprint('snack', __name__)

# GET ALL SNACKS OF A STORE


@snack_routes.route("/", methods=["GET"])
def get_reviews():
    snacks = Snack.query.filter(Store.id == Snack.store_id).all()
    snack_list = []

    for snack in snacks:
        store = (Store.query.filter(Store.id == snack.store_id).one()).to_dict()
        snacks_dict = snack.to_dict()
        snacks_dict['store'] = store
        snack_list.append(snacks_dict)

    return {"snacks": [snack for snack in snack_list]}

# EDIT SNACK


@snack_routes.route("/<int:id>", methods=["PUT"])
@login_required
def edit_snack(id):

    snack = Snack.query.get(id)

    if not snack:
        return {"message": "Snack could not be found", "statusCode": 404}

    if current_user.id != snack.user_id:
        return {"message": "Forbidden", "statusCode": 403}

    form = SnackForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        snack.name = form.name.data
        snack.description = form.description.data
        snack.price = form.price.data

        db.session.commit()

        return snack.to_dict()
    return {"errors": validation_form_errors(form.errors), "statusCode": 401}


# DELETE A SNACK
@snack_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_snack(id):
    snack = Snack.query.get(id)

    if not snack:
        return {"message": "Snack couldn't be found", "statusCode": 404}

    if current_user.id != snack.user_id:
        return {"message": "Forbidden", "statusCode": 403}
    db.session.delete(snack)
    db.session.commit()

    return {"message": "Successfully deleted", "statusCode": 200}


# CREATE A CART
@snack_routes.route("/<int:snacks_id>/cart", methods=["POST"])
@login_required
def create_cart_item(snacks_id):
    item = Snack.query.get(snacks_id)

    cartItem = db.session.query(Cart)\
        .filter(Cart.user_id == current_user.id)\
        .filter(Cart.snack_id == snacks_id)\
        .first()

    form = CartForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if not item:
        return {"errors": "Product couldn't be found"}, 404

    if form.validate_on_submit():
        if not cartItem:
            data = Cart(
                user_id=current_user.id,
                snack_id=snacks_id,
                quantity=form.data["quantity"],
                order_id=0
            )
            db.session.add(data)
            db.session.commit()

            return data.to_dict(), 200
        else:
            # if cartItem.quantity + form.data["quantity"] > cartItem.product.stock:
            #     cartItem.quantity = cartItem.product.stock
            #     cartItem.message = "You have reached the maximum stock for this product."
            #     db.session.commit()
            #     return cartItem.to_dict_current(), 200
            # else:
            cartItem.quantity += form.data["quantity"]
            db.session.commit()
            return cartItem.to_dict(), 200
    else:

        return {"errors": validation_form_errors(form.errors)}, 400
