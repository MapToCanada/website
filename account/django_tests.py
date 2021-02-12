from django.conf import settings
from django.test import TestCase
from django.contrib.auth.models import User


class UserLoginCase(TestCase):
    def setUp(self):
        pass

    def test_login_by_email(self):
        # TODO: Test user could be login by email
        self.assertTrue(True)

    def test_login_by_username(self):
        # TODO: Test user could be login by user name
        self.assertTrue(True)