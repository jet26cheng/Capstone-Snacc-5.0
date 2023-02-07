from .db import db
from sqlalchemy.sql import func


class Store(db.Model):
    __tablename__ = 'stores'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(1000), nullable=False)
    description = db.Column(db.String(1000), nullable=False)
    header = db.Column(db.String(1000), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    users = db.relationship("User", back_populates="stores")
    snacks = db.relationship(
        "Snack", back_populates="stores")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'header': self.header,
            'user_id': self.user_id
        }
