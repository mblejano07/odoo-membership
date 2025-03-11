{
    'name': 'PSGC Custom Module',
    'version': '1.0',
    'category': 'PSGC Custom Modules',
    'summary': 'Created custom Module for Region Province City and Barangay',
    'description': """
        This modules is created for Region Province City and Barangay in the Philippines
    """,
    'author': 'Michael Lejano',
    'company': 'Blackpearl Technology Solutions Corporation',
    'depends': ['base'],  # Depends on event and product modules
    'data': [
        'data/region.xml',
        'data/province.xml',
        'data/city.xml',
        'views/psgc_menu.xml',
        'views/region_action.xml',
        'views/province_action.xml',
        'views/city_action.xml',
        'views/region_form.xml',
        'views/province_form.xml',
        'views/city_form.xml',
        'security/ir.model.access.csv',
    ],
    'installable': True,
    'application': True,
}
