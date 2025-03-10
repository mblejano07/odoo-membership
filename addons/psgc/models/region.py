from odoo import models, fields

class Region(models.Model):
    _name = 'region'
    _description = 'Region'

    code_correspondence = fields.Char('Code Correspondence')
    name = fields.Char('Region Name', required=True)
    altName = fields.Char('Alternate Name')
    code = fields.Char('Region Code')
    geo_level = fields.Char('Geo Level')
    remarks = fields.Char('Remarks')
