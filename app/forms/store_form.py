from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError

from app.models import Store

def store_exists(form, field):
    # Checking if username is already in use
    store_name = field.data
    store = Store.query.filter(Store.name == store_name).first()
    if store:
        raise ValidationError('Store name is already taken.')

class StoreForm(FlaskForm):
    name = StringField('Store Name', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    header = StringField('Header Image URL')
