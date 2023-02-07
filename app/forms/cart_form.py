from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired, ValidationError


class CartForm(FlaskForm):
    quantity = IntegerField('Quantity', validators=[DataRequired()])
