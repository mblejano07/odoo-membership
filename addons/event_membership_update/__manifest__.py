{
    'name': 'Event Membership Upgrade',
    'version': '1.0',
    'category': 'Events',
    'summary': 'Add Membership Products to Events',
    'description': """
        This module adds a Many2many field to the Event form to link
        to Membership Products.
    """,
    'author': 'Michael Lejano',
    'company': 'Blackpearl Technology Solutions Corporation',
    'depends': ['event', 'product','sale'],  # Depends on event and product modules
    'data': [
        'views/event_view.xml',  # Include the custom view
        'security/ir.model.access.csv',  # Add the access control file

    ],
    'installable': True,
    'application': False,
}
