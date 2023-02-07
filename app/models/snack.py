from .db import db
from sqlalchemy.sql import func


class Snack(db.Model):
    __tablename__ = "snacks"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(100), nullable=False)
    img = db.Column(db.String(200), nullable=False)
    price = db.Column(db.Integer, nullable=False)


    store_id = db.Column(db.Integer, db.ForeignKey(
        "stores.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    stores = db.relationship(
        "Store", back_populates="snacks")
    users = db.relationship(
        "User", back_populates="snacks")
    carts = db.relationship(
        "Cart", back_populates="snacks")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'img': self.img,
            'price': self.price,
        }
