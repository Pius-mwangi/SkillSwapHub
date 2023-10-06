"""Initial migration

Revision ID: initial
Revises: 
Create Date: 2023-10-05 16:18:24.201979

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'initial'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'users',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('username', sa.String(), nullable=True),
        sa.Column('email', sa.String(), nullable=True),
        sa.Column('password', sa.String(), nullable=True),
        sa.Column('usertype', sa.String(), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )

    op.create_table(
        'service_request',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('title', sa.String(), nullable=True),
        sa.Column('description', sa.String(), nullable=True),
        sa.Column('location', sa.String(), nullable=True),
        sa.Column('status', sa.String(), nullable=True),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )

    op.create_table(
        'service_provider',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('fullname', sa.String(), nullable=True),
        sa.Column('skills', sa.String(), nullable=True),
        sa.Column('experience', sa.String(), nullable=True),
        sa.Column('availability', sa.String(), nullable=True),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )

    op.create_table(
        'rating',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('review', sa.String(), nullable=True),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('service_request_id', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
        sa.ForeignKeyConstraint(['service_request_id'], ['service_request.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )

def downgrade():
    op.drop_table('rating')
    op.drop_table('service_provider')
    op.drop_table('service_request')
    op.drop_table('users')