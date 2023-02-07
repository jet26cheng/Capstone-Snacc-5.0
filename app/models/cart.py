from .db import db
from sqlalchemy.sql import func


class Cart(db.Model):
    __tablename__ = "carts"

    id = db.Column(db.Integer, primary_key=True)
    snack_id = db.Column(db.Integer, db.ForeignKey(
        "snacks.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    order_id = db.Column(db.Integer, nullable=False)
    users = db.relationship("User", back_populates="carts")
    snacks = db.relationship("Snack", back_populates="carts")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'quantity': self.quantity
        }
