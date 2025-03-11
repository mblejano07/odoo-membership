from odoo import models, fields

class ResPartner(models.Model):
    _inherit = 'res.partner'

    purchased_membership_id = fields.Many2one(
        'product.product',
        string='Purchased Membership',
        domain=[('membership', '=', True)],
        related='member_lines.membership_id',
        store=True
    )