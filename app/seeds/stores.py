from app.models import db, Store


# Adds a demo user, you can add other users here if you want
def seed_stores():
    demo = Store(
        name='Admin Store', description='Add stores add snacks', header='header', user_id=1)
    marnie = Store(
        name='Store 2', description='blank', header='blank', user_id=2)
    bobbie = Store(
        name='Store 3', description='blank', header='blank', user_id=3)

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_stores():
    db.session.execute('TRUNCATE stores RESTART IDENTITY CASCADE;')
    db.session.commit()
