{
    'name': 'Event Membership Update',
    'version': '1.0',
    'category': 'Events',
    'summary': 'Add Membership Products to Events',
    'description': """
        This module adds a Many2many field to the Event form to link
        to Membership Products.
    """,
    'author': 'Michael Lejano',
    'company': 'Blackpearl Technology Solutions Corporation',
    'depends': ['base','psgc','contacts','event', 'product','sale','auth_signup','website','web','portal'],  # Depends on event and product modules
    'data': [
        'views/auth_signup_view.xml',  # Include the custom view
        # 'views/signup_region_template.xml',  # Include the custom view
        'views/event_view.xml',  # Include the custom view
        'security/ir.model.access.csv',  # Add the access control file
    ],
    'assets': {
        'web.assets_frontend': [
            'event_membership_update/static/src/xml/signup_region_template.xml',
            'event_membership_update/static/src/js/signup_region.js',
        ],
    },
    'installable': True,
    'application': False,
}
