from odoo import models, fields

class ProductProduct(models.Model):
    _inherit = 'product.product'

    membership = fields.Boolean(string="Is Membership Product")
