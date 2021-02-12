from django.core.management.base import BaseCommand
from django.contrib.auth.models import User


class Command(BaseCommand):
    # Delete an account:
    # python manage.py delete-account --email xxxx@xxx.xx
    help = 'Delete user'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def add_arguments(self, parser):
        # https://docs.python.org/3/library/argparse.html#nargs
        parser.add_argument('--email', dest='email', required=True, nargs='?', type=str, help='email')
        pass

    def handle(self, *args, **options):
        related_user = User.objects.get(email=options['email'])
        related_user.delete()
