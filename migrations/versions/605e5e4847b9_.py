"""empty message

Revision ID: 605e5e4847b9
Revises: initial
Create Date: 2023-10-06 12:55:10.534233

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '605e5e4847b9'
down_revision = 'initial'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('rating', schema=None) as batch_op:
        batch_op.drop_constraint('rating_user_id_fkey', type_='foreignkey')
        batch_op.drop_constraint('rating_service_request_id_fkey', type_='foreignkey')
        batch_op.create_foreign_key(None, 'users', ['user_id'], ['id'])
        batch_op.create_foreign_key(None, 'service_request', ['service_request_id'], ['id'])

    with op.batch_alter_table('service_provider', schema=None) as batch_op:
        batch_op.drop_constraint('service_provider_user_id_fkey', type_='foreignkey')
        batch_op.create_foreign_key(None, 'users', ['user_id'], ['id'])

    with op.batch_alter_table('service_request', schema=None) as batch_op:
        batch_op.drop_constraint('service_request_user_id_fkey', type_='foreignkey')
        batch_op.create_foreign_key(None, 'users', ['user_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('service_request', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('service_request_user_id_fkey', 'users', ['user_id'], ['id'], ondelete='CASCADE')

    with op.batch_alter_table('service_provider', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('service_provider_user_id_fkey', 'users', ['user_id'], ['id'], ondelete='CASCADE')

    with op.batch_alter_table('rating', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('rating_service_request_id_fkey', 'service_request', ['service_request_id'], ['id'], ondelete='CASCADE')
        batch_op.create_foreign_key('rating_user_id_fkey', 'users', ['user_id'], ['id'], ondelete='CASCADE')

    # ### end Alembic commands ###
