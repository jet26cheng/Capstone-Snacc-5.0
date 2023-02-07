from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Snack, User, Store, Cart
from ..forms.cart_form import CartForm
from app.api.auth_routes import validation_errors_to_error_messages


def validation_form_errors(validation_errors):
    errors = []
    for field in validation_errors:
        for err in validation_errors[field]:
            errors.append(f'{field}:{err}')
    return errors


cart_routes = Blueprint('cart', __name__)


# GET ALL SNACKS FROM THE CART

@cart_routes.route("/")
@login_required
def get_shopping_cart():
    print('===/n/n/n/n/n/n/n/n/n', 'here?', current_user)
    user_id = current_user.id
    cartItems = Cart.query.filter(
        Cart.user_id == user_id).all()
    return {
        "CartItems": [
            cartItem.to_dict() for cartItem in cartItems
        ]
    }, 200


# EDIT THE CART
@cart_routes.route("/<int:snacks_id>", methods=["PUT"])
@login_required
def edit_cart_item(snacks_id):
    item = Cart.query.get(snacks_id)
    form = CartForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if item is None:
        return {"errors": "Cart item couldn't be found"}, 404

    if form.validate_on_submit():

        item.quantity = form.data["quantity"]
        item.order_id = 0

        db.session.commit()
        return item.to_dict(), 200
    else:
        return {"errors": validation_errors_to_error_messages(form.errors)}, 400


# Deleting items in the cart by id
@cart_routes.route("/<int:snacks_id>", methods=["DELETE"])
@login_required
def delete_cart_item(snacks_id):
    item = Cart.query.get(snacks_id)
    if not item:
        return {"errors": "Cart Item couldn't be found"}, 404
    if item.user_id == current_user.id:
        db.session.delete(item)
        db.session.commit()
        return {"message": "Item in cart successfully deleted!"}, 200
    else:
        return {"errors": " You are not the owner of this cart-item"}, 400
