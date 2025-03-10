{
    'name': 'PSGC Custom Module',
    'version': '1.0',
    'category': 'PSGC Custom Modules',
    'summary': 'Created custom Module for Region Province City and Barangay',
    'description': """
        This modules is created for Region Province City and Barangay in the Philippines
    """,
    'author': 'Michael Lejano',
    'depends': ['base'],  # Depends on event and product modules
     'data': [
        'data/region_data.csv',
        'data/province_data.csv',
        'views/region_view.xml',
        'views/province_view.xml',
        'views/psgc_menu.xml',
        'views/province_form.xml',
        'views/province_tree.xml',
        'views/province_action.xml',
        'views/region_form.xml',
        'views/region_tree.xml',
        'views/region_action.xml',
        'views/province_menu.xml',
        'views/region_menu.xml',
        'ir.model.access.csv',  # Add the access control file
    ],
    'installable': True,
    'application': False,
}
