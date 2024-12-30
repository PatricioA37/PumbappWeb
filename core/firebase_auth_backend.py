# firebase_auth_backend.py
import firebase_admin
from firebase_admin import auth
from django.contrib.auth.models import User

class FirebaseAuthenticationBackend:
    def authenticate(self, request, uid=None):
        try:
            firebase_user = auth.get_user(uid)
            user, created = User.objects.get_or_create(username=firebase_user.uid)
            return user
        except Exception:
            return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
