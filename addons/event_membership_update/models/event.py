# event_membership_update/models/event.py
from odoo import models, fields

class Event(models.Model):
    _inherit = 'event.event'
    
    # Sample field for deletion later
    custom_field = fields.Char(string='Custom Field')

    # This will create the "Memberships" field that links to multiple membership products
    membership_product_ids = fields.Many2many(
        'product.product',  # Related model
        'event_event_product_product_rel',  # Relation table
        'event_event_id',  # Field in the relation table that links to event
        'product_product_id',  # Field in the relation table that links to product
        string='Membership Products',  # Field label
        domain="[('membership', '=', True)]"  # Optional domain
    )
