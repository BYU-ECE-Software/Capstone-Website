# SQL Folder
This folder is to temporarily (or permanantly) house the SQL code that we will use to setup our database and tables until we get a test server up and running.

Make sure to have a local db.properties file in the backend directory. It is ignored in version control. It should contain host, port, user, password, and name
I'll put an explanation page on the wiki.

# NOTES:
SAML
SP our app. Service provider
IdP identity provider, CAS
	Returns some attributes to the SP (as part of SAML assertion) but just netID
	Use passport SAML strategy
Endpoints:
	register
	login
	update (user)
	get/UID/roles // throw this and previous in a user.js file?