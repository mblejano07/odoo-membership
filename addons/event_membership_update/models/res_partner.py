from odoo import models, fields, api

class ResPartner(models.Model):
    _inherit = 'res.partner'

    # Define fields to store the selected region, province, city, and barangay IDs
    region_id = fields.Integer(string='Region ID', store=True)
    province_id = fields.Integer(string='Province ID',store=True)
    city_id = fields.Integer(string='City ID',)
    barangay_id = fields.Integer(string='Barangay ID',store=True)

    purchased_membership_id = fields.Many2one(
        'product.product',
        string='Purchased Membership',
        compute='_compute_purchased_membership',
        store=True
    )

    @api.depends('member_lines.membership_id')
    def _compute_purchased_membership(self):
        for partner in self:
            # Get the latest membership_id (or any logic you want)
            membership = partner.member_lines.filtered(lambda m: m.membership_id).sorted('id', reverse=True)[:1]
            partner.purchased_membership_id = membership.membership_id if membership else False
